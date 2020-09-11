// Express to run server and routes
const express = require('express')

// API Credentials from environment file
const dotenv = require('dotenv')

dotenv.config()
const apiKey = process.env.API_KEY
const userCode = process.env.USR_CODE


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

const port = 8080

// Confirm that server is running
const server = app.listen(port,()=>{
  console.log(`SERVER IS RUNNING on localhost: ${port}`)
})

// Arrays to hold project data
const geoData = []

// Set up GET route
app.get('/all', (req, res)=> {
  res.send(projectData);
});

// Set up POST route
app.post('/add', addData);

const addData = async (req, res) => {
  let newData = {
    location: req.body.location,
    date: req.body.date
  }
  const geoBaseURL = 'http://api.geonames.org/searchJSON?q='
  const geoAddURL = '&fuzzy=0.8&maxRows=10&username='
  console.log(newData)
  projectData.unshift(newData)
  const geoObj = await getGeoObj(geoBaseURL + newData.location + geoAddURL + userCode))
    .then(getWeather())
  // res.send(projectData)
  // console.log(projectData)
}

const getGeoObj = async (baseURL, location, addURL, user) => {
  const request = await fetch(baseURL + location + addURL + user);
    try {
        const geoObj = await request.json()
        return geoObj.[0];
    } catch (error) {
        console.log("ERROR in GET:", error);
    }
}

const getWeather = async () => {
    const request = await fetch(geoURL);
    try {
        const geoObj = await request.json()
        return geoObj.[0];
    } catch (error) {
        console.log("ERROR in GET:", error);
    }
}
