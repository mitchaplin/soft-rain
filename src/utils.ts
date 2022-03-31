export const conditionFromId = (id: number) => {
  switch (id) {
    case 200:
      return {
        main: "Thunderstorm",
        description: "thunderstorm with light rain",
        icon: "11d",
      };
    case 201:
      return {
        main: "Thunderstorm",
        description: "thunderstorm with rain",
        icon: "11d",
      };
    case 202:
      return {
        main: "Thunderstorm",
        description: "thunderstorm with heavy rain",
        icon: "11d",
      };
    case 210:
      return {
        main: "Thunderstorm",
        description: "light thunderstorm",
        icon: "11d",
      };
    case 211:
      return {
        main: "Thunderstorm",
        description: "thunderstorm",
        icon: "11d",
      };
    case 212:
      return {
        main: "Thunderstorm",
        description: "heavy thunderstorm",
        icon: "11d",
      };
    case 221:
      return {
        main: "Thunderstorm",
        description: "ragged thunderstorm",
        icon: "11d",
      };
    case 230:
      return {
        main: "Thunderstorm",
        description: "thunderstorm with light drizzle",
        icon: "11d",
      };
    case 231:
      return {
        main: "Thunderstorm",
        description: "thunderstorm with drizzle",
        icon: "11d",
      };
    case 232:
      return {
        main: "Thunderstorm",
        description: "thunderstorm with heavy drizzle",
        icon: "11d",
      };
  }
};

// 0.0 	N
// 22.5 	NNE
// 45.0 	NE
// 67.5 	ENE
// 90.0 	E
// 112.5 	ESE
// 135.0 	SE
// 157.5 	SSE
// 180.0 	S
// 202.5 	SSW
// 225.0 	SW
// 247.5 	WSW
// 270.0 	W
// 292.5 	WNW
// 315.0 	NW
// 337.5 	NNW
