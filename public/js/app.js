const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()    
    // console.log(searchTerm.value)
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('http://localhost:3001/weather?address='+searchTerm.value).then((response) => {
    response.json().then((data) => {
        if (data.Location_error){
            // console.log(data.Location_error)
            messageOne.textContent = data.Location_error
            messageThree.textContent = '"You are the sky. Everything else - it\'s just the weather"'
           
        }
        else{
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = 'You are viewing weather of '+data.location
            messageTwo.textContent = data.forecast
            messageThree.textContent = '"May your day overflow with Love, Joy, Piece & Miracles..!!"'
        }
    })
})



})