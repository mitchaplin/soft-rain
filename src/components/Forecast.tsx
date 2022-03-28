import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { default as React, useState } from "react";
import { useTempUnit } from "../context/TempUnitProvider";
import { useWeatherOption } from "../context/WeatherOptionProvider";
import Cards from "./Cards";
import { WeatherMode } from "./types";

const Forecast = (): any => {
  let [weatherData, setWeatherData] = useState(null);
  let [city, setCity] = useState("");
  let [mode, setMode] = useState<WeatherMode>("one");
  let [lat, setLat] = useState<number | null>(null);
  let [long, setLong] = useState<number | null>(null);
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const encodedURI = (inp: string) => encodeURIComponent(inp);
  const form = useForm({
    initialValues: {
      location: "Madison",
    },
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e) =>
        setLat(e.coords.latitude)
      );
      navigator.geolocation.getCurrentPosition((e) =>
        setLat(e.coords.latitude)
      );
    }
  };

  const getDailyForecast = () => {
    getCurrentLocation();
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": `${process.env.REACT_APP_RAPID_API_ADDRESS}`,
        "x-rapidapi-key": `${process.env.REACT_APP_RAPID_API_KEY}`,
      },
    };

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/forecast/daily?lat=${lat}&lon=${long}&cnt=10&units${tempUnit}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setWeatherData(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getFiveDayForecast = (
    location: string,
    lat?: string,
    long?: string
  ) => {
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${tempUnit}&q=${encodedURI(
        location
      )}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": `${process.env.REACT_APP_RAPID_API_ADDRESS}`,
          "x-rapidapi-key": `${process.env.REACT_APP_RAPID_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setWeatherData(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <h2>Find Current Weather Conditions</h2>
        <form
          onSubmit={form.onSubmit((values) =>
            weatherOption === "one" || weatherOption === "five"
              ? getFiveDayForecast(values.location)
              : getDailyForecast()
          )}
        >
          <TextInput
            required
            label="Location"
            placeholder="Enter a location..."
            {...form.getInputProps("location")}
          />
          <Group position="right" mt="md">
            <Button type="submit" fullWidth={true} style={{ marginBottom: 25 }}>
              Submit
            </Button>
          </Group>
        </form>
      </Box>
      {weatherData && <Cards resp={weatherData} mode={mode}></Cards>}
    </>
  );
};
export default Forecast;
