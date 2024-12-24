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
        const toggleSidebar = noteMain.querySelector("#toggle_sidebar"); // Button
        const containerGrid = noteMain.querySelector(".container_grid")
        const noteTitle = noteMain.querySelector(".noteTitle");
        const notePage = noteMain.querySelector(".notePage")

        toggleSidebar.addEventListener("click", () => {
            const isVisible = getComputedStyle(noteTitle).display !== 'none';

            if (isVisible) {
                closeSideBar(containerGrid, noteTitle);
            } else {
                openSideBar(containerGrid, noteTitle);
            }
        });

        function closeSideBar(containerGrid, noteTitle) {
            // S: 0s, D: 0.3s, E: 0.3s
            containerGrid.style.transition = `
            grid-template-columns 0.3s ease 0s,
            column-gap 0.1s ease 0.2s,
            padding 0.1s ease 0.2s`

            // S: 0s, D: 0.3s + 0.1s, E: 0.3s
            noteTitle.style.transition = `
            opacity 0.3s ease 0s,
            padding 0.1s ease 0.1s`

            // Start animation with 0 sec delay
            setTimeout(() => {
                containerGrid.style.columnGap = "0px"
                containerGrid.style.gridTemplateColumns = "0.75fr 3fr"
            }, 0);

            setTimeout(() => {
                noteTitle.style.padding = "0"
                noteTitle.style.opacity = "0"
                containerGrid.style.gridTemplateColumns = "0fr 1fr"
            }, 100);

            setTimeout(() => {
                noteTitle.style.display = 'none';
            }, 250);
        }

        function openSideBar(containerGrid, noteTitle) {
            // S: 0s, D: 0.3s, E: 0.3s
            containerGrid.style.transition = `
            grid-template-columns 0.3s ease 0s,
            column-gap 0.1s ease 0.2s,
            padding 0.1s ease 0.2s`

            // S: 0s, D: 0.3s + 0.1s, E: 0.3s
            noteTitle.style.transition = `
            opacity 0.3s ease 0s,
            padding 0.1s ease 0.1s`

            // Start animation with 0 sec delay
            noteTitle.style.display = 'flex';
            
            setTimeout(() => {
                containerGrid.style.columnGap = "12px"
                noteTitle.style.opacity = "1"
                noteTitle.style.padding = "0 6px 0 0"
            }, 0);
            
            setTimeout(() => {
                containerGrid.style.gridTemplateColumns = "0.9fr 3fr"
            }, 100)
            
            setTimeout(() => {
                containerGrid.style.gridTemplateColumns = "0.7fr 3fr"
            }, 250);
        }
    })
    .catch(error => console.error('Error loading introduction:', error));

