// Fetches gathered data from server & updates UI with it
const updateUI = async () => {
  const request = await fetch('http://localhost:3031/all')
  try {
    const allData = await request.json()
    const geonames = allData.geonames
    const weatherbit = allData.weatherbit
    const pixabay = allData.pixabay
    console.log('allData returned is:')
    console.log(allData)
    const postHolder = document.getElementById('all-posts')
    const newDiv = document.createElement('div');
    newDiv.classList.add('entry-holder');
    newDiv.innerHTML =`
        <img src="${pixabay}" alt="destination">
        <div class="stat-holder">
            <div class="wait-time"><i>${geonames.name}, ${Client.checkCountry(geonames)} is ${Client.dateDiff()} days away.</i></div>
            <h3>Typical weather for then is:</h3>
            <div class="temp">High: ${weatherbit.max_temp}&degC, Low: ${weatherbit.min_temp}&degC</div>
            <div class="precip">With a chance for ${weatherbit.precip}mm of precipitation</div>
        </div>
    `;
    postHolder.appendChild(newDiv);
  } catch (error) {
    console.log('ERROR in UI update:', error)
  }
}

export { updateUI }
