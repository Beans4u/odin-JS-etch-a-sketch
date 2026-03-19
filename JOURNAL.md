# Journal

Rin's scratch pad. Getting my mind wrapped around the project specifications, constraints, and a place to explore problems.

## Project Objectives

## Constraints

**App behaviour and parameters**

- Etch-a-Sketch must be a 16 × 16 grid of square divs within a container div (Etch-a-Sketch "pad").
- All grid squares (divs) must be generated via JavaScript (no HTML placeholders - this reminds me of the Mario exercise in the Harvard CS50 video I saw).
- Use Flexbox to display the grid layout (vs CSS Grid).
- Button changes grid number based on user input to a max grid size 100.
- Custom user grid removes the existing grid and generates a new grid with user's custom number in the same space.
- Grid must remain within a fixed total size regardless of square count.
- Ensure square sizing remains consistent (e.g. borders/margins may interfere).
- Implement a hover interaction that changes square opacity
- _Optional:_ Implement a hover interaction that changes square to a random colour.
- _Optional:_ Add progressive darkening per interaction, fully dark after 10 interactions.

## Design

An Etch-a-Sketch is a mechanical drawing toy that has a red plastic frame, a light gray screen, and two knobs for drawing. Turning the knobs moves a stylus that moves behind the screen, making the screen turn a darker grey wherever it goes. The screen is reset by shaking the device.

**Header (h1)**  
Find a font that looks similar to the Etch-a-Sketch font that's above the toy screen. I could rename it to avoid copyright issues, though I really don't think I need to worry about that.

**Container:**  
Make the grid container div have a huge "Etch-a-Sketch red" border with rounded corners, or maybe we need to get into a nested div situation.

**Screen:**  
Make the colour "Etch-a-Sketch screen-grey".
Div borders: I won't use any. I don't see them on the Etch-a-Sketch toy.

**Tracker (the "pen")**  
Make the colour "Etch-a-Sketch pen-grey".

**Knobs (Buttons)**  
The knobs are useless here, but I can use them as "buttons" for the screen to resize the grid, and the other to add multicolour options. This might work if I use nested divs for the container instead of a chonky border. Hummm.

Make the colour "Etch-a-Sketch knob-white"

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

    HEADER:
        - HTML: H1 TEXT is "Etch-a-Sketch".
        - CSS: Import look-alike font at top of file.

    DIV container "grid-container"
        - HTML: hardcode.
        - CSS: must not change size when number of DIV "generated-divs" changes.

        DIVs "generated-divs"
            - JS:
                - use LOOP to generate a 16 x 16 grid of divs or user input number.
                - use LOOP to add a CSS class to each div to limit divs in each row.
                - mouse event: add or generate CSS modifier class to darken divs on hover using a calculation.
                - mouse event: change to random colour if that option is toggled.
            - CSS:
                - Use Flexbox. Use grow/shrink flex basis for size changes?
                - Constrict the divs to their size, mind the margins and borders.

        END of DIVS "grid-generation"
    END of DIV container "grid-container"

    DIV "custom-grid-buttons"
        - use Flexbox to add space between.

        BUTTON "grid-size"
        INPUT LABEL "grid-size"
        BUTTON "multicolor-toggle"

    END of DIV "custom-grid-buttons"
END of DIV container "toy-surface"
```

Right??

### JS: Generate DIVs

```
**Variables**
const gridContainer = DOC "grid-container"


**LOGIC for grid generation:**
    LOOP on the condition that there are <== 16 across and 16 down (may need to adjust/split into two loops for 16 rows and 16 divs per row)
        generatedDivs = CREATE DIV
        add class name "generated-divs"
        append to screen
    END of LOOP





```

To be continued...  
(˶ᵔ ᵕ ᵔ˶)
