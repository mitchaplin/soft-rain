import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chrome from "./components/chrome/Chrome";
import { AppContextProvider } from "./context/AppContextProvider";
import { useGeolocation } from "./context/CurrentLocation";

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
                  <ReactQueryDevtools />
                  <NotificationsProvider>
                    <Paper radius={0} style={{ height: "100vh" }}>
                      <AppContextProvider>
                        <Chrome />
                      </AppContextProvider>
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
