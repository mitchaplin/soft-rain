import {
  Badge,
  Button,
  Card,
  createStyles,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Progress,
  Text,
  Title,
} from "@mantine/core";
import { useIntersection, useMediaQuery } from "@mantine/hooks";
import { useRef } from "react";
import { useTempUnit } from "../context/TempUnitProvider";
import { UV_COLORS } from "../utils";

interface CurrentWeatherProps {
  data: any;
}

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `.2rem solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

const CurrentWeather = (props: CurrentWeatherProps) => {
  const { classes, theme } = useStyles();
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const { data } = props;
  const lg = useMediaQuery("(min-width: 1600px)");
  const lgH = useMediaQuery("(min-height: 1000px)");
  const containerRef = useRef();

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  console.log(data);

  return (
    <Paper
      ref={ref}
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        height: lgH ? "94.5%" : "90%",
      }}
    >
      {lg ? (
        <Grid>
          <Grid.Col span={6} offset={1}>
            {
              <>
                <Group mt={lgH ? "0rem" : "-4rem"}>
                  <Text
                    size={"xl"}
                    sx={{
                      lineHeight: 1.5,
                      fontSize: 250,
                      color: theme.colors.blue,
                    }}
                  >
                    {tempUnit === "imperial"
                      ? Math.round(data.current.temp_f)
                      : Math.round(data.current.temp_c)}
                    °
                    <Group>
                      <Text
                        size={"md"}
                        sx={{
                          lineHeight: 1.5,
                          fontSize: 75,
                          color: theme.colors.blue,
                        }}
                      >
                        <Image
                          src={data.current.condition.icon}
                          height={75}
                          radius={"md"}
                          alt=""
                          style={{
                            width: 75,
                            margin: "1rem 2rem 0rem 0rem",
                          }}
                        />
                      </Text>
                      <Grid justify="center">
                        <Text
                          size={"md"}
                          sx={{
                            lineHeight: 1.5,
                            fontSize: 75,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.current.condition.text.toUpperCase()}
                          {data.current.is_day ? " DAY" : " NIGHT"}
                        </Text>
                      </Grid>
                    </Group>
                    <Divider my="sm" />
                  </Text>
                </Group>
                <Text
                  sx={{
                    lineHeight: 1.5,
                    fontSize: 50,
                    color: theme.colors.white,
                  }}
                >
                  {data.location.name}
                </Text>
                <Text
                  sx={{
                    lineHeight: 1.5,
                    fontSize: 50,
                    color: theme.colors.white,
                  }}
                >
                  {data.location.region}
                </Text>
                <Text
                  sx={{
                    lineHeight: 1.5,
                    fontSize: 50,
                    color: theme.colors.white,
                  }}
                >
                  {data.location.country}
                </Text>
              </>
            }
          </Grid.Col>
          <Grid.Col span={5} offset={0} mt={lgH ? "4rem" : "2rem"}>
            <Group>
              <Divider my="sm" orientation="vertical" />
              <Group sx={{ marginRight: "4rem" }}>
                <Text
                  size={"md"}
                  sx={{
                    lineHeight: 1.5,
                    fontSize: 50,
                    color: theme.colors.white,
                  }}
                >
                  Feels Like:
                </Text>
                {tempUnit === "imperial" ? (
                  <Text
                    size={"lg"}
                    sx={{
                      lineHeight: 1.5,
                      fontSize: 75,
                      color: theme.colors.blue,
                    }}
                  >
                    {Math.round(data.current.feelslike_f)}°
                  </Text>
                ) : (
                  <Text
                    size={"lg"}
                    sx={{
                      lineHeight: 1.5,
                      fontSize: 75,
                      color: theme.colors.blue,
                    }}
                  >
                    {Math.round(data.current.feelslike_c)}°
                  </Text>
                )}
              </Group>
              <Group>
                <Divider my="sm" orientation="vertical" />
                <Text
                  size={"lg"}
                  sx={{
                    lineHeight: 1.5,
                    fontSize: 50,
                    color: theme.colors.white,
                  }}
                >
                  <Group>
                    Wind:
                    <Text
                      sx={{
                        lineHeight: 1.5,
                        fontSize: 75,
                        color: theme.colors.blue,
                      }}
                    >
                      {data.current.wind_dir}
                    </Text>
                    /
                    {tempUnit === "imperial" ? (
                      <Text
                        sx={{
                          lineHeight: 1.5,
                          fontSize: 75,
                          color: theme.colors.blue,
                        }}
                      >
                        {data.current.wind_mph} mph
                      </Text>
                    ) : (
                      <Text
                        sx={{
                          lineHeight: 1.5,
                          fontSize: 75,
                          color: theme.colors.blue,
                        }}
                      >
                        {data.current.wind_kph} kph
                      </Text>
                    )}
                  </Group>
                </Text>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-top-tail"
                  height={75}
                  width={75}
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
              </Group>
              <Group mr="4rem">
                <Divider my="sm" orientation="vertical" />
                <Text
                  size={"lg"}
                  sx={{
                    lineHeight: 1.5,
                    fontSize: 50,
                    color: theme.colors.white,
                  }}
                >
                  Precipitation:
                </Text>
                {tempUnit === "imperial" ? (
                  <Text
                    size={"lg"}
                    sx={{
                      lineHeight: 1.5,
                      fontSize: 75,
                      color: theme.colors.blue,
                    }}
                  >
                    {data.current.precip_in} in
                  </Text>
                ) : (
                  <Text
                    size={"lg"}
                    sx={{
                      lineHeight: 1.5,
                      fontSize: 75,
                      color: theme.colors.blue,
                    }}
                  >
                    {data.current.precip_mm} mm
                  </Text>
                )}
              </Group>
            </Group>
            <Group mr={"4rem"}>
              <Divider my="sm" orientation="vertical" />
              <Text
                size={"lg"}
                sx={{
                  lineHeight: 1.5,
                  fontSize: 50,
                  color: theme.colors.white,
                }}
              >
                UV Index:
              </Text>

              <Text
                size={"lg"}
                sx={{
                  lineHeight: 1.5,
                  fontSize: 75,
                  color: theme.colors.blue,
                }}
              >
                {data.current.uv}
              </Text>
            </Group>
            <>
              <Progress
                mt="lg"
                animate={true}
                value={data.current.uv * 10}
                label={data.current.uv}
                size="xl"
                sx={{ width: "40rem" }}
                radius="xl"
              />
              <Progress
                mt="sm"
                size="xl"
                radius="xl"
                sx={{ width: "40rem" }}
                sections={[
                  { value: 9, color: UV_COLORS.one, label: "1" },
                  { value: 9, color: UV_COLORS.two, label: "2" },
                  { value: 9, color: UV_COLORS.three, label: "3" },
                  { value: 9, color: UV_COLORS.four, label: "4" },
                  { value: 9, color: UV_COLORS.five, label: "5" },
                  { value: 9, color: UV_COLORS.six, label: "6" },
                  { value: 9, color: UV_COLORS.seven, label: "7" },
                  { value: 9, color: UV_COLORS.eight, label: "8" },
                  { value: 9, color: UV_COLORS.nine, label: "9" },
                  { value: 9, color: UV_COLORS.ten, label: "10" },
                  { value: 10, color: UV_COLORS.eleven, label: "11" },
                ]}
              />
            </>
            <Button mt={lgH ? "5rem" : "2rem"} size="xl">
              More Data
            </Button>
          </Grid.Col>
        </Grid>
      ) : (
        <>
          <Grid justify="center">
            <Grid.Col
              style={{
                maxWidth: 265,
                width: 270,
                textAlign: "center",
              }}
              sm={4}
              xs={4}
              mt="1rem"
              mr="1rem"
            >
              <Card shadow="sm" p="lg" style={{ width: 250, height: 350 }}>
                <Card.Section>
                  <Grid justify="center" mt="1rem">
                    <Image
                      src={data.current.condition.icon}
                      height={75}
                      radius="md"
                      alt=""
                      style={{ width: 75, alignSelf: "start" }}
                    />
                  </Grid>
                </Card.Section>
                <Badge color={"blue"} variant="filled" mt={"1rem"} ml="1rem">
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
              mt="1rem"
              mr="1rem"
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
                <Title order={1} style={{ lineHeight: 1.5, paddingTop: 32 }}>
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
              mt="1rem"
              mr="1rem"
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
              mt="1rem"
              mr="1rem"
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
                    <Text size="md">Visibility: {data.current.vis_km} km</Text>
                  )}
                  {tempUnit === "imperial" ? (
                    <Text size="md">
                      Precipitation: {data.current.precip_in} in
                    </Text>
                  ) : (
                    <Text size="md">
                      Precipitation: {data.current.precip_mm} mm
                    </Text>
                  )}
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
              mt="1rem"
              mr="1rem"
              mb="1rem"
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
                  <Text size="md">Local Time: {data.location.localtime}</Text>
                </Title>
              </Card>
            </Grid.Col>
          </Grid>
        </>
      )}
    </Paper>
  );
};

export default CurrentWeather;
