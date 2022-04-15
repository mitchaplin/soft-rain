import { ColorScheme, Image, SimpleGrid, Title } from "@mantine/core";
import React from "react";
import { determineWeatherImage } from "../../utils";

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <SimpleGrid cols={4}>
      <Image
        src={determineWeatherImage(-1)}
        height={50}
        alt="Test"
        style={{ width: 50 }}
      />
      <Title>Soft Rain</Title>
    </SimpleGrid>
  );
}
