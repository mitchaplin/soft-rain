import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chrome from "./components/Chrome";
import { FirebaseAuthProvider } from "./components/login/AuthenticationProvider";
import { LatLongProvider } from "./context/LatLongProvider";
import { TempUnitProvider } from "./context/TempUnitProvider";
import { WeatherDataProvider } from "./context/WeatherDataProvider";
import { WeatherOptionProvider } from "./context/WeatherOptionProvider";
import { useGeolocation } from "./hooks/CurrentLocation";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const location = useGeolocation();

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
                <NotificationsProvider>
                  <Paper radius={0} style={{ height: "100vh" }}>
                    <FirebaseAuthProvider>
                      <TempUnitProvider>
                        <WeatherOptionProvider>
                          <WeatherDataProvider>
                            <LatLongProvider>
                              <Chrome />
                            </LatLongProvider>
                          </WeatherDataProvider>
                        </WeatherOptionProvider>
                      </TempUnitProvider>
                    </FirebaseAuthProvider>
                  </Paper>
                </NotificationsProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
