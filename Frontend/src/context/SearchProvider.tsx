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
    const [mode, setMode] = useState<"SEARCH" | "RANDOMIZE">("SEARCH");
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    // Location change — clear everything when navigating away
    const [prevLocation, setPrevLocation] = useState(location.pathname);
    if (location.pathname !== prevLocation) {
        setPrevLocation(location.pathname);
        setQuery("");
        setResults([]);
        setMode("SEARCH");
    }

    // Fetch results
    const fetchData = useCallback(async (endpoint: string) => {
        if (controllerRef.current) {
            controllerRef.current?.abort();
        }

        controllerRef.current = new AbortController();
        setTimeout(() => setIsLoading(true), 0);

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
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Debounce raw query, switch to search mode when user types
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
            if (query.trim() !== "") {
                setMode("SEARCH");
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    const [prevDebouncedQuery, setPrevDebouncedQuery] = useState(debouncedQuery);

    if (debouncedQuery !== prevDebouncedQuery) {
        setPrevDebouncedQuery(debouncedQuery);
        setPage(1);

        if (debouncedQuery.trim() === "") {
            setResults([]);
        }
    }

    const [randomizeTrigger, setRandomizeTrigger] = useState(0);

    // Randomize
    const randomize = () => {
        setMode("RANDOMIZE");
        setQuery("");
        setPage(1);
        setRandomizeTrigger(t => t + 1);
    };

    // Main fetch effect
    useEffect(() => {
        if (mode === "RANDOMIZE") {
            fetchData(`/api/games/randomize`);
            return;
        }

        if (debouncedQuery.trim() === "") {
            controllerRef.current?.abort();
            return;
        } else {
            fetchData(`/api/games/search?query=${encodeURIComponent(debouncedQuery)}&page=${page}`);
        }
    }, [fetchData, page, debouncedQuery, mode, randomizeTrigger]);

    const hasNextPage = results.length === 25;
    const displayedResults = results.slice(0, 24);

    return (
        <SearchContext.Provider value={{ results, displayedResults, setResults, debouncedQuery, setDebouncedQuery, query, setQuery, fetchData, page, setPage, hasNextPage, randomize, isLoading }}>
            {children}
        </SearchContext.Provider>
    );
}