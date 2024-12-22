import { windowElement, dragElement, toggleElement } from "./desktop.js";

fetch("app/introduction.html")
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
            btnOpen: btnOpen,
            btnClose: btnClose,
        } = windowElement(introductionWindow);

        // Add draggable function to this windows
        dragElement(element, header); // Windows
        dragElement(btnOpen); // Icon
    })
    .catch(error => console.error('Error loading introduction:', error));


document.addEventListener('DOMContentLoaded', function () {

})
