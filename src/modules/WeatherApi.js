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

  static processWeatherData(responseData, state) {
    const {
      name: city,
      weather: [{ description }],
      main: { temp: temperature, feels_like: temperatureFeel, humidity },
      wind: { speed: windSpeed },
    } = responseData;

    const weather = {
      city,
      state,
      description,
      temperature,
      temperatureFeel,
      humidity,
      windSpeed,
    };

    for (const key in weather) {
      if (weather[key].toFixed) {
        weather[key] = Math.round(weather[key]);
      }
    }

    return weather;
  }

  static async getCoordinates(location) {
    try {
      const request = WeatherApi.getCoordinatesRequestBuilder(location);
      const response = await fetch(request.endpoint, request.mode);
      const responseData = await response.json();

      const lat = responseData[0].lat;
      const lon = responseData[0].lon;
      const state = responseData[0].state;
      const coordinates = { lat, lon, state };

      return coordinates;
    } catch (error) {
      console.log(error);
    }
  }

  static async getWeather(lat, lon, state, units) {
    try {
      const request = WeatherApi.getWeatherRequestBuilder(lat, lon, units);
      const response = await fetch(request.endpoint, request.mode);
      const responseData = await response.json();

      const weather = WeatherApi.processWeatherData(responseData, state);
      return weather;
    } catch (error) {
      console.log(error);
    }
  }

  static searchWeather = (location) => {
    return WeatherApi.getCoordinates(location).then((coordinates) =>
      WeatherApi.getWeather(
        coordinates.lat,
        coordinates.lon,
        coordinates.state,
        "imperial"
      )
    );
  };
}
