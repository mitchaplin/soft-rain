import React, { Dispatch, SetStateAction } from "react";
import { CurrentWeatherType } from "../resources/types";

export type WeatherDataType = CurrentWeatherType;
type ContextState = {
  weatherData: WeatherDataType;
  setWeatherData: Dispatch<SetStateAction<WeatherDataType>>;
};

const WeatherDataContext = React.createContext<ContextState | undefined>(
  undefined
);

const WeatherDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [weatherData, setWeatherData] = React.useState<any>(null);
  const value = { weatherData, setWeatherData };

  return (
    <WeatherDataContext.Provider value={value}>
      {children}
    </WeatherDataContext.Provider>
  );
};

function useWeatherData() {
  const context = React.useContext(WeatherDataContext);
  if (context === undefined) {
    throw new Error("useWeatherData must be used within a WeatherDataProvider");
  }
  return context;
}

export { WeatherDataProvider, useWeatherData };
