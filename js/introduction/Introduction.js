import { windowElement, dragElement, btnOpenAndClose } from "../desktop.js";

fetch("/app/introduction.html")
    .then(response => response.text())
    .then(data => {
        // Only after content is loaded, then initialize the window functionality
        document.getElementById("Introduction_Container").innerHTML = data;

        // Detect element and make it a windows function
        const introductionWindow = document.querySelector("#Introduction");
        const { 
            element: element, 
            header: header, 
            header_action: header_action,
        } = windowElement(introductionWindow);

        // Add open and close button
        const btnOpen = btnOpenAndClose(element, header_action);

        // Add draggable function to this windows
        dragElement(element, header); // Windows
        dragElement(btnOpen); // Icon
    })
    .catch(error => console.error('Error loading introduction:', error));
