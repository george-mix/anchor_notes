const wtf = (a: number, b: number) => {
  return a + b;
};

test("tt", () => {
  expect(wtf(2, 1)).toBe(3);
});
