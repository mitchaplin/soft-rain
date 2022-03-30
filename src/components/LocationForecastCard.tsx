import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  GroupedTransition,
  Image,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  useWeatherOption,
  WeatherOptionsTypes,
} from "../context/WeatherOptionProvider";

interface WeatherCardProps {
  mode: WeatherOptionsTypes;
  resp: any;
}

const LocationForecastCard = (props: WeatherCardProps) => {
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
  return (
    <div>
      {resp && (
        <GroupedTransition
          mounted={true}
          transitions={{
            card1: {
              duration: duration,
              transition: "slide-right",
              timingFunction: "ease",
            },
          }}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Grid justify="space-around">
                <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                  <Card shadow="sm" p="lg" style={styles.card1}>
                    <Card.Section>
                      <Image
                        src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-1.svg"
                        height={250}
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
                        color={
                          parseConditions(resp.list[0].weather[0].main).status
                        }
                        variant="filled"
                      >
                        {resp.list[0].weather[0].description}
                      </Badge>
                    </Group>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      {Math.round(resp.list[0].temp.day)}°
                    </Title>

                    <Button
                      variant="light"
                      color="blue"
                      fullWidth
                      style={{ marginTop: 14 }}
                    >
                      Get Extended Weather
                    </Button>
                  </Card>
                </Grid.Col>
              </Grid>
            </div>
          )}
        </GroupedTransition>
      )}
    </div>
  );
};

export default LocationForecastCard;
