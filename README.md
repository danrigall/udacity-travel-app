# Project 5 - Travel App

## Table of Contents

* [Overview](#overview)
* [Getting Started](#getting-started)
* [Structure](#structure)
* [HTML](#html)
* [CSS](#css)
* [Javascript](#javascript)


## Overview
This is a Travel App that takes in 2 pieces of data (Destination & Date), then pulls from 3 different API's (Geonames, Weatherbit, & Pixabay) to create a 'Destination Post'. This will be heavily utilizing Webpack & Node.js.

## Getting Started
1. Create API credentials for Geonames, Weatherbit, and Pixabay.
2. **Test** your API credentials using the example url each API provides to make sure your key works.
3. Create .env file at the root of the project & populate with API credentials:
  i. Geonames: GEO_KEY=yourKeyHere
  ii. Weatherbit: WEATHER_KEY=yourKeyHere
  iii. Pixabay: PIX_KEY=yourKeyHere
4. Run 'npm install' to install all dependencies listed in package.json
5. If development is to be done:
  i. Use the 'npm run build-dev' command to start the development server.
  ii. Then start the express server using 'npm run start'
6. If you simply want to experience the majesty of the app:
  i. Start the express server using 'npm run start'
  ii. Then visit localhost:3031 in your browser.


## Structure
Much of the starting structure came from another of my Udacity projects (3-weather-app), then was adapted & changed. The file structure started with the 'src' folder, split up into the server folder & client folder which contains all of the original HTML, SASS, & JS. I also added a test folder containing all of the jest testing for JS functions. Then, when Webpack is run, a 'dist' folder is created and used for production.


## HTML
HTML for this project is fairly basic as of ver 1.0.0. Simple page header, form section, and a post section. The div with id="entry-holder" remains hidden until all data comes back from the server after it is called. Webpack does all the work to include styling and logic into the index file in the 'dist' folder. When this project is upgraded, the HTML may be even more simple as JS will do more of the DOM building.


## CSS
Styling for this project is fairly simple to make room for all of the JS logic and Webpack things happening. However, it is responsive to all different screen sizes. For development Sass(syntactically awesome style sheets) is used, and Webpack loads it up into the main.css file in the 'dist' folder. In future versions, the Sass will be more concise and beautiful - something I always do when I have the time.


## Javascript
All client-side JS is split up by function into individual files, then imported into the 'index.js' file. Webpack then packs it up & exports into its own 'Client' library. *One of the main things that distinguishes this project from my others is that much of the API logic is located server-side.* This was done in an attempt to clean up & separate client functionality vs server functionality.

[Back to Top](#table-of-contents)
