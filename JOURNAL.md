# Journal

Rin's scratch pad. Getting my mind wrapped around the project specifications, constraints, and a place to explore problems.

## Project Objectives

## Constraints

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

The container and all child elements could have the class "etch-a-sketch" for common styles or effects. If not, just apply to container.

**Header (h1)**  
Find a font that looks similar to the Etch-a-Sketch font that's above the toy screen. I could rename it to avoid copyright issues, though I really don't think I need to worry about that.
Utility Class(es): "`etch-a-sketch` `logo-gold`".

**Container:**  
Make the pixel grid container div have a huge "Etch-a-Sketch red" border with rounded corners, or maybe we need to get into a nested div situation.
Utility class: "`etch-a-sketch` `classic-red`".

**Screen:**  
The screen on the toy is a dull gray colour.
Pixel grid borders: N/A - I don't see them on the Etch-a-Sketch toy.
Utility Class(es): "`etch-a-sketch` `screen-grey`".

**Tracker (the "pen")**  
Utility class(es): "`etch-a-sketch` `pen-grey`".

**Knobs (Buttons)**  
The knobs are useless here, but I can use them as "buttons": one to resize the pixel grid, and the other to add multicolour options. This might work if I use nested divs for the container instead of a chonky border. Hummm.

Utility class(es): "`etch-a-sketch` `knob-white`"

Why is this so fun to brainstorm?? xD

## PSEUDOCODE LIGHT

(Not true pseudocode (yet) - I just a space to think out loud.)

What do I need?

The grid is troubling me:

- generate "`grid-col-1`" through "`grid-col-16`"
- generate "`col-row-2`" through "`grid-row-15`"??? This doesn't sit right with me. Or maybe it needs to be a condition that limits flex items to 16 per row. Can I do that?
- oh that's right (｡◕‿◕｡)  
  https://sanjeebaryal.com.np/flexbox-making-x-items-per-row/

Mouse event: How will this interact with the darkening? Should the colours continue to change as the divs get darker?

Now to sort my thoughts out for the things about the stuff:

**Structure:**
Mapping this out to get a sense of it.

```js
DIV container `"toy-surface"`
 // HTML: hardcode.
 // CSS: rounded corners, I want to style it with that retro 70s/80s red. For the vibes.

    // HEADER:
        // HTML: H1 TEXT is `"etch-a-sketch logo"`.
        // CSS: Import look-alike font for top of file.

    DIV container `"drawing-screen"`
     // HTML: hardcode.
     // CSS: must not change size when number of DIV "screen-pixels-default" changes.

        DIVs `"screen-pixels-default"`
          // JS:
               // - use LOOP to generate a 16 x 16 grid of divs or user input number.
               // - use LOOP to add a CSS class to each div to limit divs in each row.
               // - mouse event: add or generate CSS modifier class to darken divs on hover.
               // - mouse event: change to random colour if that option is toggled.
          // CSS:
               // - Use Flexbox. Use grow/shrink flex basis for size changes?
               // - Constrict the divs to their size, mind the margins and borders.

       END of DIVs `"screen-pixels-default"`

  END of DIV container `"drawing-screen"`

  DIV `"custom-pixel-buttons"` // use Flexbox to push them to either side of the container.

    BUTTON `"btn-custom-pixel-size"`
    INPUT LABEL `"custom-pixel-size"`
        DEFAULT LABEL TEXT "enter a custom pixel size"

    BUTTON `"btn-multicolor-toggle"`
    PARAGRAPH `"toggle-multicolor-text"`
        "toggle multicolor"
    END of PARAGRAPH

  END of DIV `"custom-pixel-buttons"`

END of DIV container `"toy-surface"`

DIV `"shake-toy-container"`

    BUTTON `"btn-shake-toy"` // to reset the image? Could place above/below toy on page.
    PARAGRAPH `"shake-toy-text"`
        "shake! (erases your image)"
    END of PARAGRAPH

END of DIV `"shake-toy-container"`


```

Right??

