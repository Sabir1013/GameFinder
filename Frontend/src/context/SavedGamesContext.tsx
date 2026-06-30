import { createContext } from "react";
import type { SavedGamesContextType } from "../types";

export const SavedGamesContext = createContext<SavedGamesContextType | null>(null);