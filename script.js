// + + + + + + + + + + + + + + GLOBAL VARIABLES + + + + + + + + + + + + + + + +
// (I know it's bad practice, but it's just a small project)

let isMulticolor = false;

const drawingScreen = document.getElementsByClassName('drawing-screen')[0];
const customScreenResolution = document.getElementsByClassName(
  'custom-screen-resolution'
)[0];

const btnSetResolution = document.getElementById('set-resolution-container');
const btnMulticolorToggle = document.getElementsByClassName(
  'btn-multicolor-toggle'
)[0];
const btnShakeToy = document.getElementsByClassName('btn-shake-toy')[0];
let multicolorStatusLabel = document.getElementsByClassName(
  'multicolor-status-text'
)[0];

// To calculate number of divs per row we need the screen size.
const screenStyles = getComputedStyle(drawingScreen);
const drawingScreenWidth = parseFloat(screenStyles.width);

const DEFAULT_SCREEN_RESOLUTION = 16; // assignment constraint
let activeScreenResolution = DEFAULT_SCREEN_RESOLUTION;

// Global variable colours: Pixel Paint Grayscale and Colours

const penGray = '51, 51, 51';

const harvestGold = '218, 165, 32';
const burntOrange = '204, 85, 0';
const avocadoGreen = '86, 130, 3';
const earthBrown = '93, 58, 26';
const ochreYellow = '204, 119, 34';
const dustyTeal = '59, 122, 87';

// + + + + + + + + + + + + + + HELPER FUNCTIONS + + + + + + + + + + + + + + + +

// + + + + + + + GRID SIZE CALCULATION + + + + + + + + +

function calculatePixelHeight(activeScreenResolution) {
  return 100 / activeScreenResolution;
}

// + + + + + + + GET COLOURS + + + + + + + + +

function getColors() {
  const number = Math.floor(Math.random() * 6) + 1;

  if (number === 1) {
    return harvestGold;
  } else if (number === 2) {
    return burntOrange;
  } else if (number === 3) {
    return avocadoGreen;
  } else if (number === 4) {
    return earthBrown;
  } else if (number === 5) {
    return ochreYellow;
  } else {
    return dustyTeal;
  }
}

// + + + + + + + + + + + + + + PIXEL GRID GENERATION LOGIC + + + + + + + + + + + + + + + +

// + + + + + + + GENERATE PIXEL DIVS + + + + + + + + +

function generatePixels(newScreenResolution = DEFAULT_SCREEN_RESOLUTION) {
  const screenResolution = newScreenResolution;

  // changed to percentage to get around browser rounding for pixel height fractions
  const pixelHeight = calculatePixelHeight(screenResolution);

  drawingScreen.width = pixelHeight;

  let totalPixels = screenResolution ** 2;

  // + + + Generate pixel grid and print to web page + + +
  for (let i = 0; i < totalPixels; i++) {
    let screenPixel = document.createElement('div');
    screenPixel.classList.add('screen-pixels');

    // + + + Constrain pixel grid to equal distribution in rows and columns + + +
    screenPixel.style.flex = `0 0 ${pixelHeight}%`;
    screenPixel.style.height = `${pixelHeight}%`;

    drawingScreen.appendChild(screenPixel);
  }

  return;
}

// + + + + + + + CLEAR PIXEL DIVS + + + + + + + + +

function removePixels() {
  while (drawingScreen.firstChild) {
    drawingScreen.removeChild(drawingScreen.firstChild);
  }
}

// + + + + + + + + + + + + + + EVENT LISTENERS + + + + + + + + + + + + + + + +

// + + + + + + + CUSTOM SCREEN GENERATION + + + + + + + + +

customScreenResolution.addEventListener(
  'change',
  function handleCustomScreenResolution(event) {
    const newScreenResolution = +event.target.value;
    // (convert to number with +, returns NaN if invalid number)

    if (newScreenResolution === isNaN(newScreenResolution)) {
      return alert(
        `There was an error generating your grid. Received new screen resolution of: ${newScreenResolution}`
      );
    } else if (newScreenResolution < 4 || newScreenResolution > 100) {
      return alert(
        `The screen resolution must be between 4 and 100. Received: ${newScreenResolution}`
      );
    }

    activeScreenResolution = newScreenResolution;

    removePixels();
    generatePixels(newScreenResolution);
  }
);

// + + + + + + + TOGGLE MULTICOLOR ON/OFF + + + + + + + + +

btnMulticolorToggle.addEventListener(
  'click',
  function handleToggleMulticolor(event) {
    if (isMulticolor === false) {
      isMulticolor = true;
      multicolorStatusLabel.textContent = 'Grayscale';
    } else {
      isMulticolor = false;
      multicolorStatusLabel.textContent = 'Multicolor';
    }
  }
);

// + + + + + + + ERASE SCREEN AND MAINTAIN ACTIVE PIXELS + + + + + + + + +

btnShakeToy.addEventListener('click', function handleShakeToy(event) {
  removePixels();
  generatePixels(activeScreenResolution);
});

// + + + + + + + PAINT PIXELS + + + + + + + + +

drawingScreen.addEventListener('mouseover', function handlePaintPixels(event) {
  if (!event.target.classList.contains('screen-pixels')) return;

  const pixel = event.target;

  let currentAlpha = parseFloat(pixel.dataset.alpha) || 0; //in case it's empty
  let newAlpha = Math.min(currentAlpha + 0.1, 1);
  pixel.dataset.alpha = newAlpha;

  console.log(
    'alpha: ',
    newAlpha,
    'current target alpha: ',
    pixel.dataset.currentAlpha
  );

  // + + + Change backgroundColor to random color or grayscale, apply opacity + + +
  if (isMulticolor) {
    if (!pixel.dataset.color) {
      pixel.dataset.color = getColors();
    }
    pixel.style.backgroundColor = `rgba(
      ${pixel.dataset.color},
      ${newAlpha}
    )`;
  } else {
    pixel.style.backgroundColor = `rgba(${penGray}, ${newAlpha})`;
  }
});

// + + + + + + + ON PAGE LOAD, GENERATE GRID + + + + + + + + +
generatePixels();
