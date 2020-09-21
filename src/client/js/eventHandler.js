// Handles the click & calls the other functions
function handleSubmit(evt) {
  let location = document.getElementById('place')
  let dateStr = document.getElementById('start')
  let dateStrVal = document.getElementById('start').value
  let locationURI = encodeURI(location.value)
  if (location.value.length <= 0 || dateStrVal.length <= 0) {
    location.classList.add('invalid');
    dateStr.classList.add('invalid');
    console.log('All fields must be filled!')
    return false
  } else {
    Client.postInput('http://localhost:3031/add', { location: locationURI, date: dateStrVal })
      .then(Client.updateUI())
    location.classList.remove('invalid');
    dateStr.classList.remove('invalid');
    return true
  }
}

export { handleSubmit }
