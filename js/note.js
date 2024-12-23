import { windowElement, dragElement, btnOpenAndClose } from "./desktop.js";

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
            header_action: header_action
        } = windowElement(noteWindow);

        // HEY
        element.style.display = "flex"

        // Add open and close button
        const btnOpen = btnOpenAndClose(element, header_action);

        // Add Drag Element function
        dragElement(element, header); // Windows
        dragElement(btnOpen); // Icon

        // Initialize Note Application Logic
        const noteMain = document.querySelector(".Note_main");

        // Component
        const containerGrid = noteMain.querySelector(".container_grid")
        const noteTitle = noteMain.querySelector(".noteTitle");


        // Data
        let notesContent = [
            {
                noteId: 1,
                title: "Testing 1",
                date: "12/23/2024",
                contentURL: `../data_storage/note/noteId_1.html`
            },
            {
                noteId: 2,
                title: "Testing 2",
                date: "12/24/2024",
                contentURL: `../data_storage/note/noteId_2.html`
            }
        ];

        // Sidebar toggle
        const toggleSidebar = document.querySelector("#toggle_sidebar");
        
        toggleSidebar.addEventListener("click", () => {
            const isVisible = getComputedStyle(noteTitle).overflowY !== 'hidden';

            if (isVisible) {
                noteTitle.style.overflowX = "hidden";
                noteTitle.style.overflowY = "hidden";
                containerGrid.style.gridTemplateColumns = '0fr 1fr';
                containerGrid.style.columnGap = "0";
            } else {
                noteTitle.style.overflowX = "hidden"
                noteTitle.style.overflowY = "scroll"
                containerGrid.style.gridTemplateColumns = '1fr 3fr';
                containerGrid.style.columnGap = "10px";
            }
        })
    })
    .catch(error => console.error('Error loading introduction:', error));

