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
                    <Card.Section>
                      <Image
                        src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-1.svg"
                        height={250}
                        alt="Test"
                        style={{ width: 250 }}
                      />
                    </Card.Section>
                    <Group
                      position="apart"
                      style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                    >
                      <Title order={1} style={{ lineHeight: 1.5 }}>
                        {resp.name}
                      </Title>
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
                    </Group>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      {Math.round(resp.main.temp)}°
                    </Title>
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 350 }}
                  sm={4}
                  xs={4}
                  styles={{ marginTop: 50 }}
                >
                  <Card
                    shadow="sm"
                    p="md"
                    style={{ width: 250, marginBottom: 16 }}
                  >
                    <Group
                      position="apart"
                      style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                    >
                      <Title order={1} style={{ lineHeight: 1.5 }}>
                        <Text>Feels Like: {resp.main.feels_like}</Text>
                        <Text>Low: {resp.main.temp_min}</Text>
                        <Text>High: {resp.main.temp_max}</Text>
                        <Text>Pressure: {resp.main.pressure}</Text>
                        <Text>Humidity: {resp.main.humidity}</Text>
                      </Title>
                    </Group>
                  </Card>
                  <Card shadow="sm" p="md" style={{ width: 250 }}>
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
