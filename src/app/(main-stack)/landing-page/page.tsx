import React from "react";
import { Header } from "@/components/Header/Header";
import { BodyText } from "@/components/BodyText/BodyText";
import { callWeatherApi, WeatherData } from "@/lib/call-weather-api";
import Accordion from "@/components/Accordion/Accordion";
import Spacer from "@/components/Spacer/Spacer";
import {
  extraCitiesLocationData,
  LONDON_LATITUDE,
  LONDON_LONGITUDE,
} from "./constants";

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

  const extraLocationsWeatherData = await Promise.all(
    extraCitiesLocationData.map(async (locationData) => {
      const locationWeatherData = await callWeatherApi<WeatherData>({
        lat: locationData.latitude,
        lon: locationData.longitude,
      });
      return {
        header: locationData.header,
        main: locationWeatherData.weather[0].main,
        description: locationWeatherData.weather[0].description,
        temp: locationWeatherData.main.temp,
        humidity: locationWeatherData.main.humidity,
        windspeed: locationWeatherData.wind.speed,
      };
    })
  );

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
        <Spacer />
        {Object.entries(extraLocationsWeatherData).map(([index, contents]) => (
          <div className="pt-[10px]" key={index}>
            <Accordion
              header={contents.header}
              content={getFormattedWeatherDataArray({
                main: contents.main,
                description: contents.description,
                temp: contents.temp,
                humidity: contents.humidity,
                windspeed: contents.windspeed,
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
