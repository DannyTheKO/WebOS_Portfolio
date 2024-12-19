
export function dragElement(element) {
    var initialX = 0, initialY = 0; 
    var currentX = 0, currentY = 0;

    var header = document.getElementById(element.id + "_header")
    header.style.cursor = "grab";

    // Check element if there is a header ? if not, we use the whole div
    if (header) {
        // if present, the header is where you move the DIV from:
        header.onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = dragMouseDown;
    }

    // When mouse is pressed, we drag element
    function elementDrag(e) {
        e.preventDefault();
        
        // calculate the new cursor position:
        initialX = currentX - e.clientX;
        initialY = currentY - e.clientY;
        currentX = e.clientX;
        currentY = e.clientY;

        // set the element's new position:
        element.style.top = (element.offsetTop - initialY) + "px";
        element.style.left = (element.offsetLeft - initialX) + "px";
        header.style.cursor = "grabbing";
    }

    // When mouse is unpressed
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        header.style.cursor = "grab";
    }

    
    // When mouse is pressed
    function dragMouseDown(e) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        currentX = e.clientX;
        currentY = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
}