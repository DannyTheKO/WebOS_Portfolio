import { windowElement, dragElement, closeElement } from "./desktop.js";

// this is prevent null element
document.addEventListener('DOMContentLoaded', function () {
    // Introduction App Icon

    // Introduction App
    fetch("app/introduction.html")
        .then(response => response.text())
        .then(data => {
            // Only after content is loaded, then initialize the window functionality
            document.getElementById("Introduction_container").innerHTML = data;

            // Detect element and make it a windows function
            const introducitonWindow = document.querySelector("#Introduction");
            const { element: element, header: header, header_action: header_action } = windowElement(introducitonWindow);

            // Add draggable function to this windows
            dragElement(introducitonWindow, header);

            // Close and Open function
            const btnClose = header_action.querySelector("#Introduction_btn_close");
            // const btnOpen = document.
            // console.log(btnClose);

            btnClose.addEventListener("click", () => closeElement(introducitonWindow));
        })
        .catch(error => console.error('Error loading introduction:', error));
})

