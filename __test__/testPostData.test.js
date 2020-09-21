import fetch, { Response } from 'node-fetch';
jest.mock('node-fetch');

import { postInput } from '../src/client/js/postData'

describe("Testing the posting of the data", () => {

  test("Test 'postInput' function to make a successful post", async () => {

    const url = 'http://localhost:3031/add'
    const object = { location: 'Paris', date: '2020-10-10' }

    await postInput(url, object)
    expect(fetch).toHaveBeenCalledTimes(1);
  })
});
