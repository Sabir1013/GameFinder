export type Game = {
    id: number;
    name: string;
    summary: string;
    storyline: string;
    first_release_date: number;
    rating: number;
    cover: {
        url: string;
    }
    screenshots: {
        url: string;
    }[]
};

export type SearchContextType = {
    results: Game[];
    displayedResults: Game[];
    setResults: React.Dispatch<React.SetStateAction<Game[]>>;
    debouncedQuery: string;
    setDebouncedQuery: (query: string) => void;
    query: string;
    setQuery: (query : string) => void;
    fetchData: (endpoint: string) => void;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    hasNextPage: boolean;
};

export type SavedGamesContextType = {
    savedGames: Game[];
    saveGame: (game: Game) => void;
    removeGame: (id: number) => void;
};