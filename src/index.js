import { WeatherApi } from "./modules/weatherApi";

// console.log(WeatherApi.getCoordinates("London"));
// console.log(WeatherApi.getWeather(51.5073219, -0.1276474, "imperial"));

console.log(
  WeatherApi.getCoordinates("London").then((coordinates) =>
    WeatherApi.getWeather(coordinates.lat, coordinates.lon, "imperial")
  )
);
