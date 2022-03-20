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
import Conditions from "./Conditions";

const Forecast = (): any => {
  const [responseObj, setResponseObj] = useState({});
  let [city, setCity] = useState("");
  let [unit, setUnit] = useState("imperial");
  const uriEncodedCity = encodeURIComponent(city);

  const encodeURI = (inp: string) => encodeURIComponent(inp);
  const form = useForm({
    initialValues: {
      location: "London",
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
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "22b6974f68mshd6dc54fc6e63c07p123f8ejsna4e3c74c9095",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
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
            required
          >
            <Radio value="imperial" label="Fahrenheit" />
            <Radio value="metric" label="Celcius" />
          </RadioGroup>
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
        <Conditions responseObj={responseObj} />
      </Box>
    </>
  );
};
export default Forecast;
