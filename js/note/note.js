import { windowElement, dragElement, btnOpenAndClose } from "../desktop.js";
import { NoteManager } from "./note_class.js";

fetch("../../app/note.html")
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
        
        const sidebarBtnContainer = noteMain.querySelector("#sidebar_btn_container"); // Sidebar Container
        const toggleBtn = sidebarBtnContainer.querySelector("#toggle_btn") // Toggle Button

        //#region Sidebar Button
        // Expand and Collapse
        toggleBtn.addEventListener("click", () => {
            const isVisible = getComputedStyle(noteTitle).display !== 'none';
            btnReaction(toggleBtn, isVisible)

            setTimeout(() => {
                if (isVisible) {
                    toggleBtn.src = "svg/enlarge-btn.svg"
                } else {
                    toggleBtn.src = "svg/collapse-btn.svg"
                }
            }, 250);

            sidebarReaction(containerGrid, noteTitle, isVisible)
        });

        // Previous Note
        // Next Note

        function btnReaction(btn, state) {
            btn.style.transition = `
            height 0.1s ease 0.1s,
            width 0.1s ease 0.1s,
            padding 0.1s ease 0.15s,
            opacity 0.1s ease 0.12s
            `

            setTimeout(() => {
                btn.style.cursor = "default"
                btn.style.width = "36px"
                btn.style.height = "0"
                btn.style.padding = "0"
            }, 0)

            if (state) {
                setTimeout(() => {
                    btn.style.cursor = "pointer"
                    btn.style.width = "36px"
                    btn.style.height = "36px"
                    btn.style.padding = "6px"
                }, 250)
            }
            else {
                setTimeout(() => {
                    btn.style.cursor = "pointer"
                    btn.style.width = "36px"
                    btn.style.height = "36px"
                    btn.style.padding = "6px"
                }, 250)
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

        const noteTitleHeaderName = noteHeader.querySelector("#Note_title_name"); // Header Style
        noteTitleHeaderName.style.setProperty("--note-id", 0);

        // with every note, we print the title and date first into a noteTitle
        listNote.forEach(note => {
            const noteTitleContent = document.createElement("div");

            // Then we customize id into a div
            noteTitleContent.id = `noteId_${note.noteId}`
            noteTitleContent.style.setProperty("--note-id", note.noteId);

            // Add note title content inside it
            noteTitleContent.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.date}</p>
            `

            // Then append the child element
            noteTitle.appendChild(noteTitleContent);

            noteTitleContent.addEventListener("click", () => {
                const noteId = getComputedStyle(noteTitleContent).getPropertyValue("--note-id"); // Get ID when click
                const noteIDHeader = getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-id");


                if (noteId != noteIDHeader) {
                    notePageLoad(notePage, noteId);
                    noteHeaderAnimation(noteTitleHeaderName);

                    // Set the noteIDHeader back
                    noteTitleHeaderName.style.setProperty("--note-id", noteId)
                }
            })

            // Note Default Page
            function notePageLoad(notePage, noteId) {
                notePageAnimation(notePage);

                setTimeout(() => {
                    // Remove any child in note page
                    while (notePage.firstChild) {
                        notePage.removeChild(notePage.firstChild);
                    }
    
                    // Get content
                    const noteContent = noteManager.getNoteById(noteId); // Get all information about that note ID
    
                    // Create a div
                    const notePageContent = document.createElement("div")
    
                    // Customize it
                    notePageContent.id = `noteContentId_${noteContent.noteId}`
                    notePageContent.style.setProperty("--note-content-id", noteContent.noteId)
                    notePageContent.innerHTML = `${noteContent.contentURL}`
    
                    // Append into note page
                    notePage.appendChild(notePageContent);
                }, 500);
            }
            // Load Default Page
            notePageLoad(notePage, "1");

            // Animation
            function noteHeaderAnimation(noteTitleHeaderName) {
                noteTitleHeaderName.style.transition = `
                padding 0.1s ease 0s,
                opacity 0.1s ease 0s
                `

                setTimeout(() => {
                    noteTitleHeaderName.style.padding = "0 0 64px 0"
                    noteTitleHeaderName.style.opacity = "0"
                }, 100)

                setTimeout(() => {
                    noteTitleHeaderName.innerHTML = ` &nbsp[ ${note.title} ]`;
                    noteTitleHeaderName.style.padding = "0"
                    noteTitleHeaderName.style.opacity = "1"
                }, 700)

            }

            // TODO: make animation when note page is load
            function notePageAnimation(notePage) {
                const overlay = window.getComputedStyle(notePage, '::after');
                
                // Now you can access the computed styles of the ::after element
                // But to modify it, you should use CSS custom properties on the parent
                
                setTimeout(() => {
                    notePage.style.setProperty('--width', '100%');
                    notePage.style.setProperty('--height', '100%');
                }, 100);
            
                setTimeout(() => {
                    notePage.style.setProperty('--width', '100%');
                    notePage.style.setProperty('--height', '0%');
                }, 500);
            }
        })
        //#endregion

    })
    .catch(error => console.error('Error loading introduction:', error));