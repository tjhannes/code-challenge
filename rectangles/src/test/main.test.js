const { checkOverlap } = require("../main");

const testJson1 = [
  {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  },
  {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
  },
];

test("rectangles", () => {
  expect(checkOverlap(testJson1[0], testJson1[1])).toBe(true);
});
