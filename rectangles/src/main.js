const RECTANGLES = require("./input.json");

// function to check if rectangles overlap
function checkOverlap(rect1, rect2) {
  if (!rect1 || !rect2) throw new Error("Missing rectangle(s)");
  // The first rectangle is under the second or vice versa
  if (rect1.y + rect1.height < rect2.y || rect2.y + rect2.height < rect1.y) {
    return false;
  }
  // The first rectangle is to the left of the second or vice versa
  if (rect1.x + rect1.width < rect2.x || rect2.x + rect2.width < rect1.x) {
    return false;
  }
  // Rectangles overlap
  return true;
}

console.log(checkOverlap(RECTANGLES[0], RECTANGLES[1]));

module.exports = {
  checkOverlap,
};
