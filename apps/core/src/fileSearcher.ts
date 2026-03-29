import { SearchOptions } from "./types";

export class FileSearcher {
    private options: Required<SearchOptions>;

    constructor(options?: SearchOptions) {
        this.options = {
            CaseSensitive: options?.CaseSensitive ?? false,
            rawMode: options?.rawMode ?? false,
            maxResults: options?.maxResults ?? 10,
        };
    }
}