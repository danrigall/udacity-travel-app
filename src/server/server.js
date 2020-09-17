// Express to run server and routes
const express = require('express')

// API Credentials from environment file
const dotenv = require('dotenv')
dotenv.config()

// Start an instance of app
const app = express()

// Dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const fetch = require('node-fetch');

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize main project folder
app.use(express.static('website'))

console.log(__dirname)

app.get('/', function (req, res) {
  res.sendFile('website/index.html')
})

const port = 3031

// Confirm that server is running
const server = app.listen(port, () => {
  console.log(`SERVER IS RUNNING on localhost: ${port}`)
})

// Arrays to hold project data
let weatherData = []
let geoData = []
let pixData = []
let inputData = []

const monthDay = function () {
  let dateSplit = inputData[0].date.split('-') // *** Maybe need .value??? ***
  return (dateSplit[1] + '-' + dateSplit[2])
  console.log('Date w/o year: ' + (dateSplit[1] + '-' + dateSplit[2]))
}

const handleData = async (req, res) => {

  let userInput = {
    location: req.body.location,
    date: req.body.date
  }

  inputData.unshift(userInput)
  console.log('Location input is: ' + inputData[0].location)
  console.log('Post Response is: ')
  console.log(res)
  const geoArr = await getGeonames()
  getWeather(geoArr)
  getPix(geoArr)
  res.send(weatherData, geoData, pixData)
}

const getGeonames = async () => {
  const userCode = process.env.USR_CODE
  console.log('Geonames user code: ' + userCode)
  const geoBaseURL = 'http://api.geonames.org/searchJSON?q=' // THEN NEED CITY NAME
  const geoAddURL = '&fuzzy=0.8&maxRows=10&username='
  const location = inputData[0].location
  console.log('Location in GeonamesGet is: ' + location)
  const request = await fetch(geoBaseURL + location + geoAddURL + userCode);
  try {
    const geoInfo = await request.json()
    if (geoInfo.geonames.length == 0) {
      throw new Error('Geonames did not return any data')
    } else {
      const geoArr = geoInfo.geonames[0];
      console.log(geoArr)
      geoData.unshift(geoArr.name + ' ,' + geoArr.adminName1 + ' ,' + geoArr.countryName)
      return geoArr;
      // geoData.unshift(geoArr)
    }
  } catch (error) {
    console.log("ERROR in Geo GET:", error);
  }
}

const getWeather = async (geoArr) => {
  console.log('GeoObj made it to getWeather: ' + geoArr.adminName1)
  const weatherKey = process.env.WEATHER_KEY
  const weatherURL = 'https://api.weatherbit.io/v2.0/normals?' // THEN NEEDS LAT & LNG
  const latLong = `lat=${geoArr.lat}&lon=${geoArr.lng}`
  console.log('monthDay func is: ' + monthDay())
  const weatherAddURL = `&start_day=${monthDay()}&end_day=${monthDay()}&tp=daily&key=`
  const request = await fetch(weatherURL + latLong + weatherAddURL + weatherKey);
  try {
    const weatherObj = await request.json()
    // return weatherObj.data[0];
    const weatherTop = weatherObj.data[0];
    console.log(weatherTop)
    weatherData.unshift({
      max: weatherTop.max_temp,
      min: weatherTop.min_temp,
      precip: weatherTop.precip,
      snow: weatherTop.snow
    })
  } catch (error) {
    console.log("ERROR in Weather GET:", error);
  }
}

const getPix = async (geoArr) => {
  const pixKey = process.env.PIX_KEY
  const pixURL = `https://pixabay.com/api/?key=${pixKey}&q=${geoArr.name}&image_type=photo&orientation=horizontal&safesearch=true`
  const request = await fetch(pixURL);
  try {
    const pixObject = await request.json()
    const pixSrc = pixObject.hits[0].webformatURL
    console.log(pixSrc)
    pixData.unshift(pixSrc)
    // return pixSrc
  } catch (error) {
    console.log("ERROR in Pix GET:", error);
  }
}

// Set up GET route
app.get('/all', (req, res) => {
  res.send(weatherData, geoData, pixData);
});

// Set up POST route
app.post('/add', handleData);
