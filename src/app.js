function getDayTime() {
  let now = new Date();

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = weekdays[now.getDay()];

  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = `${hours}:${minutes}`;

  let dayTime = `${day} ${time}`;

  displayDayTime(dayTime);
}

function displayDayTime(dayTime) {
  let currentDayTime = document.querySelector(".current-date-time");

  currentDayTime.innerHTML = `${dayTime}`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  let ApiKey = `b6b9teed60a3b1boe04c53c54d1f6c3d`;
  //Current details
  let currentApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${ApiKey}&units=metric`;
  axios.get(currentApiUrl).then(displayCurrentResults);

  //Forecast details
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${ApiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecastResults);
}

function displayCurrentResults(response) {
  //Update city
  let cityElement = document.querySelector(".current-city");
  let searchCity = response.data.city;
  cityElement.innerHTML = searchCity;

  //Update country
  let countryElement = document.querySelector(".current-country");
  let searchCountry = response.data.country;
  countryElement.innerHTML = searchCountry;

  //Update condition
  let currentConditionElement = document.querySelector(".current-conditions");
  let searchCondition = response.data.condition.description;
  currentConditionElement.innerHTML = searchCondition;

  //Update humidity
  let currentHumidityElement = document.querySelector(".current-humidity");
  let searchHumidity = response.data.temperature.humidity;
  currentHumidityElement.innerHTML = searchHumidity;

  //Update wind
  let currentWindElement = document.querySelector(".current-wind");
  let searchWind = response.data.wind.speed;
  currentWindElement.innerHTML = searchWind;

  //Update temperature
  let currentTempElement = document.querySelector(".current-temperature-value");
  let searchTempValue = Math.round(response.data.temperature.current);
  currentTempElement.innerHTML = searchTempValue;

  console.log(response.data);
}

function displayForecastResults(response) {
  console.log(response.data);
}

function displayCelcius() {}

function displayFarenheit() {}

getDayTime();

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", search);
