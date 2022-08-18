import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  createStyles,
  Group,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import {
  MoonStars,
  Sun,
  TemperatureCelsius,
  TemperatureFahrenheit,
  X,
} from "tabler-icons-react";
import { useSearchText } from "../../context/SearchTextProvider";
import { useTempUnit } from "../../context/TempUnitProvider";
import { truncateFavorites } from "../../utils";
import { removeFromFavorites } from "../login/actions";
import { useFirebaseAuth } from "../login/AuthenticationProvider";

const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[2],
    position: "fixed",

    width: "100%",
    bottom: 0,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

interface FooterCenteredProps {
  favorites?: string[];
  includeFavorites: boolean;
  includeKnobs: boolean;
}

export const ActionsFooter = ({
  favorites,
  includeFavorites,
  includeKnobs,
}: FooterCenteredProps) => {
  const { classes } = useStyles();
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const { searchText, setSearchText } = useSearchText();
  const user = useFirebaseAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const lg = useMediaQuery("(min-width: 1600px)");

  const avatar = (
    <Avatar
      imageProps={{ referrerPolicy: "no-referrer" }}
      src={user?.photoURL}
      radius="xl"
    />
  );

  const items = truncateFavorites(favorites || []).map((favorite, index) => (
    <Group key={index} sx={{ marginLeft: "3rem" }}>
      <Button
        variant="outline"
        sx={{ borderRadius: "lg" }}
        onClick={() => setSearchText(favorite)}
      >
        {favorite}
      </Button>
      <ActionIcon
        variant="default"
        onClick={() => removeFromFavorites(user?.uid, index)}
        size={30}
      >
        <X />
      </ActionIcon>
    </Group>
  ));

  return (
    <Group mx={"-1.25rem"}>
      <div className={classes.footer}>
        <div className={classes.inner}>
          {includeFavorites ? (
            <Group sx={{ marginRight: "4rem" }}>
              <Badge
                sx={{ paddingLeft: 0 }}
                size="lg"
                radius="xl"
                color="teal"
                leftSection={avatar}
              >
                {`${user?.displayName}'s Favorites`}
              </Badge>
            </Group>
          ) : null}
          {includeFavorites ? (
            <Group className={classes.links}>{items}</Group>
          ) : null}
          {includeKnobs ? (
            <Group
              sx={{
                marginLeft: lg ? "4rem" : "0rem",
                display: "flex",
                flexDirection: "row",
              }}
              spacing="xs"
              noWrap
            >
              <ActionIcon
                variant="default"
                onClick={() => toggleTempUnit()}
                size={30}
              >
                {tempUnit === "metric" ? (
                  <TemperatureCelsius size={16} />
                ) : (
                  <TemperatureFahrenheit size={16} />
                )}
              </ActionIcon>

              <ActionIcon
                variant="default"
                onClick={() => toggleColorScheme()}
                size={30}
              >
                {colorScheme === "dark" ? (
                  <Sun size={16} />
                ) : (
                  <MoonStars size={16} />
                )}
              </ActionIcon>
            </Group>
          ) : null}
        </div>
      </div>
    </Group>
  );
};
