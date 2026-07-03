import { VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import { GameCard } from "../components/GameCard";
import { useFuzzyFilter } from "../hooks/useFuzzyFilter";
import { useEffect } from "react";

export function SavedGamesView() {
    const { displayedGames, page, setPage, hasNextPage } = useFuzzyFilter();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    return (
        <VStack ml="300px" width="100vw" padding={10} bg="#0a0908">
            <SimpleGrid columns={4} gap="50px">
                {displayedGames.map(game => <GameCard game={game} key={game.id} />)}
            </SimpleGrid>
            {(displayedGames.length !== 0 && (page > 1 || hasNextPage)) && (
                <HStack colorPalette="teal" mt="50px" w="100%" justifyContent="space-between">
                    <Button onClick={() => setPage(p => p - 1)} visibility={page > 1 ? "visible" : "hidden"}>
                        Prev
                    </Button>
                    <Button onClick={() => setPage(p => p + 1)} visibility={hasNextPage ? "visible" : "hidden"}>
                        Next
                    </Button>
                </HStack>
            )}
        </VStack>
    );
}