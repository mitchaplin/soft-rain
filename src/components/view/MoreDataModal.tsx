import {
  Button,
  Divider,
  Group,
  Modal,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { ArrowRight } from "tabler-icons-react";
import { useTempUnit } from "../../context/TempUnitProvider";
import { CurrentWeatherType } from "../../resources/types";

interface MoreDataModalProps {
  data: CurrentWeatherType;
}
export const MoreDataModal = ({ data }: MoreDataModalProps) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const lgH = useMediaQuery("(min-height: 1000px)");

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Current Weather Information"
        sx={{ fontSize: 25 }}
        size="75%"
      >
        <Group mr="4rem">
          <Divider my="sm" orientation="vertical" />
          <Text
            size="lg"
            sx={{
              lineHeight: 1.5,
              fontSize: 25,
              color: theme.colors.white,
            }}
          >
            Gust:
          </Text>
          {tempUnit === "imperial" ? (
            <Text
              size="lg"
              sx={{
                lineHeight: 1.5,
                fontSize: 50,
                color: theme.colors.blue,
              }}
            >
              {data.current.gust_mph} mph
            </Text>
          ) : (
            <Text
              size="lg"
              sx={{
                lineHeight: 1.5,
                fontSize: 75,
                color: theme.colors.blue,
              }}
            >
              {data.current.gust_kph} kph
            </Text>
          )}
        </Group>
        <Group>
          <Divider my="sm" orientation="vertical" />
          <Text size={25}>Humidity:</Text>
          <Text
            sx={{
              fontSize: 50,
              color: theme.colors.blue,
            }}
          >
            {data.current.humidity}%
          </Text>
        </Group>

        <Group mr="4rem">
          <Divider my="sm" orientation="vertical" />
          <Text
            size="lg"
            sx={{
              lineHeight: 1.5,
              fontSize: 25,
              color: theme.colors.white,
            }}
          >
            Pressure:
          </Text>
          {tempUnit === "imperial" ? (
            <Text
              size="lg"
              sx={{
                lineHeight: 1.5,
                fontSize: 50,
                color: theme.colors.blue,
              }}
            >
              {data.current.pressure_in} in
            </Text>
          ) : (
            <Text
              size="lg"
              sx={{
                lineHeight: 1.5,
                fontSize: 50,
                color: theme.colors.blue,
              }}
            >
              {data.current.pressure_mb} mb
            </Text>
          )}
        </Group>

        <Group mr="4rem">
          <Divider my="sm" orientation="vertical" />
          <Text
            size="lg"
            sx={{
              lineHeight: 1.5,
              fontSize: 25,
              color: theme.colors.white,
            }}
          >
            Visibility:
          </Text>
          {tempUnit === "imperial" ? (
            <Text
              size="lg"
              sx={{
                lineHeight: 1.5,
                fontSize: 50,
                color: theme.colors.blue,
              }}
            >
              {data.current.vis_miles} miles
            </Text>
          ) : (
            <Text
              size="lg"
              sx={{
                lineHeight: 1.5,
                fontSize: 50,
                color: theme.colors.blue,
              }}
            >
              {data.current.vis_km} km
            </Text>
          )}
        </Group>
      </Modal>

      <Button
        mt={lgH ? "5rem" : "2rem"}
        size="xl"
        sx={{
          fontSize: 20,
          "&:hover": {},
        }}
        onClick={() => setOpened(true)}
        rightIcon={<ArrowRight />}
      >
        <span style={{ paddingBottom: ".25rem" }}>More Data</span>
      </Button>
    </>
  );
};
