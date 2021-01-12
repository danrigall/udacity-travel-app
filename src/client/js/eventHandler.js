import { dateDiff } from "./dateHandler";

// Handles the click & calls the other functions
function handleSubmit(evt) {
  const location = document.getElementById('place')
  const dateStr = document.getElementById('start')
  const dateStrVal = dateStr.value
  const locationURI = encodeURI(location.value)
  if (location.value.length <= 0 || dateStrVal.length <= 0) {
    location.classList.add('invalid');
    dateStr.classList.add('invalid');
    console.log('All fields must be filled!')
    return false
  } else if (Client.dateDiff() > 16.5) {
    dateStr.classList.add('invalid');
    console.log(Client.dateDiff());
    alert('You must travel less than 16 days from now!');
    return false
  } else {
    Client.postInput('http://localhost:3031/add', { location: locationURI, date: dateStrVal })
      // .then(Client.updateUI())
    location.classList.remove('invalid');
    dateStr.classList.remove('invalid');
    return true
  }
}

export { handleSubmit }
