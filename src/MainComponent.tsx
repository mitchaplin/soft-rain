import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Navbar,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import {
  MoonStars,
  Sun,
  TemperatureCelsius,
  TemperatureFahrenheit,
} from "tabler-icons-react";
import { Logo } from "./components/chrome/Logo";
import { User } from "./components/chrome/User";
import { WeatherOptions } from "./components/chrome/WeatherOptions";
import Forecast from "./components/Forecast";
import { useTempUnit } from "./context/TempUnitProvider";
const MainComponent = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { tempUnit, toggleTempUnit } = useTempUnit();
  return (
    <AppShell
      padding="md"
      fixed
      navbarOffsetBreakpoint={"sm"}
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section grow mt="xs">
            <WeatherOptions />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Logo colorScheme={colorScheme} />
            <Group>
              <ActionIcon
                variant="default"
                onClick={() => toggleTempUnit()}
                size={30}
              >
                {tempUnit === "metric" ? (
                  <TemperatureCelsius size={16} />
                ) : (
                  <TemperatureFahrenheit size={16} />
                )}
              </ActionIcon>

              <ActionIcon
                variant="default"
                onClick={() => toggleColorScheme()}
                size={30}
              >
                {colorScheme === "dark" ? (
                  <Sun size={16} />
                ) : (
                  <MoonStars size={16} />
                )}
              </ActionIcon>
            </Group>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Forecast />
    </AppShell>
  );
};

export default MainComponent;
