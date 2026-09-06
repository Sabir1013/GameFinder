import { VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import { GameCard } from "../components/GameCard";
import { useEffect } from "react";
import { useSavedGames } from "../hooks/useSavedGames";

export function SavedGamesView() {
    const {displayedGames, page, setPage, hasNextPage} = useSavedGames();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, [page]);

    return (
        <VStack ml={{ base: 0, md: "300px" }} flexGrow={1} minHeight="100dvh" padding={{base: 5, md: 10 }} bg="#0a0908">
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap="50px" w="100%">
                {displayedGames.map(game => <GameCard game={game} key={game.id} />)}
            </SimpleGrid>
            {(displayedGames.length !== 0 && (page > 1 || hasNextPage)) && (
                <HStack colorPalette="teal" mt="50px" w="100%" justifyContent="space-between">
                    <Button 
                        onClick={() => setPage(p => p - 1)} 
                        visibility={page > 1 ? "visible" : "hidden"} 
                        display={{ base: page > 1 ? "flex" : "none", md: "flex" }}
                    >
                        Prev
                    </Button>
                    <Button 
                        onClick={() => setPage(p => p + 1)} 
                        visibility={hasNextPage ? "visible" : "hidden"} 
                        display={{ base: hasNextPage ? "flex" : "none", md: "flex" }}
                    >
                        Next
                    </Button>
                </HStack>
            )}
        </VStack>
    );
}