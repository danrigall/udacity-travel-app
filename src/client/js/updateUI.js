import { dateDiff } from "./dateHandler"

const updateUI = async () => {
  const request = await fetch('http://localhost:3031/all')
  try {
    const allData = await request.json()
    const geonames = allData.geonames
    const weatherbit = allData.weatherbit
    const pixabay = allData.pixabay
    console.log('allData returned is:')
    console.log(allData)
    document.getElementById('entry-holder').style.display = 'flex'
    document.getElementById('image').src = pixabay
    document.getElementById('wait').innerHTML = `<i>${geonames.name}, ${geonames.countryName} is ${dateDiff()} days away.</i>`
    document.getElementById('temp').innerHTML = `High - ${weatherbit.max_temp}&degC, Low - ${weatherbit.min_temp}&degC`
    document.getElementById('precip').innerHTML = `With a chance for ${weatherbit.precip}mm of precipitation`
  } catch (error) {
    console.log('ERROR in UI update:', error)
  }
}

export { updateUI }
