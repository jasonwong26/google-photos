import { temp } from './temp';

describe('temp', () => {
  test('normal test', async () => {
    const output = await temp();
    expect(output).toEqual(1);
  })
})