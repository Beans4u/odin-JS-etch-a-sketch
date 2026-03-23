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

```
DIV container **"toy-surface"**

- HTML: hardcode.
- CSS: rounded corners, I want to style it with that retro 70s/80s red. For the vibes.

  HEADER: - HTML: H1 TEXT is "etch-a-sketch logo". - CSS: Import look-alike font for top of file.

  DIV container "drawing-screen" - HTML: hardcode. - CSS: must not change size when number of DIV "screen-pixels-default" changes.

       DIVs "screen-pixels-default"
           - JS:
               - use LOOP to generate a 16 x 16 grid of divs or user input number.
               - use LOOP to add a CSS class to each div to limit divs in each row.
               - mouse event: add or generate CSS modifier class to darken divs on hover.
               - mouse event: change to random colour if that option is toggled.
           - CSS:
               - Use Flexbox. Use grow/shrink flex basis for size changes?
               - Constrict the divs to their size, mind the margins and borders.

       END of DIVs "screen-pixels-default"

  END of DIV container "drawing-screen"

  DIV "custom-pixel-buttons" - use Flexbox to push them to either side of the container.

       BUTTON "btn-custom-pixel-size"
       INPUT LABEL "custom-pixel-size"
       BUTTON "multicolor-toggle"
       BUTTON "shake-toy" to reset the image? Could place above/below toy on page.

  END of DIV "custom-pixel-buttons"

END of DIV container "toy-surface"
```

Right??

## PSEUDOCODE: GAME LOGIC

### Global Variables (grows as my pseudocode does)

const `drawingScreen` = DOC DIV `"drawing-screen"`
const `customGridSize` = DOC INPUT `"custom-grid-size"`
const `btnCustomGridSize` - DOC BUTTON `"btn-custom-grid-size"`

**For rows that are 16 divs across**  
const `DEFAULT_GRID_SIZE` = whatever value makes a 16 x 16 grid.

### CSS Classes (grows as my pseudocode does)

Update: Implementing BEM architecture.

**BEM Reference:**  
Block: `.card`  
Element: `card__title`  
Modifier: `card--featured`  
Element Modifier: `card__button--primary`

**Note:** I'm going to wait until I finish figuring out the proper architecture before updating the naming conventions. (╥﹏╥)

**- - - Global VAR colours - - -**  
VAR colour `"logo-gold"`  
(Etch-a-Sketch branded name on top of device)

VAR colour `"classic-red"`  
(container colour in that classic 70s-80s red)

VAR colour `"screen-grey"`  
(drawing screen)

VAR colour `"pen-gray"`  
(tracker, the "pen")

VAR colour `"knob-white"`  
(the "dials" that move the pen on the toy will be buttons for user)

**- - - Utility Classes - - -**  
DIV `"logo"`  
(contains logo for positioning)

DIV `"etch-a-sketch"`  
(container and possibly child items to inherit common styles or effects)

DIV `"toy-surface"`  
(container and "frame" of Etch-a-Skech which will house BUTTONS and INPUT)

DIV `"drawing-screen"`  
(where the user will "draw", and where screenPixels live, possibly child items to inherit common styles or effects)

**- - - -Event Classes - - -**  
BUTTON `"btn-custom-pixel-size"`

LABEL `"custom-pixel-size"`

BUTTON`"multicolor-toggle"`

**- - - Modifier Classes - - -**  
DIV `"screen-pixels-default"`  
(to be used with screenPixels in FUNCTION determineDivHeight)

DIV `"screen-pixels-custom"`  
(to be used with screenPixels in FUNCTION generatePixels)

BUTTON`"shake-toy"`  
(reset the image, shake animation?)

### Calculate height % of generated divs (screen pixels) for drawing screen

Purpose:

1. Determine the size of the DIV height according to the value in `gridSize`.
2. RETURN value to function that called it

In order to print the same number of `gridSize` DIVs across as `gridSize` DIVs down e.g. 16x x 16y, 100x x 100y. Grid x must equal grid y. Maybe a modifier class? Can I modify a single CSS class directly with a calculation, or do I need to create a new one?

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
2. Give DIVs a class name for the utility class
3. Append DIVs to document

