import { CloseButton, Dialog, Link, Portal, Text } from "@chakra-ui/react";
import type { Game } from "../context/types";
import { DialogueBody } from "./DialogueBody";

function GameDialogue({game} : {game : Game}) {
    return(
        <Portal>
            <Dialog.Backdrop/>
            <Dialog.Positioner>
                <Dialog.Content bg="#001427" minW="80rem" pl="5" pr="5">
                    <Dialog.Header justifyContent="center">
                        <Text as="h1" fontWeight="bold" fontSize="2xl"><Link href={`https://www.google.com/search?q="${game.name}"`} target="_blank" rel="noopener noreferrer">{game.name}</Link></Text>
                    </Dialog.Header>
                    <Dialog.Body display="flex" pt="5" gap="50px" alignItems="center" >
                        <DialogueBody game={game}/>
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton/>
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    );
}

export {GameDialogue};