var cityInputEl = document.querySelector("#city-name");
var historyArray = [];
var historyButtonsEl = document.querySelector("#history-buttons");
var historyCardEl = document.querySelector("#history");

var formHandler = function (event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    if (cityName) {
        historyArray.push(cityName);
        localStorage.setItem("weatherSearch", JSON.stringify(historyArray));
        var historyEl = document.createElement('button');
        historyEl.className = "btn";
        historyEl.setAttribute("cityData", cityName)
        historyEl.innerHTML = cityName;
        historyButtonsEl.appendChild(historyEl);
        historyCardEl.removeAttribute("style")
        getWeatherInfo(cityName);
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a City");
    }
}

var weatherEl = document.querySelector('#weather');
var weatherCardEl = document.querySelector("#weather-card");
var multiDayEl = document.querySelector("#multi-day");
var multiDayCardEl = document.querySelector("#multi-day-card");
var weatherConditionEl = document.querySelector('#weather-condition');
var today = new Date();

var getWeatherInfo = function (cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=f97301447cbd41068af8623a398ba1fb";
    fetch(apiUrl)
        .then(function (cityResponse) {
            return cityResponse.json();
        })
        .then(function (cityResponse) {
            console.log(cityResponse)
            var latitude = cityResponse.coord.lat;
            var longitude = cityResponse.coord.lon;         
            var city = cityResponse.name;
            var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            var weatherIcon = cityResponse.weather[0].icon;
            var weatherDescription = cityResponse.weather[0].description;
            var weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png' alt='" + weatherDescription + "' title='" + weatherDescription + "'  />"
            
            weatherEl.textContent = "";
            multiDayEl.textContent = "";
            weatherConditionEl.innerHTML = city + " (" + date + ") " + weatherIconLink;
            weatherCardEl.classList.remove("hidden");
            multiDayCardEl.classList.remove("hidden");

            return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=f97301447cbd41068af8623a398ba1fb');
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            displayWeather(response);
        });
};

var displayWeather = function (weather) {

      var temperature = document.createElement('p');
    temperature.id = "temperature";
    temperature.innerHTML = "<strong>Temperature:</strong> " + weather.current.temp.toFixed(1) + "°F";
    weatherEl.appendChild(temperature);

    var humidity = document.createElement('p');
    humidity.id = "humidity";
    humidity.innerHTML = "<strong>Humidity:</strong> " + weather.current.humidity + "%";
    weatherEl.appendChild(humidity);

    var windSpeed = document.createElement('p');
    windSpeed.id = "wind-speed";
    windSpeed.innerHTML = "<strong>Wind Speed:</strong> " + weather.current.wind_speed.toFixed(1) + " MPH";
    weatherEl.appendChild(windSpeed);

    var forecastArray = weather.daily;
    for (let i = 0; i < forecastArray.length - 3; i++) {
        var date = (today.getMonth() + 1) + '/' + (today.getDate() + i + 1) + '/' + today.getFullYear();
        var weatherIcon = forecastArray[i].weather[0].icon;
        var weatherDescription = forecastArray[i].weather[0].description;
        var weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png' alt='" + weatherDescription + "' title='" + weatherDescription + "'  />"
        var dayEl = document.createElement("div");
        dayEl.className = "day";
        dayEl.innerHTML = "<p><strong>" + date + "</strong></p>" +
            "<p>" + weatherIconLink + "</p>" +
            "<p><strong>Temp:</strong> " + forecastArray[i].temp.day.toFixed(1) + "°F</p>" +
            "<p><strong>Humidity:</strong> " + forecastArray[i].humidity + "%</p>"

        multiDayEl.appendChild(dayEl);
    }
}

var loadHistory = function () {
    searchArray = JSON.parse(localStorage.getItem("weatherSearch"));
    if (searchArray) {
        historyArray = JSON.parse(localStorage.getItem("weatherSearch"));
        for (let i = 0; i < searchArray.length; i++) {
            var historyEl = document.createElement('button');
            historyEl.className = "btn";
            historyEl.setAttribute("cityData", searchArray[i])
            historyEl.innerHTML = searchArray[i];
            historyButtonsEl.appendChild(historyEl);
            historyCardEl.removeAttribute("style");
        }
    }
}

var buttonClickHandler = function (event) {
    var cityName = event.target.getAttribute("cityData");
    if (cityName) {
        getWeatherInfo(cityName);
    }
}

var cityFormEl = document.querySelector("#city-form");
cityFormEl.addEventListener("submit", formHandler);
historyButtonsEl.addEventListener("click", buttonClickHandler);
loadHistory();