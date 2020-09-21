import { checkCountry } from '../src/client/js/countryCheck'

describe("Testing the country check functionality", () => {
  test("Testing the checkCountry() function", () => {
    const input = {
      countryName: 'United States',
      adminName1: 'Maine'
    }
    const output = 'Maine'

    expect(checkCountry(input)).toBe('Maine');
  })
});
