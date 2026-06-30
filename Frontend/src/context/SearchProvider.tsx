import { useState } from "react";
import { SearchContext } from "./SearchContext";
import type { Game } from "../types";

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [results, setResults] = useState<Game[]>([]);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [query, setQuery] = useState("");

    return (
        <SearchContext.Provider value={{ results, setResults, debouncedQuery, setDebouncedQuery, query, setQuery }}>
            {children}
        </SearchContext.Provider>
    );
}