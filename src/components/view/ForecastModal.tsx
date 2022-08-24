import {
  Button,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useTempUnit } from "../../context/TempUnitProvider";

export const ForecastModal = (row: any) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const md = useMediaQuery("(min-width: 800px)");
  const lg = useMediaQuery("(min-width: 1000px)");

  const range = (start: number, end: number, length = end - start) =>
    Array.from({ length }, (_, i) => start + i);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} size="75vw">
        <Group position="apart">
          {lg && (
            <Text
              sx={{
                fontSize: 20,
                justifyContent: "center",
              }}
            >
              Time
            </Text>
          )}
          {lg && (
            <Text
              ml="8rem"
              sx={{
                fontSize: 20,
                justifyContent: "center",
              }}
            >
              Condition
            </Text>
          )}
          {lg && (
            <Text
              ml="6rem"
              sx={{
                fontSize: 20,
                justifyContent: "center",
              }}
            >
              Temperature
            </Text>
          )}
          {lg && (
            <Text
              sx={{
                fontSize: 20,
                justifyContent: "center",
              }}
            >
              Precipitation %
            </Text>
          )}
        </Group>
        <Divider my="sm" orientation="horizontal" />
        {range(0, 24).map((item) => (
          <>
            <Group position="apart">
              <Text size={15}>{row?.data?.hour[item].time.split(" ")[1]}</Text>
              <Grid align="center">
                <Image
                  src={row?.data?.hour[item].condition.icon}
                  height={50}
                  radius="md"
                  alt=""
                  style={{ width: 50, justifyContent: "center" }}
                />
                <Text
                  sx={{
                    fontSize: 25,
                    color: theme.colors.blue,
                  }}
                >
                  {md && row?.data?.hour[item].condition.text}
                </Text>
              </Grid>
              {tempUnit === "metric" ? (
                <Text
                  sx={{
                    fontSize: 25,
                    color: theme.colors.blue,
                  }}
                >
                  {row?.data?.hour[item].temp_c.toFixed(0)}°C
                </Text>
              ) : (
                <Text
                  sx={{
                    fontSize: 25,
                    color: theme.colors.blue,
                  }}
                >
                  {row?.data?.hour[item].temp_f.toFixed(0)}°F
                </Text>
              )}
              <Text
                sx={{
                  fontSize: 25,
                  color: theme.colors.blue,
                }}
              >
                {row?.data?.hour[item].chance_of_rain >
                row?.data?.hour[item].chance_of_snow
                  ? row?.data?.hour[item].chance_of_rain
                  : row?.data?.hour[item].chance_of_snow}
                %
              </Text>
            </Group>
            <Divider my="sm" orientation="horizontal" />
          </>
        ))}
      </Modal>

      <Button onClick={() => setOpened(true)}>
        {`${row?.data?.date.split(" ")}`} Forecast
      </Button>
    </>
  );
};
