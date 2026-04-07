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
const multicolorStatusLabel = document.getElementById('multicolor-status-text');

// To calculate number of divs per row we need the screen size.
const drawingScreenWidth = getComputedStyle(drawingScreen);
const DEFAULT_SCREEN_RESOLUTION = parseFloat(drawingScreenWidth.width);

let activeScreenResolution = DEFAULT_SCREEN_RESOLUTION;

// Global VAR colours: Pixel Paint Grayscale and Colours

const penGray = '#333333';

const harvestGold = '#DAA520';
const burntOrange = '#CC5500';
const avocadoGreen = '#568203';
const earthBrown = '#5D3A1A';
const ochreYellow = '#CC7722';
const dustyTeal = '#3B7A57';

// + + + + + + + + + + + + + + HELPER FUNCTIONS + + + + + + + + + + + + + + + +

// + + + + + + + GRID SIZE CALCULATION + + + + + + + + +

function calculatePixelHeight(activeScreenResolution) {
  const pixelsPerRow = activeScreenResolution;

  return parseFloat(drawingScreenWidth / pixelsPerRow);
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

  const pixelHeight = calculatePixelHeight(screenResolution);

  drawingScreen.height = pixelHeight;

  let totalPixels = screenResolution ** 2;

  // + + + Generate pixel grid and print to web page + + +
  for (let i = totalPixels; i > 0; i--) {
    let screenPixels = document.createElement('div');
    drawingScreen.appendChild(screenPixels);
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
    // Need to prevent default IF using the SUBMIT event, if CHANGE then no.
    // event.preventDefault();

    const newScreenResolution = +event.target.value;
    // (convert to number with +, returns NaN if invalid number)
    console.log(newScreenResolution);
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

// + + + On page load, generate grid + + +
generatePixels(customScreenResolution);
