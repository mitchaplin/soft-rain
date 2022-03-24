import {
  Box,
  Button,
  Group,
  Radio,
  RadioGroup,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { default as React, useState } from "react";
import Cards from "./Cards";
import { WeatherMode } from "./types";

const Forecast = (): any => {
  let [weatherData, setWeatherData] = useState(null);
  let [city, setCity] = useState("");
  let [unit, setUnit] = useState("imperial");
  let [mode, setMode] = useState<WeatherMode>("one");
  const uriEncodedCity = encodeURIComponent(city);

  const encodeURI = (inp: string) => encodeURIComponent(inp);
  const form = useForm({
    initialValues: {
      location: "Madison",
      unit: "imperial",
    },

    // validate: {
    //   Location: (value) => (/S+/.test(value) ? null : "Invalid Location"),
    // },
  });

  const getForecast = (location: string, unit: string) => {
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${encodeURI(
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
            getForecast(values.location, values.unit)
          )}
        >
          <TextInput
            required
            label="Location"
            placeholder="Enter a location..."
            {...form.getInputProps("location")}
          />
          <RadioGroup
            value={unit}
            onChange={setUnit}
            label="Select Temp Unit"
            description=""
            style={{ marginBottom: 15 }}
            required
          >
            <Radio value="imperial" label="Fahrenheit" />
            <Radio value="metric" label="Celcius" />
          </RadioGroup>
          <RadioGroup
            value={mode}
            onChange={setMode as any}
            label="Select Time Frame"
            description=""
            style={{ marginBottom: 15 }}
            required
          >
            <Radio value="one" label="One Day" />
            <Radio value="five" label="Five Day" />
          </RadioGroup>
          <Group position="right" mt="md">
            <Button type="submit" fullWidth={true} style={{ marginBottom: 25 }}>
              Submit
            </Button>
          </Group>
        </form>
        {navigator.geolocation.getCurrentPosition((e) => console.log(e))}
      </Box>
      {true && <Cards resp={weatherData} mode={mode}></Cards>}
    </>
  );
};
export default Forecast;
