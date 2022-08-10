import { ColorScheme, Image, SimpleGrid, Title } from "@mantine/core";

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <SimpleGrid cols={4}>
      <Image
        src={require("./soft_rain_logo.png")}
        alt={"Soft Rain"}
        radius="md"
        height={50}
        width={50}
      />
      <Title style={{ marginLeft: "-2rem" }}>Soft Rain</Title>
    </SimpleGrid>
  );
}
