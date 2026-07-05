import type { Weather } from "../types/weather";

interface WeatherCardProps {
  weather: Weather;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>

      <div className="temperature">
        {weather.temperature}°C
      </div>

      <p className="condition">{weather.condition}</p>

      <div className="weather-details">
        <div className="detail">
          <span>💧</span>
          <div>
            <strong>Humidity</strong>
            <p>{weather.humidity}%</p>
          </div>
        </div>

        <div className="detail">
          <span>💨</span>
          <div>
            <strong>Wind</strong>
            <p>{weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}