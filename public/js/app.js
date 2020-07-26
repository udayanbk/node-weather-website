const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()    
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    
        fetch('/weather?address='+searchTerm.value).then((response) => {
        response.json().then((data) => {

            if (data.connection_error){
                messageOne.textContent = data.connection_error
                messageThree.textContent = '"You are the sky. Everything else - it\'s just the weather"'

            }
            else if (!data.location){
                messageOne.textContent = data.error
                messageThree.textContent = '"Nothing succeeds like address.!!"  - Fran Lebowitz'
            }

            else if (data.location_error){
                messageOne.textContent = data.location_error
                messageThree.textContent = '"You are the sky. Everything else - it\'s just the weather"'
            
            }
            else{
                messageOne.textContent = 'You are viewing weather of '+data.location
                messageTwo.textContent = data.forecast
                messageThree.textContent = '"If your hate could be turned into electricity, it could light up the whole world."  - Nikola Tesla'
            }
        })
    })
})