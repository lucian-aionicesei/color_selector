"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("Ready");
    showColor();
    document.querySelector("#color_selector").addEventListener('input', showColor);
}

function getColor() {
    let colorInput = document.querySelector("#color_selector");
    // console.log(colorInput.value);
    return colorInput.value;
}

function showColor() {

    let hexString = getColor();
    let rgbValue = hexToRGB(hexString);
    let hexValue = rgbToHEX(rgbValue);
    let hslValue = rgbToHSL(rgbValue);
    displayColor(hexValue);
    showHexColor(hexValue);
    showRBGColor(rgbValue);
    showHSLColor(hslValue);
  
}

function displayColor(hexValue) {
    document.querySelector(".color_display").style.backgroundColor = hexValue;
}

function showHexColor(hexValue) {
    document.querySelector(".hex_code").innerHTML = hexValue;
}

function showRBGColor(rgbValue) {
    document.querySelector(".rgb_code").innerHTML = `${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}`;
}

function showHSLColor(hslColor) {

    let h = (hslColor.h.toFixed()).toString();
    let s = (hslColor.s.toFixed()).toString();
    let l = (hslColor.l.toFixed()).toString();

    document.querySelector(".hsl_code").innerHTML = `${h}. ${s}%, ${l}%`;
}

function hexToRGB(hexString) {
    hexString.replaceAll(" ", "");

    // console.log(hexString);
    let r = parseInt(hexString.substring(1, 3), 16);
    let g = parseInt(hexString.substring(3, 5), 16);
    let b = parseInt(hexString.substring(5), 16);

    return {
        r,
        g,
        b
    };
}

function rgbToCssColor(rgbObject) {
    let r = rgbObject.r;
    let g = rgbObject.g;
    let b = rgbObject.b;

    return `rgb(${r}, ${g}, ${b})`
}

function rgbToHEX(rgbObject) {

    let redHexValue = rgbObject.r.toString(16);
    if (redHexValue.length == 1) {
        redHexValue = "0" + redHexValue;
    }
    let greenHexValue = rgbObject.g.toString(16);
    if (greenHexValue.length == 1) {
        greenHexValue = "0" + greenHexValue;
    }
    let blueHexValue = rgbObject.b.toString(16);
    if (blueHexValue.length == 1) {
        blueHexValue = "0" + blueHexValue;
    }

    let hexString = '#' + redHexValue + greenHexValue + blueHexValue;
    
    return hexString;

}

function rgbToHSL(rgbValue) {

    let r = rgbValue.r;
    let g = rgbValue.g;
    let b = rgbValue.b;

    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else
    if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else
    if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else
    if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / (Math.min(l, 1 - l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    return {
        h,
        s,
        l
    }
}