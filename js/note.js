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
        const noteMain = noteWindow.querySelector(".Note_main");

        const noteTitle = noteMain.querySelector(".noteTitle");
        const notePage = noteMain.querySelector(".notePage");
        const noteHeader = noteMain.querySelector(".Note_header");

        const containerGrid = noteMain.querySelector(".container_grid")
        const toggleSidebar = noteMain.querySelector("#toggle_sidebar"); // Sidebar Button
        const toggleSidebar_Btn_Image = toggleSidebar.querySelector(".svg") // Image

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

        //#region Sidebar Toggle
        toggleSidebar.addEventListener("click", () => {
            const isVisible = getComputedStyle(noteTitle).display !== 'none';
            btnReaction(toggleSidebar, isVisible)
            sidebarReaction(containerGrid, noteTitle, isVisible)
        });

        function btnReaction(toggleSidebar, state) {
            toggleSidebar.style.transition = `
            height 0.1s ease 0.1s,
            width 0.1s ease 0.2s,
            padding 0.1s ease 0.15s
            `

            toggleSidebar_Btn_Image.style.transition = `opacity 0.2s ease 0s`

            setTimeout(() => {
                toggleSidebar.style.cursor = "default"
                toggleSidebar.style.width = "0"
                toggleSidebar.style.height = "0"
                toggleSidebar.style.padding = "0"
                toggleSidebar_Btn_Image.style.opacity = "0"
            }, 0)

            if (state) {
                setTimeout(() => {
                    toggleSidebar.style.cursor = "pointer"
                    toggleSidebar_Btn_Image.style.opacity = "1"
                    toggleSidebar.style.width = "36px"
                    toggleSidebar.style.height = "36px"
                    toggleSidebar.style.padding = "6px"
                    toggleSidebar_Btn_Image.src = "svg/enlarge-btn.svg"
                }, 300)
            }
            else {
                setTimeout(() => {
                    toggleSidebar.style.cursor = "pointer"
                    toggleSidebar_Btn_Image.style.opacity = "1"
                    toggleSidebar.style.width = "36px"
                    toggleSidebar.style.height = "36px"
                    toggleSidebar.style.padding = "6px"
                    toggleSidebar_Btn_Image.src = "svg/collapse-btn.svg"
                }, 300)
            }
        }

        function sidebarReaction(containerGrid, noteTitle, state) {
            // S: 0s, D: 0.3s, E: 0.3s
            containerGrid.style.transition = `
                        grid-template-columns 0.3s ease 0s,
                        column-gap 0.1s ease 0.2s,
                        padding 0.1s ease 0.2s`

            // S: 0s, D: 0.3s + 0.1s, E: 0.3s
            noteTitle.style.transition = `
                        opacity 0.3s ease 0s,
                        padding 0.1s ease 0.1s`

            if (state) {
                // Start animation with 0 sec delay
                setTimeout(() => {
                    containerGrid.style.columnGap = "0px"
                    containerGrid.style.gridTemplateColumns = "0.75fr 3fr"
                }, 0);

                setTimeout(() => {
                    noteTitle.style.padding = "128px 6px 0 0" // Start going down
                    noteTitle.style.opacity = "0"
                    containerGrid.style.gridTemplateColumns = "0fr 1fr"
                }, 100);

                setTimeout(() => {
                    noteTitle.style.display = 'none';
                }, 250);
            }
            else {
                // Start animation with 0 sec delay
                noteTitle.style.display = 'flex';

                setTimeout(() => {
                    containerGrid.style.columnGap = "12px"
                    noteTitle.style.opacity = "1"
                    noteTitle.style.padding = "48px 0 0 0" // Start going up
                }, 0);

                setTimeout(() => {
                    containerGrid.style.gridTemplateColumns = "0.9fr 3fr"
                }, 100)

                setTimeout(() => {
                    containerGrid.style.gridTemplateColumns = "0.7fr 3fr"
                }, 250);
            }
        }
        //#endregion


    })
    .catch(error => console.error('Error loading introduction:', error));

