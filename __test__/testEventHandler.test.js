import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import { handleSubmit } from '../src/client/js/eventHandler'

describe("Testing the event handler functionality", () => {
  test("Testing the handleSubmit() function with empty fields", () => {
    document.body.innerHTML = `
    <div id="start"></div>
    <div id="place"></div>
    <div id="generate"></div>
    `;
    document.getElementById('start').value = '';
    document.getElementById('place').value = '';

    const button = document.getElementById('generate');
    button.addEventListener('click', handleSubmit);

    let click = button.click();
    expect(handleSubmit(click)).toBeFalsy();
  })
})
