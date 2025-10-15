function clickButton(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  searchCity(city);
}

function searchCity(city) {
  let ApiKey = `b6b9teed60a3b1boe04c53c54d1f6c3d`;
  //Current details
  let currentApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${ApiKey}&units=metric`;
  axios.get(currentApiUrl).then(displayCurrent);

  //Forecast details
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${ApiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecast);
}

function displayCurrent(response) {
  //Update city
  let cityElement = document.querySelector(".current-city");
  cityElement.innerHTML = response.data.city;

  //Update country
  let countryElement = document.querySelector(".current-country");
  countryElement.innerHTML = response.data.country;

  //Update condition
  let currentConditionElement = document.querySelector(".current-conditions");
  currentConditionElement.innerHTML = response.data.condition.description;

  //Update humidity
  let currentHumidityElement = document.querySelector(".current-humidity");
  currentHumidityElement.innerHTML = response.data.temperature.humidity;

  //Update wind
  let currentWindElement = document.querySelector(".current-wind");
  currentWindElement.innerHTML = response.data.wind.speed;

  //Update icon
  let currentIconElement = document.querySelector(".current-temperature-icon");
  currentIconElement.innerHTML = `<img src=${response.data.condition.icon_url}></img>`;

  //Update temperature
  let currentTempElement = document.querySelector(".current-temperature-value");
  currentTempElement.innerHTML = Math.round(response.data.temperature.current);

  getDayTime();
}

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

  let today = weekdays[now.getDay()];

  let date = now.getDate();
  let month = months[now.getMonth()];

  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = `${hours}:${minutes}`;

  let dayTime = `${today}, ${date} ${month}, ${time}`;

  displayDayTime(dayTime);
}

function displayDayTime(dayTime) {
  let currentDayTime = document.querySelector(".current-date-time");

  currentDayTime.innerHTML = `${dayTime}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let formattedDay = "";

  formattedDay = `${days[date.getDay()]} ${date.getDate()} ${
    months[date.getMonth()]
  }`;

  return formattedDay;
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
          <div class="forecast-day">
            <div class="forecast-date">${formatDay(day.time)}</div>
            <div class="forecast-icon">
            <img src=${day.condition.icon_url}></img></div>
            <div class="forecast-temperatures">
              <div class="minimum-temperature">
              ${Math.round(day.temperature.minimum)}°C</div>
              <div class="maximum-temperature">
              ${Math.round(day.temperature.maximum)}°C</div>
            </div>
            <div class="forecast-conditions">${day.condition.description}</div>
          </div>
          `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function displayCelcius() {}

function displayFarenheit() {}

searchCity("Sydney");

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", clickButton);
