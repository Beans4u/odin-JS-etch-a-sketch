# Design Journal

## About

Rin's scratch pad. Getting my mind wrapped around the project specifications, constraints, and a place to explore problems.

**Last thoughts before final commit:**  
This turned out to be messy, exploratory, aloof, and not at all what I was expecting. I tried to let my thoughts unfold without censoring my personality, and by not deleting most of them, they became hard to work around. They aren't that amusing to read back, and they add an awkward kind of cognitive load that I'm not sure how to describe. I'm not going to approach it this way again.

I also learned the value of starting and prioritizing an MVP before I try to stack on optional features, my own flare, get lost in CSS architecture rabbit holes, and fuss entirely too much with variable names.

I also learned that I forgot most of what little I knew about pseudocode writing conventions, but in the interest of time, I'm glad I didn't look them up. My _half-code, half-pseudocode_ pseudocode served its purpose. I'm going to clean up this document by pasting it into a DESIGN file and keeping only the bare essentials. Then I'll copy _that_ into a JS file and finally get to work coding. I might as well build all the features I pseudocoded, but if they become trouble, then I'll drop them and finally finish [FOUNDATIONS](https://www.theodinproject.com/paths/foundations/courses/foundations)!

From an art perspective, though, it occurs to me that pseudocode is much like an artist's thumbnails and underdrawings. You sketch multiple iterations of your concept rapidly, working out problems with composition, forms, perspective, light sources, etc., and finally commit to an underdrawing. Then you solve those problems until you can finally draw on top of it with your chosen medium for the final rendering. Anyone looking will only see the finished product, and not all the mess and problem-solving that went into it in advance.

I wasn't intending this to be so reflective. This is another lesson in scope creep. `(⊙ _ ⊙ )`

Onward!

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

## - - - - - - - - - - - STRUCTURE & IMPLEMENTATION MAPPING BRAIN DUMP - - - - - - - - - - -

Mapping this out to get a sense of it.

```JS
DIV container `"toy-surface"`
 // HTML: hardcode.
 // CSS: rounded corners, I want to style it with that retro 70s/80s red. For the vibes.

    ELEMENT H1 header `"etch-a-sketch logo"`
        // HTML: H1 TEXT contains "Etch-a-Sketch"
        // CSS: Import look-alike font for top of file.

    DIV container `"drawing-screen"`
     // HTML: hardcode.
     // CSS: (constraint) must not change size when number of DIV "screen-pixels" changes.

        DIVs `"screen-pixels"`
          // JS:
               // - use LOOP to generate a 16 x 16 grid of divs or user input number.
               // - use LOOP to add a CSS class to each div to limit divs in each row.
               // - mouse event: add or generate CSS modifier class to darken divs on hover.
               // - mouse event: change to random colour if that option is toggled.
          // CSS:
               // - Use Flexbox flex-basis and div height to control number of divs per row
               // - Constrict the divs to their size, mind the margins and borders.

       END of DIVs `"screen-pixels"`

  END of DIV container `"drawing-screen"`

  DIV `"custom-resolution-buttons"` // use Flexbox to push them to either side of the container.

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

    BUTTON `"btn-shake-toy"` // to reset the image? Could place above/below toy on page.
    PARAGRAPH `"shake-toy-text"`
        "shake! (erase your image)"
    END of PARAGRAPH

END of DIV `"shake-toy-container"`
```

Right??

## - - - - - - - - - - - GLOBAL VARIABLES - - - - - - - - - - -

const `pixelOpacity` = 0.0

const `drawingScreen` = DOC GET ELEMENT DIV `"drawing-screen"`  
const `customScreenResolution` = DOC GET ELEMENT INPUT `"custom-screen-resolution"`  
const `btnSetResolution` = DOC GET ELEMENT BUTTON `"btn-set-resolution"`
const `btnMulticolorToggle` = DOC GET ELEMENT BUTTON `"btn-multicolor-toggle"`
const `btnShakeToy` = DOC GET ELEMENT BUTTON `"btn-shake-toy"`
const `multicolorStatusLabel` = DOC GET ELEMENT PARAGRAPH `"multicolor-status-label"`

