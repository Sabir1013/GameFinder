import { useContext } from "react";
import { SavedGamesContext } from "../context/SavedGamesContext";

export function useSavedGames() {
    return useContext(SavedGamesContext)!;
}