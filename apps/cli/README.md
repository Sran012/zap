# zap

`zap` is a small terminal helper for when you know "it is somewhere here" but do not want to manually dig for it.

It lets you:

- fuzzy search files and folders from the current directory
- jump into folders from the same prompt
- search your `zsh` history and run old commands fast
- search ready-made terminal snippets for stuff like `docker`, pick one, and send it back to your shell

## Install

```sh
npm install -g zap-search
```

## Shell setup

Right now shell integration is for `zsh`.

```sh
zap init zsh >> ~/.zshrc
source ~/.zshrc
```

This wrapper is what allows `zap` to change your current directory and hand commands back to your shell cleanly.

## Quick use

Search files or folders in the current project:

```sh
zap pac
```

Search command history:

```sh
zap %git
```

Search command examples/snippets from the web:

```sh
zap web docker
```

That last one is handy when you are stuck on some random command, like Docker flags you vaguely remember. Pick the one you want and `zap` sends it back to your shell so you can run it as-is or tweak it first.

## What happens after selection

- file selected: opens the file
- folder selected: changes your current shell directory
- history command selected: executes the command
- `zap web <topic>` selection: puts the chosen command into your shell line

## Plain mode

If you do not want the interactive selector and just want the top match:

```sh
zap pac --plain
```

This is useful in scripts or when you already know your query is specific enough.

## Typical examples

Open a file quickly:

```sh
zap readme
```

Jump into a folder:

```sh
zap src
```

Run something from history:

```sh
zap %docker
```

Look up a command pattern when your brain is half-working:

```sh
zap web bun
zap web docker
zap web kubectl
```

## Notes

- hidden folders and common heavy folders like `node_modules`, `dist`, `build`, `.next`, and `coverage` are skipped
- history search reads from `~/.zsh_history`
- shell handoff features depend on running the `zsh` setup above

## Final Words

I'm Sujal Rana, and I'm making `zap` because when I was very new to programming and got exposed to the terminal, even basic things felt harder than they should.

At that time, even small terminal tasks used to feel irritating. Finding the right file, jumping into the right folder, remembering some old command, or searching for one Docker command I knew I had seen before, all of that was enough to break flow.

That feeling is the whole reason behind `zap`. I want something simple that makes terminal work feel less messy, especially when you're still learning and do not want to fight your tools for basic things.

If you use `zap`, build something around it, or just want to say hi, you can find me here:

- Twitter/X: [@twtsujal](https://x.com/twtsujal)
- GitHub: [sran012](https://github.com/sran012)

And if you want to contribute, proper welcome.

If you have an idea, a fix, a weird edge case, or just want to improve the flow, open an issue or PR. This project is still being shaped, so good contributions are not just accepted, they genuinely help make `zap` better for everyone using it.
