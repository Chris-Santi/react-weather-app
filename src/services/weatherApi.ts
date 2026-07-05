import type { Weather } from "../types/weather";

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
export async function getWeather(city: string): Promise<Weather> {
  
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found");
  }

  const location = geoData.results[0];

  
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
  );

  const weatherData = await weatherResponse.json();

  return {
    city: location.name,
    temperature: weatherData.current.temperature_2m,
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: weatherData.current.wind_speed_10m,
    condition: getWeatherCondition(weatherData.current.weather_code),
  };
}