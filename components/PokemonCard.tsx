import { useQuery } from "@tanstack/react-query";
import { Image, Text, View } from "react-native";
import {
  SPRITE_URL,
  TYPE_COLORS,
  TYPE_TEXT,
} from "../constants/pokemon.constant";
import { PokemonDetail, PokemonEntry } from "../types/pokemon.type";

// helper
const getIdFromUrl = (url: string) =>
  parseInt(url.split("/").filter(Boolean).at(-1) ?? "0");

// api
const fetchPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch detail");
  return res.json();
};

// component
export function PokemonCard({ name, url }: PokemonEntry) {
  const id = getIdFromUrl(url);

  const { data } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetail(name),
    staleTime: Infinity,
  });

  const primaryType = data?.types[0]?.type.name ?? null;
  const bgColor = primaryType
    ? (TYPE_COLORS[primaryType] ?? "#e2e8f0")
    : "#e2e8f0";
  const textColor = primaryType
    ? (TYPE_TEXT[primaryType] ?? "#1e293b")
    : "#94a3b8";

  return (
    <View
      className="flex-1 rounded-2xl p-4 items-center"
      style={{ backgroundColor: bgColor }}
    >
      <Image
        source={{ uri: SPRITE_URL(id) }}
        className="w-36 h-36"
        resizeMode="contain"
      />
      <Text
        className="text-sm font-bold capitalize"
        style={{ color: textColor }}
      >
        {name}
      </Text>
      {primaryType && (
        <Text
          className="text-xs font-semibold capitalize  px-2 py-0.5 rounded-full bg-white"
          style={{ color: textColor }}
        >
          {primaryType}
        </Text>
      )}
    </View>
  );
}
