import { createContext } from "react";
import type { SearchContextType } from "../types";

export const SearchContext = createContext<SearchContextType | null>(null);