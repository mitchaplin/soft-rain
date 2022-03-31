import {
  Box,
  Button,
  Group,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLatLong } from "../context/LatLongProvider";
import { useTempUnit } from "../context/TempUnitProvider";
import { useWeatherData } from "../context/WeatherDataProvider";
import { useWeatherOption } from "../context/WeatherOptionProvider";

export function SubmitForm() {
  const { tempUnit, toggleTempUnit } = useTempUnit();
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

  const getTenDayForecast = () => {
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/forecast/daily?lat=${latLong.lat}&lon=${latLong.long}&cnt=10&units=${tempUnit}`,
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

  const getCurrentForecast = (location: string) => {
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
