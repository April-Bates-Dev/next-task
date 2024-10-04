import React from "react";
import { Header } from "@/components/Header/Header";

export default async function LandingPage(): Promise<JSX.Element> {

  return (
    <div className="flex flex-col align-center h-screen">
      <Header
        styling="text-center mt-4"
        text="Hello World"
        variant="primary"
      />
    </div>
  );
}
