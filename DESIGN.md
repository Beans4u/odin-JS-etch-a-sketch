# DESIGN / PSEUDOCODE

## TODO

[] determine value that constrains row to 16 DIVs for DEFAULT_SCREEN_RESOLUTION
Width and padding-bottom are 25% according to [iamsteve](https://iamsteve.me/blog/how-to-flexible-squares-with-css).
[] remove all backticks

## Project Objectives, Constraints

**App behaviour and parameters**

- Etch-a-Sketch must be a 16 × 16 grid of square divs (screen pixels) within a container div (Etch-a-Sketch "pad").
- All pixel divs (grid squares) must be generated via JavaScript (no HTML placeholders - this reminds me of the Mario exercise in the Harvard CS50 video I saw).
- Use Flexbox to display the pixel grid layout (vs CSS Grid).
- Button changes grid number based on user input to a max grid size 100.
- Custom user grid removes the existing grid and generates a new grid with user's custom number.
- Grid must remain within a fixed total size regardless of square count.
- Ensure square sizing remains consistent (e.g. borders/margins may interfere).
- Implement a hover interaction that changes square opacity
- _Optional:_ Implement a hover interaction that changes square to a random colour.
- _Optional:_ Add progressive darkening per interaction, fully dark after 10 interactions.

## Design

An Etch-a-Sketch is a mechanical drawing toy that has a red plastic frame, a light gray screen, and two knobs for drawing. Turning the knobs moves a stylus that moves behind the screen, making the screen turn a darker grey wherever it goes. The screen is reset by shaking the device.

**Header (h1)**  
Imitate the Etch-a-Sketch logo above the toy screen.

**Container:**  
Make the pixel grid container div have a huge "Etch-a-Sketch red" border with rounded corners, or maybe we need to get into a nested div situation.

**Screen:**  
The screen on the toy is a dull gray colour.
Pixel grid borders: N/A - I don't see them on the Etch-a-Sketch toy.

**Tracker (the "pen")**

**Knobs (Buttons)**  
Will be used as buttons instead of for drawing.

## - - - - - - - - - - - HTML - - - - - - - - - - -

```JS
DIV container `"toy-surface"`
 // CSS: rounded corners, classic red

    ELEMENT H1 header `"etch-a-sketch logo"`
        // HTML: H1 TEXT contains "Etch-a-Sketch"
        // CSS: Import look-alike font for top of file.

    DIV container `"drawing-screen"`
     // CSS: (constraint) must not change size when number of DIV "screen-pixels" changes.

        DIVs `"screen-pixels"`
          // JS:
               // creates a resizable grid of DIVs that can toggle between greyscale and multicolour
          // CSS:
               // - Uses Flex-basis and div height to control number of divs per row
               // - Constrict the divs to their size. caution: margins and borders.

       END of DIVs `"screen-pixels"`

  END of DIV container `"drawing-screen"`

  DIV `"custom-resolution-buttons"`

    FORM
        BUTTON `"btn-set-resolution"`
        INPUT LABEL `"custom-screen-resolution"`
            DEFAULT LABEL TEXT "enter a custom screen resolution"

        BUTTON `"btn-multicolor-toggle"`
    END OF FORM

    PARAGRAPH `"multicolor-status-label"`
        "toggle multicolor"
    END of PARAGRAPH

  END of DIV `"custom-resolution-buttons"`

END of DIV container `"toy-surface"`

DIV `"shake-toy-container"`

    BUTTON `"btn-shake-toy"` // reset the image, keep current pixel grid.
    PARAGRAPH `"shake-toy-text"`
        "shake! (erase your image)"
    END of PARAGRAPH

END of DIV `"shake-toy-container"`
```

## - - - - - - - CSS: CLASSES - - - - - - -

**- - - Root: Global VAR Colours - - -**  
VAR colour `"logo-gold"`  
(Etch-a-Sketch branded name on top of device)

VAR colour `"classic-red"` #B11016  
(container colour in that classic 70s red)

VAR colour `"screen-grey"` #BABABA  
(drawing screen)

VAR colour `"knob-white"` #F5F5F5  
(the "dials" that move the pen on the toy will be buttons for user)

**- - - Structure: - - -**
DIV `"etch-a-sketch"`  
(container and possibly child items to inherit common styles or effects)

DIV `"toy-surface"`  
(container and "frame" of Etch-a-Skech which will house BUTTONS and INPUT)

DIV `"drawing-screen"`  
(where the user will "draw", and where `screenPixels` live, possibly child items to inherit common styles or effects)

**- - - Logo element - - -**

DIV `"logo"`  
(contains logo for positioning)

BUTTON

LABEL

**- - - Modifier/Event/State Classes - - -**

DIV `"drawing-screen"`
(to be modified via JS with flex-basis to control number of DIVs per row in `screenPixels`)

DIV `"screen-pixels"`  
(contains default colour, can be used in initial pixel grid generation and to reset grid)
(to be used with `screenPixels` in FUNCTION `calculatePixelHeight`)

BUTTON `"btn-set-resolution"`

LABEL `"custom-screen-resolution"`

BUTTON `"btn-multicolor-toggle"`

BUTTON`"btn-shake-toy"`  
(reset the image)

BOOL `isMulticolor` = FALSE

## - - - - - - - - - - - JS: GLOBAL VARIABLES - - - - - - - - - - -

const `drawingScreen` = DOC GET ELEMENT DIV `"drawing-screen"`  
const `customScreenResolution` = DOC GET ELEMENT INPUT `"custom-screen-resolution"`  
const `btnSetResolution` = DOC GET ELEMENT BUTTON `"btn-set-resolution"`  
const `btnMulticolorToggle` = DOC GET ELEMENT BUTTON `"btn-multicolor-toggle"`  
const `btnShakeToy` = DOC GET ELEMENT BUTTON `"btn-shake-toy"`  
const `multicolorStatusLabel` = DOC GET ELEMENT PARAGRAPH `"multicolor-status-label"`

**For number of DIVs per row**  
const `DEFAULT_SCREEN_RESOLUTION` = TBD **TODO:** determine value that constrains row to 16 DIVs.

let `activeScreenResolution` = `DEFAULT_SCREEN_RESOLUTION`

**- - - Global VAR colours: Pixel Paint Grayscale and Colours - - -**

const `penGray` #333333

const `harvestGold` #DAA520  
const `burntOrange` #CC5500  
const `avocadoGreen` #568203  
const `earthBrown` #5D3A1A  
const `ochreYellow` #CC7722  
const `dustyTeal` #3B7A57

## - - - - - - - - - - - PSEUDOCODE: LOGIC - - - - - - - - - - -

### CONSTRAIN PIXEL GRID SIZE FOR SCREEN RESOLUTION (to equal height and width)

How: Calculate height % of generated divs (screen pixels) for drawing screen. The height property is needed for the CSS class in order for Flexbox to correctly distribute the pixel DIVs in the grid.

**Purpose:**

1. Determine the size of the DIV height according to the value in `screenResolution`.
2. RETURN value as INT

In order to print the same number of `screenResolution` DIVs across as `screenResolution` DIVs down (e.g. 16 x 16). Grid x must equal grid y. Maybe a modifier class? Can I modify a single CSS class directly with a calculation, or do I need to create a new one?

```JS
FUNCTION calculatePixelHeight(PARAMETER screenResolution) {

    const calcPixelHeight = screenResolution;

    RETURN result as FLOAT: toFLOAT([[container length]] / screenResolution )

} END OF FUNCTION
```

### GENERATE PIXEL DIVS FOR SCREEN

**Purpose:**

1. create a LOOP and generate DIVs.
2. Give DIVs a class name
3. Append DIVs to document

```JS
FUNCTION generatePixels(PARAMETER newScreenResolution = DEFAULT_SCREEN_RESOLUTION) {

    const screenResolution = newScreenResolution

    const pixelHeight = FUNCTION CALL calculatePixelHeight(PARAMETER screenResolution)

    give drawingScreen a style length of pixelHeight

    // + + + Generate pixel grid and print to web page + + +
    LOOP i times, where i is screenResolution value squared
        let screenPixels = DOC CREATE ELEMENT CHILD DIV
        append screenPixels to drawingScreen
    END of LOOP

    RETURN

} END OF FUNCTION
```

### REMOVE PIXEL DIVS FROM SCREEN

**Purpose:** Removes DIV children from screenPixels when the user creates a custom screen resolution, handled by the `handleCustomScreenResolution` EVENT

```JS
FUNCTION removePixels() {

    LOOP
        screenPixels.removeChild(screenPixels)
    END LOOP
} END OF FUNCTION
```

#### - - - CSS - CLASS FOR THE PIXEL GRID WITH ESSENTIAL PROPERTIES - - -

```CSS
/** Top of file: Avoid issues with margins throughout web app **/
* {
    box-sizing: border-box;
}

 /**  NOTE: height and border are not inherited by child divs **/
.drawing-screen {
    background: col is VAR "screen-grey"
}

/** NOTE: for sizing and borders. colour is inherited from parent class **/

.screen-pixels {
    will be inserted via JS
    no borders
}
```

### PSEUDOCODE: MULTICOLOUR LOGIC

**Purpose:** Randomly chooses from limited range of colours, then returns colour code to be used by `generatePixels`.

```JS
FUNCTION getColors(){

        const number = Math.floor(Math.random() * 6) + 1;

        if (number === 1) {
            RETURN `harvestGold`;
        } else if (number === 2) {
            RETURN `burntOrange`;
        } else if (number === 3) {
            RETURN `avocadoGreen`;
        } else if (number === 4) {
            RETURN `earthBrown`;
        } else if (number === 5) {
            RETURN `ochreYellow`;
        } else {
            RETURN `dustyTeal`;
        }
} END of FUNCTION
```

## - - - - - - - - - - - PSEUDOCODE: EVENTS - - - - - - - - - - -

### CUSTOM SCREEN RESOLUTION

Resize DIVs for `drawingScreen` pixel grid from INPUT

**Purpose:**

1. Receive user input from LABEL `custom-screen-resolution`
2. Check for errors and convert to INT
3. Delete current DIV grid
4. Call `generated-pixels` and pass in INT to repaint `drawing-screen`

```JS
EVENT LISTENER for INPUT customScreenResolution(SUBMIT/CHANGE FUNCTION `handleCustomScreenResolution`(PARAMETER `event`))

    // Need to prevent default IF using the SUBMIT event, if CHANGE then no.
    // event.preventDefault();

    const newScreenResolution = +event.target.value
    // (convert to number with +, returns NaN if invalid number)

    IF newScreenResolution is isNaN //(syntax: isNaN(newScreenResolution))
        RETURN error message containing value of newScreenResolution

    ELSE IF newScreenResolution is less than 4 or more than 100
        RETURN error message stating the screen resolution must be between 4 and 100, display value received

    END of IF STATEMENT

    let activeScreenResolution = newScreenResolution
    // (this is a global variable that will remember the user's screen resolution for shaking the toy)

    FUNCTION CALL `removePixels`()
    FUNCTION CALL `generatePixels`(PARAMETER `newScreenResolution`)

END OF FUNCTION AND EVENT LISTENER
```

### TOGGLE MULTICOLOR

**Purpose:**

1. on click, makes the pixels paint in colour instead of greyscale
2. event changes `isMulticolor` bool to TRUE

The event listener for painting the pixels will check the bool and paint greyscale/multicolor on `isMulticolor` state of false/true respectively.

`isMulticolor`  
(if FALSE, paints greyscale, if TRUE, paints multicolour)

`btnMulticolorToggle`
(DOM node)

`"multicolor-status-label"`
(DOM node - paragraph, change text on toggle)

```JS
EVENT LISTENER for DIV `btnMulticolorToggle`(CLICK, FUNCTION `handleToggleMulticolor`(PARAMETER `event`))

    IF (`isMulticolor` is FALSE)
        change `isMulticolor` to TRUE
        `btnMulticolorToggle` change button or div text to "Toggle Greyscale"

    ELSE
        change `isMulticolor` to FALSE
        `btnMulticolorToggle` change button or div text to "Toggle Multicolor"
    END OF IF STATEMENT

END of FUNCTION and EVENT LISTENER
```

### PAINT PIXELS

**Purpose:**

1. cause `screenPixel` child DIVs to become 10% more opaque on mouse in event
2. apply multicolour or greyscale background colour to DIV on mouse in

`pixelOpacity`
(will be used as variable in RGBA for the A value)
(default value will increase on each mouse in event)

`isMulticolor`
(if FALSE, paints greyscale, if TRUE, paints multicolour)

**Callbacks**
`getColors()`

```JS
EVENT LISTENER for DIV drawingScreen(MOUSE IN, FUNCTION handlePaintPixels(PARAMETER event))

    const pixel = event.target('.screen-pixels')

    let pixelOpacity = event.target.dataset.alpha and convert TO FLOAT || 0 //in case it's empty
    alpha = Math.min(pixelOpacity + 0.1, 1)
    event.dataset.alpha = pixelOpacity

   // Change background colour to random color/grayscale and apply opacity property
    IF isMulticolor is TRUE
        newPixelColor = getColors()
        event.target.style.backgroundColor = rgba ${newPixelColor}, ${pixelOpacity}

    ELSE
        event.target.style.backgroundColor = rgba ${penGray}, ${pixelOpacity}

END of FUNCTION and EVENT LISTENER
```

### SHAKE TOY (ERASE USER'S DRAWING)

**Purpose:** This will remove all painted pixels from the screen as if the user "shook" the Etch-a-Sketch.

```JS
EVENT LISTENER for BUTTON "btn-shake-toy" (CLICK, FUNCTION handleShakeToy(event))
    FUNCTION CALL removePixels()
    FUNCTION CALL generatePixels(PARAMETER activeScreenResolution)
END of EVENT LISTENER
```

.
.
.
.
.
.
.
.

## AT A GLANCE: High level view of pseudocode, cleaned up and simplified.

### Behaviour

**Default Pixel Grid: Size and Colour**

1. on page load, the 16 x 16 pixel grid is generated (`generatePixels`(`DEFAULT_SCREEN_RESOLUTION`)).
2. user moves mouse over pixels (`screenPixels`).
3. the pixels turn grey (`penGray`), and become darker each time they are hovered over (`pixelOpacity` increments per hover).

**Customized Pixel Grid: Size**

1. the user submits a custom grid number (`customScreenResolution` input).
2. the pixel grid clears (`removePixels()`).
3. the pixel grid is generated with the user's custom grid number (`generatePixels(newScreenResolution)`).

**Customized Pixel Grid: Colour**

1. the user selects the multicolour toggle (`btnMulticolorToggle`).
2. the toggle updates to switch back to greyscale on click and the text updates to reflect new colour mode `"multicolor-status-label"`
3. the user hovers over pixels (`screenPixels`).
4. the pixels change to random colours (`getColors()`: `"color-1"` … `"color-6"`), and continue to darken each time they are hovered over (`pixelOpacity` increments).
5. the user clicks the greyscale toggle, ending colour mode and resetting toggle & mode text in DOM.

**Shake Toy / Reset Image**

1. the user clicks `"btn-shake-toy"`.
2. the pixel grid regenerates using the stored grid size (`activeScreenResolution`).
3. the pixel grid is returned to a blank slate for the user to draw on.

### FUNCTIONS

**Note on DIV CSS height property:**  
The CSS class applied to each DIV constrains the number of DIVs per line to the same value (using a Flexbox trick), so we get a screenResolution x screenResolution grid, e.g. 16x16.

#### ---Calculate pixel height for grid layout---

**FUNCTION** `calculatePixelHeight`(`screenResolution`)  
**Uses:**  
`screenResolution`  
**Creates / Returns:**  
`pixelHeight` (used to set the height of `"drawingScreen"` and constrain `screenPixels`)
**Does**  
Uses Flexbox to make `screenPixels` conform to a square grid

#### ---Generate pixel DIVs as a grid in DIV `drawingScreen`---

**FUNCTION** `generatePixels`(`newScreenResolution` = `DEFAULT_SCREEN_RESOLUTION`)  
**Uses:**  
`newScreenResolution`  
`DEFAULT_SCREEN_RESOLUTION`  
`drawingScreen`  
`calculatePixelHeight()`  
**Creates:**  
`screenResolution`  
`pixelHeight`  
`screenPixels` (individual DIVs in loop)  
**Does:**  
Loops `screenResolution²`  
Creates and appends pixel DIVs (`"screen-pixels"`)  
**Return / Output:**  
DIV grid rendered in DOM

#### ---Delete generated pixel DIVs---

**FUNCTION** `removePixels()`  
**Uses:**  
`screenPixels` (children of `"drawing-screen"`)  
**Does:**  
Loops through all child DIVs and removes them from DOM or clears container directly

### DOM EVENTS

#### ---Retrieve user's custom grid size for drawing screen DIVs---

**EVENT** INPUT (CHANGE / SUBMIT, `activeScreenResolution`)  
**Uses:**  
`event`.target.value  
**Creates:**  
`newScreenResolution`  
**Does:**  
Validate input (`4 ≤ newScreenResolution ≤ 100`)  
Delete current grid (`removePixels()`)  
Generate new grid (`generatePixels(newScreenResolution)`)

#### ---On hover, paint and darken pixels---

**EVENT** MOUSE IN (`screenPixels` via parent `"drawing-screen"`)  
**Uses:**  
`screenPixels`  
`getColors()`  
`btnMulticolorToggle`  
**Creates:**  
`newPixelColor`  
`pixelOpacity`  
`pixel`  
**Does:**  
Increment `pixelOpacity` to increment opacity by 10% on each event up to 100%
Apply color and shade:

- if multicolour off, set background color to `penGray` with alpha `pixelOpacity`
- if multicolour on, set background color to `newPixelColor` (a random theme color) with alpha `pixelOpacity`

#### ---Toggle multicolour mode for the DIV's background---

**EVENT** BUTTON CLICK (`btnMulticolorToggle`)  
**Uses:**  
Button click `event`  
`isMulticolor`  
`multicolorStatusLabel`  
**Does:**  
Switches between multicolour and greyscale behaviour for `screenPixels` hover events  
Updates toggle text based on state

### GLOBAL / REUSED VARIABLES AT-A-GLANCE

- `drawingScreen` - container DIV for `screenPixels`
- `screenPixels` - pixel DIVs inside `drawingScreen`
- `customScreenResolution` - user input for custom screen resolution
- `btnSetResolution` - button to trigger custom size
- `btnMulticolorToggle` - button to toggle multicolour mode
- `DEFAULT_SCREEN_RESOLUTION` - 16 (default 16x16 screen resolution)
- `pixelOpacity` - increments opacity on each hover
- `"penGray"` - base colour for greyscale pixels
- `"harvestGold"` + 5 other colour pixel options for multicolour state
- `isMulticolor` - TRUE/FALSE state
- `multicolorStatusLabel` - paragraph for UI feedback
- `btn-shake-toy` - reset button
- `activeScreenResolution` - stored current screen resolution
