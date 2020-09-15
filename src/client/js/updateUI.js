const updateUI = async (dateStr) => {
  const request = await fetch('https://localhost:3030/all')
  try {
    const allData = await request.json()
    console.log(allData)
    document.getElementById('entryHolder').style.display = 'block'
    document.getElementByC('image').src = allData[0]
    document.getElementById('wait').innerHTML = allData[3] + ' is ' + Client.dateDiff(dateStr) + 'days away'// TODO: Figure out math
    document.getElementById('temp').innerHTML = allData[1].max + allData[1].min
    document.getElementById('precip').innerHTML = 'Normally there is about ' + allData[1].precip + 'mm of precipitation'
  } catch (error) {
    console.log('ERROR in UI update:', error)
  }
}

export {updateUI}