## PSEUDOCODE: VARIABLES and CLASSES

### GLOBAL VARIABLES (grows alongside pseudocode)

const `darkerPixel` = 0.0

const `drawingScreen` = DOC DIV `"drawing-screen"`  
const `customGridSize` = DOC INPUT `"custom-grid-size"`  
const `btnCustomGridSize` = DOC BUTTON `"btn-custom-grid-size"`
const `btnMulticolorToggle` = DOC BUTTON `"btn-multicolor-toggle"`
const `toggleMulticolorText` = DOC PARAGRAPH `"toggle-multicolor-text"`

**For rows that are 16 divs across**  
const `DEFAULT_GRID_SIZE` = whatever value makes a 16 x 16 grid.
let `customGridValue` = 0
(will be updated by EVENT LISTENER for `customGridSize` so that it can be used to "shake" the toy in the Shake Screen EVENT LISTENER, and erase the drawing while keeping the custom grid in place)

**Note on calc for `DEFAULT_GRID_SIZE`:**  
Width and padding-bottom are 25% according to https://iamsteve.me/blog/how-to-flexible-squares-with-css.  
The custom height will be added via JS to control the size using **MATH MAGIC** in FUNCTION
`calculateDivHeight` using the PARAMETER `gridSize`.

**Prerequisite:** This one needs to let the screen pixels generate first
const `screenPixels` = DOC DIV `"drawing-screen"` CHILDREN
(need to figure this out: children as OBJECT using querySelectorAll? Or should I run a FOR EACH that gives them all a class which is then used to assign them for the class query selector to this variable?)

### CSS CLASSES (grows alongside pseudocode)

Update: Implementing BEM architecture.

**BEM Reference:**  
Block: `.card`  
Element: `card__title`  
Modifier: `card--featured`  
Element Modifier: `card__button--primary`

**Note:** I'm going to wait until I finish figuring out the proper architecture before updating the naming conventions. `(╥﹏╥)`

**Update:** I will try BEM out for my next project. This one is already scope creeped and I need to move forward.

#### - - - - - - - BLOCK CLASSES - - - - - - -

GLOBAL: VAR height
(for `"drawing-screen"`)
(will be modified via JS to control number of DIVs per row in `screenPixels`)

**- - - Global VAR colours - - -**  
VAR colour `"logo-gold"`  
(Etch-a-Sketch branded name on top of device)

VAR colour `"classic-red"`  
(container colour in that classic 70s-80s red)

VAR colour `"screen-grey"`  
(drawing screen)

VAR colour `"knob-white"`  
(the "dials" that move the pen on the toy will be buttons for user)

**- - - Global VAR colours: Multicolor Pixels - - -**
actual colours are TBD  
VAR color `"color-1"`  
VAR color `"color-2"`  
VAR color `"color-3"`  
VAR color `"color-4"`  
VAR color `"color-5"`  
VAR color `"color-6"`

**- - - Global VAR colour: Grayscale Pixels - - -**
VAR colour `"pen-gray"`  
(tracker, the "pen")

**- - - Structure: - - -**
DIV `"etch-a-sketch"`  
(container and possibly child items to inherit common styles or effects)

DIV `"toy-surface"`  
(container and "frame" of Etch-a-Skech which will house BUTTONS and INPUT)

DIV `"drawing-screen"`  
(where the user will "draw", and where `screenPixels` live, possibly child items to inherit common styles or effects)

#### - - - - - - - ELEMENT CLASSES - - - - - - -

DIV `"logo"`  
(contains logo for positioning)

BUTTON

LABEL

#### - - - - - - - MODIFIER CLASSES - - - - - - -

**- - - Modifier Classes - - -**

DIV `"screen-pixels-default"`  
(contains default colour, can be used in initial grid generation and to reset grid)
(to be used with `screenPixels` in FUNCTION `calculateDivHeight`)

BUTTON `"btn-custom-pixel-size"`

LABEL `"custom-pixel-size"`

BUTTON `"btn-multicolor-toggle"`

