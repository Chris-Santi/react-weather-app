export interface Weather {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface GeoCodingResponse {
  results?: City[];
}

export interface CurrentWeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}