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
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
  res.sendFile('index.html')
})

// Set port for server
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

// Direct PUT data to inputData array
function handleInput(req, res) {

  let userInput = {
    location: req.body.location,
    date: req.body.date
  }

  inputData.unshift(userInput)
}

// Set up POST route
app.post('/add', handleInput);

// Set up GET route
app.get('/all', async (req, res) => {
  handleGet()
    .then(function () {
      console.log('Returning allData object: ')
      console.log({
        geonames: geoData[0],
        weatherbit: weatherData[0],
        pixabay: pixData[0].webformatURL
      })
      res.send({
        geonames: geoData[0],
        weatherbit: weatherData[0],
        pixabay: pixData[0].webformatURL
      })
    })
});

// Function to call all API's in order when called by client GET
const handleGet = async () => {
  const geoObj = await getGeonames()
  geoData.unshift(geoObj)

  const weatherObj = await getWeather()
  weatherData.unshift(weatherObj)

  const pixObj = await getPix(`${geoData[0].name}, ${geoData[0].adminName1}`)
  await checkPix()
}

// Fetch from Geonames API
const getGeonames = async () => {
  const geoKey = process.env.GEO_KEY
  console.log('Your geoKey is: ' + geoKey)
  const geoBaseURL = 'http://api.geonames.org/searchJSON?q='
  const geoAddURL = '&fuzzy=0.8&maxRows=10&username='
  const location = inputData[0].location

  const request = await fetch(geoBaseURL + location + geoAddURL + geoKey)
  try {
    const allGeo = await request.json()
    if (allGeo.geonames.length == 0) {
      throw new Error('Geonames did not return any data')
    } else {
      const geoFirst = allGeo.geonames[0]
      return geoFirst;
    }
  } catch (error) {
    console.log("ERROR in Geo GET:", error);
  }
}

// Function to separate month & day out of Date
const monthDay = function () {
  let dateSplit = inputData[0].date.split('-')
  return (dateSplit[1] + '-' + dateSplit[2])
  console.log('Date w/o year: ' + (dateSplit[1] + '-' + dateSplit[2]))
}

// Fetch from Weatherbit API
const getWeather = async () => {
  console.log('geoData[0] made it to getWeather: ' + geoData[0].name)
  const weatherKey = process.env.WEATHER_KEY
  console.log('Your weatherKey is: ' + weatherKey)
  const weatherURL = 'https://api.weatherbit.io/v2.0/normals?'
  const latLong = `lat=${geoData[0].lat}&lon=${geoData[0].lng}`
  const weatherAddURL = `&start_day=${monthDay()}&end_day=${monthDay()}&tp=daily&key=`
  const request = await fetch(weatherURL + latLong + weatherAddURL + weatherKey);
  try {
    const allWeather = await request.json()
    const weatherTop = allWeather.data[0];
    console.log(weatherTop)
    return weatherTop;
  } catch (error) {
    console.log("ERROR in Weather GET:", error);
  }
}

// Fetch from Pixabay API
const getPix = async (place) => {
  const geoURI = encodeURI(place)
  console.log('geoData made it to getPix: ' + geoURI)
  const pixKey = process.env.PIX_KEY
  console.log('Your pixKey is: ' + pixKey)
  const pixURL = `https://pixabay.com/api/?key=${pixKey}&q=${geoURI}&image_type=photo&orientation=horizontal&safesearch=true&category=travel&category=places&category=buildings`
  const fetchPix = await fetch(pixURL);
  try {
    let allPix = await fetchPix.json()
    pixData.unshift(allPix.hits[0])
    console.log('Output of getPix.hits[0] is:')
    console.log(allPix.hits[0])
    return allPix.hits[0]
  } catch (error) {
    console.log("ERROR in Pix GET:", error);
  }
}

// Function to keep looking if Pixabay does not return valid picture
const checkPix = async () => {
  console.log('*** CHECKING FOR PICTURE ***')
  const geoArr = [geoData[0].adminName1, geoData[0].countryName]
  let i = 0
  while (pixData[0] === undefined) {
    const pixObj = await getPix(geoArr[i])
    console.log('pixObj was checked & returned as:')
    console.log(pixData[0])
    i++
    if (i > 1) {
      break;
    }
  }
}
