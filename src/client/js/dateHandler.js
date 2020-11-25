// Calculates difference between current & departing dates
function dateDiff() {
  let dateStrVal = document.getElementById('start').value
  let todayDate = new Date()
  let str = dateStrVal.split('-')
  let travelDate = new Date(str[0], str[1] - 1, str[2])
  const msDiff = Math.round((travelDate - todayDate) / 1000 / 60 / 60 / 24 * 10) / 10
  return msDiff
}

export { dateDiff }
