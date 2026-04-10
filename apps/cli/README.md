# zap

  `zap` is a terminal tool for fuzzy searching files, folders, and zsh history.

  ## Install

  ```sh
  npm install -g zap
```
  ## Shell setup
```
  zap init zsh >> ~/.zshrc
```
```
  source ~/.zshrc
```
  ## Usage

  Search files and folders from the current directory:
```
  zap pac
```
  Search zsh history:
```
  zap %git
```
  Current behavior:

  - selecting a file opens it
  - selecting a folder changes the current shell directory
  - selecting a history command executes it

  ## Plain mode

  Use plain mode when you want the top result without the interactive prompt:
```
  zap pac --plain
```