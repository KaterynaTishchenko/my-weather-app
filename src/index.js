function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function search(city) {
  let apiKey = "b2dacf6390f21b407d2974cf4a1cc996";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showtemperature);
}

function changeCity(event) {
  event.preventDefault();

  let city = document.querySelector("#form-conrol-engine").value;
  search(city);
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday"];

  dailyForecast.forEach(function (dailyForecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-3 day">
              <span class="day-name">${formatDay(dailyForecastDay.dt)}</span>
              <img
                src="http://openweathermap.org/img/wn/${
                  dailyForecastDay.weather[0].icon
                }@2x.png"
                alt = ""
                width = "64"
              />
              <div class="day-temp">
                <span class="max">${Math.round(
                  dailyForecastDay.temp.max
                )}°C </span>
                <span class="min">${Math.round(
                  dailyForecastDay.temp.min
                )}°C </span>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showtemperature(response) {
  document.querySelector("#current-city-country").innerHTML =
    response.data.name;

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let hum = Math.round(response.data.main.humidity);
  let description = response.data.weather[0].description;
  let windSpeed = response.data.wind.speed;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  let temp = document.querySelector("#temperature");
  let descr = document.querySelector("#description-weather");
  let humiditiInsideApp = document.querySelector("#humidity");
  let windInsideApp = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  temp.innerHTML = temperature;
  descr.innerHTML = description;
  humiditiInsideApp.innerHTML = hum;
  windInsideApp.innerHTML = windSpeed;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function currentPosition(event) {
  function handlePosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let apiKey = "b2dacf6390f21b407d2974cf4a1cc996";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showtemperature);
  }

  navigator.geolocation.getCurrentPosition(handlePosition);
}


let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let now = new Date();
let currentYear = now.getFullYear();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let celsiusTemperature = null;

let currentFullDate = `${currentDay} ${currentHours}:${currentMinutes}, ${currentMonth} ${currentDate}`;

let currentDateWeather = document.querySelector("#current-date-time");
currentDateWeather.innerHTML = currentFullDate;

let cityForm = document.querySelector("#weather-form-engine");
cityForm.addEventListener("submit", changeCity);


let buttonCurrentPosition = document.querySelector("#button-current-position");
buttonCurrentPosition.addEventListener("click", currentPosition);

search("Kyiv");
