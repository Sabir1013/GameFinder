import react from "react";
import { useSavedGames } from "./useSavedGames";
import { useSearch } from "./useSearch";
import Fuse from "fuse.js";
import type { Game } from "../types";

export function useFuzzyFilter() {
    const { savedGames } = useSavedGames();
    const { query, debouncedQuery } = useSearch();
    const [page, setPage] = react.useState(1);

    const filteredGames = react.useMemo(
        () => {
            if (query === "") {
                return savedGames;
            } else {
                const outputGames = [...savedGames];
                const options = { keys: ["name"], threshold: 0.5 };
                const fuse = new Fuse<Game>(outputGames, options);
                const results = fuse.search(debouncedQuery);
                return results.map(result => result.item);
            }
        }, [debouncedQuery, query, savedGames]
    );

    const [prevDebouncedQuery, setPrevDebouncedQuery] = react.useState(debouncedQuery);
    if (debouncedQuery !== prevDebouncedQuery) {
        setPrevDebouncedQuery(debouncedQuery);
        setPage(1);
    }

    const start = (page - 1) * 24;
    const displayedGames = filteredGames.slice(start, start + 24);
    const hasNextPage = filteredGames.length > start + 24;

    return { displayedGames, page, setPage, hasNextPage };
}