import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
} from "@mantine/core";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LatLongProvider } from "./context/LatLongProvider";
import { TempUnitProvider } from "./context/TempUnitProvider";
import { WeatherDataProvider } from "./context/WeatherDataProvider";
import { WeatherOptionProvider } from "./context/WeatherOptionProvider";
import { useGeolocation } from "./hooks/CurrentLocation";
import MainComponent from "./MainComponent";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const location = useGeolocation();
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "soft-rain-42f61.firebaseapp.com",
    projectId: "soft-rain-42f61",
    storageBucket: "soft-rain-42f61.appspot.com",
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

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
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
