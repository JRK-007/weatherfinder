//------- Const for API Key -------//
const apiKey = 'ur api key';  // Always replace with your actual OpenWeatherMap API key

//------- Async/Await with Fetch -------//
async function getWeather() {
    //------- Template Literals and Const -------//
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try 
    {
        //------- Await with Fetch -------//
        const response = await fetch(url);
        if (!response.ok) {
            //------- Throw in Async/Await Context -------//
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        //------- Destructuring JSON Response -------//
        const data = await response.json();
        displayWeather(data);
    }

    catch (error) 
    {
        console.error('Failed to fetch weather data:', error);
        alert('Failed to fetch weather data.');
    }
}

function displayWeather(data) {
    //------- Destructuring for Easier Access to Nested Data -------//
    const { main: { temp, humidity }, weather, wind: { speed }, sys: { country }, name } = data;
    const [{ main: weatherMain, description, icon }] = weather;  // Nested Destructuring

    //------- Const for DOM Manipulation -------//
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data.cod !== 200) {
        weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    //------- Template Literals for HTML Generation -------//
    const weatherHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Weather: ${weatherMain} (${description})</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${speed} m/s</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
    `;
    weatherDisplay.innerHTML = weatherHTML;
}
