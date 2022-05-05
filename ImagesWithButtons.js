const defaults = {
    pos_x: 0,
    pos_y: 0,
    color: "#FFFFFF",
    alpha: 0.75
}

window.addEventListener("DOMContentLoaded", () => {
    // load button data
    var list = document.querySelectorAll(".ImagesWithButtons_button");

    list.forEach((element) => {
        var attributes = element.attributes;
        element.style.left = attributes.pos_x ? attributes.pos_x.value + "px" : defaults.pos_x + "px";
        element.style.top = attributes.pos_y ? attributes.pos_y.value + "px" : defaults.pos_y + "px";

        var hexColor = attributes.border_color ? attributes.border_color.value : "#FFFFFF";
        var { r, g, b } = hexToRgb(hexColor);
        var a = attributes.border_alpha ? parseFloat(attributes.border_alpha.value) : defaults.alpha;

        element.style.border = `0.25em solid rgba(${r}, ${g}, ${b}, ${a})`;

        if (!attributes.name) {
            alert("No Name Value in button");
            return;
        } else { // Compute Linked Description to Button
            var name = attributes.name.value;
            var description = document.querySelector(`div.ImagesWithButtons_data[name=${name}]`);

            var computedX = attributes.pos_x ? parseFloat(attributes.pos_x.value) + 45 : defaults.pos_x;
            var computedY = attributes.pos_y ? parseFloat(attributes.pos_y.value) - 10 : defaults.pos_y;

            description.style.left = computedX + "px";
            description.style.top = computedY + "px";

            // Add the arrow
            description.innerHTML += `<div class="ImagesWithButtons_arrow"><svg width="20" style="width: 20px !important; height: 53px !important; display: block;"class="pointBoxArrowRight" height="53" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="#ffffff" d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"> </path> </svg> </div>`;

            // Add the close button
            var closeButton = document.createElement("div");
            closeButton.className = "ImagesWithButtons_close";
            closeButton.innerHTML = `<svg height="16" width="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="black" stroke-width="1"><path d="M2 14L14 2M2 2l12 12"></path></g></svg>`;
            closeButton.addEventListener("click", closeDescription);
            description.appendChild(closeButton);

            // Add button functionality
            element.addEventListener("click", openDescription);
        }
    });
});

function openDescription(event) {
    var nameAttr = event.currentTarget.attributes.name;
    if (nameAttr) {
        var name = nameAttr.value;
        var description = document.querySelector(`div.ImagesWithButtons_data[name=${name}]`);
        description.style.display = "block";
    } else {
        console.error("Target has no name attribute, target printed below");
        console.error(event.target);
        return;
    }
}

function closeDescription(event) {
    event.currentTarget.parentElement.style.display = "none";
}

function hexToRgb(hex) { // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
