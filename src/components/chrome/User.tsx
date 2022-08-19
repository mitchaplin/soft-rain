import {
  Avatar,
  Box,
  Button,
  Group,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { getAuth, signOut } from "firebase/auth";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import { Authentication } from "../login/Authentication";
import { useFirebaseAuth } from "../login/AuthenticationProvider";

export function User() {
  const theme = useMantineTheme();
  const user = useFirebaseAuth();
  const auth = getAuth();

  return (
    <Box>
      {user ? (
        <Menu>
          <Menu.Target>
            <Button
              variant="default"
              sx={
                user
                  ? {
                      display: "block",
                      width: "100%",
                      height: "4rem",

                      padding: theme.spacing.xs,
                      borderRadius: theme.radius.lg,
                      color:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[0]
                          : theme.black,

                      "&:hover": {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[5]
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
              <Group>
                <Avatar
                  imageProps={{ referrerPolicy: "no-referrer" }}
                  src={user?.photoURL}
                  radius="xl"
                />
                <Box sx={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {user?.displayName}
                  </Text>
                  <Text color="dimmed" size="xs">
                    {user?.email}
                  </Text>
                </Box>

                {theme.dir === "ltr" ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </Group>
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => signOut(auth)}>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Authentication />
      )}
    </Box>
  );
}
