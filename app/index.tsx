import { useInfiniteQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { PokemonCard } from "../components/PokemonCard";
import { PAGE_LIMIT } from "../constants/pokemon.constant";
import { fetchPokemonList } from "../services/pokemon.service";

export default function Index() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["pokemon"],
      queryFn: fetchPokemonList,
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
          renderItem={({ item }) => <PokemonCard {...item} />}
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
