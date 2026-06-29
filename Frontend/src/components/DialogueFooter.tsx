import { Button } from "@chakra-ui/react/button";
import { Dialog } from "@chakra-ui/react/dialog";
import type { Game } from "../context/types";
import { useSavedGames } from "../context/useSavedGames";;
import { FiCheck } from "react-icons/fi";
import { toaster } from "./ui/toaster";

export function DialogueFooter({game} : {game : Game}) {
    const { savedGames, saveGame, removeGame } = useSavedGames();
    const isSaved = savedGames.some(g => g.id === game.id);

    return (
        <Dialog.Footer>
            <Button colorPalette="teal" onClick={() => isSaved ? (removeGame(game.id), toaster.dismiss(), toaster.create({description: "Game removed.", duration: 2000, type: "info"})) : (saveGame(game), toaster.dismiss(), toaster.create({description: "Game saved!", duration: 2000, type: "info"}))}>
                {isSaved ? <>Game Saved <FiCheck/></> : "Save Game"} 
            </Button>
        </Dialog.Footer>
    );
}