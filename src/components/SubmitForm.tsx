import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CurrentLocation } from "tabler-icons-react";

import { useWeatherData } from "../context/WeatherDataProvider";
import { useGeolocation } from "../hooks/CurrentLocation";

export function SubmitForm() {
  const { weatherData, setWeatherData } = useWeatherData();
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

    fetch(
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
  const location = useGeolocation();
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) =>
          getCurrentForecast(values.location)
        )}
      >
        <Group position="left" mt="sm">
          <TextInput
            width={51000}
            required
            label="Location"
            placeholder="Enter a location..."
            {...form.getInputProps("location")}
          />
          <CurrentLocation
            style={{ margin: "1rem", marginTop: "2.5rem" }}
            onClick={() =>
              form.setValues({
                location: `${geoLocation?.coords.latitude},${geoLocation?.coords.longitude}`,
              })
            }
          />
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
