import GoogleMapReact from "google-map-react";
import { MADISON_LAT, MADISON_LONG } from "../constants";

const WeatherMap = ({ text }: any) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

export const WeatherMapComponent = () => {
  return (
    <GoogleMapReact
      defaultCenter={{ lat: MADISON_LAT, lng: MADISON_LONG }}
      defaultZoom={11}
    >
      <WeatherMap lat={59.955413} lng={30.337844} text={"DA MAP"} />
    </GoogleMapReact>
  );
};
