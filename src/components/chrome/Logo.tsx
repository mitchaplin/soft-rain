import { ColorScheme, Image, SimpleGrid, Title } from "@mantine/core";
import { determineWeatherImage } from "../../utils";

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <SimpleGrid cols={4}>
      <Image
        src={determineWeatherImage("")}
        height={50}
        alt="Test"
        style={{ width: 50 }}
      />
      <Title>Soft Rain</Title>
    </SimpleGrid>
  );
}
