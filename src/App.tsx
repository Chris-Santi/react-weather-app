import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import type { Weather, City } from "./types/weather";
import { getWeather } from "./services/weatherApi";

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(city: City) {
    try {
      setLoading(true);
      setError("");

      const data = await getWeather(city);

      setWeather(data);
    } catch {
      setWeather(null);
      setError("Unable to load weather data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>

      <SearchBar
  onSearch={handleSearch}
  onClear={() => {
    setWeather(null);
    setError("");
  }}
/>
      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;