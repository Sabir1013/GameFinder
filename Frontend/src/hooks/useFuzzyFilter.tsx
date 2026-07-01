import react from "react";
import { useSavedGames } from "./useSavedGames";
import { useSearch } from "./useSearch";
import Fuse from "fuse.js";
import type { Game } from "../types";

export function useFuzzyFilter() {
    const {savedGames} = useSavedGames();
    const {query, debouncedQuery} = useSearch();

    const filteredGames = react.useMemo(
        () => {
            if (query === "") {
                return savedGames;
            } else {
                const outputGames = [...savedGames];
                const options = {keys: ["name"], threshold: 0.5};
                const fuse = new Fuse<Game>(outputGames, options);
                const results = fuse.search(debouncedQuery);

                return results.map(result => result.item);
            }
        }, [debouncedQuery, query, savedGames]
    )

    return filteredGames;
}