# zap

`zap` is a small terminal tool for jumping through a codebase and reusing shell history without leaving the keyboard.

It does two jobs:

- fuzzy search files and folders from the current working directory
- fuzzy search commands from `~/.zsh_history`

When you select a file, `zap` opens it with the system default app. When you select a folder, your shell changes into that folder. When you search history, `zap` runs the selected command.

## Why this exists

The goal is simple: keep navigation fast.

If you remember only a few characters from a filename, folder, or old command, that should be enough to get back to it. `zap` uses subsequence matching, so a query like `pac` can match `package.json` because the letters appear in order.

## How it works

`zap` has three layers:

- `apps/core` contains the fuzzy matching logic
- `apps/cli` contains the command-line behavior and prompt flow
- your shell wrapper handles directory changes, because a child process cannot change the parent shell's working directory on its own

The CLI searches relative paths from the current directory. It skips common generated folders such as `node_modules`, `dist`, `.next`, and `.turbo`.

History mode reads commands from `~/.zsh_history`. Prefix your query with `%` to search history instead of files.

## Usage

Search files and folders:

```sh
zap pac
```

Search command history:

```sh
zap %git
```

Use the arrow keys to move through results and press Enter to select one.

Current behavior:

- selecting a file opens it
- selecting a folder changes the current shell directory
- selecting a history command executes it
- pressing `Ctrl+C` exits cleanly

## Plain mode

`--plain` is the non-interactive mode.

It is mainly for shell integration and scripting. Instead of showing the selection UI, `zap` returns the top match directly.

Examples:

```sh
zap pac --plain
zap packages --plain
```

If the top result is a file, plain mode prints the full file path.

If the top result is a directory, plain mode reports that directory for the shell wrapper so the shell can `cd` into it.

## Shell integration

The project currently uses a small `zsh` wrapper so folder selection can update the current shell.

Use this in `~/.zshrc`:

```zsh
zap() {
  local cd_file
  local exit_code
  local target

  cd_file=$(mktemp)
  ZAP_CD_FILE="$cd_file" /home/sujal/.nvm/versions/node/v22.20.0/bin/zap "$@"
  exit_code=$?

  if [[ $exit_code -eq 0 && -s "$cd_file" ]]; then
    target=$(<"$cd_file")
    if [[ -d "$target" ]]; then
      cd "$target"
    fi
  fi

  rm -f "$cd_file"
  return $exit_code
}
```

After updating `~/.zshrc`, reload your shell:

```sh
source ~/.zshrc
```

## Project structure

```txt
apps/
  cli/
    src/index.ts
  core/
    src/fileSearcher.ts
    src/types.ts
```

Key files:

- [apps/cli/src/index.ts](/home/sujal/zap/apps/cli/src/index.ts) is the CLI entrypoint
- [apps/core/src/fileSearcher.ts](/home/sujal/zap/apps/core/src/fileSearcher.ts) contains the fuzzy scorer
- [apps/core/src/types.ts](/home/sujal/zap/apps/core/src/types.ts) contains shared types

## Local development

Install dependencies in the workspace with your package manager of choice.

Build everything:

```sh
pnpm build
```

Build only the matcher package:

```sh
cd apps/core
npx tsc
```

Build only the CLI:

```sh
cd apps/cli
npx tsc
```

Run the built CLI directly:

```sh
node apps/cli/dist/index.js pac
```

## Notes

- history search currently reads from `~/.zsh_history`
- file opening uses the system default application through the `open` package
- the matcher is intentionally simple and based on ordered character matching

## License

MIT. See [LICENSE](/home/sujal/zap/LICENSE).
