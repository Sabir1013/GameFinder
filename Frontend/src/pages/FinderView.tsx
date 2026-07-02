import { Button, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import { GameCard } from "../components/GameCard";

export function FinderView() {
    const { displayedResults, setPage, page, hasNextPage } = useSearch();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    return (
        <VStack ml="300px" width="100vw" padding={10} bg="#0a0908">
            <SimpleGrid columns={4} gap="50px">
                {displayedResults.map(game => <GameCard game={game} key={game.id} />)}
            </SimpleGrid>
            {displayedResults.length !== 0 && (
                <HStack colorPalette="teal" mt="50px" w="100%" justifyContent="space-between">
                    <Button
                        onClick={() => setPage((p) => p - 1)}
                        visibility={page > 1 ? "visible" : "hidden"}
                    >
                        Prev
                    </Button>
                    <Button
                        onClick={() => setPage((p) => p + 1)}
                        visibility={hasNextPage ? "visible" : "hidden"}
                    >
                        Next
                    </Button>
                </HStack>
            )}
        </VStack>
    );
}
