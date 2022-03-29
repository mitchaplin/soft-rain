import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
} from "@mantine/core";
import { useState } from "react";
import { LatLongProvider } from "./context/LatLongProvider";
import { TempUnitProvider } from "./context/TempUnitProvider";
import { WeatherDataProvider } from "./context/WeatherDataProvider";
import { WeatherOptionProvider } from "./context/WeatherOptionProvider";
import MainComponent from "./MainComponent";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }} withGlobalStyles>
        <Paper radius={0} style={{ height: "100vh" }}>
          <TempUnitProvider>
            <WeatherOptionProvider>
              <WeatherDataProvider>
                <LatLongProvider>
                  <MainComponent />
                </LatLongProvider>
              </WeatherDataProvider>
            </WeatherOptionProvider>
          </TempUnitProvider>
        </Paper>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
