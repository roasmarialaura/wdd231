const myTown = document.querySelector('#town');
const weatherIcon = document.querySelector('#graphic');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');

const myKey = "dd2ad597b90da4faa5d0a07dd864eeff";
const myLat = "-31.421767911444732";
const myLong = "-64.1883058284601";

const myUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiFetch() {
    try {
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();

            displayResults(data);
        } else {
            throw Error(await response.text());
        }
        } catch (error) {
            console.log(error);
        }
}

function displayResults(data) {
  
    
    myTown.innerHTML = data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherIcon.setAttribute('SRC', iconsrc)
    weatherIcon.setAttribute('alt', data.weather[0].description)
}

apiFetch();
