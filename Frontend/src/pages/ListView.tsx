import { SimpleGrid } from "@chakra-ui/react";
import { GameCard } from "../components/GameCard";
import { useSearch } from "../hooks/useSearch";

export function ListView() {
    const {results} = useSearch();

    return (
        <SimpleGrid columns={4} ml="300px" width="100vw" padding="10" gap="50px" bg="#0a0908">
            {
                results.map(
                    (game, index) => <GameCard game={game} key={index}/>
                )
            }
        </SimpleGrid>
    );
}