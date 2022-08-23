import {
  Accordion,
  Button,
  createStyles,
  Grid,
  Group,
  Image,
  Modal,
  Progress,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useTempUnit } from "../context/TempUnitProvider";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `.2rem solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

const FullDayForecastModal = (data: any) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="24 hour">
        <Text>{data.temp_f}</Text>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>View Forecast</Button>
      </Group>
    </>
  );
};

interface ThreeDayForecastProps {
  data: any;
}

const ThreeDayForecast = ({ data }: ThreeDayForecastProps) => {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const dt = data;
  const rows = data.forecast.forecastday.map((row: any) => {
    const dailyChanceOfPrecip =
      row.day.daily_chance_of_rain > row.day.daily_chance_of_snow
        ? row.day.daily_chance_of_rain
        : row.day.daily_chance_of_snow;

    return (
      <>
        <tr key={row.date}>
          <td style={{ paddingRight: "6rem" }}>
            <Accordion variant="contained" style={{ width: "100%" }}>
              <Accordion.Item value="test" style={{ width: "100%" }}>
                <Accordion.Control>{row.date}</Accordion.Control>
                <Accordion.Panel>Content</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </td>
          {tempUnit === "metric" ? (
            <td>{`${row.day.maxtemp_c.toFixed(
              0
            )}°C - ${row.day.mintemp_c.toFixed(0)}°C`}</td>
          ) : (
            <td>{`${row.day.maxtemp_f.toFixed(
              0
            )}°F - ${row.day.mintemp_f.toFixed(0)}°F`}</td>
          )}
          <td></td>
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
      </>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 500 }} fontSize={"lg"} verticalSpacing="xs">
        <thead>
          <tr>
            <th>Forecasted Date</th>
            <th>High - Low</th>
            <th></th>
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
