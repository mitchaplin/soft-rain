import React from "react";
import "./App.css";
import Forecast from "./components/Forecast";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Soft Rain
        </a>
      </header>
      <main>{<Forecast />}</main>
      <footer>Page created by AppzM</footer>
    </div>
  );
}

export default App;
