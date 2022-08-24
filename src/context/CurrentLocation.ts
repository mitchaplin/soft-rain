import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setLocation(location);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, []);

  return location;
};
