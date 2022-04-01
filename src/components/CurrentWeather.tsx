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
import { test } from "../testdata";
import { toTimestamp } from "../utils";

interface WeatherCardProps {
  mode: WeatherOptionsTypes;
  resp: any;
}

const CurrentWeather = (props: WeatherCardProps) => {
  const theme = useMantineTheme();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const duration = 1000;
  // const { resp, mode } = props;
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
  const resp = test;
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
                    maxWidth: 250,
                    width: 250,
                  }}
                  sm={4}
                  xs={4}
                >
                  <Card shadow="sm" p="lg">
                    <Card.Section style={{ marginLeft: -10 }}>
                      <Image
                        src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-1.svg"
                        height={240}
                        alt="Test"
                        style={{ width: 250 }}
                      />
                    </Card.Section>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      {Math.round(resp.main.temp)}°
                    </Title>
                    <Group
                      position="apart"
                      style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                    >
                      <Title order={1} style={{ lineHeight: 1.5 }}>
                        {resp.name}
                      </Title>
                    </Group>
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
                  style={{ maxWidth: 275 }}
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
                        <Text>Feels Like: {resp.main.feels_like}</Text>
                        <Text>Low: {resp.main.temp_min}</Text>
                        <Text>High: {resp.main.temp_max}</Text>
                        <Text>Pressure: {resp.main.pressure}</Text>
                      </Title>
                    </Group>
                  </Card>
                  <Card
                    shadow="sm"
                    p="md"
                    style={{ width: 250, marginBottom: 16 }}
                  >
                    <Group position="apart">
                      <Title order={1} style={{ lineHeight: 1.5 }}>
                        Conditions
                        <Text>Visibility: {resp.visibility}</Text>
                        <Text>Rain: {resp.rain["1h"]}</Text>
                        <Text>Clouds: {resp.clouds.all}</Text>
                      </Title>
                    </Group>
                  </Card>
                  <Card
                    shadow="sm"
                    p="md"
                    style={{ width: 250, marginBottom: 16 }}
                  >
                    <Group position="apart">
                      <Title order={1} style={{ lineHeight: 1.5 }}>
                        Sunrise
                        <Text>
                          Sunrise: {toTimestamp(`${resp.sys.sunrise}`)}
                        </Text>
                        <Text>Sunset: {toTimestamp(`${resp.sys.sunset}`)}</Text>
                      </Title>
                    </Group>
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 275 }}
                  sm={4}
                  xs={4}
                  styles={{ marginTop: 50 }}
                >
                  <Card
                    shadow="sm"
                    p="md"
                    style={{ width: 250, marginLeft: -8 }}
                  >
                    <Group
                      position="apart"
                      style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                    >
                      <Title order={1} style={{ lineHeight: 1.5 }}>
                        Wind
                        <Text>Speed: {resp.wind.speed}</Text>
                        <Text>Direction: {resp.wind.deg}</Text>
                        <Text>Gust: {resp.wind.gust}</Text>
                      </Title>
                      <Title order={1} style={{ lineHeight: 1.5 }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-arrow-left-circle"
                          width="200"
                          height="216"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M17 12h-14"></path>
                          <path d="M6 9l-3 3l3 3"></path>
                          <circle cx="19" cy="12" r="2"></circle>
                        </svg>
                      </Title>
                    </Group>
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
