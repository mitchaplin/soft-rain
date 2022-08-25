import { useWeatherData } from "../../context/WeatherDataProvider";
import { useWeatherOption } from "../../context/WeatherOptionProvider";
import CurrentWeather from "./CurrentWeather";
import { ErrorText } from "./ErrorText";
import ThreeDayForecast from "./ThreeDayForecast";

const Forecast = () => {
  const { weatherData, setWeatherData } = useWeatherData();
  const { weatherOption, setWeatherOption } = useWeatherOption();

  return (
    <>
      {weatherData && weatherData.error ? (
        <ErrorText message={weatherData.error.message} />
      ) : weatherData && weatherOption === "one" ? (
        <CurrentWeather data={weatherData}></CurrentWeather>
      ) : weatherData && weatherOption === "three" ? (
        <ThreeDayForecast data={weatherData}></ThreeDayForecast>
      ) : (
        <></>
      )}
    </>
  );
};
export default Forecast;
