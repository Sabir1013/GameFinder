import { SimpleGrid } from "@chakra-ui/react";
import { useSearch } from "../context/useSearch";
import { GameCard } from "../components/GameCard";

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