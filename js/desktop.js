function toggleElement(element) {
    const status = window.getComputedStyle(element);
    if (status.display === "none") {
        element.style.display = "flex";
        element.style.flexDirection = "column";
    } else {
        element.style.display = "none";
    }
}

function windowsRiseZIndex(element) {
    const currentZIndex = parseInt(getComputedStyle(element).getPropertyValue("--desktop-zIndex"));
    const thresholdZIndex = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--desktop-zIndex-threshold"));

    if (currentZIndex < thresholdZIndex) {
        const newZIndex = thresholdZIndex + 1;

        // Update element z-index
        element.style.zIndex = newZIndex;
        element.style.setProperty("--desktop-zIndex", newZIndex);

        // Update threshold
        document.documentElement.style.setProperty("--desktop-zIndex-threshold", newZIndex);
    }
}

// Z-index management
function initializeZIndex(element) {
    // Initial values
    element.style.setProperty("--desktop-zIndex", "1");
    document.documentElement.style.setProperty("--desktop-zIndex-threshold", "2");

    // Click handler for z-index updates
    element.addEventListener("click", () => {
        windowsRiseZIndex(element)
    });
}


export function btnOpenAndClose(element, header_action) {
    var btnOpen = document.querySelector(`#${element.id}_btn_open`);
    var btnClose = header_action.querySelector(`#${element.id}_btn_close`);

    // Open and Close function
    if (btnOpen != null && btnClose != null) {
        // Open "Select" Feature
        // When user action is single click
        btnOpen.addEventListener("click", () => {
            // Remove any Selected class from ALL previous icons
            document.querySelectorAll(".selected").forEach(icon => {
                icon.classList.remove("selected");
            });

            // Toggle 'Selected' class on current icon
            btnOpen.classList.toggle("selected");
        });

        // When user action is double click
        btnOpen.addEventListener("dblclick", () => {
            // Remove any Selected class from ALL previous icons
            document.querySelectorAll(".selected").forEach(icon => {
                icon.classList.remove("selected");
            });

            btnOpen.classList.remove("selected");
        })

        // Add click listener to document to handle clicking outside
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".app")) {
                btnOpen.classList.remove("selected");
            }
        })

        // Open Button Action
        btnOpen.addEventListener("dblclick", () => {
            if (element.style.display === "none") {
                toggleElement(element)
            }
        })

        // Close Button Action
        btnClose.addEventListener("click", () => toggleElement(element));
    }

    return btnOpen;
}

// Get windows position and other element inside of that
export function windowElement(element) {
    var element = document.querySelector(`#${element.id}`);

    var header = document.querySelector(`#${element.id} .${element.id}_header`); // DONT FUCKING TOUCH IT
    var header_action = header.querySelector(`.${element.id}_header_action`); // DONT YOU EVEN THINK ABOUT IT

    // Element style when start up
    element.style.display = "none";

    // Header action styling
    if (header_action != null) {
        header_action.style.cursor = "pointer";
    }

    initializeZIndex(element);

    return { element, header, header_action };
}

// Drag function
export function dragElement(element, header) {
    var initialX = 0, initialY = 0;
    var currentX = 0, currentY = 0;

    // Get user screen width and hieght 
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get Topbar position
    const topBarElement = document.querySelector("#Topbar_Container .Topbar")
    const topBarHeight = topBarElement.getBoundingClientRect().height;

    var appWindows = false;

    // Check element if there is a header ? if not, we use the whole div
    if (header) {
        // Topbar styling
        header.style.cursor = "grab";
        header.style.userSelect = "none";
        appWindows = true;

        // Window mode - drag from header
        header.onmousedown = (e) => {
            windowsRiseZIndex(element);
            startDragging(e);
        };
    } else {
        element.style.cursor = "pointer";
        appWindows = false;
        
        // Icon mode - drag from anywhere
        element.onmousedown = (e) => {
            windowsRiseZIndex(element);
            startDragging(e);
        };
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
        const maxTop = viewportHeight - element.offsetHeight;
        const maxLeft = viewportWidth - element.offsetWidth;
        const minTop = topBarHeight;

        newTop = Math.max(minTop, Math.min(newTop, maxTop));
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));

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
            header.style.cursor = "grab";
        } else {
            element.style.cursor = "pointer";
        }
    }
}