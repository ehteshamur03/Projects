const apiKey = "273cd7dd3b71051057af7bc6d966f995" // add your api key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

// fetch data from the API 
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json()


  document.querySelector('.weather').style.display = "flex";

  // display data 
  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = data.main.temp + " °C";
  document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
  document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

  // change weather icon 
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "img/clouds.png"
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "img/rain.png"
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "img/drizzle.png"
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "img/mist.png"
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "img/clear.png"
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "img/snow.png"
  }
}



searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
})