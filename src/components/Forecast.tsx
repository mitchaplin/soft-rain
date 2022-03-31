import { default as React } from "react";
import { useWeatherData } from "../context/WeatherDataProvider";
import { useWeatherOption } from "../context/WeatherOptionProvider";
import FiveDayForecastCards from "./CurrentWeather";
import LocationForecastCard from "./FiveDayForecast";
import { SubmitForm } from "./SubmitForm";

const Forecast = (): any => {
  const { weatherData, setWeatherData } = useWeatherData();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  return (
    <>
      {console.log("test")}
      {console.log(weatherData)}
      <SubmitForm />
      {weatherData ? (
        weatherOption === "one" || weatherOption === "five" ? (
          <FiveDayForecastCards
            resp={weatherData}
            mode={weatherOption}
          ></FiveDayForecastCards>
        ) : (
          <LocationForecastCard
            resp={weatherData}
            mode={weatherOption}
          ></LocationForecastCard>
        )
      ) : (
        <></>
      )}
    </>
  );
};
export default Forecast;
