import { windowElement, dragElement, toggleElement } from "./desktop.js";

fetch("app/note.html")
    .then(response => response.text())
    .then(data => {
        // Initialize Note HTML Body
        document.getElementById("Note_Container").innerHTML = data;

        // Get and extract element
        const noteWindow = document.querySelector("#Note")

        const { 
            element: element, 
            header: header, 
            header_action: header_action,
            btnOpen: btnOpen,
            btnClose: btnClose,
        } = windowElement(noteWindow)

        // Add Drag Element function
        dragElement(element, header); // Windows
        dragElement(btnOpen); // Icon
    })
    .catch(error => console.error('Error loading introduction:', error));


document.addEventListener("DOMContentLoaded", function () {

})