import axios, { AxiosResponse } from "axios";

interface LatLongData {
  lat: string;
  lon: string;
}

export interface WeatherData {
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export const callWeatherApi = async <T extends WeatherData>({
  lat,
  lon,
}: LatLongData): Promise<T> => {
  const weatherApiKey = process.env.API_KEY;
  const endpointName = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

  const response: AxiosResponse<T> = await axios.get(endpointName);

  return response.data;
};
