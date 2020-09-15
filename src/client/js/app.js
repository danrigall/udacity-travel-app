// Global Variables

import { load } from "dotenv/types";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

// Function to respond to the click only after rquirements are filled
function handleSubmit(evt) {
  evt.preventDefault()
  let location = document.getElementById('place').value
  let date = document.getElementById('start').value

  console.log('Destination: ' + encodeURI(location))
  console.log('Departure: ' + date)

  postInput('/add', { location: encodeURI(location), date: date })

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

// Async GET
const getTemp = async (baseURL, zip, key)=>{
  const request = await fetch(baseURL + zip + key);
  try {
    const allData = await request.json()
    return allData["main"]["temp"];
  } catch (error) {
    console.log("ERROR in GET:", error);
  }
}

// Async POST
const postData = async (url='', data={})=> {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData
  } catch(error) {
    console.log('ERROR in POST:', error);
  }
};

// Update UI after fetching needed data
const updateUI = async()=> {
  const request = await fetch('/all')
  try{
    const allData = await request.json()
    console.log(allData)
    document.getElementById('entryHolder').style.display = 'block'
    document.getElementById('date').innerHTML = `<u>Date:</u> ${allData[0].date}`
    document.getElementById('temp').innerHTML = `<u>Temperature:</u> ${allData[0].temp}&deg`
    document.getElementById('content').innerHTML = allData[0].thoughts
    clearFields();
  } catch(error){
    console.log('ERROR in UI update:', error)
  }
}

function clearFields() {
  zip.value = ""
  feelings.value = ""
  zip.classList.remove('invalid')
  feelings.classList.remove('invalid')
}

document.getElementById('generate').addEventListener('click', handleSubmit)

export { allMyFunctionsPlz }
