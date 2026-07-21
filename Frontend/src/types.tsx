export type Game = {
    id: number;
    name: string;
    summary: string;
    storyline: string;
    releaseDate: number;
    rating: number;
    coverUrl: string;
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
    displayedGames: Game[];
    savedQuery: string;
    setSavedQuery: React.Dispatch<React.SetStateAction<string>>;
    saveGame: (game: Game) => void;
    pageCount: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    hasNextPage: boolean;
    removeGame: (id: number) => void;
};