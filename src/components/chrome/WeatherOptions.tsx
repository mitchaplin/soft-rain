import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import React from "react";
import { BoxMultiple1, BoxMultiple3 } from "tabler-icons-react";
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

export const WeatherOption = ({
  icon,
  color,
  label,
  name,
}: WeatherOptionProps) => {
  const { weatherOption, setWeatherOption } = useWeatherOption();

  return (
    <UnstyledButton
      mr="1rem"
      onClick={() => [setWeatherOption(name)]}
      sx={(theme: any) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.lg,
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
};

export const weatherOptionsData = [
  {
    icon: <BoxMultiple1 size={16} />,
    color: "blue",
    label: "Current Weather Search",
    name: "one" as WeatherOptionsTypes,
  },
  {
    icon: <BoxMultiple3 size={16} />,
    color: "teal",
    label: "Three Day Forecast",
    name: "three" as WeatherOptionsTypes,
  },
];

export const WeatherOptions = () => {
  const options = weatherOptionsData.map((option) => (
    <WeatherOption {...option} key={option.label} name={option.name} />
  ));
  return (
    <div
      style={{
        minWidth: "30rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {options}
    </div>
  );
};
