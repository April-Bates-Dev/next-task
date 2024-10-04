import React from "react";
import { Header } from "@/components/Header/Header";
import { callWeatherApi, WeatherData } from "@/lib/call-weather-api";

export default async function LandingPage(): Promise<JSX.Element> {
  const londonWeatherData = await callWeatherApi<WeatherData>({
    lat: "45",
    lon: "45",
  });

  console.log(londonWeatherData);

  return (
    <div className="flex flex-col align-center h-screen">
      <Header styling="text-center mt-4" text="Hello World" variant="primary" />
    </div>
  );
}
