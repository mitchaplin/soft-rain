import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
} from "@mantine/core";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LatLongProvider } from "./context/LatLongProvider";
import { WeatherDataProvider } from "./context/WeatherDataProvider";
import { WeatherOptionProvider } from "./context/WeatherOptionProvider";
import MainComponent from "./MainComponent";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ColorSchemeProvider
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            >
              <MantineProvider theme={{ colorScheme }} withGlobalStyles>
                <Paper radius={0} style={{ height: "100vh" }}>
                  <WeatherOptionProvider>
                    <WeatherDataProvider>
                      <LatLongProvider>
                        <MainComponent />
                      </LatLongProvider>
                    </WeatherDataProvider>
                  </WeatherOptionProvider>
                </Paper>
              </MantineProvider>
            </ColorSchemeProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
