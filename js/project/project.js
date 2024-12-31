import { windowElement, dragElement, btnOpenAndClose } from "../desktop.js";
//#region Initialize
export async function initializeProject() {
    fetch("../../app/project.html")
        .then(response => response.text())
        .then(data => {
            // Only after content is loaded, then initialize the window functionality
            document.getElementById("Project_Container").innerHTML = data;

            // Detect element and make it a windows function
            const projectWindow = document.querySelector("#Project");
            initializeProjectComponents(projectWindow);
        })
        .catch(error => console.error('Error loading project:', error));
}

async function initializeProjectComponents(projectWindow) {
    const {
        element: element,
        header: header,
        header_action: header_action,
    } = windowElement(projectWindow);

    // Add open and close button
    const { btnOpen: btnOpen, btnClose: btnClose } = btnOpenAndClose(element, header_action);

    // Add draggable function to this windows
    dragElement(element, header); // Windows
    dragElement(btnOpen); // Icon

    // InitializeProjectComponent
    const projectHeader = element.querySelector(".Project_header")
    const projectMain = element.querySelector(".Project_main")

    const commitLog = projectMain.querySelector("#commitLog")

    await fetchGitHubCommits(commitLog);
    await testingProject(element)
}
//#endregion

// Testing Purpose
async function testingProject(element) {
    element.style.display = "flex";
    element.style.flexDirection = "column";
    element.style.opacity = "1"
}

//#region Fetch Github API
async function fetchGitHubCommits(commitLog) {
    const owner = "DannyTheKO"
    const repo = "WebOS_Portfolio"
    const perPage = 30;

    fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(commits => {
            commits.forEach(commit => {
                const commitElement = document.createElement("li");
                const formatDate = () => {
                    const date = new Date(commit.commit.author.date)

                    const format = date.toLocaleString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    });

                    return format;
                };
                commitElement.id = formatDate();
                commitElement.innerHTML = `
                    <p>Date: ${formatDate()}</p>
                    <p><strong> >> ${commit.commit.message}</strong></p>`;

                commitLog.appendChild(commitElement);
            });
        })
        .catch(error => {
            console.error('Error fetching commit history:', error);
        });
}
//#endregion