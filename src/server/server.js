// Express to run server and routes
const express = require('express')

// API Credentials from environment file
const dotenv = require('dotenv')

dotenv.config()

// Start an instance of app
const app = express()

// Dependencies
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize main project folder
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

const port = 3030

// Confirm that server is running
const server = app.listen(port,()=>{
  console.log(`SERVER IS RUNNING on localhost: ${port}`)
})

// Arrays to hold project data
let weatherData = []
let geoData = []
let pixData = []

const addData = async (req, res) => {

  let inputData = {
    location: req.body.location,
    date: req.body.date
  }

  console.log(inputData)
  const monthDay = function() {
    let dateSplit = inputData.date.value.split('-') // *** Maybe don't need .value??? ***
    return (dateSplit[1] + '-' + dateSplit[2])
  }

  const userCode = process.env.USR_CODE
  const geoBaseURL = 'http://api.geonames.org/searchJSON?q=' // THEN NEED CITY NAME
  const geoAddURL = '&fuzzy=0.8&maxRows=10&username='

  const geoArr = await getGeonames(geoBaseURL + inputData.location + geoAddURL + userCode)
  // geoArr returns lng, lat, name(city name), adminName1(state) & countryName
  console.log(geoArr)
  geoData.unshift(geoArr.name + ' ,' + geoArr.adminName1 + ' ,' + geoArr.countryName)

  const weatherKey = process.env.WEATHER_KEY
  const weatherURL = 'https://api.weatherbit.io/v2.0/normals?' // THEN NEEDS LAT & LNG
  const latLong = `lat=${geoArr.lat}&lon=${geoArr.lng}`
  const weatherAddURL = `&start_day=${monthDay}&end_day=${monthDay}&tp=daily&key=`

  const weathArr = await getWeather(weatherURL + latLong + weatherAddURL + weatherKey)
  // weathArr returns max_temp, min_temp, precip, snow
  console.log(weathArr)
  weatherData.unshift({
    max: weathArr.max_temp,
    min: weathArr.min_temp,
    precip: weathArr.precip,
    snow: weathArr.snow
  })

  const pixKey = process.env.PIX_KEY
  const pixURL = `https://pixabay.com/api/?key=${pixKey}&q=${geoArr.name}&image_type=photo&orientation=horizontal&safesearch=true`
  getPix(pixURL)
}

const getGeonames = async (baseURL, location, addURL, user) => {
  const request = await fetch(baseURL + location + addURL + user);
    try {
        const geoInfo = await request.json()
        if (geoInfo.geonames.length == 0) {
          throw new Error('Geonames did not return any data')
        } else {
          return geoInfo.geonames[0];
        }
    } catch (error) {
        console.log("ERROR in Geo GET:", error);
    }
}

const getWeather = async (baseURL, coord, addURL, key) => {
  const request = await fetch(baseURL + coord + addURL + key);
    try {
        const weatherObj = await request.json()
        return weatherObj.data[0];
    } catch (error) {
        console.log("ERROR in Weather GET:", error);
    }
}

const getPix = async (url) => {
  const request = await fetch(url);
  try {
    const pixObject = await request.json()
    const pixSrc = pixObject.hits[0].webformatURL
    pixData.unshift(pixSrc)
    return pixSrc
  } catch (error) {
    console.log("ERROR in Pix GET:", error);
  }
}

// Set up GET route
app.get('/all', (req, res) => {
  res.send(weatherData, geoData, pixData);
});

// Set up POST route
app.post('/add', addData);
