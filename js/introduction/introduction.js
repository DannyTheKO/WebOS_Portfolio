import { windowElement, dragElement, btnOpenAndClose } from "../desktop.js";

export async function initializeIntroduction() {
    fetch("../../app/introduction.html")
        .then(response => response.text())
        .then(data => {
            // Only after content is loaded, then initialize the window functionality
            document.getElementById("Introduction_Container").innerHTML = data;

            // Detect element and make it a windows function
            const introductionWindow = document.querySelector("#Introduction");
            initializeIntroductionComponents(introductionWindow)


        })
        .catch(error => console.error('Error loading introduction:', error));
}

async function initializeIntroductionComponents(introductionWindow) {
    const {
        element: element,
        header: header,
        header_action: header_action,
    } = windowElement(introductionWindow);

    // Add open and close button
    const { btnOpen: btnOpen, btnClose: btnClose } = btnOpenAndClose(element, header_action);

    // Add draggable function to this windows
    dragElement(element, header); // Windows
    dragElement(btnOpen); // Icon
}