import { MantineProvider } from "@mantine/core";
import Forecast from "./components/Forecast";

function App() {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <div className="App">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        <main>{<Forecast />}</main>
      </div>
    </MantineProvider>
  );
}

export default App;
