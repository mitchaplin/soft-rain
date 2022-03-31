import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Text,
  Title,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { WeatherOptionsTypes } from "../context/WeatherOptionProvider";

interface WeatherCardProps {
  mode: WeatherOptionsTypes;
  resp: any;
}

const FiveDayForecast = (props: WeatherCardProps) => {
  const theme = useMantineTheme();
  const duration = 1000;
  const { resp, mode } = props;
  const parseConditions = (condition: any) => {
    switch (condition) {
      case "Clear":
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
        <Transition
          mounted={!!resp}
          transition="slide-down"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Grid justify="center">
                <Grid.Col style={{ maxWidth: 300 }} sm={4} xs={4}>
                  <Card shadow="sm" p="lg">
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
                        {Math.round(resp.main.temp)}°
                      </Title>
                      <Badge
                        color={parseConditions(resp.weather[0].main).status}
                        variant="filled"
                      >
                        {resp.weather[0].description}
                      </Badge>
                    </Group>
                    <Title order={1} style={{ lineHeight: 1.5 }}>
                      {resp.name}
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
                {mode === "five" && (
                  <Grid.Col style={{ maxWidth: 300 }} sm={4} xs={4}>
                    <Card shadow="sm" p="lg">
                      <Card.Section>
                        <Image
                          src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-2.svg"
                          height={250}
                          alt="Norway"
                        />
                      </Card.Section>

                      <Group
                        position="apart"
                        style={{
                          marginBottom: 5,
                          marginTop: theme.spacing.sm,
                        }}
                      >
                        <Text weight={500}>Norway Fjord Adventures</Text>
                        <Badge color="pink" variant="light">
                          On Sale
                        </Badge>
                      </Group>

                      <Text size="sm" style={{ lineHeight: 1.5 }}>
                        With Fjord Tours you can explore more of the magical
                        fjord landscapes with tours and activities on and around
                        the fjords of Norway
                      </Text>

                      <Button
                        variant="light"
                        color="blue"
                        fullWidth
                        style={{ marginTop: 14 }}
                      >
                        Book classic tour now
                      </Button>
                    </Card>
                  </Grid.Col>
                )}
                {mode === "five" && (
                  <Grid.Col style={{ maxWidth: 300 }} sm={4} xs={4}>
                    <Card shadow="sm" p="lg">
                      <Card.Section>
                        <Image
                          src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-3.svg"
                          height={250}
                          alt="Norway"
                        />
                      </Card.Section>

                      <Group
                        position="apart"
                        style={{
                          marginBottom: 5,
                          marginTop: theme.spacing.sm,
                        }}
                      >
                        <Text weight={500}>Norway Fjord Adventures</Text>
                        <Badge color="pink" variant="light">
                          On Sale
                        </Badge>
                      </Group>

                      <Text size="sm" style={{ lineHeight: 1.5 }}>
                        With Fjord Tours you can explore more of the magical
                        fjord landscapes with tours and activities on and around
                        the fjords of Norway
                      </Text>

                      <Button
                        variant="light"
                        color="blue"
                        fullWidth
                        style={{ marginTop: 14 }}
                      >
                        Book classic tour now
                      </Button>
                    </Card>
                  </Grid.Col>
                )}
                {mode === "five" && (
                  <Grid.Col style={{ maxWidth: 300 }} sm={4} xs={4}>
                    <Card shadow="sm" p="lg">
                      <Card.Section>
                        <Image
                          src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-4.svg"
                          height={250}
                          alt="Norway"
                        />
                      </Card.Section>

                      <Group
                        position="apart"
                        style={{
                          marginBottom: 5,
                          marginTop: theme.spacing.sm,
                        }}
                      >
                        <Text weight={500}>Norway Fjord Adventures</Text>
                        <Badge color="pink" variant="light">
                          On Sale
                        </Badge>
                      </Group>

                      <Text size="sm" style={{ lineHeight: 1.5 }}>
                        With Fjord Tours you can explore more of the magical
                        fjord landscapes with tours and activities on and around
                        the fjords of Norway
                      </Text>

                      <Button
                        variant="light"
                        color="blue"
                        fullWidth
                        style={{ marginTop: 14 }}
                      >
                        Book classic tour now
                      </Button>
                    </Card>
                  </Grid.Col>
                )}
                {mode === "five" && (
                  <Grid.Col style={{ maxWidth: 300 }} sm={4} xs={4}>
                    <Card shadow="sm" p="lg">
                      <Card.Section>
                        <Image
                          src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg"
                          height={250}
                          alt="Norway"
                        />
                      </Card.Section>

                      <Group
                        position="apart"
                        style={{
                          marginBottom: 5,
                          marginTop: theme.spacing.sm,
                        }}
                      >
                        <Text weight={500}>Norway Fjord Adventures</Text>
                        <Badge color="pink" variant="light">
                          On Sale
                        </Badge>
                      </Group>

                      <Text size="sm" style={{ lineHeight: 1.5 }}>
                        With Fjord Tours you can explore more of the magical
                        fjord landscapes with tours and activities on and around
                        the fjords of Norway
                      </Text>

                      <Button
                        variant="light"
                        color="blue"
                        fullWidth
                        style={{ marginTop: 14 }}
                      >
                        Book classic tour now
                      </Button>
                    </Card>
                  </Grid.Col>
                )}
              </Grid>
            </div>
          )}
        </Transition>
      )}
    </div>
  );
};
export default FiveDayForecast;
