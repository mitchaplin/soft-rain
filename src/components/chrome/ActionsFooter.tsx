import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  useMantineColorScheme,
} from "@mantine/core";

import {
  MoonStars,
  Sun,
  TemperatureCelsius,
  TemperatureFahrenheit,
} from "tabler-icons-react";
import { useSearchText } from "../../context/SearchTextProvider";
import { useTempUnit } from "../../context/TempUnitProvider";

const useStyles = createStyles((theme) => ({
  footer: {
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
    alignItems: "center",
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
  favorites: { location: string }[];
}

export function ActionsFooter({ favorites }: FooterCenteredProps) {
  const { classes } = useStyles();
  const { tempUnit, toggleTempUnit } = useTempUnit();
  const { searchText, setSearchText } = useSearchText();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const items = favorites.map((favorite) => (
    <Button
      variant="outline"
      sx={{ borderRadius: "lg" }}
      onClick={() => setSearchText(favorite.location)}
    >
      {favorite.location}
    </Button>
  ));

  return (
    <Group mx={-16}>
      <div className={classes.footer}>
        <div className={classes.inner}>
          <Group className={classes.links}>{items}</Group>
          <Group
            sx={{ paddingRight: ".75rem" }}
            spacing="xs"
            position="right"
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
        </div>
      </div>
    </Group>
  );
}
