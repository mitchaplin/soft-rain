import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  GroupedTransition,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";

const Cards = (resp: any) => {
  const theme = useMantineTheme();
  const duration = 1000;

  return (
    <div>
      {resp && (
        <GroupedTransition
          mounted={!!resp}
          transitions={{
            card1: {
              duration: duration,
              transition: "slide-right",
              timingFunction: "ease",
            },
            card2: {
              duration: duration * 1.5,
              transition: "slide-right",
              timingFunction: "ease",
            },
            card3: {
              duration: duration * 2,
              transition: "slide-right",
              timingFunction: "ease",
            },
            card4: {
              duration: duration * 2.5,
              transition: "slide-right",
              timingFunction: "ease",
            },
            card5: {
              duration: duration * 3,
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
                      <Text weight={500}>Norway Fjord Adventures</Text>
                      <Badge color="pink" variant="light">
                        On Sale
                      </Badge>
                    </Group>

                    <Text size="sm" style={{ lineHeight: 1.5 }}>
                      testeasdjkahslkfhasdjklfhaskldfhj
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
                <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                  <Card shadow="sm" p="lg" style={styles.card2}>
                    <Card.Section>
                      <Image
                        src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-2.svg"
                        height={250}
                        alt="Norway"
                      />
                    </Card.Section>

                    <Group
                      position="apart"
                      style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                    >
                      <Text weight={500}>Norway Fjord Adventures</Text>
                      <Badge color="pink" variant="light">
                        On Sale
                      </Badge>
                    </Group>

                    <Text size="sm" style={{ lineHeight: 1.5 }}>
                      With Fjord Tours you can explore more of the magical fjord
                      landscapes with tours and activities on and around the
                      fjords of Norway
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
                <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                  <Card shadow="sm" p="lg" style={styles.card3}>
                    <Card.Section>
                      <Image
                        src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-3.svg"
                        height={250}
                        alt="Norway"
                      />
                    </Card.Section>

                    <Group
                      position="apart"
                      style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                    >
                      <Text weight={500}>Norway Fjord Adventures</Text>
                      <Badge color="pink" variant="light">
                        On Sale
                      </Badge>
                    </Group>

                    <Text size="sm" style={{ lineHeight: 1.5 }}>
                      With Fjord Tours you can explore more of the magical fjord
                      landscapes with tours and activities on and around the
                      fjords of Norway
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
                <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                  <Card shadow="sm" p="lg" style={styles.card4}>
                    <Card.Section>
                      <Image
                        src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-4.svg"
                        height={250}
                        alt="Norway"
                      />
                    </Card.Section>

                    <Group
                      position="apart"
                      style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                    >
                      <Text weight={500}>Norway Fjord Adventures</Text>
                      <Badge color="pink" variant="light">
                        On Sale
                      </Badge>
                    </Group>

                    <Text size="sm" style={{ lineHeight: 1.5 }}>
                      With Fjord Tours you can explore more of the magical fjord
                      landscapes with tours and activities on and around the
                      fjords of Norway
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
                <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
                  <Card shadow="sm" p="lg" style={styles.card5}>
                    <Card.Section>
                      <Image
                        src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg"
                        height={250}
                        alt="Norway"
                      />
                    </Card.Section>

                    <Group
                      position="apart"
                      style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                    >
                      <Text weight={500}>Norway Fjord Adventures</Text>
                      <Badge color="pink" variant="light">
                        On Sale
                      </Badge>
                    </Group>

                    <Text size="sm" style={{ lineHeight: 1.5 }}>
                      With Fjord Tours you can explore more of the magical fjord
                      landscapes with tours and activities on and around the
                      fjords of Norway
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
              </Grid>
            </div>
          )}
        </GroupedTransition>
      )}
    </div>
  );
};

export default Cards;