**For rows that are 16 divs across**  
const `DEFAULT_SCREEN_RESOLUTION` = whatever value makes a 16 x 16 screen resolution.
let `activeScreenResolution` = `DEFAULT_SCREEN_RESOLUTION`
(will be updated by EVENT LISTENER for `customScreenResolution` so that it can be used to "shake" the toy in the Shake Screen EVENT LISTENER, and erase the drawing while keeping the custom screen resolution in place)

**Note on calc for `DEFAULT_SCREEN_RESOLUTION`:**  
Width and padding-bottom are 25% according to https://iamsteve.me/blog/how-to-flexible-squares-with-css.  
The custom height will be added via JS to control the size using **MATH MAGIC** in FUNCTION
`calculatePixelHeight` using the PARAMETER `screenResolution`.

**Prerequisite:** This one needs to let the screen pixels generate first
const `screenPixels` = DOC GET ELEMENT DIV `"drawing-screen"` CHILDREN
(need to figure this out: children as OBJECT using querySelectorAll? Or should I run a FOR EACH that gives them all a class which is then used to assign them for the class query selector to this variable?)

**- - - Global VAR colours: Multicolor Pixels - - -**
Update: Figured out a colour theme to match the retro 70s aesthetic, as a jumping off point

const `harvestGold` #DAA520  
const `burntOrange` #CC5500  
const `avocadoGreen` #568203  
const `earthBrown` #5D3A1A  
const `ochreYellow` #CC7722  
const `dustyTeal` #3B7A57

**- - - Global VAR colour: Grayscale Pixels - - -**
const`penGray` #333333
(tracker, the "pen")

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

VAR colour `"classic-red"` #B11016  
(container colour in that classic 70s-80s red)

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

#### - - - - - - - ELEMENT CLASSES - - - - - - -

DIV `"logo"`  
(contains logo for positioning)

BUTTON

LABEL

#### - - - - - - - MODIFIER CLASSES - - - - - - -

**- - - Modifier Classes - - -**

DIV `"screen-pixels"`  
(contains default colour, can be used in initial pixel grid generation and to reset grid)
(to be used with `screenPixels` in FUNCTION `calculatePixelHeight`)

BUTTON `"btn-set-resolution"`

LABEL `"custom-screen-resolution"`

BUTTON `"btn-multicolor-toggle"`

BUTTON`"btn-shake-toy"`  
(reset the image, shake animation?)

BOOL `isMulticolor` = FALSE

## - - - - - - - - - - - PSEUDOCODE: LOGIC - - - - - - - - - - -

### CONSTRAIN PIXEL GRID SIZE FOR SCREEN RESOLUTION (to equal height and width)

How: Calculate height % of generated divs (screen pixels) for drawing screen. The height property is needed for the CSS class in order for Flexbox to correctly distribute the pixel DIVs in the grid.

Purpose:

1. Determine the size of the DIV height according to the value in `screenResolution`.
2. RETURN value as INT

In order to print the same number of `screenResolution` DIVs across as `screenResolution` DIVs down (e.g. 16 x 16). Grid x must equal grid y. Maybe a modifier class? Can I modify a single CSS class directly with a calculation, or do I need to create a new one?

```JS
FUNCTION `calculatePixelHeight` (PARAMETER `screenResolution`)
   // MAGIC:
        const `calcPixelHeight` = `screenResolution`;
        MAGIC CALCULATION: height % required for Flexbox to place `screenResolution` number of DIVs in one row of `drawingScreen` (is either user input or default value)
        ANTI-MAGIC: I found a formula. It is the length of the container `screenPixels` divided by the `screenResolution`. Need to figure out how big container should be. I will figure that out during implementation so I can see it clearly.

        Update: Using float for precise pixel height on generated DIVs

        RETURN result as INT: `toFLOAT`( [[container length]] / `screenResolution` )

END OF FUNCTION
```

