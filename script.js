// 1. Define the filters configuration object
const filters = {
    brightness: { value: 100, min: 0, max: 200, unitvalue: "%" },
    contrast: { value: 100, min: 0, max: 200, unitvalue: "%" },
    exposure: { value: 100, min: 0, max: 200, unitvalue: "%" },
    saturation: { value: 100, min: 0, max: 200, unitvalue: "%" },
    huerotation: { value: 0, min: 0, max: 360, unitvalue: "deg" },
    blur: { value: 0, min: 0, max: 20, unitvalue: "px" },
    grayScale: { value: 0, min: 0, max: 100, unitvalue: "%" },
    sepia: { value: 0, min: 0, max: 100, unitvalue: "%" },
    opacity: { value: 100, min: 0, max: 100, unitvalue: "%" },
    invert: { value: 0, min: 0, max: 100, unitvalue: "%" },
};

// 2. DOM Elements
const imageInput = document.getElementById("image-input");
const bottomContainer = document.querySelector("main section .bottom");
const filtersContainer = document.getElementById("filters-container");
const resetBtn = document.getElementById("reset-btn");
const downloadBtn = document.getElementById("download-btn");

let uploadedImage = null;

// 3. Dynamic Filter Element Generator function
function createFilterElement(filterName, unitvalue, value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const headerWrapper = document.createElement("div");
    headerWrapper.style.display = "flex";
    headerWrapper.style.justifyContent = "space-between";

    const p = document.createElement("p");
    p.textContent = filterName.charAt(0).toUpperCase() + filterName.slice(1).replace(/([A-Z])/g, ' $1');

    const valueSpan = document.createElement("span");
    valueSpan.id = `${filterName}-value`;
    valueSpan.textContent = `${value}${unitvalue}`;

    headerWrapper.appendChild(p);
    headerWrapper.appendChild(valueSpan);

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = filterName;
    input.name = filterName;

    input.addEventListener("input", () => {
        valueSpan.textContent = `${input.value}${unitvalue}`;
        updateImageFilters();
    });

    div.appendChild(headerWrapper);
    div.appendChild(input);

    return div;
}

// 4. Initialize Filters in the DOM
function initFilters() {
    if (!filtersContainer) return;
    filtersContainer.innerHTML = "";
    for (const [key, config] of Object.entries(filters)) {
        const filterElement = createFilterElement(
            key,
            config.unitvalue,
            config.value,
            config.min,
            config.max
        );
        filtersContainer.appendChild(filterElement);
    }
}

// 5. Handle Image Upload
imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        bottomContainer.innerHTML = `<img id="preview-image" src="${event.target.result}" alt="Uploaded Image" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
        uploadedImage = document.getElementById("preview-image");
        updateImageFilters();
    };
    reader.readAsDataURL(file);
});

// 6. Apply CSS Filters to the Image
function updateImageFilters() {
    if (!uploadedImage) return;

    const getVal = (id) => document.getElementById(id) ? parseFloat(document.getElementById(id).value) : 100;

    // Combine brightness and exposure multipliers
    const brightnessVal = getVal('brightness');
    const exposureVal = getVal('exposure');
    const totalBrightness = (brightnessVal / 100) * (exposureVal / 100) * 100;

    uploadedImage.style.filter = `
        brightness(${totalBrightness}%)
        contrast(${getVal('contrast')}%)
        saturate(${getVal('saturation')}%)
        hue-rotate(${document.getElementById('huerotation') ? document.getElementById('huerotation').value : 0}deg)
        blur(${document.getElementById('blur') ? document.getElementById('blur').value : 0}px)
        grayscale(${document.getElementById('grayScale') ? document.getElementById('grayScale').value : 0}%)
        sepia(${document.getElementById('sepia') ? document.getElementById('sepia').value : 0}%)
        opacity(${getVal('opacity')}%)
        invert(${document.getElementById('invert') ? document.getElementById('invert').value : 0}%)
    `;
}

// 7. Reset Filters Button
resetBtn.addEventListener("click", () => {
    for (const [key, config] of Object.entries(filters)) {
        const input = document.getElementById(key);
        const valSpan = document.getElementById(`${key}-value`);
        if (input && valSpan) {
            input.value = config.value;
            valSpan.textContent = `${config.value}${config.unitvalue}`;
        }
    }
    currentRotation = 0;
    isFlipped = false;
    applyTransforms();
    updateImageFilters();
});

// 8. Transform and Compare State
let currentRotation = 0;
let isFlipped = false;
let savedFilterBeforeCompare = "";

const rotateBtn = document.getElementById("rotate-btn");
const flipBtn = document.getElementById("flip-btn");
const compareBtn = document.getElementById("compare-btn");

function applyTransforms() {
    if (!uploadedImage) return;
    uploadedImage.style.transform = `rotate(${currentRotation}deg) scaleX(${isFlipped ? -1 : 1})`;
    uploadedImage.style.transition = "transform 0.25s ease";
}

if (rotateBtn) {
    rotateBtn.addEventListener("click", () => {
        if (!uploadedImage) {
            alert("Please choose an image first!");
            return;
        }
        currentRotation = (currentRotation + 90) % 360;
        applyTransforms();
    });
}

if (flipBtn) {
    flipBtn.addEventListener("click", () => {
        if (!uploadedImage) {
            alert("Please choose an image first!");
            return;
        }
        isFlipped = !isFlipped;
        applyTransforms();
    });
}

// 9. Hold to Compare Functionality
if (compareBtn) {
    const startCompare = () => {
        if (!uploadedImage) return;
        savedFilterBeforeCompare = uploadedImage.style.filter;
        uploadedImage.style.filter = "none";
        compareBtn.classList.add("active-compare");
    };

    const endCompare = () => {
        if (!uploadedImage || !savedFilterBeforeCompare) return;
        uploadedImage.style.filter = savedFilterBeforeCompare;
        compareBtn.classList.remove("active-compare");
    };

    compareBtn.addEventListener("mousedown", startCompare);
    window.addEventListener("mouseup", endCompare);
    compareBtn.addEventListener("touchstart", (e) => { e.preventDefault(); startCompare(); }, { passive: false });
    window.addEventListener("touchend", endCompare);
}

// 10. Download Edited Image with Filters & Transforms
downloadBtn.addEventListener("click", () => {
    if (!uploadedImage) {
        alert("Please choose an image first!");
        return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = uploadedImage.src;

    const renderAndDownload = () => {
        const naturalW = img.naturalWidth || 800;
        const naturalH = img.naturalHeight || 600;

        if (currentRotation === 90 || currentRotation === 270) {
            canvas.width = naturalH;
            canvas.height = naturalW;
        } else {
            canvas.width = naturalW;
            canvas.height = naturalH;
        }

        ctx.filter = window.getComputedStyle(uploadedImage).filter;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((currentRotation * Math.PI) / 180);
        ctx.scale(isFlipped ? -1 : 1, 1);
        ctx.drawImage(img, -naturalW / 2, -naturalH / 2);
        ctx.restore();

        const link = document.createElement("a");
        link.download = "pixelcraft-edited.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    if (img.complete) {
        renderAndDownload();
    } else {
        img.onload = renderAndDownload;
    }
});

// Run initialization safely when the page loads
document.addEventListener("DOMContentLoaded", () => {
    initFilters();
});
