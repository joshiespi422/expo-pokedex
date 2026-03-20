import { useInfiniteQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const PAGE_LIMIT = 20;
const SPRITE_URL = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

interface PokemonEntry {
  name: string;
  url: string;
}
interface PokeListPage {
  results: PokemonEntry[];
  next: string | null;
}

const getIdFromUrl = (url: string) =>
  parseInt(url.split("/").filter(Boolean).at(-1) ?? "0");

const fetchPokemon = async ({ pageParam = 0 }): Promise<PokeListPage> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_LIMIT}&offset=${pageParam}`,
  );
  if (!res.ok) throw new Error("Failed to fetch Pokémon");
  return res.json();
};

export default function Index() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["pokemon"],
      queryFn: fetchPokemon,
      initialPageParam: 0,
      getNextPageParam: (last, pages) =>
        last.next ? pages.length * PAGE_LIMIT : undefined,
    });

  const pokemon = data?.pages.flatMap((p) => p.results) ?? [];

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 pt-10 pb-4 bg-white">
        <Text className="text-3xl font-bold text-slate-800">Pokédex</Text>
        <Text className="text-sm text-slate-400 mt-0.5">
          {pokemon.length} Pokémon loaded
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#ef4444" />
        </View>
      ) : (
        <FlatList
          data={pokemon}
          keyExtractor={(item) => item.name}
          numColumns={2}
          contentContainerClassName="px-3 py-3"
          columnWrapperClassName="gap-3"
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item }) => {
            const id = getIdFromUrl(item.url);
            return (
              <View className="flex-1 bg-slate-50 rounded-2xl p-4 items-center border border-slate-100">
                <Image
                  source={{ uri: SPRITE_URL(id) }}
                  className="w-36 h-36"
                  resizeMode="contain"
                />
                <Text className="text-sm font-semibold text-slate-700 capitalize mt-0.5">
                  {item.name}
                </Text>
              </View>
            );
          }}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="py-6 items-center">
                <ActivityIndicator color="#ef4444" />
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}
