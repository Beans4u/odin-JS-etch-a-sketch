# Commit Planning Document

This document outlines a planned workflow for this project, with carefully-planned atomic commits to follow Git best practices as directed by The Odin Project: [Commit Messages](https://www.theodinproject.com/lessons/foundations-commit-messages) lesson.

**Discovery:** best practices for git commit messages using below format:

```
<type>(<scope>): <short, imperative description>

[optional body: context, motivation, or reasoning]
```

## Commit Message Workflow Plan: JS only

By this point, I was able to go by vibe (though still looking up verbiage for almost every commit), so I'm starting at the JavaScript file.

I am thinking about the best way to do this, and I've been reading about top-down and bottom-up approaches.

### Add global variables

**Commit 1:** _Constants, global state, DOM elements_

feat(logic): define global state and query selectors

### Add helper functions

**Commit 1:** _calculatePixelHeight() & getColors()_

feat(logic): impl grid calc and color gen helpers

### Add main logic (generate and remove pixels)

**Commit 1:** _generatePixels() & removePixels()_

feat(logic): impl grid generation and clear logic

### Add Event Listeners

**Commit 1:** _handleCustomScreenResolution & handleToggleMulticolor_

feat(events): wire up resolution, toggle listeners

**Commit 2:** _handlePaintPixels_

feat(events): wire up paint event listener

**Commit 3:** _handleShakeToy_

feat(events): add shake-to-erase functionality

### Debugging (fixes)

**Commit 1**
TBD
