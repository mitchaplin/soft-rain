import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
} from "@mantine/core";
import { useState } from "react";
import MainComponent from "./MainComponent";
import { TempUnitProvider } from "./TempUnitProvider";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
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
            <MainComponent />
          </TempUnitProvider>
        </Paper>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
