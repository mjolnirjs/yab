import { createLogger } from '../src';

describe('createLogger', () => {
  createLogger();

  test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });
});
