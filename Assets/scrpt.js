var formEl = document.querySelector("#city-form");
var inputCityEl = document.querySelector("#city-name");

var formHandler = function (event) {
    event.preventDefault();
    var city = inputCityEl.value.trim();
    var searchHistoryArray = []

    if (city) {
        searchHistoryArray.push(city);
        localStorage.setItem("weatherSearch", JSON.stringify(searchHistoryArray));
        var searchHistoryEl = document.createElement('button');
        searchHistoryEl.className = "btn";
        searchHistoryEl.setAttribute("data-city", city)
        searchHistoryEl.innerHTML = city;
        historyButtonsEl.appendChild(searchHistoryEl);
        historyCardEl.removeAttribute("style")
        getWeatherInfo(cityname);
        inputCityEl.value = "";
    }
    else {
        alert("Please enter a City");
    }

}

var apiUrl ="https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"