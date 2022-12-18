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
        historyEl.setAttribute("data-city", cityName)
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