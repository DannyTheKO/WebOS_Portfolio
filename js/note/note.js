import { windowElement, dragElement, btnOpenAndClose } from "../desktop.js";
import { NoteManager } from "./note_class.js";

// Create noteManager instance at module level
const noteManager = new NoteManager();

// #region Initialize
export function initializeNote() {
    return fetch("../../app/note.html")
        .then(response => response.text())
        .then(data => {
            // Pass HTML data into a container
            document.getElementById("Note_Container").innerHTML = data;

            // Select the Data element
            const noteWindow = document.querySelector("#Note");

            // Initialize note specific functionality
            initializeNoteComponents(noteWindow);
        })
        .catch(error => console.error('Error loading note:', error));
}

// Component initialization function
async function initializeNoteComponents(noteWindow) {
    // Decontruct window element
    const {
        element: element,
        header: header,
        header_action: header_action
    } = windowElement(noteWindow);

    // Initialize Open and Close Button
    const { btnOpen, btnClose } = btnOpenAndClose(element, header_action);
    dragElement(element, header);
    dragElement(btnOpen);

    // Window Query
    const noteHeader = noteWindow.querySelector(".Note_header");
    const noteMain = noteWindow.querySelector(".Note_main");

    // Note Component Query
    const noteTitle = noteMain.querySelector(".noteTitle");
    const notePage = noteMain.querySelector(".notePage");
    const containerGrid = noteMain.querySelector(".container_grid");

    await initializeStartUp(noteHeader, notePage, btnOpen, btnClose);
    await initializeSidebarButtons(noteMain, containerGrid, noteTitle, notePage);
    await initializeNoteContent(noteHeader, noteTitle, notePage);

    // Testing Function
    // await testingNote(element, noteHeader, notePage)
}
//#endregion

