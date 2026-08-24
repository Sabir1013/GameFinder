import { Button, HStack, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import { GameCard } from "../components/GameCard";

export function FinderView() {
    const { displayedResults, setPage, page, hasNextPage, isLoading } = useSearch();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, [page]);

    return (
        <VStack ml="300px" width="100vw" minHeight="100vh" padding={10} bg="#0a0908">
            <SimpleGrid columns={4} gap="50px" w="100%">
                {isLoading
                    ? Array.from({ length: 24 }).map((_, i) => (<Skeleton key={i} height="25rem" rounded="10px" />))
                    : displayedResults.map(game => <GameCard game={game} key={game.id} />)
                }
            </SimpleGrid>
            {(!isLoading && displayedResults.length !== 0 && (page > 1 || hasNextPage)) && (
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