#!/usr/bin/env node
import { Command } from "commander";
import { FileSearcher } from "@zap/core";
import * as fs from "fs";
import { select } from "@inquirer/prompts";

const program = new Command();

program
  .name("zap")
  .argument("<pattern>")
  .option('--plain')
  .action(async (pattern:string,options:any) => {
    const searcher = new FileSearcher();
    const files = fs.readdirSync(process.cwd());
    const results = searcher.search(files, pattern);

    if (results.length === 0) {
      console.log("No match");
      return;
    }

    if(options.plain){
      process.stdout.write(results[0].name);
      return;
    }

    const selected = await select({
      message: "Select:",
      choices: results.map(r => ({
        name: r.name,
        value: r.name
      }))
    });
    
    process.stdout.write(selected);
  });

program.parse();