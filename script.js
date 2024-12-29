import { initializeIntroduction } from "./js/introduction/introduction.js";
import { initializeTopbar } from "./js/topbar/topbar.js";
import { initializeNote } from "./js/note/note.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load Topbar
        await initializeTopbar();
        
        // Load Introduction
        await initializeIntroduction();

        // Load Note
        await initializeNote();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});