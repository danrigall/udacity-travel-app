// Import js files from 'client'
import { updateUI } from "./js/updateUI"
import { postInput } from "./js/postData"
import { dateDiff } from "./js/dateHandler"
import { handleSubmit } from "./js/eventHandler"

// Import styles from 'client'
import './styles/style.scss'

document.getElementById('generate').addEventListener('click', handleSubmit)
alert('I am the INDEX OF ALL JS & SCSS in client folder!!')

export {
    updateUI,
    postInput,
    dateDiff,
    handleSubmit
}