### GENERATE PIXEL DIVS FOR SCREEN

**Purpose:**

1. create a LOOP and generate DIVs.
2. Give DIVs a class name for the utility class
3. Append DIVs to document

**Update:** I removed the class modification steps from the loop, I want to try inheriting from the parent class instead. Code economy and all that.

**Update 2:** The pixelHeight is now going to be used to modify a global variable for height, as my other method was stinky with bad code economy.

#### **---Variables Used---**

GLOBAL:  
const `drawingScreen` = DOC GET ELEMENT DIV `"drawing-screen"`  
const `DEFAULT_SCREEN_RESOLUTION` = MAGIC: whatever value makes a 16 x 16 pixel grid.

SCOPE:  
const `screenResolution` = `newScreenResolution`  
const `pixelHeight` = INVOKE FUNCTION `calculatePixelHeight`(PARAMETER `screenResolution`)  
let `screenPixels` = DOC CREATE ELEMENT DIV (initialized in LOOP. Used "let" so that it can be manipulated later with colours)

#### **---JS: Generate Pixels---**

```JS
FUNCTION generatePixels (PARAMETER `newScreenResolution` = default value is `DEFAULT_SCREEN_RESOLUTION`)

    const `screenResolution` = `newScreenResolution`

    const `pixelHeight` = FUNCTION CALL `calculatePixelHeight`(PARAMETER `screenResolution`)

    give `"drawingScreen"` a style height of `pixelHeight`

    // + + + Generate pixel grid and print to web page + + +
    LOOP `i` times, where `i` is `screenResolution` value squared
        let `screenPixels` = DOC CREATE ELEMENT CHILD DIV
        append `screenPixels` to `drawingScreen`
    END of LOOP

    RETURN

END OF FUNCTION
```

### REMOVE PIXEL DIVS FROM SCREEN

**Purpose: Removes DIV children from screenPixels when the user creates a custom screen resolution, handled by the `handleCustomScreenResolution` EVENT**

**Variables**
`screenPixels`

```JS
FUNCTION removePixels(`screenPixels`) {
    LOOP
        for each `screenPixel`, element remove from DOM
    END LOOP
    // what if that takes up too many resources?

    LOOP
        element.removeChild(`screenPixels`)
        // yesssss, excellent.
    END LOOP
}

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

**Purpose: Changes from limited range of colours, returns colour code to be used by `generatePixels`.**

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

Resize DIVs for Drawing Screen pixel grid from INPUT

**Purpose:**

1. Receive user input from LABEL `custom-screen-resolution`
2. Check for errors and convert to INT
3. Delete current DIV grid
4. Call `generated-pixels` and pass in INT to repaint `drawing-screen`

**Variables**

GLOBAL:  
const `customScreenResolution` = DOC GET ELEMENT INPUT `"custom-screen-resolution"`
let `activeScreenResolution` = DEFAL
(will be updated by EVENT LISTENER for `customScreenResolution` so that it can be used to "shake" the toy in the Shake Screen EVENT LISTENER, and erase the drawing while keeping the current grid in place)

**Event Listener**

#### JS - send user input to `generatePixels`

```JS
EVENT LISTENER for INPUT customScreenResolution (SUBMIT/CHANGE FUNCTION `handleCustomScreenResolution`(PARAMETER `event`))

    // Need to prevent default IF using the SUBMIT event, if CHANGE then no.
    // event.preventDefault();

    const `newScreenResolution` = +event.target.value
    // (convert to number with +, returns NaN if invalid number)

    IF `newScreenResolution` is isNaN (syntax: isNaN(`newScreenResolution`))
        RETURN error message containing value of `newScreenResolution`
    ELSE IF `newScreenResolution` is less than 4 or more than 100
        RETURN error message stating the screen resolution must be between 4 and 100, display value received
    END of IF STATEMENT

    let `customScreenResolution` = `newScreenResolution`
    // (this is a global variable that will remember the user's screen resolution for shaking the toy)
    // moved beneath IF statement for better code economy

    FUNCTION CALL `removePixels`()
    FUNCTION CALL `generatePixels`(PARAMETER `newScreenResolution`)

