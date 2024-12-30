import { windowElement, dragElement, btnOpenAndClose } from "../desktop.js";

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

    await testingProject(element)
}

// Testing Purpose
async function testingProject(element) {
    element.style.display = "flex";
    element.style.flexDirection = "column";
    element.style.opacity = "1"
}
