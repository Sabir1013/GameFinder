import { useCallback, useEffect, useRef, useState } from "react";
import { SearchContext } from "./SearchContext";
import type { Game } from "../types";

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [results, setResults] = useState<Game[]>([]);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [query, setQuery] = useState("");
    const controllerRef = useRef<AbortController | null>(null);


    const fetchData = useCallback(async (endpoint: string) => {
        if (controllerRef.current) controllerRef.current.abort();
        controllerRef.current = new AbortController();
        try {
            const res = await fetch(endpoint, { signal: controllerRef.current.signal });
            const jres = await res.json();
            setResults(jres);
        } catch (err) {
            if ((err as Error).name !== "AbortError") console.log(err);
        }
    }, []);

    useEffect(() => {
        if (query.trim() === "") return;
        const timeout = setTimeout(() => setDebouncedQuery(query), 300);
        return () => clearTimeout(timeout);
    }, [query]);

    // fetch on debounced query
    useEffect(() => {
        if (debouncedQuery.trim() === "") {
            controllerRef.current?.abort();
            return;
        }
        fetchData(`http://localhost:8080/api/igdb/search?query=${encodeURIComponent(debouncedQuery)}`);
    }, [debouncedQuery, fetchData]);

    return (
        <SearchContext.Provider value={{ results, setResults, debouncedQuery, setDebouncedQuery, query, setQuery, fetchData }}>
            {children}
        </SearchContext.Provider>
    );
}