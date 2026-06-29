import { useContext } from "react";
import { SavedGamesContext } from "./SavedGamesContext";

export function useSavedGames() {
    return useContext(SavedGamesContext)!;
}