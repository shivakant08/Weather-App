const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const errMsg = document.querySelector(".error");

const apiKey = "bc9ea5626305691d13507828a3d918c8";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const checkWeather = async function (city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    errMsg.style.display = "block";
    weather.style.display = "none";
  } else {
    const data = await response.json();
    console.log(data);
    cityName.innerHTML = data.name;
    temperature.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + " km/hr";

    if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Cloud") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    weather.style.display = "block";
    errMsg.style.display = "none";
  }
};

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
