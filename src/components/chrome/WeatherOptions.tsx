import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import React from "react";
import { BoxMultiple1, BoxMultiple5, Map } from "tabler-icons-react";
import { useWeatherData } from "../../context/WeatherDataProvider";
import {
  useWeatherOption,
  WeatherOptionsTypes,
} from "../../context/WeatherOptionProvider";
import { useGeolocation } from "../../hooks/CurrentLocation";

interface WeatherOptionProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  name: WeatherOptionsTypes;
}

function WeatherOption({ icon, color, label, name }: WeatherOptionProps) {
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const { weatherData, setWeatherData } = useWeatherData();
  const location = useGeolocation();
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

  return (
    <UnstyledButton
      onClick={() => [setWeatherOption(null), setWeatherOption(name), null]}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        marginBottom: 6,
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        backgroundColor:
          theme.colorScheme === "dark"
            ? weatherOption === name
              ? theme.colors.dark[4]
              : theme.colors.dark
            : weatherOption === name
            ? theme.colors.gray[4]
            : theme.colors.gray[0],

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[4],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <BoxMultiple1 size={16} />,
    color: "blue",
    label: "Current Weather Search",
    name: "one" as WeatherOptionsTypes,
  },
  {
    icon: <BoxMultiple5 size={16} />,
    color: "teal",
    label: "Three Day Forecast",
    name: "three" as WeatherOptionsTypes,
  },
  {
    icon: <Map size={16} />,
    color: "grape",
    label: "Map Forecast",
    name: "map" as WeatherOptionsTypes,
  },
];

export function WeatherOptions() {
  const options = data.map((option) => (
    <WeatherOption {...option} key={option.label} name={option.name} />
  ));
  return <div>{options}</div>;
}