BUTTON`"btn-shake-toy"`  
(reset the image, shake animation?)

BOOL `multicolorActive` = FALSE

## PSEUDOCODE: LOGIC

### CONSTRAIN GRID SIZE (to equal height and width)

How: Calculate height % of generated divs (screen pixels) for drawing screen. The height property is needed for the CSS class in order for Flexbox to correctly distribute the pixel DIVs in the grid.

Purpose:

1. Determine the size of the DIV height according to the value in `gridSize`.
2. RETURN value as INT

In order to print the same number of `gridSize` DIVs across as `gridSize` DIVs down (e.g. 16 x 16). Grid x must equal grid y. Maybe a modifier class? Can I modify a single CSS class directly with a calculation, or do I need to create a new one?

```JS
FUNCTION `calculateDivHeight` (PARAMETER `gridSize`)
   // MAGIC:
        const `calcDivHeight` = `gridSize';
        MAGIC CALCULATION: height % required for Flexbox to place `gridSize` number of DIVs in one row of `drawingScreen` (is either user input or default value)
        ANTI-MAGIC: I found a formula. It is the length of the container `screenPixels` divided by the `gridSize`. Need to figure out how big container should be. I will figure that out during implementation so I can see it clearly.

        where `x` = `screenPixel` width in px:

        RETURN result as INT: `toINT`( `x` / `gridSize` )

END OF FUNCTION
```

### GENERATE DIVS FOR SCREEN

**Purpose:**

1. create a LOOP and generate DIVs.
2. Give DIVs a class name for the utility class
3. Append DIVs to document

**Update:** I removed the class modification steps from the loop, I want to try inheriting from the parent class instead. Code economy and all that.

**Update 2:** The divHeight is now going to be used to modify a global variable for height, as my other method was stinky with bad code economy.

#### **---Variables Used---**

GLOBAL:  
const `drawingScreen` = DOC DIV `"drawing-screen"`  
const `DEFAULT_GRID_SIZE` = MAGIC: whatever value makes a 16 x 16 grid.

SCOPE:  
const `gridSize` = `newGridSize`  
const `divHeight` = INVOKE FUNCTION `calculateDivHeight`(PARAMETER `gridSize`)  
let `screenPixels` = DOC CREATE DIV (initialized in LOOP. Used "let" so that it can be manipulated later with colours)

#### **---JS: Generate Pixels---**

```JS
FUNCTION generatePixels (PARAMETER `newGridSize` = default value is `DEFAULT_GRID_SIZE`)

    const `gridSize` = `newGridSize`

    const `divHeight` = INVOKE FUNCTION `calculateDivHeight`(PARAMETER `gridSize`)

    give `"drawingScreen"` a style height of `divHeight`

    // + + + Generate grid and print to web page + + +
    LOOP `i` times, where `i` is `gridSize` value squared
        let `screenPixels` = DOC CREATE CHILD DIV
        append `screenPixels` to `drawingScreen`
    END of LOOP

    RETURN

END OF FUNCTION
```

#### **---JS: Delete Generated Pixels---**

```JS
FUNCTION removePixels(screenPixels) {
    LOOP
        for each screenPixel, element remove from DOM
    END LOOP
    // what if that takes up too many resources?

    LOOP
        element.removeChild(screenPixels)
        // yesssss, excellent.
    END LOOP
}

```

#### ---CSS - CLASS FOR THE GRID WITH ESSENTIAL PROPERTIES.---

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

.screen-pixels-default {
    will be inserted via JS
    no borders
}
```

### PSEUDOCODE: THINKING ABOUT COLOURS (LOGIC)

