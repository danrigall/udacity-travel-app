// Import js files from 'client'
import { updateUI } from "./js/updateUI"
import { postInput } from "./js/postData"
import { dateDiff } from "./js/dateHandler"
import { checkCountry } from "./js/countryCheck"
import { handleSubmit } from "./js/eventHandler"

// Import styles from 'client'
import './styles/style.scss'
import './styles/header.scss'
import './styles/post.scss'

// Set up event listener for button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generate').addEventListener('click', handleSubmit);
})

export {
    updateUI,
    postInput,
    dateDiff,
    checkCountry,
    handleSubmit
}
