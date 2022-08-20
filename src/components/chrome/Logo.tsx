import {
  ColorScheme,
  Group,
  Image,
  Title,
  useMantineTheme,
} from "@mantine/core";

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
  const theme = useMantineTheme();
  return (
    <Group>
      <Image
        src={require("./soft_rain_logo.png")}
        alt={"Soft Rain"}
        radius="md"
        height={50}
        width={50}
      />
      <Group>
        <Title> Soft</Title>{" "}
        <Title sx={{ color: theme.colors.blue }}>Rain</Title>
      </Group>
    </Group>
  );
}
