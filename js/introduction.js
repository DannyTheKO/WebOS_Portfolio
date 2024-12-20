import { windowElement, dragElement, toggleElement } from "./desktop.js";

// this is prevent null element
document.addEventListener('DOMContentLoaded', function () {
    fetch("app/introduction.html")
        .then(response => response.text())
        .then(data => {
            // Only after content is loaded, then initialize the window functionality
            document.getElementById("Introduction_Container").innerHTML = data;

            // Detect element and make it a windows function
            const introductionWindow = document.querySelector("#Introduction");

            // Stay hidden when start up
            introductionWindow.style.display = "none";
            const { element: element, header: header, header_action: header_action } = windowElement(introductionWindow);

            // Close and Open function
            const btnOpen = document.querySelector(".Introduction_btn_open");
            const btnClose = header_action.querySelector("#Introduction_btn_close");
            
            btnOpen.addEventListener("dblclick", () => {
                if (introductionWindow.style.display === "none") {
                    toggleElement(introductionWindow)
                }
            })
            
            btnClose.addEventListener("click", () => toggleElement(introductionWindow));

            // Add draggable function to this windows
            dragElement(element, header);
            dragElement(btnOpen)

        })
        .catch(error => console.error('Error loading introduction:', error));
})
