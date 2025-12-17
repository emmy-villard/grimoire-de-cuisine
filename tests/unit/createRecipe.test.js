import { add } from './math.js';

describe('add', () => {
  it('additionne deux nombres', () => {
    expect(add(2, 3)).toBe(5);
  });
});