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

const checkPix = async (geo) => {
  let pixObj = await getPix(encodeURI(geo.name + ', ' + geo.adminName1))
  console.log('*** CHECKING FOR PICTURE ***')
  const geoArr = [geo.adminName1, geo.countryName]
  let i = 0
  while (pixObj === undefined) {
    pixObj = await getPix(encodeURI(geoArr[i]))
    console.log('pixObj was checked & returned as:')
    console.log(pixObj)
    i++
    if (i > 1) {
      break;
    }
  }
  return pixObj
}

// Direct PUT data to inputData array
const handleInput = async (req, res) => {
  const userInput = {
    location: req.body.location,
    date: req.body.date
  }
  // ***
  // TODO: FIGURE OUT HOW TO HANDLE DIFFERENT LOCATIONS & INPUTS (IE. CZECH REPUBLIC INSTEAD OF CZECHIA)!!!!!!!!!!!!!!!
  // ***
  const geoObj = await getGeonames(userInput)
  const weatherObj = await getWeather(geoObj)
  const pixObj = await checkPix(geoObj)
  try {
    const allData = {
      geo: geoObj,
      weather: weatherObj,
      pix: pixObj,
    }
    res.send(allData)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

// Set up POST route
app.post('/add', handleInput);

// ***THIS IS CURRENTLY UNUSED***
// app.get('/all', (req, res));

// Fetch from Geonames API
const getGeonames = async (input) => {
  const geoKey = process.env.GEO_KEY
  console.log('Your geoKey is: ' + geoKey)
  const geoBaseURL = 'http://api.geonames.org/searchJSON?q='
  const geoAddURL = '&fuzzy=0.6&maxRows=10&username='
  console.log('input location is: ' + input.location)
  console.log(geoBaseURL + input.location + geoAddURL + geoKey)
  const request = await fetch(geoBaseURL + input.location + geoAddURL + geoKey)
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

// Fetch from Weatherbit API
const getWeather = async (geo) => {
  console.log('geoObj made it to getWeather:')
  console.log(geo)
  const weatherKey = process.env.WEATHER_KEY
  console.log('Your weatherKey is: ' + weatherKey)
  const weatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
  const latLong = `lat=${geo.lat}&lon=${geo.lng}&key=`
  console.log(weatherURL + latLong + weatherKey)
  const request = await fetch(weatherURL + latLong + weatherKey);
  try {
    const allWeather = await request.json()
    const weatherTop = allWeather.data[0];
    console.log(weatherTop)
    return weatherTop;
  } catch (error) {
    console.log("ERROR in Weather GET:", error);
  }
}

// TODO: FIND A BETTER PICTURE API!!!!
// Fetch from Pixabay API
const getPix = async (place) => {
  console.log('geoData made it to getPix: ' + place)
  const pixKey = process.env.PIX_KEY
  const pixURL = `https://pixabay.com/api/?key=${pixKey}&q=${place}&image_type=photo&orientation=horizontal&safesearch=true&category=travel&category=places&category=buildings`
  console.log(pixURL)
  const fetchPix = await fetch(pixURL);
  try {
    const results = await fetchPix.json()
    console.log('Output of getPix.hits[0] is:')
    console.log(results.hits[0])
    return results.hits[0]
  } catch (error) {
    console.log("ERROR in Pix GET:", error);
  }
}
