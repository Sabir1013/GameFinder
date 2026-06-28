import { useState } from "react";
import type { Game } from "./types";
import { SavedGamesContext } from "./SavedGamesContext";

export function SavedGamesProvider({ children }: { children: React.ReactNode }) {
    const [savedGames, setSavedGames] = useState<Game[]>([]);

    function saveGame(game: Game) {
        setSavedGames(current => {
            if (current.some(g => g.id === game.id)) {
                return current;
            }

            return [...current, game];
        });
    }

    function removeGame(id: number) {
        setSavedGames(current => current.filter(game => game.id !== id));
    }

    return (
        <SavedGamesContext.Provider value={{ savedGames, saveGame, removeGame }}>
            {children}
        </SavedGamesContext.Provider>
    );
}