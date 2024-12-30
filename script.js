import { initializeIntroduction } from "./js/introduction/introduction.js";
import { initializeTopbar } from "./js/topbar/topbar.js";
import { initializeNote } from "./js/note/note.js";
import { initializeProject } from "./js/project/project.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load Topbar
        await initializeTopbar();
        
        // Load Introduction
        await initializeIntroduction();

        // Load Note
        await initializeNote();

        // Load Project
        await initializeProject();

    } catch (error) {
        console.error('Error during initialization:', error);
    }
});