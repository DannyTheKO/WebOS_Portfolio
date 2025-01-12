import { initializeIntroduction } from "./js/introduction/introduction.js";
import { initializeTopbar } from "./js/topbar/topbar.js";
import { initializeNote } from "./js/note/note.js";
import { initializeProject } from "./js/project/project.js";

// Function to set the zoom level to 90%
function setZoom() {
    document.body.style.zoom = "0.9";
}

// Event listener to call the setZoom function when the page loads
await window.addEventListener('load', setZoom);

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
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});