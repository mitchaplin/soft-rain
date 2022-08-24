import {
  Button,
  createStyles,
  Grid,
  Image,
  Loader,
  Modal,
  Paper,
  Progress,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useSearchText } from "../../context/SearchTextProvider";
import { useTempUnit } from "../../context/TempUnitProvider";

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
        <Text>{data?.temp_f}</Text>
      </Modal>

      <Button onClick={() => setOpened(true)}>
        {`${data?.data?.date.split(" ")}`} Forecast
      </Button>
    </>
  );
};

interface ThreeDayForecastProps {
  data: any;
}

const ThreeDayForecast = ({ data }: ThreeDayForecastProps) => {
  const { classes, theme } = useStyles();
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const { searchText, setSearchText } = useSearchText();
  const lgH = useMediaQuery("(min-height: 1000px)");
  const lg = useMediaQuery("(min-width: 1600px)");
  const md = useMediaQuery("(min-width: 1000px)");

  const rows = data?.forecast?.forecastday.map((row: any) => {
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
            {/* <Accordion variant="contained" sx={{ width: "100%" }}>
            <Accordion.Item value="test" sx={{ width: "100%" }}>
              <Accordion.Control>{row.name}</Accordion.Control>
              <Accordion.Panel>Content</Accordion.Panel>
            </Accordion.Item>
          </Accordion> */}
            {data.location.name}
          </Text>
        </td>
        <td>
          <FullDayForecastModal data={row} />
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
                radius={"md"}
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
              classNames={{ bar: classes.progressBar }}
              animate={!!dailyChanceOfPrecip}
              size={24}
              sections={[
                {
                  value: dailyChanceOfPrecip || "0%",
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
          <Table fontSize={"lg"} verticalSpacing="xs">
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
