export class WeatherApi {
  static getCoordinatesRequestBuilder(location) {
    const apiKey = process.env.API_KEY;
    const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;
    const mode = { mode: "cors" };
    return { endpoint, mode };
  }

  static getWeatherRequestBuilder(lat, lon, units) {
    const apiKey = process.env.API_KEY;
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    const mode = { mode: "cors" };
    return { endpoint, mode };
  }

  static async getCoordinates(location) {
    try {
      const request = WeatherApi.getCoordinatesRequestBuilder(location);
      const response = await fetch(request.endpoint, request.mode);
      const responseData = await response.json();

      const lat = responseData[0].lat;
      const lon = responseData[0].lon;
      const coordinates = { lat, lon };

      return coordinates;
    } catch (error) {
      console.log(error);
    }
  }

  static async getWeather(lat, lon, units) {
    try {
      const request = WeatherApi.getWeatherRequestBuilder(lat, lon, units);
      const response = await fetch(request.endpoint, request.mode);
      const responseData = await response.json();

      const name = responseData.name;
      const description = responseData.weather[0].description;
      const temperature = responseData.main.temp;
      const temperatureFeel = responseData.main.feels_like;
      const humidity = responseData.main.humidity;

      const weather = {
        name,
        description,
        temperature,
        temperatureFeel,
        humidity,
      };

      console.log(weather);
      return weather;
    } catch (error) {
      console.log(error);
    }
  }
}
