import { updateUI } from "./updateUI"
import { postInput } from "./postData"
import { dateDiff } from "./dateHandler"

function handleSubmit(evt) {
  // evt.preventDefault() // Should this not be here?? Does it take away my HTML form qualifiers??
  let location = document.getElementById('place').value
  let dateStr = document.getElementById('start').value
  let locationURI = encodeURI(location)
  // TODO: Add qualifiers here!!!

  console.log('Destination: ' + locationURI)
  console.log('Departure: ' + dateStr)
  Client.postInput('https://localhost:3030/add', { location: locationURI, date: dateStr })
    .then(function () {
    Client.updateUI(dateStr);
    })
}

export {
  updateUI,
  postInput,
  dateDiff,
  handleSubmit
}
