import { useWeatherData } from "../context/WeatherDataProvider";
import { useWeatherOption } from "../context/WeatherOptionProvider";
import { useGeolocation } from "../hooks/CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import { ErrorText } from "./ErrorText";
import ThreeDayForecast from "./ThreeDayForecast";

const Forecast = (): any => {
  const { weatherData, setWeatherData } = useWeatherData();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const location = useGeolocation();

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
