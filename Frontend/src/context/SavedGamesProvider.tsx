import { useEffect, useState } from "react";
import type { Game } from "../types";
import { SavedGamesContext } from "./SavedGamesContext";

export function SavedGamesProvider({ children }: { children: React.ReactNode }) {
    const [savedGames, setSavedGames] = useState<Game[]>(
        () => {
            const stored = localStorage.getItem("savedGames");
            return stored ? JSON.parse(stored) : [];
        }
    );

    useEffect(
        () => {
            localStorage.setItem("savedGames", JSON.stringify(savedGames));
        }, [savedGames]
    );

    function saveGame(game: Game) {
        setSavedGames(current => {
            if (current.some(g => g.id === game.id)) {
                return current;
            }

            return [game, ...current];
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