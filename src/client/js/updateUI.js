// Fetches gathered data from server & updates UI with it
function updateUI(data) {
  console.log('all data returned is:')
  console.log(data)
  const precip = Math.round(data.weather.precip * 10) / 10
  const postHolder = document.getElementById('all-posts')
  const newDiv = document.createElement('div');
  newDiv.classList.add('entry-holder');
  newDiv.innerHTML =`
      <img src="${data.pix.webformatURL}" alt="destination">
      <div class="stat-holder">
          <div class="wait-time"><i>${data.geo.name}, ${Client.checkCountry(data.geo)} is ${Client.dateDiff()} days away.</i></div>
          <h3>Typical weather for then is:</h3>
          <div class="temp">High: ${data.weather.max_temp}&degC, Low: ${data.weather.min_temp}&degC</div>
          <div class="precip">With a chance for ${precip}mm of precipitation</div>
      </div>
  `;
  postHolder.appendChild(newDiv);
}

export { updateUI }
