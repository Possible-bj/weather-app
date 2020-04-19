const form = document.querySelector('form')
const input = document.querySelector('input')
const msgOne = document.querySelector('#msg-one')
const msgTwo = document.querySelector('#msg-two')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = input.value
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    const url = '/weather?address=' + address
fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msgOne.textContent = data.error
        } else {
            msgOne.textContent = data.loaction
            msgTwo.textContent = data.forcast
            }
        })
    })
})

