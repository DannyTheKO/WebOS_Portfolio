import { windowElement, dragElement, toggleElement } from "./desktop.js";

document.addEventListener("DOMContentLoaded", function () {
    fetch("app/note.html")
        .then(response => response.text())
        .then(data => {
            // Initialize Note HTML Body
            document.getElementById("Note_Container").innerHTML = data;

            // Get and extract element
            const noteWindow = document.querySelector("#Note")

            const { element: element, header: header, header_action: header_action } = windowElement(noteWindow);

            // Close and Open function
            const btnOpen = document.querySelector(".Note_btn_open")
            const btnClose = header_action.querySelector("#Note_btn_close")

            // Add Open and Close button
            btnOpen.addEventListener("dblclick", () => {
                if (element.style.display === "none") {
                    toggleElement(element)
                }
            })

            btnClose.addEventListener("click", () => toggleElement(element));

            // Add Drag Element function
            dragElement(element, header)
            dragElement(btnOpen)
        })
        .catch(error => console.error('Error loading introduction:', error));
})