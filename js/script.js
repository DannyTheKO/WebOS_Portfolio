
export function dragElement(element) {
    var initialX = 0, initialY = 0; 
    var currentX = 0, currentY = 0;

    var header_drag = document.querySelector(`#${element.id} .${element.id}_header`) // DONT FUCKING TOUCH IT
    var header_action = header_drag.querySelector(`.${element.id}_header_action`) // DONT YOU EVEN THINK ABOUT IT

    header_drag.style.cursor = "grab";
    header_drag.style.userSelect = "none";
    header_action.style.cursor = "pointer";

    // Check element if there is a header ? if not, we use the whole div
    if (header_drag) {
        // if present, the header is where you move the DIV from:
        header_drag.onmousedown = startDragging;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        element.onmousedown = startDragging;
    }

        
    // When mouse is pressed
    function startDragging(e) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        currentX = e.clientX;
        currentY = e.clientY;
        document.onmouseup = stopDragging;
        // call a function whenever the cursor moves:
        document.onmousemove = dragElement;
    }

    // When mouse is pressed, we drag element
    function dragElement(e) {
        e.preventDefault();
        
        // calculate the new cursor position:
        initialX = currentX - e.clientX;
        initialY = currentY - e.clientY;
        currentX = e.clientX;
        currentY = e.clientY;

        // set the element's new position:
        element.style.top = (element.offsetTop - initialY) + "px";
        element.style.left = (element.offsetLeft - initialX) + "px";
        header_drag.style.cursor = "grabbing";
    }

    // When mouse is unpressed
    function stopDragging() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        header_drag.style.cursor = "grab";
    }


}