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
import { useTempUnit } from "../context/TempUnitProvider";
import {
  useWeatherOption,
  WeatherOptionsTypes,
} from "../context/WeatherOptionProvider";
import { testData } from "../testdata";
import { determineWeatherImage } from "../utils";

interface WeatherCardProps {
  mode: WeatherOptionsTypes;
  resp: any;
}
const CurrentWeather = (props: WeatherCardProps) => {
  const theme = useMantineTheme();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const duration = 1000;
  const { tempUnit, toggleTempUnit } = useTempUnit();
  // const { resp, mode } = props;

  const resp = testData;
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
                        src={determineWeatherImage(resp.current.condition.icon)}
                        height={297}
                        alt="Test"
                        style={{ width: 250 }}
                      />
                    </Card.Section>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      {tempUnit === "imperial"
                        ? Math.round(resp.current.temp_f)
                        : Math.round(resp.current.temp_c)}
                      °
                    </Title>

                    <Title order={2} style={{ lineHeight: 1.5 }}>
                      {resp.location.name}
                    </Title>

                    <Text component="p" size="xl">
                      {resp.location.country}
                    </Text>
                    <Badge color={"blue"} variant="filled">
                      {resp.current.condition.text.toUpperCase()}
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
                        <Text>
                          Feels Like:
                          {tempUnit === "imperial"
                            ? Math.round(resp.current.feelslike_f)
                            : Math.round(resp.current.feelslike_c)}
                          °
                        </Text>
                        <Text>Pressure: {resp.current.pressure_in} in</Text>
                        <Text>Pressure: {resp.current.pressure_mb} mb</Text>
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
                      }}
                    >
                      Conditions
                      {tempUnit === "imperial" ? (
                        <Text>Visibility: {resp.current.vis_miles} in</Text>
                      ) : (
                        <Text>Visibility: {resp.current.vis_km} km</Text>
                      )}
                      <Text>Precipitation: {resp.current.precip_in} in</Text>
                      <Text>Precipitation: {resp.current.precip_in} in</Text>
                      <Text>Cloud Cover: {resp.current.cloud}%</Text>
                      <Text>Humidity: {resp.current.humidity}%</Text>
                      <Text>UV Index: {resp.current.uv}</Text>
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
                      <Text>Timezone: {resp.location.tz_id}</Text>
                      <Text>Lat: {resp.location.lat}</Text>
                      <Text>Long: {resp.location.lon}</Text>
                      <Text>Local Time: {resp.location.localtime}</Text>
                    </Title>
                  </Card>
                </Grid.Col>
                <Grid.Col>
                  <Card shadow="sm" p="md" style={{ width: 250 }}>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      Wind
                      {tempUnit === "imperial" ? (
                        <Text>Speed: {resp.current.wind_mph}</Text>
                      ) : (
                        <Text>Speed: {resp.current.wind_kph}</Text>
                      )}
                      <Text>Degree: {resp.current.wind_degree}</Text>
                      <Text>Direction: {resp.current.wind_dir}</Text>
                      {tempUnit === "imperial" ? (
                        <Text>Gust: {resp.current.gust_mph}</Text>
                      ) : (
                        <Text>Gust: {resp.current.gust_kph}</Text>
                      )}
                    </Title>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      <div
                        style={{
                          alignContent: "center",
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          transform={`rotate(${resp.current.wind_degree})`}
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
