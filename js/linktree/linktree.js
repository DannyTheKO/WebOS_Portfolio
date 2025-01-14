import { windowElement, dragElement, btnOpenAndClose} from "../desktop.js";

export async function initializeContact() {
    fetch("../../app/contact.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#Contact_Container").innerHTML = data;

            const contactWindow = document.querySelector("#Contact");
            initializeContactComponents(contactWindow);
        })
        .catch(error => console.error('Error loading linktree:', error));
}

async function initializeContactComponents(contactWindow) {
    const { element, header, header_action, main } = windowElement(contactWindow)
    const { btnOpen, btnClose } = btnOpenAndClose(element, header_action)

    dragElement( element, header )
    dragElement( btnOpen )

    // Custom event for open button

    // Default start up behavior
    element.style.opacity = "1"
    element.style.display = "flex"
    element.style.flexDirection = "column"

}

// TODO: Create a Contact Page and write a script
// Having CORS issue, will find another way,
// Or just create mockup site like linktree for my app
async function fetchLinktreeSite(linktreeWebpage) {
    fetch("https://linktr.ee/dannyti")
        .then(response => response.text())
        .then(data => {
            linktreeWebpage.innerHTML = data;
        })
        .catch(error => console.error('Error fetching linktree:', error));
}
