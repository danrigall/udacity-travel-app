import { dateDiff } from "./dateHandler"

const updateUI = async () => {
  const request = await fetch('http://localhost:3031/all')
  try {
    const allData = await request.json()
    console.log('allData returned is:')
    console.log(allData)
    document.getElementById('entry-holder').style.display = 'block'
    document.getElementById('image').src = allData[2]
    document.getElementById('wait').innerHTML = allData[1].name + ' is ' + dateDiff() + 'days away'
    document.getElementById('temp').innerHTML = 'Max Temp: ' + allData[0].max + 'Min Temp: ' + allData[0].min
    document.getElementById('precip').innerHTML = 'Normally there is about ' + allData[0].precip + 'mm of precipitation'
  } catch (error) {
    console.log('ERROR in UI update:', error)
  }
}

export { updateUI }
