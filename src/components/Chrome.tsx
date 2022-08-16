import { AppShell, Group, Header, useMantineColorScheme } from "@mantine/core";
import { ActionsFooter } from "./chrome/ActionsFooter";
import { Logo } from "./chrome/Logo";
import { User } from "./chrome/User";
import { WeatherOptions } from "./chrome/WeatherOptions";
import Forecast from "./Forecast";
import { SubmitForm } from "./SubmitForm";

const Chrome = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      padding="md"
      fixed
      navbarOffsetBreakpoint={"md"}
      header={
        <Header height={100}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Logo colorScheme={colorScheme} />

            <WeatherOptions />

            <SubmitForm />
            <User />
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
      })}
    >
      <Forecast />
      <ActionsFooter
        favorites={[
          { location: "Madison" },
          { location: "Seattle" },
          { location: "Botswana" },
        ]}
      />
    </AppShell>
  );
};

export default Chrome;
