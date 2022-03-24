import { MantineProvider, Paper } from "@mantine/core";
import Forecast from "./components/Forecast";

function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <Paper shadow="xs" p="md" radius={0} style={{ height: "100vh" }}>
        <Forecast />
      </Paper>
    </MantineProvider>
  );
}

export default App;
