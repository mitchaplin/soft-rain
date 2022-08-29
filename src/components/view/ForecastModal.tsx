import {
  Button,
  Grid,
  Group,
  Image,
  Modal,
  Table,
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
  const rows = range(0, 24).map((item, index) => {
    return (
      <tr key={index}>
        <td>
          <Text size={15}>{row?.data?.hour[item]?.time.split(" ")[1]}</Text>
        </td>
        <td>
          <Grid align="center">
            <Image
              src={row?.data?.hour[item]?.condition.icon}
              height={50}
              radius="md"
              alt=""
              mr="1rem"
              style={{ width: 50, justifyContent: "center" }}
            />
            <Text
              sx={{
                fontSize: 25,
                color: theme.colors.blue,
              }}
            >
              {md && row?.data?.hour[item]?.condition.text}
            </Text>
          </Grid>
        </td>
        {tempUnit === "metric" ? (
          <td>
            <Text
              sx={{
                fontSize: 25,
                color: theme.colors.blue,
              }}
            >
              {row?.data?.hour[item]?.temp_c.toFixed(0)}°C
            </Text>
          </td>
        ) : (
          <td>
            <Text
              sx={{
                fontSize: 25,
                color: theme.colors.blue,
              }}
            >
              {row?.data?.hour[item]?.temp_f.toFixed(0)}°F
            </Text>
          </td>
        )}
        <td>
          <Text
            sx={{
              fontSize: 25,
              color: theme.colors.blue,
            }}
          >
            {row?.data?.hour[item]?.chance_of_rain >
            row?.data?.hour[item]?.chance_of_snow
              ? row?.data?.hour[item]?.chance_of_rain
              : row?.data?.hour[item]?.chance_of_snow}
            %
          </Text>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} size="75vw">
        <Group position="apart">
          <>
            <Table fontSize="lg" verticalSpacing="xs">
              <thead>
                <tr>
                  {lg && <th>Time</th>}
                  {lg && <th>Forecast</th>}
                  {lg && <th>Temperature</th>}
                  {lg && <th>Precipitation %</th>}
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </>
        </Group>
      </Modal>

      <Button onClick={() => setOpened(true)}>
        {`${row?.data?.date.split(" ")}`} Forecast
      </Button>
    </>
  );
};
