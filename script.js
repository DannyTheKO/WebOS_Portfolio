import { initializeIntroduction } from "./js/introduction/introduction.js";
import { initializeTopbar } from "./js/topbar/topbar.js";
import { initializeNote } from "./js/note/note.js";
import { initializeProject } from "./js/project/project.js";
import { initializeContact } from "./js/contact/contact.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load Top bar
        await initializeTopbar();
        
        // Load Introduction
        await initializeIntroduction();

        // Load Note
        await initializeNote();

        // Load Project
        await initializeProject();

        // Load Linktree
        await initializeContact();

    } catch (error) {
        console.error('Error during initialization:', error);
    }
});