Update: I removed the class modification steps from the loop, I want to try inheriting from the parent class instead. Code economy and all that.

**- - - Variables Used - - - **

GLOBAL:
const `drawingScreen` = DOC DIV `"drawing-screen"`
const `DEFAULT_GRID_SIZE` = whatever value makes a 16 x 16 grid.

SCOPE:
const `gridSize` = `newGridSize`
const `divHeight` = INVOKE FUNCTION `determineDivHeight`(PARAMETER `gridSize`)
let `screenPixels` = DOC CREATE DIV (initialized in LOOP. Used "let" so that it can be manipulated later with colours)

**- - - Variables Used - - - **

```
FUNCTION generatePixels (PARAMETER newGridSize = default value is DEFAULT_GRID_SIZE)

    const gridSize = newGridSize

    const divHeight = INVOKE FUNCTION determineDivHeight(PARAMETER gridSize)

    + + + Generate grid and print to web page + + +
    LOOP i times, where i is gridSize's value squared
        let screenPixels = DOC CREATE DIV
        add the class name "screen-pixels-default"
        append screenPixels to drawingScreen
    END of LOOP

    RETURN add the class name "screen-pixels-custom"

END OF FUNCTION
```

#### CSS - class for the grid with essential properties.

```
 + *NOTE:* height and border are not inherited by child divs +
.drawing-screen {
    background col is Etch-a-Sketch screen-grey

}

+ *NOTE:* for sizing and borders, colour is inherited +

.screen-pixels-default {
    width and padding-bottom are 25% according to https://iamsteve.me/blog/how-to-flexible-squares-with-css.
    the height will be added via JS to control the size using **MATH MAGIC** in FUNCTION
    determineDivHeight using the PARAMETER gridSize.
}
```

## PSEUDOCODE: EVENTS

### Resize DIVs for Drawing Screen grid from INPUT

#### JS - send user input to `generatePixels`

**Purpose:**

1. Receive user input from LABEL `custom-grid-size`
2. Check for errors and convert to INT
3. Call `generated-pixels` and pass in INT to repaint `drawing-screen`

**Variables**

GLOBAL:  
const `customGridSize` = DOC INPUT `"custom-grid-size"`

**Event Listener**

```
EVENT LISTENER for INPUT customGridSize (SUBMIT/CHANGE (PARAMETER event))
    const newGridSize = +event.target.value
    (convert to number with +, returns NaN if invalid number)

    IF newGridSize is isNaN (syntax: isNaN(newGridSize))
        RETURN error message containing value of newGridSize
    ELSE IF newGridSize is less than 4 or more than 100
        RETURN error message stating the grid size must be between 4 and 100, display value received
    END of IF STATEMENT

    FUNCTION CALL generatePixels(PARAMETER newGridSize)

END OF EVENT LISTENER


```

## At-a-Glance

I just need to see it in one place.

**EVENT LISTENER for INPUT `customGridSize (SUBMIT/CHANGE (PARAMETER event))`**  
Calls `generatePixels(newGridSize)` and passes in the user's custom grid size

**FUNCTION `generatePixels` (PARAMETER `newGridSize`)**  
Uses the **`newGridSize` value** (e.g. 16 or 100) to generate as many divs across the screen  
Calls **FUNCTION `determineDivHeight` (PARAMETER `gridSize`)**

**note:** the CSS class applied to each div constrains the number of divs per line to the same value (using a Flexbox trick), so we get a 16x16 or 100x100 grid.

**FUNCTION `determineDivHeight` (PARAMETER `gridSize`)**  
Called in **generatePixels**. Takes the value of `gridSize` and calculates the height. **generatePixels** uses it to pass in the height to a custom class to apply to each div in order to get the correct number of divs in each line on the Drawing Screen.  
RETURNS result as INT

To be continued...  
`(˶ᵔ ᵕ ᵔ˶)`
