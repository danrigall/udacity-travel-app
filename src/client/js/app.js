// Global Variables
import { load } from "dotenv/types";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

// Function to respond to the click only after rquirements are filled
function handleSubmit(evt) {
  evt.preventDefault()
  let location = document.getElementById('place').value
  let dateStr = document.getElementById('start').value

  console.log('Destination: ' + encodeURI(location))
  console.log('Departure: ' + dateStr)
  postInput('/add', { location: encodeURI(location), date: dateStr })

  // getTemp(baseURL, zipValue, apiKey)
  //   .then(function (temp) {
  //   console.log(temp)
  //   return postData('/add', { temp: temp, date: newDate, thoughts: feelings.value })
  //   })
    .then(function () {
    updateUI();
    })
}

const postInput = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(data),
  })
  try {
    const newData = await response.json();
    console.log(newData)
    return newData
  } catch (error) {
    console.log('ERROR in POST:', error);
  }
}

function dateDiff(input) {
  let str = input.split('-')
  let travelDate = new Date(str[0], str[1] - 1, str[2])
  const msDiff = Math.round((travelDate - newDate) / 1000 / 60 / 60 / 24 * 10) / 10
  return msDiff
}

// Async GET
// const getTemp = async (baseURL, zip, key)=>{
//   const request = await fetch(baseURL + zip + key);
//   try {
//     const allData = await request.json()
//     return allData["main"]["temp"];
//   } catch (error) {
//     console.log("ERROR in GET:", error);
//   }
// }

// Async POST
// const postData = async (url='', data={})=> {
//   const response = await fetch(url, {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {'Content-Type': 'application/json',},
//     body: JSON.stringify(data),
//   });
//   try {
//     const newData = await response.json();
//     return newData
//   } catch(error) {
//     console.log('ERROR in POST:', error);
//   }
// };

// Update UI after fetching needed data
const updateUI = async()=> {
  const request = await fetch('/all')
  try{
    const allData = await request.json()
    console.log(allData)
    document.getElementById('entryHolder').style.display = 'block'
    document.getElementByC('image').src = allData[0]
    document.getElementById('wait').innerHTML = allData[3] + ' is ' + dateDiff(dateStr) + 'days away'// TODO: Figure out math
    document.getElementById('temp').innerHTML = allData[1].max + allData[1].min
    document.getElementById('precip').innerHTML = allData[1].precip
    clearFields();
  } catch(error){
    console.log('ERROR in UI update:', error)
  }
}

// function clearFields() {
//   zip.value = ""
//   feelings.value = ""
//   zip.classList.remove('invalid')
//   feelings.classList.remove('invalid')
// }

// document.getElementById('generate').addEventListener('click', handleSubmit)

export { allMyFunctionsPlz }
