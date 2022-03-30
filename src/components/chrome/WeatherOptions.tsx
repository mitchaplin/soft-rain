import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import React from "react";
import {
  BoxMultiple1,
  BoxMultiple5,
  CurrentLocation,
  Map,
} from "tabler-icons-react";
import { useLatLong } from "../../context/LatLongProvider";
import {
  useWeatherOption,
  WeatherOptionsTypes,
} from "../../context/WeatherOptionProvider";

interface WeatherOptionProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  name: WeatherOptionsTypes;
}

function WeatherOption({ icon, color, label, name }: WeatherOptionProps) {
  const { latLong, setLatLong } = useLatLong();
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((e) => [
      setLatLong({ lat: e.coords.latitude, long: e.coords.longitude }),
    ]);
  };
  const { weatherOption, setWeatherOption } = useWeatherOption();
  return (
    <UnstyledButton
      onClick={() => [
        setWeatherOption(name),
        name === "location" || name === "map" ? getCurrentLocation() : null,
      ]}
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
    label: "Current Weather",
    name: "one" as WeatherOptionsTypes,
  },
  {
    icon: <BoxMultiple5 size={16} />,
    color: "teal",
    label: "Five Day Forecast",
    name: "five" as WeatherOptionsTypes,
  },
  {
    icon: <CurrentLocation size={16} />,
    color: "violet",
    label: "Current Location Forecast",
    name: "location" as WeatherOptionsTypes,
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
