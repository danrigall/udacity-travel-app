// POST input data to server
const postInput = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(data),
  })
  try {
    const newData = await response.json();
    console.log('newData in postInput function is:')
    console.log(newData)
    Client.updateUI(newData)
  } catch (error) {
    console.log('ERROR in POST:', error);
  }
}

export { postInput }
