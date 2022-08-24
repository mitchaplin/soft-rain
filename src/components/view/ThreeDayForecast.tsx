import {
  Grid,
  Image,
  Loader,
  Paper,
  Progress,
  ScrollArea,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useTempUnit } from "../../context/TempUnitProvider";
import { CurrentWeatherType } from "../../resources/types";
import { ForecastModal } from "./ForecastModal";
interface CurrentWeatherProps {
  data: CurrentWeatherType;
}

const ThreeDayForecast = ({ data }: CurrentWeatherProps) => {
  const theme = useMantineTheme();
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const lgH = useMediaQuery("(min-height: 1000px)");
  const lg = useMediaQuery("(min-width: 1600px)");
  const md = useMediaQuery("(min-width: 1000px)");
  console.log(data);
  const rows = data?.forecast?.forecastday.map((row) => {
    const dailyChanceOfPrecip =
      row.day.daily_chance_of_rain > row.day.daily_chance_of_snow
        ? row.day.daily_chance_of_rain
        : row.day.daily_chance_of_snow;

    return (
      <tr key={row.date}>
        <td>
          <Text
            sx={{
              lineHeight: 1.5,
              fontSize: 35,
              color: theme.colors.blue,
            }}
          >
            {data.location.name}
          </Text>
        </td>
        <td>
          <ForecastModal data={row} />
        </td>
        {md ? (
          tempUnit === "metric" ? (
            <td>
              <Text
                sx={{
                  lineHeight: 1.5,
                  fontSize: 25,
                  color: theme.colors.blue,
                }}
              >{`${row.day.maxtemp_c.toFixed(
                0
              )}°C - ${row.day.mintemp_c.toFixed(0)}°C`}</Text>
            </td>
          ) : (
            <td>
              <Text
                sx={{
                  lineHeight: 1.5,
                  fontSize: 25,
                  color: theme.colors.blue,
                }}
              >
                {`${row.day.maxtemp_f.toFixed(
                  0
                )}°F - ${row.day.mintemp_f.toFixed(0)}°F`}
              </Text>
            </td>
          )
        ) : (
          <></>
        )}
        {md && (
          <td>
            <Grid align="center">
              <Image
                src={row.day.condition.icon}
                height={50}
                radius="md"
                alt=""
                style={{ width: 50, justifyContent: "center" }}
              />
              <Text
                sx={{
                  lineHeight: 1.5,
                  fontSize: 25,
                  color: theme.colors.blue,
                }}
              >
                {row.day.condition.text}
              </Text>
            </Grid>
          </td>
        )}
        {lg && (
          <td>
            <Text
              sx={{
                lineHeight: 1.5,
                fontSize: 25,
                color: theme.colors.blue,
              }}
            >{`${row.astro.sunrise} - ${row.astro.sunset}`}</Text>
          </td>
        )}
        {lg && (
          <td>
            <Progress
              animate={!!dailyChanceOfPrecip}
              size={24}
              sections={[
                {
                  value: dailyChanceOfPrecip || 0,
                  label: `${dailyChanceOfPrecip.toFixed(0)}%`,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.blue[9]
                      : theme.colors.blue[6],
                },
              ]}
            />
          </td>
        )}
      </tr>
    );
  });

  return (
    <Paper
      p="2rem"
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: lgH ? "94.5%" : "90%",
      }}
    >
      {data.isLoading ? (
        <Grid>
          <Grid.Col span={3} offset={5.5} mt="25vh">
            <Loader size="xl" variant="dots" />
          </Grid.Col>
        </Grid>
      ) : (
        <ScrollArea>
          <Table fontSize="lg" verticalSpacing="xs">
            <thead>
              <tr>
                <th>Location</th>
                <th></th>
                {md && <th>High - Low</th>}
                {md && <th>Current Weather</th>}
                {lg && <th>Sunrise - Sunset</th>}
                {lg && <th>Precipitation Chance</th>}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      )}
    </Paper>
  );
};
export default ThreeDayForecast;
