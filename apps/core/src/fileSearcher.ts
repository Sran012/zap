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

    score(pattern: string, text: string): number {
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
            score: this.score(pattern, file)
          }))
          .filter((item) => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, this.options.maxResults);
      }

      searchPaths(files: string[], pattern: string) {
        return files
          .map((file) => {
            const parts = file.split("/");
            const name = parts[parts.length - 1];
            const depth = parts.length;

            const fullScore = this.score(pattern, file);
            const nameScore = this.score(pattern, name);
            const score = Math.max(fullScore, nameScore) - depth;

            return { name: file, score };
          })
          .filter((item) => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, this.options.maxResults);
      }
}
