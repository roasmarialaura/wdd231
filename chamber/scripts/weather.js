const myTown = document.querySelector('#town');
const weatherIcon = document.querySelector('#graphic');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');

const myKey = "dd2ad597b90da4faa5d0a07dd864eeff";
const myLat = "-31.421767911444732";
const myLong = "-64.1883058284601";

const myUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

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
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherIcon.setAttribute('SRC', iconsrc)
    weatherIcon.setAttribute('alt', data.weather[0].description)
}

async function getForecast() {

    try {
        const response = await fetch(forecastUrl);

        if (!response.ok) {
            throw new Error("Forecast request failed");
        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {
        console.error("Forecast error:", error);
    }
}

function displayForecast(data) {
    const forecastContainer = document.querySelector("#forecast");

    forecastContainer.innerHTML = "";

    const dailyForecast = data.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    dailyForecast.forEach(day => {

        const date = new Date(day.dt_txt);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const temperature = Math.round(day.main.temp);

        const description = day.weather[0].description;

        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        forecastContainer.innerHTML += `
            <div class="forecast-day">
                <h3>${dayName}</h3>
                <img src="${icon}" alt="${description}">
                <p>${temperature}&deg;F</p>
                <p>${description}</p>
            </div>
        `;
    });
    
    
}



apiFetch();

getForecast();
