export interface SearchOptions {
    CaseSensitive?: boolean;
    rawMode?: boolean;
    maxResults?: number;
}

export interface SearchResult {
    name: string;
    score: number;
}