const weatherData = document.querySelector('#form-1')
const search = document.querySelector('input')

const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const p3 = document.querySelector('#p3')
const p4 = document.querySelector('#p4')
const p5 = document.querySelector('#p5')
const p6 = document.querySelector('#p6')
const p7 = document.querySelector('#p7')
const p8 = document.querySelector('#p8')

weatherData.addEventListener('submit', (event) => {
    event.preventDefault()

    p1.textContent = '';
    p2.textContent = '';
    p3.textContent = '';
    p4.textContent = '';
    p5.textContent = '';
    p6.textContent = '';
    p7.textContent = '';
    document.getElementById("p8").src = "";


    const loc = search.value
    const url = 'http://localhost:3000/weather?address=' + loc
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return p1.textContent = data.error
            }

            p1.textContent = 'Location : ' + data.Location
            p2.textContent = 'Current Temperature : ' + data.Temperature + '°'
            p3.textContent = 'Currently feels like : ' + data.Feels + '°'
            p4.textContent = 'Weather type : ' + data.Type
            p5.textContent = 'Wind Speed : ' + data.WindSpeed + 'km/h'
            p6.textContent = 'Wind direction : ' + data.WindDirection
            p7.textContent = 'Day = ' + data.Time
            document.getElementById("p8").src = data.pic;




        })
    })
})