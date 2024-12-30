import { windowElement, dragElement, btnOpenAndClose } from "../desktop.js";

export async function initializeProject() {
    fetch("../../app/project.html")
        .then(response => response.text())
        .then(data => {
            // Only after content is loaded, then initialize the window functionality
            document.getElementById("Project_Container").innerHTML = data;

            // Detect element and make it a windows function
            const projectWindow = document.querySelector("#Project");
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
        })
        .catch(error => console.error('Error loading project:', error));
}