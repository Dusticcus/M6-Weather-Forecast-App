// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var appid = '89d53e26dcb182abf23165adbc6cc1e9';

var today = moment().format("DD/MM/YYYY");
console.log(today);

var todaysWeatherSection = $('#todaysWeatherSection');
var lat;
var lon;
var cityName;

var getCityButton = $("#get-city-button");
var txt;
var previousSearches = [];
getCityButton.on('click', function (e) {

    txt = $("#cityInput").val();
    e.preventDefault();
    // console.log(txt);
    getlatlon();
    previousSearches.push(txt);
    localStorage.setItem("pSearches", txt);
});


function getlatlon() {
    var geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${txt}&limit=5&appid=${appid}`;
    fetch(geoApiUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        cityName = data[0].name;
        console.log(data);
        lat = data[0].lat;
        // console.log(lat);
        lon = data[0].lon;
        // console.log(lon);
        getTodaysForecast();
        getFiveDayForecast();
    });
}

function getTodaysForecast() {
    var weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=1&units=imperial&appid=${appid}`;
    fetch(weatherApiUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log("data:");
        console.log(data);




        // GET TODAYS WEATHER INFORMATION
        // Weather Icon
        var weatherIcon = data.current.weather[0].icon;
        console.log(weatherIcon);
        // Weather Icon and URL put together
        var weatherIconUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
        // Day Temperature
        var dayTemp = data.current.temp;
        // // wind
        var windSpeed = data.current.wind_speed;
        // // humidity index
        var humidityIndex = data.current.humidity;
        // // UV
        var uvIndex = data.current.uvi;
        todaysWeatherSection.empty();
        todaysWeatherSection.append('<div id="todaysWeatherData" class="col-12">' + cityName + " " + today + " " + " " + '<img id="wicon" src="' + weatherIconUrl + '" alt="Weather icon"></div>');
        var todaysWeatherData = $('#todaysWeatherData');
        var newUL = $('<ul id="todaysWeatherData"><li>' + 'Temp: ' + dayTemp + '</li>' +
            '<li>' + 'Wind: ' + windSpeed + '</li>' +
            '<li>' + 'Humidity: ' + humidityIndex + '</li>' +
            '<li>' + 'UV Index: ' + uvIndex + '</li></ul>');
        todaysWeatherSection.append(newUL);
        // var todaysWeatherData = $('#todaysWeatherData');
        // todaysWeatherSection.append(
        // )
    })
}

function getFiveDayForecast() {
    var weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${appid}`;
    fetch(weatherApiUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data.daily[0].temp.day);
        var fiveDayForecastSection = $('#fiveDayForecastSection');
        fiveDayForecastSection.empty();
        for (i = 1; i <= 5; i++) {
            fiveDayForecastSection.append('<div class="col-2">' + '<ul><li>' + today + '</li><li>' + '<img id="wicon" src="https://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + '.png" alt="Weather icon">' + '</li><li>' + '</li><li>Temp: ' + data.daily[i].temp.day + '</li><li>Wind: ' + data.daily[i].wind_speed + '</li><li>Humidity: ' + data.daily[i].humidity + '</li></ul></div>');
            // $('.col-2').append('<ul><li>' + '<img id="wicon" src="https://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + '.png" alt="Weather icon">' + '</li><li>' + '</li><li>Temp: ' + data.daily[i].temp.day + '</li><li>Wind: ' + data.daily[i].wind_speed + '</li><li>Humidity: ' + data.daily[i].humidity + '</li></ul>');

        }



        // for (i = 1; i > 5; i++) {
        //     $('.col-2 ul li:').append();
        // }




    })
}
