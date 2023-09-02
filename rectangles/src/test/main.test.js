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

const testJson2 = [
  {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  },
  {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
  },
];

const testJson3 = [
  {
    x: 0,
    y: 0,
    width: -100,
    height: -100,
  },
  {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
  },
];

const testJson4 = [
  {
    x: 0,
    y: 0,
    width: -100,
    height: -100,
  },
  {
    x: -150,
    y: -150,
    width: 100,
    height: 100,
  },
];

const testJson5 = [
  {
    x: 100,
    y: 100,
    width: 100000,
    height: 100000,
  },
  {
    x: 50,
    y: 50,
    width: 1,
    height: 1,
  },
];

const testJson6 = [
  {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
];

const testJson7 = [
  {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  },
];

test("rectangles overlap", () => {
  expect(checkOverlap(testJson1[0], testJson1[1])).toBe(true);
});

test("rectangles dont overlap", () => {
  expect(checkOverlap(testJson2[0], testJson2[1])).toBe(false);
});

test("rectangles dont overlap", () => {
  expect(checkOverlap(testJson3[0], testJson3[1])).toBe(false);
});

test("rectangles dont overlap", () => {
  expect(checkOverlap(testJson4[0], testJson4[1])).toBe(false);
});

test("rectangles inside each other", () => {
  expect(checkOverlap(testJson5[0], testJson5[1])).toBe(false);
});

test("rectangles of size 0", () => {
  expect(checkOverlap(testJson6[0], testJson6[1])).toBe(false);
});

test("only one rectangle given", () => {
  expect(checkOverlap(testJson7[0], testJson7[1])).toBe(false);
});
