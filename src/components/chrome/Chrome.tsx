import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Drawer,
  Footer,
  Group,
  Header,
  Navbar,
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { X } from "tabler-icons-react";
import { useFavorites } from "../../context/FavoritesProvider";
import { useSearchText } from "../../context/SearchTextProvider";
import { truncateFavorites } from "../../resources/utils";
import { removeFromFavorites } from "../login/actions";
import { useFirebaseAuth } from "../login/AuthenticationProvider";
import Forecast from "../view/Forecast";
import { ActionsFooter } from "./ActionsFooter";
import { Logo } from "./Logo";
import { SubmitForm } from "./SubmitForm";
import { User } from "./User";
import {
  WeatherOption,
  WeatherOptions,
  weatherOptionsData,
} from "./WeatherOptions";

const Chrome = () => {
  const favorites = useFavorites();
  const lg = useMediaQuery("(min-width: 1600px)");
  const md = useMediaQuery("(min-width: 1000px)");
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";
  const { searchText, setSearchText } = useSearchText();
  const user = useFirebaseAuth();

  const items = truncateFavorites(favorites || [], 8).map((favorite, index) => (
    <Group mt="1rem" key={index}>
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
    <AppShell
      padding="lg"
      fixed
      navbarOffsetBreakpoint="lg"
      header={
        <Header height={100}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            {lg ? (
              <>
                <Logo />
                <WeatherOptions />
              </>
            ) : (
              <>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  title={title}
                />
                {md ? <Logo /> : <></>}
              </>
            )}
            <SubmitForm />
            {lg ? <User /> : null}
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
        header: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Forecast />
      {lg ? (
        <ActionsFooter includeFavorites={!!user} favorites={favorites || []} />
      ) : (
        <ActionsFooter includeFavorites={false} />
      )}

      {/* Side Drawer Component and Contents */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Logo />}
        padding="xl"
        size="xl"
      >
        <Navbar height="100%" p="xs" width={{ base: "100%" }}>
          <Navbar.Section mt="xs">
            {weatherOptionsData.map((option, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <WeatherOption {...option} />
              </div>
            ))}
          </Navbar.Section>

          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            {items}
          </Navbar.Section>
          <Navbar.Section>
            <Footer height={user ? 100 : 150} p="md">
              <User />
            </Footer>
          </Navbar.Section>
        </Navbar>
      </Drawer>
    </AppShell>
  );
};

export default Chrome;
