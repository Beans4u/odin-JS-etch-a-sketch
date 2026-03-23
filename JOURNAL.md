# Journal

Rin's scratch pad. Getting my mind wrapped around the project specifications, constraints, and a place to explore problems.

## Project Objectives

## Constraints

**App behaviour and parameters**

- Etch-a-Sketch must be a 16 × 16 grid of square divs within a container div (Etch-a-Sketch "pad").
- All grid squares (divs) must be generated via JavaScript (no HTML placeholders - this reminds me of the Mario exercise in the Harvard CS50 video I saw).
- Use Flexbox to display the grid layout (vs CSS Grid).
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
Utility Class(es): "etch-a-sketch logo-gold".

**Container:**  
Make the grid container div have a huge "Etch-a-Sketch red" border with rounded corners, or maybe we need to get into a nested div situation.
Utility class: "etch-a-sketch classic-red".

**Screen:**  
The screen on the toy is a dull gray colour.
Grid borders: N/A - I don't see them on the Etch-a-Sketch toy.
Utility Class(es): "etch-a-sketch screen-grey".

**Tracker (the "pen")**  
Utility class(es): "etch-a-sketch pen-grey".

**Knobs (Buttons)**  
The knobs are useless here, but I can use them as "buttons": one to resize the grid, and the other to add multicolour options. This might work if I use nested divs for the container instead of a chonky border. Hummm.

Utility class(es): "etch-a-sketch knob-white"

Why is this so fun to brainstorm?? xD

## PSEUDOCODE LIGHT

(Not true pseudocode (yet) - I just a space to think out loud.)

What do I need?

The grid is troubling me:

- generate "grid-col-1" through "grid-col-16"
- generate "col-row-2" through "grid-row-15"??? This doesn't sit right with me. Or maybe it needs to be a condition that limits flex items to 16 per row. Can I do that?
- oh that's right (｡◕‿◕｡)  
  https://sanjeebaryal.com.np/flexbox-making-x-items-per-row/

Mouse event: How will this interact with the darkening? Should the colours continue to change as the divs get darker?

Now to sort my thoughts out for the things about the stuff:

**Structure:**
Mapping this out to get a sense of it.

```
DIV container "toy-surface"
    - HTML: hardcode.
    - CSS: rounded corners, I want to style it with that retro 70s/80s red. For the vibes.

    HEADER:
        - HTML: H1 TEXT is "Etch-a-Sketch".
        - CSS: Import look-alike font for top of file.

    DIV container "drawing-screen"
        - HTML: hardcode.
        - CSS: must not change size when number of DIV "generated-divs" changes.

        DIVs "generated-divs"
            - JS:
                - use LOOP to generate a 16 x 16 grid of divs or user input number.
                - use LOOP to add a CSS class to each div to limit divs in each row.
                - mouse event: add or generate CSS modifier class to darken divs on hover.
                - mouse event: change to random colour if that option is toggled.
            - CSS:
                - Use Flexbox. Use grow/shrink flex basis for size changes?
                - Constrict the divs to their size, mind the margins and borders.

        END of DIVS "grid-generation"
    END of DIV container "drawing-screen"

    DIV "custom-grid-buttons"
        - use Flexbox to push them to either side of the container.

        BUTTON "btn-custom-grid-size"
        INPUT LABEL "custom-grid-size"
        BUTTON "multicolor-toggle"
        BUTTON "shake-toy" to reset the image? Could place above/below toy on page.

    END of DIV "custom-grid-buttons"
END of DIV container "toy-surface"
```

Right??

## PSEUDOCODE: GAME LOGIC

### Global Variables (grows as my pseudocode does)

```
const drawingScreen = DOC DIV "drawing-screen"
const customGridSize = DOC INPUT "custom-grid-size"
const btnCustomGridSize - DOC BUTTON "btn-custom-grid-size"

+ + + For rows that are 16 divs across + + +
const DEFAULT_GRID_SIZE = whatever value makes a 16 x 16 grid.

```

### CSS Classes (grows as my pseudocode does)

```
+ + + Global VAR colours + + +

"etch-a-sketch"
(container and possibly child items to apply common styles or effects)

"logo-gold"
(Etch-a-Sketch branded name on top of device)

"classic-red"
(container colour in that classic 70s-80s red)

"screen-grey"
(drawing screen)

"pen-gray"
(tracker, the "pen")

"knob-white"
(the "dials" that move the pen on the toy will be buttons for user)


+ + + Utility Classes + + +
"drawing-screen"
(where the user will "draw", and where generatedDivs live)

"generated-divs"
(to be used with generatedDivs in FUNCTION determineDivHeight)

```

