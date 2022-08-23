import {
  Badge,
  Button,
  Card,
  createStyles,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  Progress,
  Text,
  Title,
} from "@mantine/core";
import { useIntersection, useMediaQuery } from "@mantine/hooks";
import { useEffect, useRef } from "react";
import { useSearchText } from "../context/SearchTextProvider";
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
  const { searchText, setSearchText } = useSearchText();
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSearchText("Madison, WI, USA");
  }, [firstRender.current]);

  return (
    <Paper
      ref={ref}
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
        <>
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
                    value={data.current.uv * 9}
                    label={data.current.uv}
                    size="xl"
                    sx={{ width: "40rem" }}
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
                    maxWidth: 295,
                    width: 295,
                    textAlign: "center",
                  }}
                  sm={4}
                  xs={4}
                  mt="1rem"
                  mr="1rem"
                >
                  <Card shadow="sm" p="lg" style={{ width: 295, height: 350 }}>
                    <Card.Section>
                      <Group sx={{ justifyContent: "center" }}>
                        <Text
                          size={75}
                          sx={{
                            color: theme.colors.blue,
                          }}
                        >
                          {tempUnit === "imperial"
                            ? Math.round(data.current.temp_f)
                            : Math.round(data.current.temp_c)}
                          °
                        </Text>
                        <Grid justify="center" mt="1rem">
                          <Image
                            src={data.current.condition.icon}
                            height={75}
                            radius="md"
                            alt=""
                            style={{ width: 75 }}
                          />
                        </Grid>
                      </Group>
                    </Card.Section>
                    <Badge color="blue" variant="filled" mb="1.5rem">
                      {data.current.condition.text.toUpperCase()}
                    </Badge>
                    <Divider />
                    <Title order={2} style={{ lineHeight: 1.5 }} mt="1rem">
                      {data.location.name}
                    </Title>
                    <Title order={2} style={{ lineHeight: 1.5 }} mt="1rem">
                      {data.location.region}
                    </Title>
                    <Text component="p" size="md">
                      {data.location.country}
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 295, textAlign: "center" }}
                  sm={4}
                  xs={4}
                  mt="1rem"
                  mr="1rem"
                >
                  <Card shadow="sm" p="md" style={{ width: 295, height: 350 }}>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      Wind
                      {tempUnit === "imperial" ? (
                        <Group>
                          <Text size={15}>Speed:</Text>
                          <Text
                            sx={{
                              fontSize: 20,
                              color: theme.colors.blue,
                            }}
                          >
                            {data.current.wind_mph} mph
                          </Text>
                        </Group>
                      ) : (
                        <Group>
                          <Text size={15}>Speed:</Text>
                          <Text
                            sx={{
                              fontSize: 20,
                              color: theme.colors.blue,
                            }}
                          >
                            {data.current.wind_kph} kph
                          </Text>
                        </Group>
                      )}
                      <Group>
                        <Text size={15}>Degree:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.current.wind_degree}
                        </Text>
                      </Group>
                      <Group>
                        <Text size={15}>Direction:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.current.wind_dir}
                        </Text>
                      </Group>
                      {tempUnit === "imperial" ? (
                        <Group>
                          <Text size={15}>Gust:</Text>
                          <Text
                            sx={{
                              fontSize: 20,
                              color: theme.colors.blue,
                            }}
                          >
                            {data.current.gust_mph} mph
                          </Text>
                        </Group>
                      ) : (
                        <Group>
                          <Text size={15}>Gust:</Text>
                          <Text
                            sx={{
                              fontSize: 20,
                              color: theme.colors.blue,
                            }}
                          >
                            {data.current.gust_kph} kph
                          </Text>
                        </Group>
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
                  style={{ maxWidth: 295, textAlign: "center" }}
                  sm={4}
                  xs={4}
                  mt="1rem"
                  mr="1rem"
                >
                  <Card shadow="sm" p="md" style={{ width: 295, height: 350 }}>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      Temperature
                      <Group>
                        <Text size={15}> Feels Like: </Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {tempUnit === "imperial"
                            ? Math.round(data.current.feelslike_f)
                            : Math.round(data.current.feelslike_c)}
                          °
                        </Text>
                      </Group>
                      <Group>
                        <Text size={15}>Pressure:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.current.pressure_in} in
                        </Text>
                      </Group>
                      <Group>
                        <Text size={15}>Pressure:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.current.pressure_mb} mb
                        </Text>
                      </Group>
                    </Title>
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 295, textAlign: "center" }}
                  sm={4}
                  xs={4}
                  mt="1rem"
                  mr="1rem"
                >
                  <Card shadow="sm" p="md" style={{ width: 295, height: 350 }}>
                    <Title
                      order={1}
                      style={{
                        lineHeight: 1.5,
                      }}
                    >
                      Conditions
                      {tempUnit === "imperial" ? (
                        <Group>
                          <Text size={15}>Visibility:</Text>
                          <Text
                            sx={{
                              fontSize: 20,
                              color: theme.colors.blue,
                            }}
                          >
                            {data.current.vis_miles} in
                          </Text>
                        </Group>
                      ) : (
                        <Group>
                          <Text size={15}>Visibility:</Text>
                          <Text
                            sx={{
                              fontSize: 20,
                              color: theme.colors.blue,
                            }}
                          >
                            {data.current.vis_km} km
                          </Text>
                        </Group>
                      )}
                      {tempUnit === "imperial" ? (
                        <Group>
                          <Text size={15}>Precipitation:</Text>
                          <Text
                            sx={{
                              fontSize: 20,
                              color: theme.colors.blue,
                            }}
                          >
                            {data.current.precip_in} in
                          </Text>
                        </Group>
                      ) : (
                        <Group>
                          <Text size={15}>Precipitation:</Text>
                          <Text
                            sx={{
                              fontSize: 20,
                              color: theme.colors.blue,
                            }}
                          >
                            {data.current.precip_mm} mm
                          </Text>
                        </Group>
                      )}
                      <Group>
                        <Text size={15}>Cloud Cover:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.current.cloud}%
                        </Text>
                      </Group>
                      <Group>
                        <Text size={15}>Humidity:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.current.humidity}%
                        </Text>
                      </Group>
                      <Group>
                        <Text size={15}>UV Index:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.current.uv}
                        </Text>
                      </Group>
                    </Title>
                  </Card>
                </Grid.Col>
                <Grid.Col
                  style={{ maxWidth: 295, textAlign: "center" }}
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
                      width: 295,
                      textAlign: "center",
                      height: 350,
                    }}
                  >
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      Other
                      <Group>
                        <Text size={15}>Timezone:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.location.tz_id}
                        </Text>
                      </Group>
                      <Group>
                        <Text size={15}>Lat:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.location.lat}
                        </Text>
                      </Group>
                      <Group>
                        <Text size={15}>Long:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.location.lon}
                        </Text>
                      </Group>
                      <Group>
                        <Text size={15}>Local Time:</Text>
                        <Text
                          sx={{
                            fontSize: 20,
                            color: theme.colors.blue,
                          }}
                        >
                          {data.location.localtime}
                        </Text>
                      </Group>
                    </Title>
                  </Card>
                </Grid.Col>
              </Grid>
            </>
          )}
        </>
      )}
    </Paper>
  );
};

export default CurrentWeather;
