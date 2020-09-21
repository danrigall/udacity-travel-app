h// Calculates difference between current & departing dates
function dateDiff() {
  let dateStrVal = document.getElementById('start').value
  let newDate = new Date()
  let str = dateStrVal.split('-')
  let travelDate = new Date(str[0], str[1] - 1, str[2])
  const msDiff = Math.round((travelDate - newDate) / 1000 / 60 / 60 / 24 * 10) / 10
  return msDiff
}

export { dateDiff }
