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
    setResults: React.Dispatch<React.SetStateAction<Game[]>>;
};