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

    private isMatch(pattern: string, text: string): boolean {
        let i = 0;
        let j = 0;
      
        while (i < pattern.length && j < text.length) {
          if (pattern[i].toLowerCase() === text[j].toLowerCase()) {
            i++;
          }
          j++;
        }
      
        return i === pattern.length;
      }

    search(files : string[], pattern : string) {
        return files.filter(file => this.isMatch(pattern,file))
        .map((file) => ({
            name: file,
            score :1
        }))
        }
}