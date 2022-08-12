import {
  Avatar,
  Box,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import { Authentication } from "../login/Authentication";

export function User() {
  const theme = useMantineTheme();
  const user = true;
  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={
          user
            ? {
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              }
            : {
                display: "block",
                width: "100%",
                cursor: "default",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,
              }
        }
      >
        {user ? (
          <Group>
            <Avatar
              src="https://www.zoontjens.co.uk/cms/wp-content/uploads/stock-male.jpg"
              radius="xl"
            />
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                John Dough
              </Text>
              <Text color="dimmed" size="xs">
                johnnydoe@gmail.com
              </Text>
            </Box>

            {theme.dir === "ltr" ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </Group>
        ) : (
          <Authentication />
        )}
      </UnstyledButton>
    </Box>
  );
}
