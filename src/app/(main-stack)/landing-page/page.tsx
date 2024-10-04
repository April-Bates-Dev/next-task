import React from "react";
import { Header } from "@/components/Header/Header";
import { callWeatherApi, WeatherData } from "@/lib/call-weather-api";
import Spacer from "@/components/Spacer/Spacer";
import { BodyText } from "@/components/BodyText/BodyText";

const LONDON_LATITUDE = "51.509865";
const LONDON_LONGITUDE = "-0.118092";

interface getFormattedWeatherDataArrayType {
  main: string;
  description: string;
  temp: number;
  humidity: number;
  windspeed: number;
}

const getFormattedWeatherDataArray = ({
  main: main,
  description: description,
  temp: temp,
  humidity: humidity,
  windspeed: windspeed,
}: getFormattedWeatherDataArrayType) => [
  `Description: ${main} - ${description}`,
  `Temperature: ${temp.toString()} kelvin`,
  `Humidity: ${humidity.toString()}%`,
  `Wind speed: ${windspeed.toString()} meter/sec`,
];

export default async function LandingPage(): Promise<JSX.Element> {
  const londonWeatherData = await callWeatherApi<WeatherData>({
    lat: LONDON_LATITUDE,
    lon: LONDON_LONGITUDE,
  });

  const formattedLondonWeatherData = getFormattedWeatherDataArray({
    main: londonWeatherData.weather[0].main,
    description: londonWeatherData.weather[0].description,
    temp: londonWeatherData.main.temp,
    humidity: londonWeatherData.main.humidity,
    windspeed: londonWeatherData.wind.speed,
  });

  return (
    <div className="flex flex-col align-center h-screen">
      <Header
        styling="text-center mt-4"
        text="Wondering what the weather is like in your favourite cities right now? 🌤️"
        variant="primary"
      />
      <BodyText
        styling="text-center mt-4"
        text="Click on a city to see the weather"
        variant="primary"
      />
      <Spacer />
      <div className="flex flex-col items-left align-end lg:ml-20 lg:mr-20">
        <Header styling="text-left mb-4" text={"London"} variant="secondary" />
        <div className="pb-[10px]">
          {formattedLondonWeatherData.map((text, index) => (
            <div className="flex flex-row" key={index}>
              <BodyText text={text} variant="primary" styling="font-normal" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
