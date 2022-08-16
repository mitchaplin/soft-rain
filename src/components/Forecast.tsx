import { useWeatherData } from "../context/WeatherDataProvider";
import { useWeatherOption } from "../context/WeatherOptionProvider";
import { useGeolocation } from "../hooks/CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import { ErrorText } from "./ErrorText";
import ThreeDayForecast from "./ThreeDayForecast";
import WeatherMap from "./WeatherMap";

const Forecast = (): any => {
  const { weatherData, setWeatherData } = useWeatherData();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const location = useGeolocation();

  return (
    <>
      {/* <WeatherMap></WeatherMap> */}
      {console.log(location)}
      {console.log(weatherData)}
      {weatherData && weatherData.error ? (
        <ErrorText message={weatherData.error.message} />
      ) : weatherData && weatherOption === "one" ? (
        <CurrentWeather data={weatherData}></CurrentWeather>
      ) : weatherData && weatherOption === "three" ? (
        <ThreeDayForecast data={weatherData}></ThreeDayForecast>
      ) : weatherData && weatherOption === "map" ? (
        <WeatherMap></WeatherMap>
      ) : (
        <></>
      )}
    </>
  );
};
export default Forecast;
