import { dragElement } from "./script.js";

const detailWindow = document.querySelector("#detail_window");
if (detailWindow) {  // Check if element exists
    dragElement(detailWindow);
}