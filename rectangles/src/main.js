import RECTANGLES from "./input.json" assert { type: "json" };

// function to check if rectangles overlap
export function checkOverlap(rect1, rect2) {
  // check if rectangles overlap
  if (
    rect1.x + rect1.width > rect2.x && // rect1 right edge past rect2 left
    rect1.x < rect2.x + rect2.width && // rect1 left edge past rect2 right
    rect1.y + rect1.height > rect2.y && // rect1 top edge past rect2 bottom
    rect1.y < rect2.y + rect2.height
  ) {
    // rect1 bottom edge past rect2 top
    return true;
  }
  return false;
}

console.log(checkOverlap(RECTANGLES[0], RECTANGLES[1]));
