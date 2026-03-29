import { Command } from "commander";
import { FileSearcher } from "@zap/core";

const program = new Command();

program
  .name("zap")
  .argument("<pattern>")
  .action((pattern) => {
    const searcher = new FileSearcher();

    const files = [
      "fileSearcher.ts",
      "fastRunner.js",
      "app.js",
      "folderStructure.ts",
      "REfADsME.md",
    ];

    const results = searcher.search(files, pattern);

    console.log(results);
  });

program.parse();