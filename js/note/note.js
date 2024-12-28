import { windowElement, dragElement, btnOpenAndClose } from "../desktop.js";
import { NoteManager } from "./note_class.js";

fetch("/app/note.html")
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
        const noteHeader = noteWindow.querySelector(".Note_header");
        const noteMain = noteWindow.querySelector(".Note_main");

        const noteTitle = noteMain.querySelector(".noteTitle");
        const notePage = noteMain.querySelector(".notePage");

        const containerGrid = noteMain.querySelector(".container_grid")
        const toggleSidebar = noteMain.querySelector("#toggle_sidebar"); // Sidebar Button
        const toggleSidebar_Btn_Image = toggleSidebar.querySelector(".svg") // Image

        //#region Sidebar Toggle
        toggleSidebar.addEventListener("click", () => {
            const isVisible = getComputedStyle(noteTitle).display !== 'none';
            btnReaction(toggleSidebar, isVisible)
            sidebarReaction(containerGrid, noteTitle, isVisible)
        });

        function btnReaction(toggleSidebar, state) {
            toggleSidebar.style.transition = `
            height 0.1s ease 0.1s,
            width 0.1s ease 0.1s,
            padding 0.1s ease 0.15s
            `

            toggleSidebar_Btn_Image.style.transition = `opacity 0.1s ease 0.12s`

            setTimeout(() => {
                toggleSidebar.style.cursor = "default"
                toggleSidebar.style.width = "36px"
                toggleSidebar.style.height = "0"
                toggleSidebar.style.padding = "0"
                toggleSidebar_Btn_Image.style.opacity = "0"
            }, 0)

            if (state) {
                setTimeout(() => {
                    toggleSidebar_Btn_Image.style.opacity = "1"
                    toggleSidebar.style.cursor = "pointer"
                    toggleSidebar.style.width = "36px"
                    toggleSidebar.style.height = "36px"
                    toggleSidebar.style.padding = "6px"
                    toggleSidebar_Btn_Image.src = "svg/enlarge-btn.svg"
                }, 300)
            }
            else {
                setTimeout(() => {
                    toggleSidebar_Btn_Image.style.opacity = "1"
                    toggleSidebar.style.cursor = "pointer"
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

        //#region Note Content Loader
        var noteManager = new NoteManager();
        var listNote = noteManager.getAllNotes();

        // with every note, we print the title and date first into a noteTitle
        listNote.forEach(note => {
            // We create a div
            const noteTitleElement = document.createElement('div');

            // Then we customize id into a div
            noteTitleElement.id = `noteTitleId_${note.noteId}`

            // Add content inside it
            noteTitleElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.date}</p>
            `
            noteTitle.appendChild(noteTitleElement);

            noteTitleElement.addEventListener("click", () => {
                const noteTitleName = noteHeader.querySelector("#Note_title_name");
                noteTitleName.style.transition = `
                padding 0.1s ease 0s,
                opacity 0.1s ease 0s
                `

                setTimeout(() => {
                    noteTitleName.style.padding = "0 0 0 128px"
                    noteTitleName.style.opacity = "0"
                }, 100)
                
                setTimeout(() => {
                    noteTitleName.innerHTML = `[ Note ] - [ ${note.title} ]`;
                    noteTitleName.style.padding = "0"
                    noteTitleName.style.opacity = "1"
                }, 200)

            })
        })


        //#endregion

    })
    .catch(error => console.error('Error loading introduction:', error));