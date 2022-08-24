export const UV_COLORS = {
  one: "#299501",
  two: "#299501",
  three: "#F7E401",
  four: "#F7E401",
  five: "#F7E401",
  six: "#F95901",
  seven: "#F95901",
  eight: "#D90011",
  nine: "#D90011",
  ten: "#D90011",
  eleven: "#6C49C9",
};
type Condition =
  | "Sunny"
  | "Partly Cloudy"
  | "Cloudy"
  | "Overcast"
  | "Mist"
  | "Patchy rain nearby"
  | "Patchy snow nearby"
  | "Patchy sleet nearby"
  | "Patchy freezing drizzle nearby"
  | "Thundery outbreaks in nearby"
  | "Blowing snow"
  | "Blizzard"
  | "Fog"
  | "Freezing fog"
  | "Patchy light drizzle"
  | "Light drizzle"
  | "Freezing drizzle"
  | "Heavy freezing drizzle"
  | "Patchy light rain"
  | "Light rain"
  | "Moderate rain at times"
  | "Moderate rain"
  | "Heavy rain at times"
  | "Heavy rain"
  | "Light freezing rain"
  | "Moderate or heavy freezing rain"
  | "Light sleet"
  | "Moderate or heavy sleet"
  | "Patchy light snow"
  | "Light snow"
  | "Patchy moderate snow"
  | "Moderate snow"
  | "Patchy heavy snow"
  | "Heavy snow"
  | "Ice pellets"
  | "Light rain shower"
  | "Moderate or heavy rain shower"
  | "Torrential rain shower"
  | "Light sleet showers"
  | "Moderate or heavy sleet showers"
  | "Light snow showers"
  | "Moderate or heavy snow showers"
  | "Light showers of ice pellets"
  | "Moderate or heavy showers of ice pellets"
  | "Patchy light rain in area with thunder"
  | "Moderate or heavy rain in area with thunder"
  | "Patchy light snow in area with thunder"
  | "Moderate or heavy snow in area with thunder";

export const truncateFavorites = (favorites: string[], num: number) =>
  favorites
    .map((fav) => (fav.length < 47 ? fav : `${fav.slice(0, 46)}`))
    .slice(0, num);
