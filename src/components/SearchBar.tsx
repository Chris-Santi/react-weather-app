import { useEffect, useState } from "react";
import { searchCities } from "../services/weatherApi";
import type { City } from "../types/weather";

interface SearchBarProps {
  onSearch: (city: City) => void;
  onClear: () => void;
}

export function SearchBar({
  onSearch,
  onClear,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const [loadingCities, setLoadingCities] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.trim().length < 2 || selectedCity) {
        setCities([]);
        return;
      }

      setLoadingCities(true);

      try {
        const results = await searchCities(query);

        setCities(results);
        setShowSuggestions(true);
      } finally {
        setLoadingCities(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, selectedCity]);

  function handleSelect(city: City) {
    setSelectedCity(city);

    setQuery(`${city.name}, ${city.country}`);

    setCities([]);

    setShowSuggestions(false);

    onSearch(city);
  }
  function handleClear() {
  setQuery("");
  setCities([]);
  setSelectedCity(null);
  setShowSuggestions(false);

  onClear();
}

  return (
    <div className="search-container">
  <div className="input-wrapper">
    <input
      type="text"
      placeholder="Search city..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setSelectedCity(null);
      }}
      onFocus={() => {
        if (cities.length > 0) {
          setShowSuggestions(true);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          if (selectedCity) {
            onSearch(selectedCity);
          }
        }
      }}
    />

    {query && (
      <button
        className="clear-btn"
        onClick={handleClear}
      >
        ×
      </button>
    )}
  </div>

      {showSuggestions && (
        <ul className="suggestions">
          {loadingCities ? (
            <li className="status">Searching cities...</li>
          ) : cities.length > 0 ? (
            cities.map((city) => (
              <li
                key={`${city.name}-${city.latitude}-${city.longitude}`}
                onClick={() => handleSelect(city)}
              >
                {city.name}, {city.country}
              </li>
            ))
          ) : (
            query.trim().length >= 2 && (
              <li className="status">No cities found</li>
            )
          )}
        </ul>
      )}
    </div>
  );
}