const apikey = "6d9504d804c2b9f2c86b7f34f324f4da";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// GET WEATHER
async function getWeather(url) {
  try {
    cityName.innerHTML = "Loading...";

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      cityName.innerText = "City Not Found";
      return;
    }
    cityName.innerText = data.name;

    temperature.innerText = `${Math.round(data.main.temp)}°C`;

    description.innerText = data.weather[0].description;

    feelsLike.innerText = `🌡Feels Like : ${data.main.feels_like}°C`;

    humidity.innerText = `💧Humidity : ${data.main.humidity}%`;

    wind.innerText = `🌬 Wind : ${data.wind.speed}m/s`;

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // CHANGE WEATHER
    let weather = data.weather[0].main;

    if (weather === "Clear") {
      document.body.style.background =
        "linear-gradient(135deg,#f6d365,#fda085)";
    } else if (weather === "Rain") {
      document.body.style.background =
        "linear-gradient(135deg,#4facfe,#00f2fe)";
    } else if (weather === "Clouds") {
      document.body.style.background =
        "linear-gradient(135deg,#bdc3c7,#2c3e50)";
    }
  } catch (error) {
    console.log(error);
  }
}

// SEARCH WEATHER
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Enter the City!");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  getWeather(url);
});

// ENTER KEY
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// CURRENT LOCATION
locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    getWeather(url);
  });
});