async function testingNote(element, noteHeader, notePage) {
    // Testing Purpose
    element.style.display = "flex"
    element.style.flexDirection = "column"
    element.style.opacity = "1"

    const noteTitleHeaderName = noteHeader.querySelector("#Note_title_name");
    const noteIDHeader = parseInt(getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-id"));
    setTimeout(async () => {
        await notePageCloseAnimation(notePage)
        await notePageLoad(notePage, noteIDHeader);
        noteHeaderAnimation(noteTitleHeaderName, noteIDHeader);
        notePageOpenAnimation(notePage);
    }, 100);
}

// #region Startup Behaviour
async function initializeStartUp(noteHeader, notePage, btnOpen, btnClose) {
    const noteTitleHeaderName = noteHeader.querySelector("#Note_title_name");

    btnOpen.addEventListener("dblclick", () => {
        const noteId = parseInt(getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-id"));

        setTimeout( async () => {
            noteHeaderAnimation(noteTitleHeaderName, noteId);
            await notePageCloseAnimation(notePage);
            await notePageLoad(notePage, noteId);
            notePageOpenAnimation(notePage);
        }, 100);
    });

    btnClose.addEventListener("click", () => {
        notePageCloseAnimation(notePage);
        noteHeaderAnimation(noteTitleHeaderName, null);
    });
}
// #endregion

// #region Side Bar
async function initializeSidebarButtons(noteMain, containerGrid, noteTitle, notePage) {
    const sidebarBtnContainer = noteMain.querySelector("#sidebar_btn_container");
    const toggleBtn = sidebarBtnContainer.querySelector("#toggle_btn");
    const previousBtn = sidebarBtnContainer.querySelector("#previous_btn");
    const nextBtn = sidebarBtnContainer.querySelector("#next_btn");

    // Toggle button functionality
    toggleBtn.addEventListener("click", () => {
        const isVisible = getComputedStyle(noteTitle).display !== 'none';
        buttonToggleAnimation(toggleBtn, sidebarBtnContainer, isVisible);
        handleToggleAnimation(containerGrid, noteTitle, isVisible);

        setTimeout(() => {
            toggleBtn.src = isVisible ? "svg/enlarge-btn.svg" : "svg/collapse-btn.svg";
        }, 250);
    });

    // Previous/Next button functionality
    initializeNavigationButtons(previousBtn, nextBtn, notePage, noteTitle);
}

function buttonToggleAnimation(btn, container, state) {
    const transitionStyle = `
        height 0.1s ease 0.1s,
        width 0.1s ease 0.1s,
        padding 0.1s ease 0.15s,
        opacity 0.1s ease 0.12s
    `;

    btn.style.transition = transitionStyle;
    container.style.transition = `opacity 0.1s ease 0.12s`;

    setTimeout(() => {
        container.style.opacity = "0";
        btn.style.opacity = "0";
        btn.style.cursor = "default";
        btn.style.width = "36px";
        btn.style.height = "36px";
        btn.style.padding = "12px";
    }, 0);

    if (state) {
        setTimeout(() => {
            container.style.flexDirection = "column";
            container.style.opacity = "1";
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
            btn.style.width = "36px";
            btn.style.height = "36px";
            btn.style.padding = "6px";
        }, 250);
    } else {
        setTimeout(() => {
            container.style.flexDirection = "row";
            container.style.opacity = "1";
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
            btn.style.width = "36px";
            btn.style.height = "36px";
            btn.style.padding = "6px";
        }, 250);
    }
}

function handleToggleAnimation(containerGrid, noteTitle, state) {
    containerGrid.style.transition = `
        grid-template-columns 0.3s ease 0s,
        column-gap 0.1s ease 0.2s,
        padding 0.1s ease 0.2s`;

    noteTitle.style.transition = `
        opacity 0.3s ease 0s,
        padding 0.1s ease 0.1s`;

    if (state) {
        setTimeout(() => {
            containerGrid.style.columnGap = "0px";
            containerGrid.style.gridTemplateColumns = "1.2fr 2.8fr";
        }, 0);

        setTimeout(() => {
            noteTitle.style.padding = "128px 8px 0 0";
            noteTitle.style.opacity = "0";
            containerGrid.style.gridTemplateColumns = "0fr 1fr";
        }, 100);

        setTimeout(() => {
            noteTitle.style.display = 'none';
        }, 250);
    } else {
        noteTitle.style.display = 'flex';

        setTimeout(() => {
            noteTitle.style.padding = "48px 8px 0 0";
            containerGrid.style.columnGap = "12px";
            noteTitle.style.opacity = "1";
        }, 0);

        setTimeout(() => {
            containerGrid.style.gridTemplateColumns = "1.2fr 2.8fr";
        }, 100);

        setTimeout(() => {
            containerGrid.style.gridTemplateColumns = "0.9fr 3.1fr";
        }, 250);
    }
}

function initializeNavigationButtons(previousBtn, nextBtn, notePage, noteTitle) {
    const transitionStyle = `
    height 0.1s ease 0.1s,
    width 0.1s ease 0.1s,
    padding 0.1s ease 0.15s,
    opacity 0.1s ease 0.12s
    `;

    previousBtn.addEventListener("click", () => {
        const noteTitleHeaderName = document.querySelector("#Note_title_name");
        const noteIDHeader = parseInt(getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-id"));
        var notePrev = noteIDHeader - 1;

        previousBtn.style.transition = transitionStyle;

        if (!(notePrev <= 0)) {
            handleButtonAnimation(previousBtn);
            noteHeaderAnimation(noteTitleHeaderName, notePrev);
            notePageLoad(notePage, notePrev);
            noteTitleHeaderName.style.setProperty("--note-id", notePrev);
        } else {
            notePrev = 1;
            handleButtonAnimation(previousBtn);
        }
    });

    nextBtn.addEventListener("click", () => {
        const noteTitleHeaderName = document.querySelector("#Note_title_name");
        const count = noteManager.getAllNotes().length;
        const noteIDHeader = parseInt(getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-id"));
        var noteNext = noteIDHeader + 1;

        nextBtn.style.transition = transitionStyle;

        if (!(noteNext > count)) {
            handleButtonAnimation(nextBtn);
            noteHeaderAnimation(noteTitleHeaderName, noteNext);
            notePageLoad(notePage, noteNext);
            noteTitleHeaderName.style.setProperty("--note-id", noteNext);
        } else {
            noteNext = count;
            handleButtonAnimation(nextBtn);
        }
    });
}

function handleButtonAnimation(button) {
    setTimeout(() => {
        button.style.opacity = "0";
        button.style.cursor = "default";
        button.style.width = "36px";
        button.style.height = "36px";
        button.style.padding = "12px";
    }, 0);

    setTimeout(() => {
        button.style.opacity = "1";
        button.style.cursor = "pointer";
        button.style.width = "36px";
        button.style.height = "36px";
        button.style.padding = "6px";
    }, 250);
}
// #endregion

// #region Note Content Loader
async function initializeNoteContent(noteHeader, noteTitle, notePage) {
    const listNote = noteManager.getAllNotes();
    const noteTitleHeaderName = noteHeader.querySelector("#Note_title_name");

    // Set initial note ID
    noteTitleHeaderName.style.setProperty("--note-id", 1);

    // Initialize note titles
    getNoteContent(listNote, noteTitleHeaderName, noteTitle, notePage)
}

function getNoteContent(listNote, noteTitleHeaderName, noteTitle, notePage) {
    listNote.forEach(note => {
        const noteTitleContent = document.createElement("div");
        noteTitleContent.id = `noteId_${note.noteId}`;
        noteTitleContent.style.setProperty("--note-id", note.noteId);
        noteTitleContent.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.date}</p>
        `;

        noteTitle.appendChild(noteTitleContent);

        // Assign Event Listener
        noteTitleContent.addEventListener("click", async () => {
            const noteId = getComputedStyle(noteTitleContent).getPropertyValue("--note-id");
            const noteIDHeader = getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-id");

            if (noteId != noteIDHeader) {
                noteHeaderAnimation(noteTitleHeaderName, noteId);
                await notePageCloseAnimation(notePage);
                await notePageLoad(notePage, noteId);
                notePageOpenAnimation(notePage);

                noteTitleHeaderName.style.setProperty("--note-id", noteId);
            }
        });
    });
}

function notePageLoad(notePage, noteId) {
    //Return a promise that will resolve after the timeout AND after the content is loaded
    return new Promise(resolve => {
        notePageCloseAnimation(notePage);

        setTimeout(async () => {
            while (notePage.firstChild) {
                notePage.removeChild(notePage.firstChild);
            }

            try {
                // Await the content loading
                const noteContent = await noteManager.loadNoteContent(noteId);
                const notePageContent = document.createElement("div");
                notePageContent.id = `noteContentId_${noteId}`;
                notePageContent.innerHTML = noteContent;

                notePage.appendChild(notePageContent);
                resolve(); // Resolve the promise after content is loaded
            } catch (error) {
                console.error('Error loading note content:', error);
                reject(error); //Reject the promise if there is an error
            }
        }, 500);
    });
}

function noteHeaderAnimation(noteTitleHeaderName, noteId) {
    noteTitleHeaderName.style.transition = `
        padding 0.1s ease 0s,
        opacity 0.1s ease 0s
    `;

    if (noteId != null) {
        const note = noteManager.getNoteById(noteId);

        setTimeout(() => {
            noteTitleHeaderName.style.padding = "0 0 64px 0";
            noteTitleHeaderName.style.opacity = "0";
        }, 100);

        setTimeout(() => {
            noteTitleHeaderName.innerHTML = ` &nbsp[ ${note.title} ]&nbsp[ Note ID: ${note.noteId} ]`;
            noteTitleHeaderName.style.padding = "0";
            noteTitleHeaderName.style.opacity = "1";
        }, 500);
    } else {
        setTimeout(() => {
            noteTitleHeaderName.style.padding = "0 0 64px 0";
            noteTitleHeaderName.style.opacity = "0";
        }, 100);
    }
}

async function notePageCloseAnimation(notePage) {
    return new Promise(resolve => {
        notePage.style.setProperty('--width', '100%');
        notePage.style.setProperty('--height', '100%');

        // Wait for animation to complete
        setTimeout(resolve, 500);
    })
}

async function notePageOpenAnimation(notePage) {
    return new Promise(resolve => {
        notePage.style.setProperty('--width', '100%');
        notePage.style.setProperty('--height', '0%');

        // Wait for animation to complete
        setTimeout(resolve, 500);
    })
}
// #endregion