import { SimpleGrid } from "@chakra-ui/react";
import { GameCard } from "../components/GameCard";
import { useSavedGames } from "../context/useSavedGames";
import { useSearch } from "../context/useSearch";
import Fuse from "fuse.js";

export function SavedView() {
    const {savedGames} = useSavedGames();
    const {debouncedQuery} = useSearch();
    
    const outputGames = [...savedGames];
    const options = {keys: ["name"], threshold: 0.5};
    const fuse = new Fuse(outputGames, options);
    const results = fuse.search(debouncedQuery);

    return (
        <SimpleGrid columns={4} ml="300px" width="100vw" padding="10" gap="50px" bg="#0a0908">
            {
                results.map(
                    result => <GameCard game={result.item} key={result.item.id}/>
                )
            }
        </SimpleGrid>
    );
}