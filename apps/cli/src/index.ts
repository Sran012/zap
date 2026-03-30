#!/usr/bin/env node
import { Command } from "commander";
import { FileSearcher } from "@zap/core";
import * as fs from "fs";

const program = new Command();

program
  .name("zap")
  .argument("<pattern>")
  .action((pattern) => {
    const searcher = new FileSearcher();

    const files = fs.readdirSync(process.cwd());
    const results = searcher.search(files, pattern);

    console.log(results);
  });

program.parse();