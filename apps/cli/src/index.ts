#!/usr/bin/env node
import { Command } from "commander";
import { FileSearcher } from "@zap/core";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { exec } from "child_process";
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

function getHistory(): string[] {
  const historyPath = path.join(process.env.HOME || "", ".zsh_history");

  if (!fs.existsSync(historyPath)) return [];

  const content = fs.readFileSync(historyPath, "utf-8");

  return content
    .split("\n")
    .map((line) => line.split(";").pop() || "")
    .filter(Boolean);
}

function reportDirectorySelection(dirPath: string) {
  const handoffFile = process.env.ZAP_CD_FILE;

  if (handoffFile) {
    fs.writeFileSync(handoffFile, dirPath, "utf-8");
    return;
  }

  console.log(`CD:${dirPath}`);
}

const program = new Command();

program
  .name("zap")
  .argument("<pattern>")
  .option("--plain")
  .action(async (pattern: string, options: any) => {
    const searcher = new FileSearcher();
    const files = getAllFiles(process.cwd());

    const history = getHistory();
    const useHistory = pattern.startsWith("%");
    const query = useHistory ? pattern.slice(1) : pattern;

    const source = useHistory ? history : files;

    let results: { name: string; score: number }[] = [];

    const maxResults = 10;

    if (useHistory) {
      results = source
        .map((cmd) => ({
          name: cmd,
          score: searcher["getScore"](query, cmd),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults);
    } else {
      results = source
        .map((file) => {
          const parts = file.split("/");
          const name = parts[parts.length - 1];
          const depth = parts.length;

          const fullScore = searcher["getScore"](query, file);
          const nameScore = searcher["getScore"](query, name);

          const score = Math.max(fullScore, nameScore) - depth;

          return { name: file, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults);
    }

    if (results.length === 0) {
      console.log("No match");
      return;
    }

    if (options.plain) {
      const topMatch = path.join(process.cwd(), results[0].name);
      const stat = fs.statSync(topMatch);

      if (stat.isDirectory()) {
        reportDirectorySelection(topMatch);
      } else {
        console.log(topMatch);
      }
      return;
    }

    let selected: string;

    try {
      selected = await select({
        message: "Select:",
        choices: results.map((r) => ({
          name: r.name,
          value: r.name,
        })),
      });
    } catch (error: any) {
      if (
        error.name === "ExitPromptError" ||
        error.message?.includes("force closed")
      ) {
        process.exit(0);
      }
      throw error;
    }

    if (useHistory) {
      exec(selected, (error, stdout, stderr) => {
        if (error) {
          console.error(stderr);
        } else {
          process.stdout.write(stdout);
        }
      });
    } else {
      const fullPath = path.join(process.cwd(), selected);

      const stat = fs.statSync(fullPath);

      if (stat.isFile()) {
        await open(fullPath);
      } else {
        reportDirectorySelection(fullPath);
      }
    }
  });

  program
    .command("init")
    .argument("<shell>")
    .action((shell: string) => {
      if (shell !== "zsh") {
        console.error(`Unsupported shell: ${shell}`);
        process.exit(1);
      }

      console.log(`zap() {
    local cd_file
    local exit_code
    local target

    cd_file=$(mktemp)
    ZAP_CD_FILE="$cd_file" command zap "$@"
    exit_code=$?

    if [[ $exit_code -eq 0 && -s "$cd_file" ]]; then
      target=$(<"$cd_file")
      if [[ -d "$target" ]]; then
        cd "$target"
      fi
    fi

    rm -f "$cd_file"
    return $exit_code
  }`);
    });

program.parse();
