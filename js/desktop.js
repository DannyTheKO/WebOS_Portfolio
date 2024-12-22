function getScreenDimensions() {
    return {
        // Window inner dimensions (viewport)
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,

        // Screen dimensions (full screen)
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,

        // Available screen space (excluding taskbars/OS elements)
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight
    };
}

// Get windows position and other element inside of that
export function windowElement(element) {
    var element = document.querySelector(`#${element.id}`)

    var header = document.querySelector(`#${element.id} .${element.id}_header`) // DONT FUCKING TOUCH IT
    var header_action = header.querySelector(`.${element.id}_header_action`) // DONT YOU EVEN THINK ABOUT IT

    var btnOpen = document.querySelector(`#${element.id}_btn_open`);
    var btnClose = header_action.querySelector(`#${element.id}_btn_close`);

    // Element Styling
    // Default style: stay hidden when start up
    element.style.display = "none";

    // Header action styling
    if (header_action != null) {
        header_action.style.cursor = "pointer";
    }

    // Open and Close function
    if (btnOpen != null && btnClose != null) {
        // Open
        btnOpen.addEventListener("dblclick", () => {
            if (element.style.display === "none") {
                toggleElement(element)
            }
        })

        // Close
        btnClose.addEventListener("click", () => toggleElement(element));
    }


    return { element, header, header_action, btnOpen, btnClose };
}

// Drag windows function
export function dragElement(element, header) {
    var initialX = 0, initialY = 0;
    var currentX = 0, currentY = 0;

    const { viewportWidth, viewportHeight } = getScreenDimensions();

    var appWindows = false;


    // Check element if there is a header ? if not, we use the whole div
    if (header) {
        // Topbar styling
        header.style.cursor = "grab";
        header.style.userSelect = "none";
        appWindows = true;
        // if present, the header is where you move the DIV from:
        header.onmousedown = startDragging;
    } else {
        element.style.cursor = "pointer";
        appWindows = false;
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
        initialX = currentX - e.clientX;
        initialY = currentY - e.clientY;
        currentX = e.clientX;
        currentY = e.clientY;

        // Calculate new position
        let newTop = element.offsetTop - initialY;
        let newLeft = element.offsetLeft - initialX;

        // Ensure window stays within viewport
        const maxLeft = viewportWidth - element.offsetWidth;
        const maxTop = viewportHeight - element.offsetHeight;

        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        element.style.top = newTop + "px";
        element.style.left = newLeft + "px";

        if (appWindows) {
            header.style.cursor = "grabbing";
        } else {
            element.style.cursor = "move";
        }
    }

    // When mouse is unpressed
    function stopDragging() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        // Style base on situation
        if (appWindows) {
            header.style.cursor = "grabbing";
        }
        else {
            element.style.cursor = "pointer";
        }
    }
}

export function toggleElement(element, header_action) {
    const status = window.getComputedStyle(element);
    if (status.display === "none") {
        element.style.display = "flex";
        element.style.flexDirection = "column";
    } else {
        element.style.display = "none";
    }
}
