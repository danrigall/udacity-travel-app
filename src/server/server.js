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

// Direct PUT data to inputData array
const handleInput = async (req, res) => {
  const userInput = {
    location: req.body.location,
    date: req.body.date
  }
  // ***
  // TODO: FIGURE OUT HOW TO HANDLE DIFFERENT LOCATIONS & INPUTS!!!!!!!!!!!!!!!
  // ***

  const geoObj = await getGeonames(userInput)
  const weatherObj = await getWeather(geoObj)
  let pixObj = await getPix(geoObj.name, geoObj.adminName1)
  console.log('*** CHECKING FOR PICTURE ***')
  if (pixObj === undefined) {
    pixObj = await getPix(geoObj.adminName1, geoObj.countryName)
    console.log('pixObj was checked & changed to:')
    console.log(pixObj)
  }

  const allData = {
    geo: geoObj,
    weather: weatherObj,
    pix: pixObj,
  }

  res.send(allData)
}

// Set up POST route
app.post('/add', handleInput);

// Set up GET route
// ***THIS IS CURRENTLY UNUSED***
app.get('/all', (req, res));

// Fetch from Geonames API
const getGeonames = async (input) => {
  const geoKey = process.env.GEO_KEY
  console.log('Your geoKey is: ' + geoKey)
  const geoBaseURL = 'http://api.geonames.org/searchJSON?q='
  const geoAddURL = '&fuzzy=0.8&maxRows=10&username='
  console.log('input location is: ' + input.location)
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

// Fetch from Pixabay API
const getPix = async (place, area) => {
  const geoURI = encodeURI(`${place}, ${area}`)
  console.log('geoData made it to getPix: ' + geoURI)
  const pixKey = process.env.PIX_KEY
  console.log('Your pixKey is: ' + pixKey)
  const pixURL = `https://pixabay.com/api/?key=${pixKey}&q=${geoURI}&image_type=photo&orientation=horizontal&safesearch=true&category=travel&category=places&category=buildings`
  const fetchPix = await fetch(pixURL);
  console.log('*** CHECKING FOR PICTURE ***')
  try {
    const allPix = await fetchPix.json()
    console.log('Output of getPix.hits[0] is:')
    console.log(allPix.hits[0])
    return allPix.hits[0]
  } catch (error) {
    console.log("ERROR in Pix GET:", error);
  }
}
