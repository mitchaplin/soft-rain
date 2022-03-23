import { MantineProvider, Paper } from "@mantine/core";
import Forecast from "./components/Forecast";

function App() {
  return (
    <>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <Paper shadow="xs" p="md">
          <div className="App">
            <Forecast />
          </div>
        </Paper>
      </MantineProvider>
    </>
  );
}

export default App;
