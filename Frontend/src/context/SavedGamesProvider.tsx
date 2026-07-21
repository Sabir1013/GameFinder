import { useEffect, useState } from "react";
import type { Game } from "../types";
import { SavedGamesContext } from "./SavedGamesContext";

export function SavedGamesProvider({ children }: { children: React.ReactNode }) {
    const [savedQuery, setSavedQuery] = useState("");

    const [savedGames, setSavedGames] = useState<Game[]>(
        () => {
            const stored = localStorage.getItem("savedGames");
            return stored ? JSON.parse(stored) : [];
        }
    );

    useEffect(() => {
        localStorage.setItem("savedGames", JSON.stringify(savedGames));
    }, [savedGames]);

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

    const filteredSavedGames = savedGames.filter(game =>
        game.name.toLowerCase().includes(savedQuery.toLowerCase())
    );

    const [page, setPage] = useState(1);


    const pageCount = Math.max(
        1,
        Math.ceil(filteredSavedGames.length / 24)
    );

    const displayedGames = filteredSavedGames.slice(
        (Math.min(page, pageCount) - 1) * 24,
        Math.min(page, pageCount) * 24
    );

    const hasNextPage = Math.min(page, pageCount) < pageCount;
    const safePage = Math.min(page, pageCount);

    return (
        <SavedGamesContext.Provider
            value={{
                savedGames,
                savedQuery,
                setSavedQuery,
                saveGame,
                removeGame,
                page : safePage,
                setPage,
                pageCount,
                hasNextPage,
                displayedGames
            }}
        >
            {children}
        </SavedGamesContext.Provider>
    );
}