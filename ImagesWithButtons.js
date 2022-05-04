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
        element.style.left = attributes.pos_x ? attributes.pos_x.value : defaults.pos_x;
        element.style.top = attributes.pos_y ? attributes.pos_y.value : defaults.pos_y;

        var hexColor = attributes.border_color ? attributes.border_color.value : "#FFFFFF";
        var { r, g, b } = hexToRgb(hexColor);
        var a = attributes.border_alpha ? parseFloat(attributes.border_alpha.value) : defaults.alpha;

        element.style.border = `0.25em solid rgba(${r}, ${g}, ${b}, ${a})`;

        if (!attributes.name) {
            alert("No Name Value in button");
            return;
        } else {
            var name = attributes.name.value;
            var link = document.querySelector(`div.ImagesWithButtons[name=${name}]`);

            
        }
    });
});

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
