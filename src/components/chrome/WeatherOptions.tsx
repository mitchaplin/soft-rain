import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import React from "react";
import {
  BoxMultiple1,
  BoxMultiple5,
  CurrentLocation,
  Map,
} from "tabler-icons-react";
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

const toggleEnabledStyle = () => {
  return "";
};

function WeatherOption({ icon, color, label, name }: WeatherOptionProps) {
  const { weatherOption, setWeatherOption } = useWeatherOption();
  console.log(weatherOption);
  return (
    <UnstyledButton
      onClick={() => [toggleEnabledStyle(), setWeatherOption(name)]}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
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
    label: "One Day Forecast",
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
    label: "Current Location",
    name: "location" as WeatherOptionsTypes,
  },
  {
    icon: <Map size={16} />,
    color: "grape",
    label: "Map",
    name: "map" as WeatherOptionsTypes,
  },
];

export function WeatherOptions() {
  const options = data.map((option) => (
    <WeatherOption {...option} key={option.label} name={option.name} />
  ));
  return <div>{options}</div>;
}