I want to constrain the "random" colours to a theme containing colours I select myself, for aesthetic appeal, rather than just using all 256 colours of the rbg spread. I think I can achieve this by reusing a piece of code I used in my [Rock Paper Scissors project](https://github.com/Beans4u/odin-JS-rockPaperScissors/blob/main/script.js).

Get Computer Choice from RPS project:

```JS
function getComputerChoice() {
  /*----- This will determine the computerChoice for the round. It will randomize a number from 1 to 3, which will output ROCK, PAPER, or SCISSORS respectively -----*/

  const number = Math.floor(Math.random() * 3) + 1;

  if (number === 1) {
    return 'ROCK';
  } else if (number === 2) {
    return 'PAPER';
  } else {
    return 'SCISSORS';
  }
}
```

I can do something like this to assign 6 or 9 colours to each pixel instead of 256.

But I'm not sure how to connect it to the divs yet. Toggle the classList, probably?

```JS
FUNCTION getColors(){

        const number = Math.floor(Math.random() * 6) + 1;

        if (number === 1) {
            RETURN `"color-1"`;
        } else if (number === 2) {
            RETURN `"color-2"`;
        } else if (number === 3) {
            RETURN `"color-3"`;
        } else if (number === 4) {
            RETURN `"color-4"`;
        } else if (number === 5) {
            RETURN `"color-5"`;
        } else {
            return RETURN `"color-6"`;
        }
} END of FUNCTION


```

## PSEUDOCODE: EVENTS

### CUSTOM GRID SIZE

Resize DIVs for Drawing Screen grid from INPUT

**Purpose:**

1. Receive user input from LABEL `custom-grid-size`
2. Check for errors and convert to INT
3. Delete current DIV grid
4. Call `generated-pixels` and pass in INT to repaint `drawing-screen`

**Variables**

GLOBAL:  
const `customGridSize` = DOC INPUT `"custom-grid-size"`
let `customGridValue` = 0
(will be updated by EVENT LISTENER for `customGridSize` so that it can be used to "shake" the toy in the Shake Screen EVENT LISTENER, and erase the drawing while keeping the custom grid in place)

**Event Listener**

#### JS - send user input to `generatePixels`

```JS
EVENT LISTENER for INPUT customGridSize (SUBMIT/CHANGE (PARAMETER `event`))
    const `newGridSize` = event.target.value
    // (convert to number with +, returns NaN if invalid number)
    let `customGridSize` = `newGridSize`
    // (this is a global variable that will remember the user's grid size for shaking the toy)

    IF `newGridSize` is isNaN (syntax: isNaN(`newGridSize`))
        RETURN error message containing value of `newGridSize`
    ELSE IF `newGridSize` is less than 4 or more than 100
        RETURN error message stating the grid size must be between 4 and 100, display value received
    END of IF STATEMENT

    FUNCTION CALL `removePixels`()
    FUNCTION CALL `generatePixels`(PARAMETER `newGridSize`)

END OF EVENT LISTENER
```

### PSEUDOCODE: THINKING ABOUT COLOURS (LOGIC)

**Global variable (must be used after grid is generated):**
const `screenPixels` = DOC DIV `"drawing-screen"`  
(need to figure this out: children as OBJECT using querySelectorAll? Or should I run a FOR EACH that gives them all a class which is then used to assign them for the class query selector to this variable?)

```JS
EVENT LISTENER for DIV `screenPixels` (MOUSE ENTER, ()){

        LET `colorPixel` = FUNCTION CALL `getColours`(`screenPixels`)
        LET `randomColor` = `getColors()`
        change `screenPixels` style backgroundColor to `randomColor`
}
```

### TOGGLE MULTICOLOR

Purpose:

1. on click, makes the pixels paint in colour instead of greyscale
2. event changes multicolorActive bool to TRUE

The event listener for painting the pixels will check the bool and paint greyscale/multicolor on multicolorActive state of false/true respectively.

**Global Variables**  
`multicolorActive`  
(if FALSE, paints greyscale, if TRUE, paints multicolour)

`btnMulticolorToggle`
(DOM node)

`"toggle-multicolor-text"`
(DOM node - paragraph, change text on toggle)

```JS
EVENT LISTENER for DIV `btnMulticolorToggle` (CLICK, (PARAMETER `event`))
    // MAGIC: We figure out how to toggle between changing pixels grey to multicolor. Possibly by changing classes the div is assinged to?

    // No! I'll assign it to a global variable.

    IF (event.target is clicked)
        change `multicolorActive` to TRUE
    END OF IF STATEMENT
    // right?

    // I still need to update the DOM for toggle switching.
    `btnMulticolorToggle` change button or div text to "Toggle Greyscale"

```

### TOGGLE GREYSCALE

Purpose:

1. on click, makes the pixels paint in colour instead of greyscale
2. event changes `multicolorActive` bool to FALSE

**Global Variables**  
`multicolorActive`  
(if FALSE, paints greyscale, if TRUE, paints multicolour)

```JS
EVENT LISTENER for DIV `btnMulticolorToggle` (CLICK, (PARAMETER `event`))
    // MAGIC: We figure out how to toggle between changing pixels grey to multicolor. Possibly by changing classes the div is assinged to?

    // No! I'll assign it to a global variable.

    IF (event.target is clicked)
        change `multicolorActive` to FALSE
    END OF IF STATEMENT
    // right?
```

### PAINT PIXELS

**Purpose:**

1. cause screenPixel child DIVs to become slightly more opaque on mouse in event
2. apply multicolour or greyscale background colour to DIV on mouse in

**Global variables**

**(must be used after grid is generated):**
const `screenPixels` = DOC DIV `"drawing-screen"` CHILDREN
(need to figure this out: children as OBJECT using querySelectorAll? Or should I run a FOR EACH that gives them all a class which is then used to assign them for the class query selector to this variable?)

MAGIC: darkerPixel goes up by 0.3 or 0.5 on each mouse pass. I'll know more when I can test it.  
Can I do something like, on mouse in, darkerPixel = darkerPixel + 0.5?

`darkerPixel`
(will be used as variable in RGBA for the A value)
(default value will increase on each mouse in event)

`multicolorActive`
(if FALSE, paints greyscale, if TRUE, paints multicolour)

**Callbacks**
`getColors()`

```JS
// Reference later: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value#hsl_colors



EVENT LISTENER for DIV `"screenPixels"`(MOUSE IN, FUNCTION(PARAMETER `event`))
    // MAGIC makes this happen. Ah, the magic of pseudocode.
    `darkerPixel` = `darkerPixel` + 0.5

    `pixelColor` = `getColors()`

   // Change background colour opacity property

    IF `multicolorActive` is FALSE
        event.target.style.backgroundColor = rgba --`penGray`, ${`darkerPixel`} //something like this?
    ELSE
        event.target.style.backgroundColor = rgba `pixelColor`, ${`darkerPixel`}
END of FUNCTION and EVENT LISTENER
```

### SHAKE TOY

This will remove all painted pixels from the screen as if the user "shook" the Etch-a-Sketch.

```JS
EVENT LISTENER for BUTTON `"btn-shake-toy"` (CLICK, (`event`))
    FUNCTION CALL generatePixels(PARAMETER `customGridValue`)
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

I just need to see it in one place. FOR SANITY.

### Behaviour

**Default Pixel Grid: Size and Colour**

1. the page loads, and the 16 x 16 pixel grid is generated (`DEFAULT_GRID_SIZE`).
2. user moves mouse over pixels (`screenPixels`).
3. the pixels turn grey (`pen-gray`), and become darker each time they are hovered over (`darkerPixel` increments per hover).

**Customized Pixel Grid: Size**

1. the user submits a custom grid number (`customGridSize` input).
2. the pixel grid clears (`removePixels()`).
3. the pixel grid is generated with the user's custom grid number (`generatePixels(newGridSize)`).

**Customized Pixel Grid: Colour**

1. the user selects the multicolour toggle (`btnMulticolorToggle`).
2. the toggle updates to switch back to greyscale on click and the text updates tor reflect new colour mode`"toggle-multicolor-text"`.
3. the user hovers over pixels (`screenPixels`).
4. the pixels change to random colours (`getColors()`: `"color-1"` … `"color-6"`), and continue to darken each time they are hovered over (`darkerPixel` increments).
5. the user clicks the greyscale toggle, ending colour mode and resetting toggle & mode text in DOM.

**Shake / Reset**

1. the user clicks `"btn-shake-toy"`.
2. the grid regenerates using the stored grid size (`customGridValue` or `DEFAULT_GRID_SIZE`).
3. the grid is returned to a blank slate for the user to draw on.

### FUNCTIONS

**Note on DIV CSS height property:**  
The CSS class applied to each DIV constrains the number of DIVs per line to the same value (using a Flexbox trick), so we get a gridSize x gridSize grid, e.g. 16x16.

#### ---Calculate pixel height for grid layout---

**FUNCTION** `calculateDivHeight`(`gridSize`)  
**Uses:**  
`gridSize`  
**Creates / Returns:**  
`divHeight` (used to style `"drawingScreen"` height and constrain `screenPixels`)

#### ---Generate pixel DIVs as a grid in DIV `drawingScreen`---

**FUNCTION** `generatePixels`(`newGridSize` = `DEFAULT_GRID_SIZE`)  
**Uses:**  
`newGridSize`  
`DEFAULT_GRID_SIZE`  
`drawingScreen`  
`calculateDivHeight()`  
**Creates:**  
`gridSize`  
`divHeight`  
`screenPixels` (individual DIVs in loop)  
**Does:**  
Loops `gridSize²`  
Creates and appends pixel DIVs (`"screen-pixels-default"` or inherited class)  
**Return / Output:**  
DIV grid rendered in DOM

#### ---Delete generated pixel DIVs---

**FUNCTION** `removePixels(screenPixels)`  
**Uses:**  
`screenPixels` (children of `"drawing-screen"`)  
**Does:**  
Loops through all child DIVs and removes them from DOM or clears container directly

### DOM EVENTS

#### ---Retrieve user's custom grid size for drawing screen DIVs---

**EVENT** INPUT (CHANGE / SUBMIT, `customGridSize`)  
**Uses:**  
`event`.target.value  
**Creates:**  
`newGridSize`  
**Does:**  
Validate input (`4 ≤ newGridSize ≤ 100`)  
Delete current grid (`removePixels()`)  
Generate new grid (`generatePixels(newGridSize)`)

#### ---On hover, paint and darken pixels---

**EVENT** MOUSE IN (`screenPixels` via parent `"drawing-screen"`)  
**Uses:**  
`screenPixels`  
`darkerPixel`  
`getColors()`  
`btnMulticolorToggle`  
**Creates:**  
`pixelColor`  
**Does:**  
Increment `darkerPixel` to increment opacity
Apply color and shade:

- if multicolour off, set background color to `pen-gray` with alpha `darkerPixel`
- if multicolour on, set background color to `pixelColour` (a random theme color) with alpha `darkerPixel`

#### ---Toggle multicolour mode for the DIV's background---

**EVENT** BUTTON CLICK (`btnMulticolorToggle`)  
**Uses:**  
Button click `event`  
`multicolorActive`  
`toggleMulticolorText`  
**Does:**  
Switches between multicolour and greyscale behaviour for `screenPixels` hover events  
Updates toggle text based on state

### GLOBAL / REUSED VARIABLES AT-A-GLANCE

- `drawingScreen` - container DIV for grid
- `screenPixels` - pixel DIVs inside `drawingScreen`
- `customGridSize` - user input for custom grid
- `btnCustomGridSize` - button to trigger custom size
- `btnMulticolorToggle` - button to toggle multicolour mode
- `DEFAULT_GRID_SIZE` - 16 (default 16x16 grid)
- `darkerPixel` - increments opacity on each hover
- `"pen-gray"` - base colour for greyscale pixels
- `"color-1"` … `"color-6"` - multicolour pixel options
- `multicolorActive` - TRUE/FALSE state
- `toggleMulticolorText` - paragraph for UI feedback
- `btn-shake-toy` - reset button
- `customGridValue` - stored user grid size

To be continued...  
`(˶ᵔ ᵕ ᵔ˶)`
