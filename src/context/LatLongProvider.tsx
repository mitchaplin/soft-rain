import React, { Dispatch, SetStateAction } from "react";
import { MADISON_LAT, MADISON_LONG } from "../resources/constants";

export type LatLong = { latLong: string };
type ContextState = {
  latLong: LatLong;
  setLatLong: Dispatch<SetStateAction<LatLong>>;
};

const LatLongContext = React.createContext<ContextState | undefined>(undefined);

const LatLongProvider = ({ children }: { children: React.ReactNode }) => {
  const [latLong, setLatLong] = React.useState<LatLong>({
    latLong: `${MADISON_LAT},${MADISON_LONG}`,
  });
  const value = { latLong, setLatLong };

  return (
    <LatLongContext.Provider value={value}>{children}</LatLongContext.Provider>
  );
};

function useLatLong() {
  const context = React.useContext(LatLongContext);
  if (context === undefined) {
    throw new Error("useLatLong must be used within a latLong provider");
  }
  return context;
}

export { LatLongProvider, useLatLong };
