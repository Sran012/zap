#!/usr/bin/env node
import { Command } from "commander";
import { FileSearcher } from "@zap/core";
import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";
import { select } from "@inquirer/prompts";
import open from "open";

const DEFAULT_MAX_RESULTS = 25;

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

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(rootDir, fullPath);

    if (
      item.isDirectory() &&
      (SKIPPED_DIRECTORIES.has(item.name) || item.name.startsWith("."))
    ) {
      continue;
    }

    if (item.isDirectory()) {
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
    .filter(Boolean)
    .filter((cmd) => !cmd.trim().startsWith("zap "));
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
    const searcher = new FileSearcher({ maxResults: DEFAULT_MAX_RESULTS });
    const files = getAllFiles(process.cwd());

    const history = getHistory();
    const useHistory = pattern.startsWith("%");
    const query = useHistory ? pattern.slice(1) : pattern;

    const source = useHistory ? history : files;

    let results: { name: string; score: number }[] = [];

    if (useHistory) {
      results = searcher.search(source, query);
    } else {
      results = searcher.searchPaths(source, query);
    }

    if (results.length === 0) {
      console.log("No match");
      return;
    }

    if (options.plain) {
      if (useHistory) {
        console.log(results[0].name);
        return;
      }

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
      if [[ "$target" == CMD:* ]]; then
        print -z "\${target#CMD:}"
      elif [[ -d "$target" ]]; then
        cd "$target"
      fi
    fi

    rm -f "$cd_file"
    return $exit_code
  }`);
    });

  program
  .command('web')
  .argument('<cmd>')
  .action(async (cmd: string) => {
    const res = await fetch(`https://cheat.sh/${cmd}`,{
      headers: {
        'User-Agent': 'curl/7.68.0' 
      }
    })
    const result = await res.text();

    const stripAnsi = (str: string) => str.replace(/\x1B\[[0-9;]*m/g, '')

const lines = result.split('\n')
const items: { name: string; desc: string }[] = []
let lastComment = ''

for (const line of lines) {
  const trimmed = stripAnsi(line).trim()  // strip ANSI then trim
  if (trimmed.startsWith('#')) {
    lastComment = trimmed.replace(/^#+\s*/, '')
  } else if (trimmed.startsWith(cmd)) {
    const parts = trimmed.split('#')
    const cmdOnly = parts[0].trim()            // just the command
    const inlineDesc = parts[1]?.trim() ?? ''
    items.push({ name: cmdOnly, desc: lastComment || inlineDesc })
    lastComment = ''
  }
}

    const maxLen = Math.max(...items.map(i => i.name.length))
    const termWidth = process.stdout.columns || 80 
    const descMaxLen = termWidth - maxLen - 6     
    try {
    const selected = await select({
      message: `Command Selected "${cmd}" :`,
      choices: items.map(item => ({
        name: `${item.name.padEnd(maxLen)}  \x1b[90m# ${item.desc.slice(0, descMaxLen)}\x1b[0m`,
        value: item.name
      }))
    })

    const handoffFile = process.env.ZAP_CD_FILE
      if (handoffFile) {
      fs.writeFileSync(handoffFile, `CMD:${selected}`, 'utf-8')
    }
  } catch (error: any) {
    if (
      error.name === "ExitPromptError" ||
      error.message?.includes("force closed")
    ) {
      process.exit(0);
    }
    throw error;
  }
    
  });

program.parse();
