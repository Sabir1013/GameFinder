import { CloseButton, Dialog, Link, Portal, Text } from "@chakra-ui/react";
import type { Game } from "../types";
import { DialogueBody } from "./DialogueBody";
import { DialogueFooter } from "./DialogueFooter";
import "@fontsource/ibm-plex-mono";

export function GameDialogue({game} : {game : Game}) {
    return(
        <Portal>
            <Dialog.Backdrop/>
            <Dialog.Positioner>
                <Dialog.Content bgImage="radial-gradient(circle at center, #001427, #1A202C)" w="95vw" maxW="80rem" pl="5" pr="5" border={game.gameType == 0 ? "1px solid #619b8a" : "1px solid #8a6199"}>
                    <Dialog.Header justifyContent="center">
                        <Text as="h1" fontWeight="bold" fontSize="2xl" fontFamily="IBM Plex Mono"><Link href={`https://www.google.com/search?q="${game.name}"`} target="_blank" rel="noopener noreferrer">{game.name}</Link></Text>
                    </Dialog.Header>
                    <Dialog.Body>
                        <DialogueBody game={game}/>
                    </Dialog.Body>
                    <DialogueFooter game={game}/>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton _hover={{ bg: "transparent" }}/>
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    );
}