import { default as React } from "react";
import { useWeatherData } from "../context/WeatherDataProvider";
import { useWeatherOption } from "../context/WeatherOptionProvider";
import CurrentWeather from "./CurrentWeather";
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
          <CurrentWeather
            resp={weatherData}
            mode={weatherOption}
          ></CurrentWeather>
        ) : (
          <></>
          // <TenDayForecast
          //   resp={weatherData}
          //   mode={weatherOption}
          // ></TenDayForecast>
        )
      ) : (
        <></>
      )}
      {/* <CurrentWeather resp={weatherData} mode={weatherOption}></CurrentWeather> */}
    </>
  );
};
export default Forecast;
