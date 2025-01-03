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
    await initializeSidebarButtons(noteMain, containerGrid, noteTitle, notePage, noteHeader);
    await initializeNoteContent(noteHeader, noteTitle, notePage);

    // Testing Function
    await testingNote(element, noteHeader, notePage)
}
//#endregion

async function testingNote(element, noteHeader, notePage) {
    // Testing Purpose
    element.style.display = "flex"
    element.style.flexDirection = "column"
    element.style.opacity = "1"

    const noteTitleHeaderName = noteHeader.querySelector("#Note_title_name");
    const noteIDHeader = parseInt(getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-header-id"));
    await notePageLoadOrder(noteHeader, notePage, noteIDHeader);
}

// #region Startup Behaviour
async function initializeStartUp(noteHeader, notePage, btnOpen, btnClose) {
    const noteTitleHeaderName = noteHeader.querySelector("#Note_title_name");

    btnOpen.addEventListener("dblclick", async () => {
        const noteId = parseInt(getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-header-id"));

        noteHeaderAnimation(noteTitleHeaderName, noteId);
        await notePageLoadOrder(noteHeader, notePage, noteId);
    });

    btnClose.addEventListener("click", async () => {
        notePageCloseAnimation(notePage);
        noteHeaderAnimation(noteTitleHeaderName, null);
    });
}
// #endregion

// #region Side Bar
async function initializeSidebarButtons(noteMain, containerGrid, noteTitle, notePage, noteHeader) {
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
    initializeNavigationButtons(previousBtn, nextBtn, notePage, noteHeader);
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

function initializeNavigationButtons(previousBtn, nextBtn, notePage, noteHeader) {
    const transitionStyle = `
    height 0.1s ease 0.1s,
    width 0.1s ease 0.1s,
    padding 0.1s ease 0.15s,
    opacity 0.1s ease 0.12s
    `;

    previousBtn.addEventListener("click", async () => {
        const noteTitleHeaderName = document.querySelector("#Note_title_name");
        const noteIDHeader = parseInt(getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-header-id"));
        var notePrev = noteIDHeader - 1;

        previousBtn.style.transition = transitionStyle;

        if (!(notePrev <= 0)) {
            handleButtonAnimation(previousBtn);
            await notePageLoadOrder(noteHeader, notePage, notePrev);
            noteTitleHeaderName.style.setProperty("--note-header-id", notePrev);
            
            // After loading the new note content, select the corresponding title
            const noteTitle = document.querySelector('.noteTitle'); // Get the noteTitle container
            const noteTitleContent = noteTitle.querySelector(`[style*="--note-id: ${notePrev}"]`); // Select by notePrev
            selectedNoteTitle(noteHeader, noteTitle, noteTitleContent, notePrev);
        } else {
            notePrev = 1;
            handleButtonAnimation(previousBtn);
        }
    });

    nextBtn.addEventListener("click", async () => {
        const noteTitleHeaderName = document.querySelector("#Note_title_name");
        const count = noteManager.getAllNotes().length;
        const noteIDHeader = parseInt(getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-header-id"));
        var noteNext = noteIDHeader + 1;

        nextBtn.style.transition = transitionStyle;

        if (!(noteNext > count)) {
            handleButtonAnimation(nextBtn);
            await notePageLoadOrder(noteHeader, notePage, noteNext);
            noteTitleHeaderName.style.setProperty("--note-header-id", noteNext);

            // After loading the new note content, select the corresponding title 
            const noteTitle = document.querySelector('.noteTitle'); // Get the noteTitle container
            const noteTitleContent = noteTitle.querySelector(`[style*="--note-id: ${noteNext}"]`); // Select by noteNext
            selectedNoteTitle(noteHeader, noteTitle, noteTitleContent, noteNext);
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
    // Set initial note ID
    const noteTitleHeaderName = noteHeader.querySelector("#Note_title_name");
    noteTitleHeaderName.style.setProperty("--note-header-id", 1);

    // Initialize note titles
    await getNoteContent(noteHeader, notePage, noteTitle);
}

async function getNoteContent(noteHeader, notePage, noteTitle) {
    const noteTitleHeaderName = noteHeader.querySelector("#Note_title_name");
    const listNote = noteManager.getAllNotes();
    listNote.forEach(note => {
        const noteTitleContent = document.createElement("div");
        noteTitleContent.id = `noteId_${note.noteId}`;
        noteTitleContent.style.setProperty("--note-id", note.noteId);
        noteTitleContent.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.date}</p>
        `;

        noteTitle.appendChild(noteTitleContent);
        selectedNoteTitle(noteHeader, noteTitle, noteTitleContent, note.noteId)

        // Assign Event Listener
        noteTitleContent.addEventListener("click", async () => {
            const noteTitleContentID = getComputedStyle(noteTitleContent).getPropertyValue("--note-id");
            const noteHeaderID = getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-header-id");

            if (noteTitleContentID != noteHeaderID) {
                await notePageLoadOrder(noteHeader, notePage, noteTitleContentID);
                noteTitleHeaderName.style.setProperty("--note-header-id", noteTitleContentID);
                selectedNoteTitle(noteHeader, noteTitle, noteTitleContent, noteTitleContentID)
            }
        });
    });
}

async function notePageLoadOrder(noteHeader, notePage, noteId) {

    await notePageCloseAnimation(notePage)
    noteHeaderAnimation(noteHeader, noteId)
    await notePageLoad(notePage, noteId)

    setTimeout(async () => {
        notePageOpenAnimation(notePage)
    }, 500);
}

// TODO: do this please, how do we find noteTitleContent for the Btn ?
function selectedNoteTitle(noteHeader, noteTitle, noteTitleContent, noteId) {
    const noteTitleHeaderName = noteHeader.querySelector("#Note_title_name");
    const noteHeaderID = parseInt(getComputedStyle(noteTitleHeaderName).getPropertyValue("--note-header-id"));
    // Remove all selected class
    const otherSelected = noteTitle.querySelectorAll(".noteTitleSelected")
    otherSelected.forEach(other => {
        var ID = other.style.getPropertyValue("--note-id")
        // Prevent remove class on start up
        if (ID != noteHeaderID) {
            other.classList.remove("noteTitleSelected")
        }
    })

    // if noteId === noteHeaderID, we asign class selected
    if (noteId == noteHeaderID) {
        noteTitleContent.classList.add("noteTitleSelected")
    }
}

async function notePageLoad(notePage, noteId) {
    return new Promise(async resolve => {
        while (notePage.firstChild) {
            notePage.removeChild(notePage.firstChild);
        }

        // Await the content loading
        const noteContent = await noteManager.loadNoteContent(noteId);
        const notePageContent = document.createElement("div");
        notePageContent.id = `noteContentId_${noteId}`;
        notePageContent.innerHTML = noteContent;

        // Find images within the loaded content
        const images = notePageContent.querySelectorAll('img');

        // Wait for all images to load
        await Promise.all(Array.from(images).map(img => {
            return new Promise(resolve => {
                if (img.complete) {
                    resolve(); // Image is cached, resolve immediately
                } else {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true }); // Resolve on error as well
                }
            });
        }));

        console.log(`All images in noteID: ${noteId} have finished loading!`);

        notePage.appendChild(notePageContent);
        resolve(); // Resolve the promise after content is loaded   
    }, 500);
}

async function noteHeaderAnimation(noteHeader, noteId) {
    const noteTitleHeaderName = noteHeader.querySelector("#Note_title_name")
    noteTitleHeaderName.style.transition = `
        padding 0.1s ease 0s,
        opacity 0.1s ease 0s
    `;

    if (noteId != null) {
        const note = noteManager.getNoteById(noteId);

        noteTitleHeaderName.style.padding = "0 0 64px 0";
        noteTitleHeaderName.style.opacity = "0";

        setTimeout(() => {
            noteTitleHeaderName.innerHTML = ` &nbsp[ ${note.title} ]&nbsp[ Note ID: ${note.noteId} ]`;
            noteTitleHeaderName.style.padding = "0";
            noteTitleHeaderName.style.opacity = "1";
        }, 250);

    } else {
        noteTitleHeaderName.style.padding = "0 0 64px 0";
        noteTitleHeaderName.style.opacity = "0";
    }
}

function notePageCloseAnimation(notePage) {
    return new Promise(resolve => {
        // Trigger reflow for animation
        notePage.getBoundingClientRect();

        // Delay before resolving the promise
        notePage.style.setProperty('--width', '100%');
        notePage.style.setProperty('--height', '100%');

        setTimeout(() => {
            resolve();
        }, 500);
    });
}

function notePageOpenAnimation(notePage) {
    return new Promise(resolve => {
        // Trigger reflow for animation
        notePage.getBoundingClientRect();

        // Delay before resolving the promise
        notePage.style.setProperty('--width', '100%');
        notePage.style.setProperty('--height', '0%');

        setTimeout(() => {
            resolve();
        }, 500);
    });
}

// #endregion