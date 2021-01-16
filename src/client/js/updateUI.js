// Fetches gathered data from server & updates UI with it
function updateUI(data) {
  console.log('all data returned is:')
  console.log(data)
  const geonames = data.geo
  const weatherbit = Math.round(data.weather.precip * 10) / 10
  const pixabay = data.pix
  const postHolder = document.getElementById('all-posts')
  const newDiv = document.createElement('div');
  newDiv.classList.add('entry-holder');
  newDiv.innerHTML =`
      <img src="${pixabay.webformatURL}" alt="destination">
      <div class="stat-holder">
          <div class="wait-time"><i>${geonames.name}, ${Client.checkCountry(geonames)} is ${Client.dateDiff()} days away.</i></div>
          <h3>Typical weather for then is:</h3>
          <div class="temp">High: ${weatherbit.max_temp}&degC, Low: ${weatherbit.min_temp}&degC</div>
          <div class="precip">With a chance for ${weatherbit}mm of precipitation</div>
      </div>
  `;
  postHolder.appendChild(newDiv);
}

export { updateUI }
