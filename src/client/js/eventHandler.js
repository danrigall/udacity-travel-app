import { updateUI } from "./updateUI"
import { postInput } from "./postData"
import { dateDiff } from "./dateHandler"

function handleSubmit(evt) {
  // evt.preventDefault() // Should this not be here?? Does it take away my HTML form qualifiers??
  let location = document.getElementById('place')
  let dateStr = document.getElementById('start')
  let dateStrVal = document.getElementById('start').value
  let locationURI = encodeURI(location.value)
  if (location.value.length <= 0 || dateStrVal.length <= 0) {
    location.classList.add('invalid');
    dateStr.classList.add('invalid');
    console.log('Invalid zip code entered!')
  } else {
    postInput('http://localhost:3031/add', { location: locationURI, date: dateStrVal })
      .then(updateUI())
    location.classList.remove('invalid');
    dateStr.classList.remove('invalid');
  }
}

export {
  updateUI,
  postInput,
  dateDiff,
  handleSubmit
}
