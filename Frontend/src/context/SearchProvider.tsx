import { useState } from "react";
import { SearchContext } from "./SearchContext";
import type { Game } from "./types";

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [results, setResults] = useState<Game[]>([]);

    return (
        <SearchContext.Provider value={{ results, setResults }}>
            {children}
        </SearchContext.Provider>
    );
}