import { Box, Dialog, Flex, Image, Text } from "@chakra-ui/react";
import type { Game } from "../context/types";
import { GameDialogue } from "./GameDialogue";

function GameCard({game} : {game : Game}) {
    return (
        <Dialog.Root placement="center">
            <Dialog.Trigger asChild>
                <Flex direction="column" height="25rem" transition="transform 0.2s" _hover={{transform: "scale(1.05)"}} rounded="10px" border="1px solid #619b8a" textAlign="center" bg="#001427" overflow="hidden" boxShadow="lg">
                    <Text fontWeight="bold" fontSize="sm" py="1" px="1" color="white" borderBottom="1px solid #619b8a">{game.name}</Text>
                    <Box flex="1" overflow="hidden">
                        <Image loading="lazy" decoding="async" src={"https:" + game.cover.url.replace("t_thumb", "t_1080p").replace(".jpg", ".webp")} fit="cover" w="100%" h="100%"/>
                    </Box>
                </Flex>
            </Dialog.Trigger>
            <GameDialogue game={game}/>
        </Dialog.Root>
    );
}

export {GameCard};