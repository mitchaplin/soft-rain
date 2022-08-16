import { ActionIcon, Box, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import { CurrentLocation } from "tabler-icons-react";
import { DAY_CHOICE } from "../constants";

import { useWeatherData } from "../context/WeatherDataProvider";
import { useWeatherOption } from "../context/WeatherOptionProvider";
import { useGeolocation } from "../hooks/CurrentLocation";

const libraries = ["places"];

export function SubmitForm() {
  const { weatherData, setWeatherData } = useWeatherData();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const geoLocation = useGeolocation();
  const [searchBox, setSearchBox] = useState<any>(null);
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: libraries as any,
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  return (
    <Box sx={{ maxWidth: 700 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) =>
          getCurrentForecast(values.location)
        )}
      >
        {isLoaded && (
          <StandaloneSearchBox
            onLoad={(ref) => setSearchBox(ref)}
            onPlacesChanged={() => {
              console.log(searchBox.getPlaces());
              form.setFieldValue(
                "location",
                searchBox.getPlaces()[0].formatted_address
              );
            }}
          >
            <TextInput
              sx={{ width: 500 }}
              required
              placeholder="Enter a location..."
              radius={"lg"}
              size={"lg"}
              rightSection={
                geoLocation?.coords !== undefined ? (
                  <ActionIcon
                    style={{ marginRight: "1rem" }}
                    onClick={() =>
                      form.setValues({
                        location: `${geoLocation?.coords.latitude},${geoLocation?.coords.longitude}`,
                      })
                    }
                  >
                    <CurrentLocation />
                  </ActionIcon>
                ) : (
                  <></>
                )
              }
              {...form.getInputProps("location")}
            />
          </StandaloneSearchBox>
        )}
      </form>
    </Box>
  );
}
