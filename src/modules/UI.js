import { WeatherApi } from "./weatherApi";

export class UI {
  static addEventListener = () => {
    const searchForm = document.getElementById("form");
    const locationInput = document.getElementById("location-input");

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const location = locationInput.value;
      if (location === "") return;
      UI.searchWeather(location);
    });
  };

  static searchWeather = (location) => {
    WeatherApi.searchWeather(location).then((response) =>
      UI.displayWeather(response)
    );
  };

  static displayWeather = (response) => {
    const description = document.getElementById("description");
    const city = document.getElementById("city");
    const temperature = document.getElementById("temperature");
    const feelsLike = document.getElementById("feels-like");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");

    description.textContent = response.description;
    city.textContent = `${response.city}, ${response.state}`;
    temperature.textContent = response.temperature;
    feelsLike.textContent = `FEELS LIKE: ${response.temperatureFeel}`;
    humidity.textContent = `HUMIDITY: ${response.humidity}%`;
    wind.textContent = `WIND: ${response.windSpeed} MPH`;
  };

  static initializeApp = () => {
    UI.addEventListener();
    UI.searchWeather("London");
  };
}
