import { dragElement } from "./script.js";

const detailWindow = document.getElementById('detail_window');
if (detailWindow) {  // Check if element exists
    dragElement(detailWindow);
}