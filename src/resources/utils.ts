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

export const truncateFavorites = (favorites: string[], num: number) =>
  favorites
    .map((fav) => (fav.length < 47 ? fav : `${fav.slice(0, 46)}`))
    .slice(0, num);
