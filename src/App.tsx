import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chrome from "./components/chrome/Chrome";
import { FirebaseAuthProvider } from "./components/login/AuthenticationProvider";
import { FavoritesProvider } from "./context/FavoritesProvider";
import { LatLongProvider } from "./context/LatLongProvider";
import { SearchTextProvider } from "./context/SearchTextProvider";
import { TempUnitProvider } from "./context/TempUnitProvider";
import { WeatherDataProvider } from "./context/WeatherDataProvider";
import { WeatherOptionProvider } from "./context/WeatherOptionProvider";
import { useGeolocation } from "./hooks/CurrentLocation";

const queryClient = new QueryClient();

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
                <QueryClientProvider client={queryClient}>
                  <NotificationsProvider>
                    <Paper radius={0} style={{ height: "100vh" }}>
                      <FirebaseAuthProvider>
                        <FavoritesProvider>
                          <SearchTextProvider>
                            <TempUnitProvider>
                              <WeatherOptionProvider>
                                <WeatherDataProvider>
                                  <LatLongProvider>
                                    <Chrome />
                                  </LatLongProvider>
                                </WeatherDataProvider>
                              </WeatherOptionProvider>
                            </TempUnitProvider>
                          </SearchTextProvider>
                        </FavoritesProvider>
                      </FirebaseAuthProvider>
                    </Paper>
                  </NotificationsProvider>
                </QueryClientProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
