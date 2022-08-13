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
import { useWeatherOption } from "../context/WeatherOptionProvider";

interface CurrentWeatherProps {
  data: any;
}
const CurrentWeather = (props: CurrentWeatherProps) => {
  const theme = useMantineTheme();
  const { weatherOption, setWeatherOption } = useWeatherOption();
  const duration = 1000;
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const { data } = props;

  // const resp = testData;
  return (
    <div>
      {data && (
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
                  <Card shadow="sm" p="lg" style={{ width: 250, height: 350 }}>
                    <Card.Section style={{ margin: "0px 0px 0px 10px" }}>
                      <Grid justify="center">
                        <Image
                          src={data.current.condition.icon}
                          height={75}
                          radius={"md"}
                          alt=""
                          style={{ width: 75, justifyContent: "center" }}
                        />
                      </Grid>
                    </Card.Section>
                    <Badge
                      color={"blue"}
                      variant="filled"
                      style={{ margin: "12px 0 0 12px" }}
                    >
                      {data.current.condition.text.toUpperCase()}
                    </Badge>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      {tempUnit === "imperial"
                        ? Math.round(data.current.temp_f)
                        : Math.round(data.current.temp_c)}
                      °
                    </Title>
                    <Title order={2} style={{ lineHeight: 1.5 }}>
                      {data.location.name}
                    </Title>
                    <Title order={2} style={{ lineHeight: 1.5 }}>
                      {data.location.region}
                    </Title>
                    <Text component="p" size="md">
                      {data.location.country}
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 265, textAlign: "center" }}
                  sm={4}
                  xs={4}
                  styles={{ marginTop: 50 }}
                >
                  <Card shadow="sm" p="md" style={{ width: 250, height: 350 }}>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      Wind
                      {tempUnit === "imperial" ? (
                        <Text size="md">Speed: {data.current.wind_mph}</Text>
                      ) : (
                        <Text size="md">Speed: {data.current.wind_kph}</Text>
                      )}
                      <Text size="md">Degree: {data.current.wind_degree}</Text>
                      <Text size="md">Direction: {data.current.wind_dir}</Text>
                      {tempUnit === "imperial" ? (
                        <Text size="md">Gust: {data.current.gust_mph}</Text>
                      ) : (
                        <Text size="md">Gust: {data.current.gust_kph}</Text>
                      )}
                    </Title>
                    <Title
                      order={1}
                      style={{ lineHeight: 1.5, paddingTop: 32 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-arrow-top-tail"
                        height={100}
                        width={100}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform={`rotate(${data.current.wind_degree})`}
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
                    </Title>
                  </Card>
                </Grid.Col>

                <Grid.Col
                  style={{ maxWidth: 265, textAlign: "center" }}
                  sm={4}
                  xs={4}
                  styles={{ marginTop: 50 }}
                >
                  <Card shadow="sm" p="md" style={{ width: 250, height: 350 }}>
                    <Group position="apart">
                      <Title order={1} style={{ lineHeight: 1.5 }}>
                        Temperature
                        <Text size="md">
                          Feels Like:{" "}
                          {tempUnit === "imperial"
                            ? Math.round(data.current.feelslike_f)
                            : Math.round(data.current.feelslike_c)}
                          °
                        </Text>
                        <Text size="md">
                          Pressure: {data.current.pressure_in} in
                        </Text>
                        <Text size="md">
                          Pressure: {data.current.pressure_mb} mb
                        </Text>
                      </Title>
                    </Group>
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 265, textAlign: "center" }}
                  sm={4}
                  xs={4}
                >
                  <Card shadow="sm" p="md" style={{ width: 250, height: 350 }}>
                    <Title
                      order={1}
                      style={{
                        lineHeight: 1.5,
                      }}
                    >
                      Conditions
                      {tempUnit === "imperial" ? (
                        <Text size="md">
                          Visibility: {data.current.vis_miles} in
                        </Text>
                      ) : (
                        <Text size="md">
                          Visibility: {data.current.vis_km} km
                        </Text>
                      )}
                      <Text size="md">
                        Precipitation: {data.current.precip_in} in
                      </Text>
                      <Text size="md">
                        Precipitation: {data.current.precip_in} in
                      </Text>
                      <Text size="md">Cloud Cover: {data.current.cloud}%</Text>
                      <Text size="md">Humidity: {data.current.humidity}%</Text>
                      <Text size="md">UV Index: {data.current.uv}</Text>
                    </Title>
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 265, textAlign: "center" }}
                  sm={4}
                  xs={4}
                >
                  <Card
                    shadow="sm"
                    p="md"
                    style={{
                      width: 250,
                      textAlign: "center",
                      height: 350,
                    }}
                  >
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      Coords
                      <Text size="md">Timezone: {data.location.tz_id}</Text>
                      <Text size="md">Lat: {data.location.lat}</Text>
                      <Text size="md">Long: {data.location.lon}</Text>
                      <Text size="md">
                        Local Time: {data.location.localtime}
                      </Text>
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
