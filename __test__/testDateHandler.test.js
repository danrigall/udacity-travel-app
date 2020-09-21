import { dateDiff } from '../src/client/js/dateHandler'

describe("Testing the date differentiator functionality", () => {
  test("Testing the dateDiff() function", () => {
    document.body.innerHTML = '<div id="start"></div>'
    let d = new Date()

    let tomorrow = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1)

    document.getElementById('start').value = tomorrow
    const output = 1

    expect(dateDiff()).toBeLessThan(output);
    expect(dateDiff()).toBeGreaterThan(0);
  })
});
