export const TYPE_COLORS: Record<string, string> = {
  normal: "#E8E8D5",
  fire: "#FBDAC0",
  water: "#D1DEF9",
  electric: "#FDF2C2",
  grass: "#DAF1CE",
  ice: "#E5F6F6",
  fighting: "#EFD0CE",
  poison: "#E7D1E7",
  ground: "#F5ECD3",
  flying: "#E5DFF9",
  psychic: "#FDCEDD",
  bug: "#E6ECC3",
  rock: "#E9E2C6",
  ghost: "#D1CADE",
  dragon: "#D1C2FD",
  dark: "#D1C9C5",
  steel: "#E9E9F0",
  fairy: "#F9E0E6",
};

export const TYPE_TEXT: Record<string, string> = {
  normal: "#6b6b4a",
  fire: "#7a3a08",
  water: "#1a2d7a",
  electric: "#7a6208",
  grass: "#2d5020",
  ice: "#2d6060",
  fighting: "#5a0808",
  poison: "#4a0850",
  ground: "#6a4a10",
  flying: "#3a2870",
  psychic: "#7a1030",
  bug: "#3a4008",
  rock: "#4a3808",
  ghost: "#201830",
  dragon: "#200878",
  dark: "#201010",
  steel: "#3a3a50",
  fairy: "#7a2040",
};

export const PAGE_LIMIT = 20;

export const SPRITE_URL = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
