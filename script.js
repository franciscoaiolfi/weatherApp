const apiKey = "4229531d209068119d6ba9d19b56cf44";
const apiCountryUrl = "http://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Function

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
};

// Função assincrona -  passar async
const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `htpp://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", apiCountryUrl + data.sys.country);
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
};

// events

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter"){
        const city = e.target.value;

        showWeatherData(city);
    }
})