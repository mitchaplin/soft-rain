import { Button, Group, Paper, PaperProps, Text } from "@mantine/core";
import { BrandGoogle } from "tabler-icons-react";

export const Authentication = (props: PaperProps) => {
  return (
    <Paper p="sm" {...props}>
      <Text align="center" size="md">
        Log in with Google
      </Text>

      <Group grow mb="md" mt="md">
        <Button radius="xl">{<BrandGoogle />}</Button>
      </Group>
    </Paper>
  );
};
