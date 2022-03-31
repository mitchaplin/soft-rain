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
                <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                  <Card shadow="sm" p="lg">
                    <Card.Section>
                      <Image
                        src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-1.svg"
                        height={350}
                        alt="Test"
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
                    {/* 
                    <Button
                      variant="light"
                      color="blue"
                      fullWidth
                      style={{ marginTop: 14 }}
                    >
                      Get Extended Weather
                    </Button> */}
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 350 }}
                  sm={4}
                  xs={4}
                  styles={{ marginTop: 50 }}
                >
                  <Card shadow="sm" p="lg">
                    <Group
                      position="apart"
                      style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                    >
                      <Title order={1} style={{ lineHeight: 1.5 }}>
                        <Text>Feels Like: {resp.main.feels_like}</Text>
                        <Text> Low: {resp.main.temp_min}</Text>
                        <Text>High: {resp.main.temp_max}</Text>
                        <Text> Pressure: {resp.main.pressure}</Text>
                        <Text> Humidity: {resp.main.humidity}</Text>
                      </Title>
                    </Group>

                    {/* 
                    <Button
                      variant="light"
                      color="blue"
                      fullWidth
                      style={{ marginTop: 14 }}
                    >
                      Get Extended Weather
                    </Button> */}
                  </Card>
                  <Grid style={{ marginLeft: 0.25, marginTop: 16 }}>
                    <Card shadow="sm" p="lg" style={{ height: 327 }}>
                      <Group
                        position="apart"
                        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                      >
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
                          {/* <ArrowLeftCircle
                            size={200}
                            width={216}
                            style={{ transform: "90deg" }}
                          />
                        // </Title>
                        <Text>Test: Test</Text> */}
                        </Title>
                      </Group>

                      {/* 
                    <Button
                      variant="light"
                      color="blue"
                      fullWidth
                      style={{ marginTop: 14 }}
                    >
                      Get Extended Weather
                    </Button> */}
                    </Card>
                  </Grid>
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
