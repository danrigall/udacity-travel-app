// Express to run server and routes
const express = require('express');

// Start an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize main project folder
app.use(express.static('website'));

const port = 8000;

// Confirm that server is running
const server = app.listen(port,()=>{
  console.log(`Server running on localhost: ${port}`)
});

// Array to hold project data
const projectData = []

// Set up GET route
app.get('/all', (req, res)=> {
  res.send(projectData);
});

// Set up POST route
app.post('/add', addData);

function addData (req, res) {
  let newData = {
    date: req.body.date,
    temp: req.body.temp,
    thoughts: req.body.thoughts
  }
  console.log(newData)
  projectData.unshift(newData)
  res.send(projectData)
  console.log(projectData)
}
