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
    document.getElementById('entry-holder').style.display = 'block'
    document.getElementById('image').src = pixabay
    document.getElementById('wait').innerHTML = `${geonames.name}, ${geonames.adminName1}, ${geonames.countryName} is ${dateDiff()} days away.`
    document.getElementById('temp').innerHTML = `High is expected to be: ${weatherbit.max_temp}&degC. Low is is expected to be: ${weatherbit.min_temp}&degC`
    document.getElementById('precip').innerHTML = `Normally there is about ${weatherbit.precip}mm of precipitation`
  } catch (error) {
    console.log('ERROR in UI update:', error)
  }
}

export { updateUI }
