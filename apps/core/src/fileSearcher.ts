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

    private getScore(pattern: string, text: string): number {
        let score = 0;
        let p = 0;
        let consecutive = 0;
      
        for (let t = 0; t < text.length; t++) {
          if (
            pattern[p] &&
            pattern[p].toLowerCase() === text[t].toLowerCase()
          ) {
            consecutive++;
            score += 1 + consecutive;
            p++;
          } else {
            consecutive = 0;
          }
        }
      
        return p === pattern.length ? score : 0;
      }

      search(files: string[], pattern: string) {
        return files
          .map((file) => ({
            name: file,
            score: this.getScore(pattern, file)
          }))
          .filter((item) => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, this.options.maxResults);
      }
}