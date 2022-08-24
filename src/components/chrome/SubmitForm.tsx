import {
  ActionIcon,
  Box,
  Button,
  createStyles,
  Group,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedState, useMediaQuery } from "@mantine/hooks";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CurrentLocation, Search, Star, StarOff } from "tabler-icons-react";
import { useFavorites } from "../../context/FavoritesProvider";
import { useSearchText } from "../../context/SearchTextProvider";
import { useWeatherData } from "../../context/WeatherDataProvider";
import { useGeolocation } from "../../hooks/CurrentLocation";
import { DAY_CHOICE, libraries } from "../../resources/constants";
import { addFavorite } from "../login/actions";
import { useFirebaseAuth } from "../login/AuthenticationProvider";

const useStyles = createStyles((theme) => ({
  invalid: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },
}));

export function SubmitForm() {
  const { weatherData, setWeatherData } = useWeatherData();
  const { searchText, setSearchText } = useSearchText();
  const geoLocation = useGeolocation();
  const user = useFirebaseAuth();
  const favorites = useFavorites();
  const [searchBox, setSearchBox] = useState<any>(null);
  const md = useMediaQuery("(min-width: 800px)");
  const { classes } = useStyles();
  const [debouncedSearchText, setDebouncedSearchText] = useDebouncedState(
    searchText,
    1000
  );
  const form = useForm({
    initialValues: {
      location: "",
      coords: "",
    },
    validate: {
      location: (value) =>
        value.length > 100 ? "Location Must Not Exceed 100 Characters" : null,
      coords: (value) =>
        value.length > 25 ? "Coordinate Values Must Not Exceed 25" : null,
    },
  });

  useEffect(() => {
    form.setFieldValue("location", searchText);
    setWeatherData({ isLoading: true });
    setDebouncedSearchText(searchText);
    form.setFieldValue("coords", "");
  }, [searchText]);

  useEffect(() => {
    setWeatherData({ isLoading: true });
  }, [debouncedSearchText]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": `${process.env.REACT_APP_RAPID_API_ADDRESS}`,
      "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
    },
  };

  const {} = useQuery(
    ["weather", debouncedSearchText],
    () => {
      return fetch(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${debouncedSearchText}&days=${DAY_CHOICE}`,
        options
      ).then((response) => response.json());
    },
    {
      enabled: !!debouncedSearchText,
      onSuccess: (response) =>
        setWeatherData({ ...response, isLoading: false }),
      onError: (err) => console.error(err),
    }
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: libraries as any,
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  return (
    <Box sx={{ maxWidth: 700, display: "inline-block" }}>
      <form
        onSubmit={form.onSubmit((values) => setSearchText(values.location))}
      >
        <Group>
          {isLoaded && (
            <StandaloneSearchBox
              onLoad={(ref) => setSearchBox(ref)}
              onPlacesChanged={() => {
                setSearchText(searchBox.getPlaces()[0].formatted_address);
              }}
            >
              <TextInput
                sx={{ width: md ? 500 : 275 }}
                required
                placeholder="Enter a location..."
                radius={"lg"}
                size={"lg"}
                classNames={{ input: classes.invalid }}
                rightSectionWidth={75}
                rightSection={
                  <>
                    {user && (
                      <Tooltip
                        label={
                          favorites?.includes(form.values.location)
                            ? "Favorited"
                            : "Set as Favorite"
                        }
                      >
                        <ActionIcon
                          onClick={() =>
                            form.values.location === "" ||
                            form.values.location === "Current Location"
                              ? () => {}
                              : addFavorite(user?.uid, form.values.location)
                          }
                        >
                          {favorites?.includes(form.values.location) ? (
                            <Star size={24} style={{ color: "gold" }} />
                          ) : (
                            <StarOff size={24} />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                    {geoLocation?.coords !== undefined ? (
                      <Tooltip label={"Use Current Location"}>
                        <ActionIcon
                          sx={(theme) => ({
                            color:
                              form.values.coords !== ""
                                ? theme.colors.blue
                                : "default",
                          })}
                          onClick={() =>
                            form.setValues({
                              location: `${geoLocation?.coords.latitude},${geoLocation?.coords.longitude}`,
                              coords: `${geoLocation?.coords.latitude},${geoLocation?.coords.longitude}`,
                            })
                          }
                        >
                          <CurrentLocation size={24} />
                        </ActionIcon>
                      </Tooltip>
                    ) : (
                      <></>
                    )}
                  </>
                }
                {...form.getInputProps("location")}
              />
            </StandaloneSearchBox>
          )}
          <Button type={"submit"} radius={"lg"}>
            <Search></Search>
          </Button>
        </Group>
      </form>
    </Box>
  );
}
