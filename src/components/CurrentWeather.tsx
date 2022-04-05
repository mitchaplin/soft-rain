import {
  Badge,
  Card,
  Grid,
  Group,
  Image,
  Text,
  Title,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import {
  useWeatherOption,
  WeatherOptionsTypes,
} from "../context/WeatherOptionProvider";
import { degToDir, determineWeatherImage, toTimestamp } from "../utils";

interface WeatherCardProps {
  mode: WeatherOptionsTypes;
  resp: any;
}

const CurrentWeather = (props: WeatherCardProps) => {
  const theme = useMantineTheme();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const duration = 1000;
  const { resp, mode } = props;
  const parseConditions = (condition: any) => {
    switch (condition) {
      case "Clear":
        return {
          status: "green",
          img: "",
        };
      case "Clouds":
        return {
          status: "green",
          img: "",
        };
      case "Haze":
        return {
          status: "yellow",
          img: "",
        };
      default:
        return {
          status: "green",
          img: "",
        };
    }
  };
  // const resp = test;
  return (
    <div>
      {resp && (
        <Transition
          mounted={true}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Grid justify="center">
                <Grid.Col
                  style={{
                    maxWidth: 265,
                    width: 270,
                    textAlign: "center",
                  }}
                  sm={4}
                  xs={4}
                >
                  <Card shadow="sm" p="lg">
                    <Card.Section style={{ marginLeft: -10 }}>
                      <Image
                        src={determineWeatherImage(resp.weather[0].id)}
                        height={297}
                        alt="Test"
                        style={{ width: 250 }}
                      />
                    </Card.Section>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      {Math.round(resp.main.temp)}°
                    </Title>

                    <Title order={2} style={{ lineHeight: 1.5 }}>
                      {resp.name}
                    </Title>

                    <Text component="p" size="xl">
                      {resp.sys.country}
                    </Text>
                    <Badge
                      color={parseConditions(resp.weather[0].main).status}
                      variant="filled"
                    >
                      {resp.weather[0].description
                        .split(" ")
                        .map(
                          (a: string) =>
                            a.charAt(0).toUpperCase() + a.substring(1)
                        )
                        .join(" ")}
                    </Badge>
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 265, textAlign: "center" }}
                  sm={4}
                  xs={4}
                  styles={{ marginTop: 50 }}
                >
                  <Card
                    shadow="sm"
                    p="md"
                    style={{ width: 250, marginBottom: 16 }}
                  >
                    <Group position="apart">
                      <Title order={1} style={{ lineHeight: 1.5 }}>
                        Temperature
                        <Text>Feels Like: {resp.main.feels_like}°</Text>
                        <Text>Low: {resp.main.temp_min}°</Text>
                        <Text>High: {resp.main.temp_max}°</Text>
                        <Text>Pressure: {resp.main.pressure} mb</Text>
                      </Title>
                    </Group>
                  </Card>
                  <Card
                    shadow="sm"
                    p="md"
                    style={{ width: 250, marginBottom: 16 }}
                  >
                    <Title
                      order={1}
                      style={{
                        lineHeight: 1.5,
                        marginBottom: resp.rain || resp.snow ? 0 : 23,
                      }}
                    >
                      Conditions
                      <Text>
                        Visibility: {(resp.visibility / 5280).toFixed(2)} km
                      </Text>
                      {resp.rain && <Text>Rain: {resp.rain["1h"]} in</Text>}
                      {resp.snow && <Text>Snow: {resp.snow["1h"]} in</Text>}
                      <Text>Cloud Cover: {resp.clouds.all}%</Text>
                    </Title>
                  </Card>
                  <Card
                    shadow="sm"
                    p="md"
                    style={{
                      width: 250,
                      textAlign: "center",
                    }}
                  >
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      Coords
                      <Text>Lat: {resp.coord.lat}</Text>
                      <Text>Long: {resp.coord.lon}</Text>
                    </Title>
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 265, width: 270, textAlign: "center" }}
                  sm={4}
                  xs={4}
                >
                  <Card
                    shadow="sm"
                    p="md"
                    style={{
                      width: 250,
                      textAlign: "center",
                      marginBottom: 16,
                    }}
                  >
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      Sunrise
                      <Group>
                        <Image
                          src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/weather_sunset.svg"
                          height={50}
                          alt="Sunrise"
                          style={{
                            width: 50,
                            filter:
                              "invert(77%) sepia(92%) saturate(5578%) hue-rotate(7deg) brightness(99%) contrast(105%)",
                          }}
                        />
                        <Text>
                          Sunrise: {toTimestamp(`${resp.sys.sunrise}`)}
                        </Text>
                      </Group>
                      <Group style={{ justifyContent: "center" }}>
                        <Text>Sunset: {toTimestamp(`${resp.sys.sunset}`)}</Text>
                        <Image
                          src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/weather_sunset.svg"
                          height={50}
                          alt="Sunrise"
                          style={{
                            width: 50,
                            filter:
                              "invert(77%) sepia(92%) saturate(5578%) hue-rotate(7deg) brightness(99%) contrast(105%)",
                          }}
                        />
                      </Group>
                    </Title>
                  </Card>
                  <Card shadow="sm" p="md" style={{ width: 250 }}>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      Wind
                      <Text>Speed: {resp.wind.speed}</Text>
                      <Text>Direction: {resp.wind.deg}</Text>
                      {resp.gust && <Text>Gust: {resp.wind.gust}</Text>}
                    </Title>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      <div
                        style={{
                          alignContent: "center",
                          marginTop: resp.gust ? 12 : 27,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-arrow-top-tail"
                          height={100}
                          width={100}
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          transform={`rotate(${resp.wind.deg})`}
                          scale={1}
                          filter={
                            "invert(67%) sepia(100%) saturate(3787%) hue-rotate(170deg) brightness(95%) contrast(103%)"
                          }
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <line x1="12" y1="18" x2="12" y2="3" />
                          <path d="M15 6l-3 -3l-3 3" />
                          <path d="M15 21l-3 -3l-3 3" />
                        </svg>
                        <Title order={3} style={{ lineHeight: 1.5 }}>
                          Wind {degToDir(resp.wind.deg)} at{" "}
                          {Math.floor(resp.wind.speed)} mph
                        </Title>
                      </div>
                    </Title>
                  </Card>
                </Grid.Col>
              </Grid>
            </div>
          )}
        </Transition>
      )}
    </div>
  );
};

export default CurrentWeather;