END OF FUNCTION AND EVENT LISTENER
```

### TOGGLE MULTICOLOR

Purpose:

1. on click, makes the pixels paint in colour instead of greyscale
2. event changes `isMulticolor` bool to TRUE

The event listener for painting the pixels will check the bool and paint greyscale/multicolor on `isMulticolor` state of false/true respectively.

**Global Variables**  
`isMulticolor`  
(if FALSE, paints greyscale, if TRUE, paints multicolour)

`btnMulticolorToggle`
(DOM node)

`"multicolor-status-label"`
(DOM node - paragraph, change text on toggle)

```JS
EVENT LISTENER for DIV `btnMulticolorToggle`(CLICK, FUNCTION `handleToggleMulticolor`(PARAMETER `event`))
    // MAGIC: We figure out how to toggle between changing pixels grey to multicolor. Possibly by changing classes the div is assinged to?

    // No! I'll assign it to a global variable.

    IF (`isMulticolor` is FALSE)
        change `isMulticolor` to TRUE
        // I still need to update the DOM for toggle switching.
        `btnMulticolorToggle` change button or div text to "Toggle Greyscale"

    ELSE
        change `isMulticolor` to FALSE
        `btnMulticolorToggle` change button or div text to "Toggle Multicolor"
    END OF IF STATEMENT
    // right?
END of FUNCTION and EVENT LISTENER
```

### PAINT PIXELS

**Purpose:**

1. cause `screenPixel` child DIVs to become slightly more opaque on mouse in event
2. apply multicolour or greyscale background colour to DIV on mouse in

**Global variables**

**(must be used after pixel grid is generated):**
const `screenPixels` = DOC GET ELEMENT DIV `"drawing-screen"` CHILDREN
(need to figure this out: children as OBJECT using querySelectorAll? Or should I run a FOR EACH that gives them all a class which is then used to assign them for the class query selector to this variable?)

MAGIC: pixelOpacity goes up by 0.3 or 0.5 on each mouse pass. I'll know more when I can test it.  
Can I do something like, on mouse in, pixelOpacity = pixelOpacity + 0.5?

`pixelOpacity`
(will be used as variable in RGBA for the A value)
(default value will increase on each mouse in event)

`isMulticolor`
(if FALSE, paints greyscale, if TRUE, paints multicolour)

**Callbacks**
`getColors()`

```JS
// Reference later: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value#hsl_colors



