import { useCallback, useEffect, useRef, useState } from "react";
import { SearchContext } from "./SearchContext";
import type { Game } from "../types";
import { useLocation } from "react-router";

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [results, setResults] = useState<Game[]>([]);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [query, setQuery] = useState("");
    const controllerRef = useRef<AbortController | null>(null);
    const [page, setPage] = useState(1);
    const location = useLocation();

    const [prevLocation, setPrevLocation] = useState(location.pathname)
    if (location.pathname !== prevLocation) {
        setPrevLocation(location.pathname)
        setQuery("");
        setResults([]);
    }

    const [prevQuery, setPrevQuery] = useState(query);
    if (query !== prevQuery) {
        setPrevQuery(query);
        setPage(1);
        if (query.trim() === "") {
            setResults([]);
        }
    }

    const fetchData = useCallback(async (endpoint: string) => {
        if (controllerRef.current) controllerRef.current.abort();
        controllerRef.current = new AbortController();
        try {
            const res = await fetch(endpoint, { signal: controllerRef.current.signal });
            const jres = await res.json();
            if (Array.isArray(jres)) {
                setResults(jres);
            } else {
                setResults(jres.content);
            }
        } catch (err) {
            if ((err as Error).name !== "AbortError") console.log(err);
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedQuery(query), 300);
        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        if (query.trim() === "") {
            return;
        }
        
        fetchData(`http://localhost:8080/api/games/search?query=${encodeURIComponent(debouncedQuery)}&page=${page}`);
    }, [query, fetchData, page, debouncedQuery]);

    const hasNextPage = results.length === 25;
    const displayedResults = results.slice(0, 24);

    return (
        <SearchContext.Provider value={{ results, displayedResults, setResults, debouncedQuery, setDebouncedQuery, query, setQuery, fetchData, page, setPage, hasNextPage }}>
            {children}
        </SearchContext.Provider>
    );
}