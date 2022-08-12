import {
  Anchor,
  createStyles,
  Grid,
  Group,
  Image,
  Progress,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useTempUnit } from "../context/TempUnitProvider";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

interface ThreeDayForecastProps {
  data: any;
}

const ThreeDayForecast = ({ data }: ThreeDayForecastProps) => {
  const { classes, theme } = useStyles();
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const rows = data.forecast.forecastday.map((row: any) => {
    const dailyChanceOfPrecip =
      row.day.daily_chance_of_rain > row.day.daily_chance_of_snow
        ? Math.random() * 100 + row.day.daily_chance_of_rain
        : Math.random() * 100 + row.day.daily_chance_of_snow;

    return (
      <tr key={row.date}>
        <td>
          <Anchor<"a"> size="sm" onClick={(event) => event.preventDefault()}>
            {row.date}
          </Anchor>
        </td>
        {tempUnit === "metric" ? (
          <td>{`${row.day.maxtemp_c.toFixed(0)}°C - ${row.day.mintemp_c.toFixed(
            0
          )}°C`}</td>
        ) : (
          <td>{`${row.day.maxtemp_f.toFixed(0)}°F - ${row.day.mintemp_f.toFixed(
            0
          )}°F`}</td>
        )}
        <td>
          <Grid align="center">
            <Image
              src={row.day.condition.icon}
              height={50}
              radius={"md"}
              alt=""
              style={{ width: 50, justifyContent: "center" }}
            />
            {row.day.condition.text}
          </Grid>
        </td>
        <td>{`${row.astro.sunrise} - ${row.astro.sunset}`}</td>
        <td>
          <Group position="apart">
            <Text size="xs" color="blue" weight={700}>
              {dailyChanceOfPrecip.toFixed(0)}%
            </Text>
          </Group>
          <Progress
            classNames={{ bar: classes.progressBar }}
            animate
            sections={[
              {
                value: dailyChanceOfPrecip,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.blue[9]
                    : theme.colors.blue[6],
              },
            ]}
          />
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 500 }} verticalSpacing="xs">
        <thead>
          <tr>
            <th>Date</th>
            <th>High - Low</th>
            <th>Image</th>
            <th>Sunrise - Sunset</th>
            <th>Precipitation Chance</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
export default ThreeDayForecast;
