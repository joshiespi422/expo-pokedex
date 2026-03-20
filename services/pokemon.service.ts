import { PAGE_LIMIT } from "../constants/pokemon.constant";
import { PokeListPage, PokemonDetail } from "../types/pokemon.type";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async ({
  pageParam = 0,
}): Promise<PokeListPage> => {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${PAGE_LIMIT}&offset=${pageParam}`,
  );
  if (!res.ok) throw new Error("Failed to fetch list");
  return res.json();
};

export const fetchPokemonDetail = async (
  name: string,
): Promise<PokemonDetail> => {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch detail");
  return res.json();
};
