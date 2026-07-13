import type {
  Weather,
  City,
  GeoCodingResponse,
  CurrentWeatherResponse,
} from "../types/weather";

function getWeatherCondition(code: number): string {
  switch (code) {
    case 0:
      return "☀️ Clear Sky";

    case 1:
    case 2:
      return "🌤 Mostly Clear";

    case 3:
      return "☁️ Cloudy";

    case 45:
    case 48:
      return "🌫 Fog";

    case 51:
    case 53:
    case 55:
      return "🌦 Drizzle";

    case 61:
    case 63:
    case 65:
      return "🌧 Rain";

    case 71:
    case 73:
    case 75:
      return "❄️ Snow";

    case 95:
      return "⛈ Thunderstorm";

    default:
      return "🌍 Unknown";
  }
}

export async function searchCities(query: string): Promise<City[]> {
  if (query.trim().length < 2) {
    return [];
  }

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=5`
  );

  const data: GeoCodingResponse = await response.json();

  return data.results ?? [];
}

export async function getWeather(city: City): Promise<Weather> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
  );

  const weatherData: CurrentWeatherResponse =
    await response.json();

  return {
    city: `${city.name}, ${city.country}`,
    temperature: weatherData.current.temperature_2m,
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: weatherData.current.wind_speed_10m,
    condition: getWeatherCondition(weatherData.current.weather_code),
  };
}