EVENT LISTENER for DIV `drawingScreen`(MOUSE IN, FUNCTION `handlePaintPixels`(PARAMETER `event`))
    // MAGIC makes this happen. Ah, the magic of pseudocode.
    // `pixelOpacity` = `pixelOpacity` + 0.10 // constraint: must be 100% dark on 10 mouse-ins

    // update: Use event delegation instead of targeting each pixel, how did I miss that?

    // Update: Uh-oh. If I change the global variable, the pixel it's hovered over won't remember the opacity!! I need to figure out how to isolate only the affected pixel. :S
    // Sooooooo objects?
    // I found out about dataset.
        // Event delegation, check.
        // Per-element state storage. Funny I was going in that direction but for objects. No check, also, how do??
        // use e.target for the individual DIV, put it in pixel.
        // increment the opacity on each mouse-in event. Howwww.
        // pixelOpacity = pixel.dataset.alpha). Returns as a string, change to FLOAT for math reasons
        // increment opacity... umm. MAGIC! No. alpha + 1. Yeah that's not gonna work. Need to suss this out.
            // pixelOpacity = Math.min(alpha + 0.1, 1). Returns whatever is smaller, increment alpha + 0.1 to make it 10% darker, 1 is 100% opacity.
        // state. STATE. Um. Save it to itself like my pixelOpacity += 0.1 idea. So, pixel.dataset.pixelOpacity = pixelOpacity? Right??
        // STORE COLOURS TOO? Currently they change on each mouse-in event. IF multicolor mode is on, event.dataset.color = getColors()
        // Is there anything more? This feels like it's missing something.
        // I'm tired of looking at this doc! LGTM time to ship! 〜⁠(⁠꒪⁠꒳⁠꒪⁠)⁠〜 aaaaaaah

    const pixel = event.target('.pixel')

    let pixelOpacity = event.dataset.alpha and convert TO FLOAT || 0 //in case it's empty
    alpha = Math.min(pixelOpacity + 0.1, 1) // right?

    event.dataset.alpha = pixelOpacity


   // Change background colour to random color/grayscale and apply opacity property
    IF `isMulticolor` is TRUE
        `newPixelColor` = `getColors()`
        event.target.style.backgroundColor = rgba ${`newPixelColor`}, ${`pixelOpacity`}

    ELSE
        event.target.style.backgroundColor = rgba ${`penGray`}, ${`pixelOpacity`} //something like this?

END of FUNCTION and EVENT LISTENER
```

### SHAKE TOY (ERASE USER'S DRAWING)

**Purpose: This will remove all painted pixels from the screen as if the user "shook" the Etch-a-Sketch.**

```JS
EVENT LISTENER for BUTTON `"btn-shake-toy"` (CLICK, FUNCTION `handleShakeToy`(`event`))
    FUNCTION CALL generatePixels(PARAMETER `activeScreenResolution`)
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

1. the page loads, and the 16 x 16 pixel grid is generated (`DEFAULT_SCREEN_RESOLUTION`).
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

**Shake / Reset**

1. the user clicks `"btn-shake-toy"`.
2. the pixel grid regenerates using the stored grid size (`activeScreenResolution` or `DEFAULT_SCREEN_RESOLUTION`).
3. the pixel grid is returned to a blank slate for the user to draw on.

### FUNCTIONS

**Note on DIV CSS height property:**  
The CSS class applied to each DIV constrains the number of DIVs per line to the same value (using a Flexbox trick), so we get a screenResolution x screenResolution grid, e.g. 16x16.

#### ---Calculate pixel height for grid layout---

**FUNCTION** `calculatePixelHeight`(`screenResolution`)  
**Uses:**  
`screenResolution`  
**Creates / Returns:**  
`pixelHeight` (used to style `"drawingScreen"` height and constrain `screenPixels`)

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
Creates and appends pixel DIVs (`"screen-pixels"` or inherited class)  
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

**EVENT** INPUT (CHANGE / SUBMIT, `customScreenResolution`)  
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
`pixelOpacity`  
`getColors()`  
`btnMulticolorToggle`  
**Creates:**  
`newPixelColor`  
**Does:**  
Increment `pixelOpacity` to increment opacity
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
- `"color-1"` … `"color-6"` - multicolour pixel options
- `isMulticolor` - TRUE/FALSE state
- `multicolorStatusLabel` - paragraph for UI feedback
- `btn-shake-toy` - reset button
- `activeScreenResolution` - stored current screen resolution

## HOUSECLEANING - COMPLETE

1. DONE! (I thought it would be harder) Need to figure out the pixelOpacity issue. This is currently a global variable, which will affect all the pixels on mouse-in events.

**screenPixels**

1. will need to be used only after a grid is generated. I should just switch to using the drawingScreen children somehow.
2. The event listener for Screen Pixels will run on each mouse-in event. I should run it on the parent instead.

To be continued...  
`(˶ᵔ ᵕ ᵔ˶)`