### Calculate height % of generated divs for drawing screen

Purpose:

1. Determine the size of the DIV height according to the value in gridSize.
2. RETURN value to function that called it

In order to print the same number of gridSize DIVs across as gridSize DIVs down e.g. 16x x 16y, 100x x 100y. Grid x must equal grid y. Maybe a modifier class? Can I modify a single CSS class directly with a calculation, or do I need to create a new one?

```
FUNCTION determineDivHeight (PARAMETER gridSize)
    MAGIC:
        const calcDivHeight = gridSize
        **MAGIC CALCULATION** height % required for Flexbox to place gridSize's number of DIVs in one row of drawingScreen (is either user input or default value)
        RETURN result as INT

END OF FUNCTION
```

### Generate DIVs for Screen

Purpose:

1. create a LOOP and generate DIVs.
2. Give DIVs a class name for the utility/modifier class
3. Append DIVs to document

```
+ + + Variables Used + + +

GLOBAL:
const drawingScreen = DOC DIV "drawing-screen"
const DEFAULT_GRID_SIZE = whatever value makes a 16 x 16 grid.

SCOPE:
const gridSize = newGridSize
const divHeight = INVOKE FUNCTION determineDivHeight(PARAMETER gridSize)
let generatedDivs = DOC CREATE DIV (initialized in LOOP. Used "let" so that it can be manipulated later with colours)

+ + + LOGIC for grid generation: + + +

FUNCTION generateGrid (PARAMETER newGridSize = default value is DEFAULT_GRID_SIZE)

    const gridSize = newGridSize

    const divHeight = INVOKE FUNCTION determineDivHeight(PARAMETER gridSize)

    + + + Generate grid and print to web page + + +
    LOOP i times, where i is gridSize's value squared
        let generatedDivs = DOC CREATE DIV
        add the class name "generated-divs" to generatedDivs
        create class property for "generated-divs" with a height of divHeight
        append generatedDivs to drawingScreen
    END of LOOP

END OF FUNCTION
```

CSS - class for the grid with essential properties.

```
.generated-divs {
    background col is Etch-a-Sketch screen-grey
    width and padding-bottom are 25% according to https://iamsteve.me/blog/how-to-flexible-squares-with-css.
    the height will be added via JS to control the size using **MATH MAGIC** in FUNCTION determineDivHeight using the PARAMETER gridSize.
}
```

## PSEUDOCODE: EVENTS

### Resize DIVs for Drawing Screen grid from INPUT

JS - receive user input, then call generateGrid and pass in the user's custom grid size.

```
+ + + Variables + + +
GLOBAL:
const customGridSize = DOC INPUT "custom-grid-size"


+ + + EVENT LISTENER + + +

EVENT LISTENER for INPUT customGridSize (SUBMIT/CHANGE (PARAMETER event))
    const newGridSize = +event.target.value (convert to number with +, returns NaN if invalid number)

    IF newGridSize is isNaN (syntax: isNaN(newGridSize))
        RETURN error message containing value of newGridSize
    ELSE IF newGridSize is less than 4 or more than 100
        RETURN error message stating the grid size must be between 4 and 100, display value received
    END of IF STATEMENT

    FUNCTION CALL generateGrid(PARAMETER newGridSize)

END OF EVENT LISTENER


```

## At-a-Glance

I just need to see it in one place.

**EVENT LISTENER for INPUT customGridSize (SUBMIT/CHANGE (PARAMETER event))**  
// calls **generateGrid(newGridSize)** and passes in the user's custom grid size

**FUNCTION generateGrid (PARAMETER newGridSize)**  
// uses the **newGridSize value** (e.g. 16 or 100) to generate as many divs across the screen  
// calls **FUNCTION determineDivHeight (PARAMETER gridSize)**

//// **note:** the CSS class applied to each div constrains the number of divs per line to the same value (using a Flexbox trick), so we get a 16x16 or 100x100 grid.

**FUNCTION determineDivHeight (PARAMETER gridSize)**  
// called in **generateGrid**. Takes the value of gridSize and calculates the height. **generateGrid** uses it to pass in the height to a custom class to apply to each div in order to get the correct number of divs in each line on the Drawing Screen.  
// RETURNS result as INT

To be continued...  
(˶ᵔ ᵕ ᵔ˶)
