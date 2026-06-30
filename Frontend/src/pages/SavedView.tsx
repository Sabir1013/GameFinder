import { SimpleGrid } from "@chakra-ui/react";
import { GameCard } from "../components/GameCard";
import { useFuzzyFilter } from "../hooks/useFuzzyFilter";

export function SavedView() {
    const filteredGames = useFuzzyFilter();

    return (
        <SimpleGrid columns={4} ml="300px" width="100vw" padding="10" gap="50px" bg="#0a0908">
            {
                filteredGames.map(
                    game => <GameCard game={game} key={game.id}/>
                )
            }
        </SimpleGrid>
    );
}