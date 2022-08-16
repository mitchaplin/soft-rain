import { Button, Group, Paper, PaperProps, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { BrandGoogle } from "tabler-icons-react";
import { loginWithGoogle } from "./firebase";

export const Authentication = (props: PaperProps) => {
  const notifications = useNotifications();
  return (
    <Paper p="sm" {...props}>
      <Text align="center" size="md">
        Log in with Google
      </Text>

      <Group grow mt="sm">
        <Button onClick={() => loginWithGoogle(notifications)} radius="xl">
          {<BrandGoogle />}
        </Button>
      </Group>
    </Paper>
  );
};
