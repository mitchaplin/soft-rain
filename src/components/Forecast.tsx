import { default as React, useState } from "react";

const Forecast = (): any => {
  const [responseObj, setResponseObj] = useState({});
  const getForecast = () => {
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/weather?q=seattle",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "22b6974f68mshd6dc54fc6e63c07p123f8ejsna4e3c74c9095",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <h2>Find Current Weather Conditions</h2>
      <div>{JSON.stringify(responseObj)}</div>
      <button onClick={getForecast}>Get Forecast</button>
    </div>
  );
};
export default Forecast;
