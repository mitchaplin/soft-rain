import { useWeatherData } from "../context/WeatherDataProvider";
import { useWeatherOption } from "../context/WeatherOptionProvider";
import { useGeolocation } from "../hooks/CurrentLocation";
import CurrentWeather from "./CurrentWeather";
import { ErrorText } from "./ErrorText";
import { SubmitForm } from "./SubmitForm";
import ThreeDayForecast from "./ThreeDayForecast";
import { WeatherMapComponent } from "./WeatherMap";

const Forecast = (): any => {
  const { weatherData, setWeatherData } = useWeatherData();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const location = useGeolocation();
  return (
    <>
      {console.log(location)}
      {console.log(weatherData)}

      <SubmitForm />
      {weatherData && weatherData.error ? (
        <ErrorText message={weatherData.error.message} />
      ) : weatherData && weatherOption === "one" ? (
        <CurrentWeather data={weatherData}></CurrentWeather>
      ) : weatherData && weatherOption === "three" ? (
        <ThreeDayForecast data={weatherData}></ThreeDayForecast>
      ) : weatherData && weatherOption === "map" ? (
        <WeatherMapComponent></WeatherMapComponent>
      ) : (
        <></>
      )}
    </>
  );
};
export default Forecast;
