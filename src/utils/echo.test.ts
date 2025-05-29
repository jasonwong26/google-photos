import { echo } from './echo';

describe('echo', () => {
  test('normal test', () => {
    const output = echo();
    expect(output).toEqual(1);
  })
})