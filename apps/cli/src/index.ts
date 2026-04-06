#!/usr/bin/env node
import { Command } from "commander";
import { FileSearcher } from "@zap/core";
import * as fs from "fs";
import * as path from "path";
import { select } from "@inquirer/prompts";
import open from "open";

const SKIPPED_DIRECTORIES = new Set([
  "node_modules",
  "build",
  "dist",
  "out",
  ".next",
  ".turbo",
  "coverage",
]);

function getAllFiles(dir: string, rootDir = dir): string[] {
  let results: string[] = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(rootDir, fullPath);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      (SKIPPED_DIRECTORIES.has(item) || item.startsWith("."))
    ) {
      continue;
    }

    if (stat.isDirectory()) {
      results.push(relativePath);
      results = results.concat(getAllFiles(fullPath, rootDir));
    } else {
      results.push(relativePath);
    }
  }

  return results;
}

const program = new Command();

program
  .name("zap")
  .argument("<pattern>")
  .option('--plain')
  .action(async (pattern: string, options: any) => {
    const searcher = new FileSearcher();
    const files = getAllFiles(process.cwd());

    const results = files
      .map((file) => {
        const parts = file.split("/");
        const name = parts[parts.length - 1];
        const depth = parts.length;

        const fullScore = searcher["getScore"](pattern, file);
        const nameScore = searcher["getScore"](pattern, name);

        const score = Math.max(fullScore, nameScore) - depth;

        return { name: file, score };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score);

    if (results.length === 0) {
      console.log("No match");
      return;
    }

    if (options.plain) {
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

    const fullPath = path.join(process.cwd(), selected);

    const stat = fs.statSync(fullPath);

    if (stat.isFile()) {
      await open(fullPath);
    } else {
      process.stdout.write(selected);
    }
  });

program.parse();
