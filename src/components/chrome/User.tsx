import {
  Avatar,
  Box,
  Group,
  Menu,
  Text,
  UnstyledButton,
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
  console.log(user);
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
      {user ? (
        <Menu>
          <Menu.Target>
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
              <Group>
                <Avatar
                  imageProps={{ referrerpolicy: "no-referrer" }}
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
            </UnstyledButton>
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
