import React, { Dispatch, SetStateAction } from "react";

export type WeatherOptionsTypes = "one" | "three" | "map" | null;
type ContextState = {
  weatherOption: WeatherOptionsTypes;
  setWeatherOption: Dispatch<SetStateAction<WeatherOptionsTypes>>;
};

const WeatherOptionContext = React.createContext<ContextState | undefined>(
  undefined
);

const WeatherOptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [weatherOption, setWeatherOption] =
    React.useState<WeatherOptionsTypes>("one");
  const value = { weatherOption, setWeatherOption };

  return (
    <WeatherOptionContext.Provider value={value}>
      {children}
    </WeatherOptionContext.Provider>
  );
};

function useWeatherOption() {
  const context = React.useContext(WeatherOptionContext);
  if (context === undefined) {
    throw new Error(
      "useWeatherOption must be used within a WeatherOptionProvider"
    );
  }
  return context;
}

export { WeatherOptionProvider, useWeatherOption };
