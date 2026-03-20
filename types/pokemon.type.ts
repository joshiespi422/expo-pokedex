export interface PokemonEntry {
  name: string;
  url: string;
}
export interface PokeListPage {
  results: PokemonEntry[];
  next: string | null;
}
export interface PokemonDetail {
  types: { type: { name: string } }[];
}
