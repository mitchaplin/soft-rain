import { Box, Navbar, ScrollArea } from "@mantine/core";
import React from "react";
import { Brand } from "./Brand";
import { User } from "./User";
import { WeatherOptions } from "./WeatherOptions";

function SavedSearchComponent() {
  return (
    <Navbar height={600} p="xs" width={{ base: 300 }}>
      <Navbar.Section mt="xs">
        <Brand />
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Box py="md">
          <WeatherOptions />
          <WeatherOptions />
          <WeatherOptions />
          <WeatherOptions />
        </Box>
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
}

export const scrollbars: any = {
  type: "demo",
  component: SavedSearchComponent,
  demoProps: { spacing: false },
};
