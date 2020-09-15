function dateDiff(input) {
  let d = new Date()
  let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear()
  let str = input.split('-')
  let travelDate = new Date(str[0], str[1] - 1, str[2])
  const msDiff = Math.round((travelDate - newDate) / 1000 / 60 / 60 / 24 * 10) / 10
  return msDiff
}

export { dateDiff }
