#!/usr/bin/env node
import { Command } from "commander";
import { FileSearcher } from "@zap/core";
import * as fs from "fs";
import { select } from "@inquirer/prompts";

const program = new Command();

program
  .name("zap")
  .argument("<pattern>")
  .action(async (pattern) => {
    const searcher = new FileSearcher();
    const files = fs.readdirSync(process.cwd());
    const results = searcher.search(files, pattern);

    if (results.length === 0) {
      console.log("No match");
      return;
    }

    const selected = await select({
      message: "Select:",
      choices: results.map(r => ({
        name: r.name,
        value: r.name
      }))
    });
    
    console.log(selected);
  });

program.parse();