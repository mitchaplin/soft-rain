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

export function toTimestamp(s: any) {
  const date = new Date(s * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime =
    hours + ":" + minutes.substring(-2) + ":" + seconds.substring(-2);

  return formattedTime;
}
// export const calculateWindDirection = (direction: number) => {
//     case direction > 0 && direction < 22.5:
//         return {
//           main: "Thunderstorm",
//           description: "thunderstorm with light rain",
//           icon: "11d",
//         };
//     }
// }
