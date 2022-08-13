import { ActionIcon, Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CurrentLocation } from "tabler-icons-react";
import { DAY_CHOICE } from "../constants";

import { useWeatherData } from "../context/WeatherDataProvider";
import { useWeatherOption } from "../context/WeatherOptionProvider";
import { useGeolocation } from "../hooks/CurrentLocation";

export function SubmitForm() {
  const { weatherData, setWeatherData } = useWeatherData();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const geoLocation = useGeolocation();

  const form = useForm({
    initialValues: {
      location: "",
    },
  });

  const getCurrentForecast = (location: string) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": `${process.env.REACT_APP_RAPID_API_ADDRESS}`,
        "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
      },
    };
    weatherOption === "three"
      ? fetch(
          `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=${DAY_CHOICE}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            setWeatherData(response);
          })
          .catch((err) => {
            console.error(err);
          })
      : fetch(
          `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`,
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

  console.log("test", weatherData, weatherOption);
  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) =>
          getCurrentForecast(values.location)
        )}
      >
        <Group position="left" mt="sm">
          <TextInput
            sx={{ minWidth: 340 }}
            required
            label="Location"
            placeholder="Enter a location..."
            {...form.getInputProps("location")}
          />
          <ActionIcon
            style={{ margin: "1.75rem 0rem 0rem 0rem" }}
            onClick={() =>
              form.setValues({
                location: `${geoLocation?.coords.latitude},${geoLocation?.coords.longitude}`,
              })
            }
          >
            <CurrentLocation />
          </ActionIcon>
        </Group>
        <Group position="right" mt="md">
          <Button type="submit" fullWidth={true} style={{ marginBottom: 25 }}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
