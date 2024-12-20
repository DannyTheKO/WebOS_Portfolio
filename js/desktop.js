// Get windows position and other element inside of that
export function windowElement(element) {
    var element = document.querySelector(`#${element.id}`)

    var header = document.querySelector(`#${element.id} .${element.id}_header`) // DONT FUCKING TOUCH IT
    var header_action = header.querySelector(`.${element.id}_header_action`) // DONT YOU EVEN THINK ABOUT IT

    // Header action styling
    header_action.style.cursor = "pointer";

    return { element, header, header_action };
}

export function iconElement(element) {
    var element = document.querySelector(element)

    element.style.cursor = "pointer";
}

// Drag windows function
export function dragElement(element, header) {
    var initialX = 0, initialY = 0;
    var currentX = 0, currentY = 0;
    var app = false;


    // Check element if there is a header ? if not, we use the whole div
    if (header) {
        // Topbar styling
        header.style.cursor = "grab";
        header.style.userSelect = "none";
        app = true;
        // if present, the header is where you move the DIV from:
        header.onmousedown = startDragging;
    } else {
        element.style.cursor = "pointer";
        app = false;
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

        // Style base on situation
        if(app) {
            header.style.cursor = "grabbing";
        }
        else {
            element.style.cursor = "move";
        }
    }

    // When mouse is unpressed
    function stopDragging() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        // Style base on situation
        if(app) {
            header.style.cursor = "grabbing";
        }
        else {
            element.style.cursor = "pointer";
        }    }
}

export function toggleElement(element) {
    const status = window.getComputedStyle(element);
    if (status.display === "none") {
        element.style.display = "flex";
        element.style.flexDirection = "column";
    } else {
        element.style.display = "none";
    }
}
