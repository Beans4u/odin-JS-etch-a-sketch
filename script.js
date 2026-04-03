// + + + + + + + + + + + + + + GLOBAL VARIABLES + + + + + + + + + + + + + + + +
// (I know it's bad practice, but it's just a small project)

let isMulticolor = false;

const drawingScreen = document.getElementsByClassName('drawing-screen')[0];
const customScreenResolution = document.getElementsByClassName(
  'custom-screen-resolution'
);
const btnSetResolution = document.getElementById('set-resolution-container');
const btnMulticolorToggle = document.getElementsByClassName(
  'btn-multicolor-toggle'
);
const btnShakeToy = document.getElementsByClassName('btn-shake-toy');
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
