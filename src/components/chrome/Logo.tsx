import { ColorScheme, Group, Image, Title } from "@mantine/core";

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <Group>
      <Image
        src={require("./soft_rain_logo.png")}
        alt={"Soft Rain"}
        radius="md"
        height={50}
        width={50}
      />
      <Title style={{ display: "inline-block" }}>Soft Rain</Title>
    </Group>
  );
}
