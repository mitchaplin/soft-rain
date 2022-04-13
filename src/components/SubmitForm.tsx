import {
  Box,
  Button,
  Group,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLatLong } from "../context/LatLongProvider";
import { useWeatherData } from "../context/WeatherDataProvider";
import { useWeatherOption } from "../context/WeatherOptionProvider";

export function SubmitForm() {
  const { latLong, setLatLong } = useLatLong();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const { weatherData, setWeatherData } = useWeatherData();
  const encodedURI = (inp: string) => encodeURIComponent(inp);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const form = useForm({
    initialValues: {
      location: "Madison",
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
      `https://weatherapi-com.p.rapidapi.com/search.json?q=${location}`,
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

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) =>
          getCurrentForecast(values.location)
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
  );
}
