export const UV_COLORS = {
  1: "#299501",
  2: "#299501",
  3: "#F7E401",
  4: "#F7E401",
  5: "#F7E401",
  6: "#F95901",
  7: "#F95901",
  8: "#D90011",
  9: "#D90011",
  10: "#D90011",
  11: "#6C49C9",
};

export const truncateFavorites = (favorites: string[], num: number) =>
  favorites
    .map((fav) => (fav.length < 47 ? fav : `${fav.slice(0, 46)}`))
    .slice(0, num);
