import fetch, { Response } from 'node-fetch';
jest.mock('node-fetch');

import { updateUI } from '../src/client/js/updateUI'

describe("Testing if UI updates correctly", () => {

  test("Testing 'updateUI' function...", () => {

    expect(updateUI()).resolves.toThrow(Error)
    expect(fetch).toHaveBeenCalledTimes(1);
  })
});
