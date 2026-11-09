"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ClockIcon,
  CommandIcon,
  FileIcon,
  FolderIcon,
} from "./icons";

type ModeId = "files" | "history" | "snippets";
type Kind = "file" | "folder" | "history" | "snippet";

type Result = {
  id: string;
  text: string;
  kind: Kind;
  meta: string;
  score: number;
  indices: number[];
};

const MODES = [
  {
    id: "files",
    label: "files",
    prefix: "zap",
    seed: "pac",
    placeholder: "search files and folders",
  },
  {
    id: "history",
    label: "history",
    prefix: "zap %",
    seed: "git",
    placeholder: "search shell history",
  },
  {
    id: "snippets",
    label: "web",
    prefix: "zap web",
    seed: "docker",
    placeholder: "search command snippets",
  },
] as const;

const FILES = [
  "src/pages/index.tsx",
  "src/components/Nav.tsx",
  "src/lib/search.ts",
  "src/lib/history.ts",
  "src/styles/globals.css",
  "packages/core/",
  "packages/core/src/fileSearcher.ts",
  "packages/core/src/types.ts",
  "apps/cli/src/index.ts",
  "README.md",
  "package.json",
  "pnpm-workspace.yaml",
  "turbo.json",
];

const HISTORY = [
  "git status",
  "git add -A && git commit -m \"add fuzzy file search\"",
  "git push origin main",
  "docker compose up -d",
  "docker compose logs -f api",
  "docker system prune -af",
  "npm install -g zap-search",
  "zap init zsh >> ~/.zshrc",
  "source ~/.zshrc",
  "rg \"createServer\" apps",
  "pnpm dev",
];

const SNIPPETS: { text: string; meta: string }[] = [
  { text: "docker compose up -d", meta: "docker" },
  { text: "docker compose logs -f api", meta: "docker" },
  { text: "docker system prune -af", meta: "docker" },
  { text: "tar -xzf archive.tar.gz", meta: "tar" },
  {
    text: "find . -name \"*.ts\" -not -path \"*/node_modules/*\"",
    meta: "find",
  },
  { text: "git reset --hard HEAD~1", meta: "git" },
  { text: "ssh -L 5432:localhost:5432 user@host", meta: "ssh" },
  {
    text: "curl -sS -X POST -H \"Content-Type: application/json\" -d '{\"ok\":true}' localhost:3000/api",
    meta: "curl",
  },
];

function fuzzy(text: string, query: string) {
  if (!query.trim()) return { score: 0, indices: [] as number[] };

  const haystack = text.toLowerCase();
  const needle = query.toLowerCase();
  const indices: number[] = [];
  let cursor = 0;
  let score = 0;
  let streak = 0;

  for (let i = 0; i < needle.length; i++) {
    const character = needle[i];
    if (!character || character === " ") continue;
    const found = haystack.indexOf(character, cursor);
    if (found === -1) return null;

    const previous = haystack[found - 1] ?? "";
    const boundary = found === 0 || /[/\-_. ]/.test(previous);

    if (found === cursor) streak += 1;
    else streak = 0;

    score += 12 + Math.min(streak, 6) * 4 + (boundary ? 10 : 0);
    indices.push(found);
    cursor = found + 1;
  }

  return { score: score - text.length * 0.08, indices };
}

function Highlight({ text, indices }: { text: string; indices: number[] }) {
  if (!indices.length) return <>{text}</>;

  const marked = new Set(indices);

  return (
    <>
      {text.split("").map((character, index) =>
        marked.has(index) ? (
          <span key={index} className="text-zap">
            {character}
          </span>
        ) : (
          <span key={index}>{character}</span>
        )
      )}
    </>
  );
}

function KindIcon({ kind }: { kind: Kind }) {
  const className = "h-3.5 w-3.5 shrink-0 text-faint";

  if (kind === "folder") return <FolderIcon className={className} />;
  if (kind === "history") return <ClockIcon className={className} />;
  if (kind === "snippet") return <CommandIcon className={className} />;
  return <FileIcon className={className} />;
}

export function TerminalDemo() {
  const [mode, setMode] = useState<ModeId>("files");
  const [query, setQuery] = useState("pac");
  const [selected, setSelected] = useState(0);
  const [cwd, setCwd] = useState("~/projects/atlas");
  const [toast, setToast] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  const config = MODES.find((item) => item.id === mode) ?? MODES[0];

  const results = useMemo<Result[]>(() => {
    const pool: { text: string; kind: Kind; meta: string }[] =
      mode === "files"
        ? FILES.map((text) => ({
            text,
            kind: text.endsWith("/") ? "folder" : "file",
            meta: text.endsWith("/")
              ? "dir"
              : (text.split(".").pop() ?? "file"),
          }))
        : mode === "history"
          ? HISTORY.map((text) => ({
              text,
              kind: "history",
              meta: "zsh",
            }))
          : SNIPPETS.map(({ text, meta }) => ({
              text,
              kind: "snippet",
              meta,
            }));

    return pool
      .map((entry, index) => {
        const match = fuzzy(entry.text, query);
        if (!match) return null;
        return {
          id: `${mode}-${index}`,
          ...entry,
          score: match.score,
          indices: match.indices,
        };
      })
      .filter((entry): entry is Result => entry !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7);
  }, [mode, query]);

  useEffect(() => {
    setSelected(0);
  }, [mode, query]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const selectMode = useCallback(
    (next: ModeId) => {
      const nextConfig = MODES.find((item) => item.id === next) ?? MODES[0];
      setMode(next);
      setQuery(nextConfig.seed);
      setToast(null);
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    []
  );

  const commit = useCallback(
    (result: Result) => {
      if (result.kind === "folder") {
        const path = result.text.replace(/\/$/, "");
        setCwd((current) => `${current}/${path}`);
        showToast(`cd ${path}`);
        return;
      }

      if (result.kind === "file") {
        showToast(`opened ${result.text} in $EDITOR`);
        return;
      }

      if (result.kind === "history") {
        showToast(`running ${result.text}`);
        return;
      }

      showToast("staged on your prompt line");
    },
    [showToast]
  );

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((current) =>
        results.length ? (current + 1) % results.length : 0
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((current) =>
        results.length ? (current - 1 + results.length) % results.length : 0
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const result = results[selected];
      if (result) commit(result);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const index = MODES.findIndex((item) => item.id === mode);
      const nextMode = MODES[(index + 1) % MODES.length]!;
      selectMode(nextMode.id);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setQuery("");
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -top-6 h-32 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(16,239,88,0.12),transparent_75%)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#070707] shadow-[0_50px_140px_-30px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors focus-within:border-white/[0.16]">
        {/* title bar */}
        <div className="flex h-11 items-center justify-between gap-3 border-b border-white/[0.06] px-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-2 font-mono text-[11px] text-muted">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-zap" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-zap" />
            </span>
            <span className="text-fg">zap</span>
            <span className="hidden text-faint sm:inline">
              / interactive demo
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Search mode"
            className="flex items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.025] p-0.5"
          >
            {MODES.map((item) => {
              const active = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectMode(item.id)}
                  className={`relative rounded-full px-2.5 py-1 font-mono text-[10.5px] transition-colors ${
                    active ? "text-fg" : "text-faint hover:text-muted"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="terminal-mode"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", bounce: 0, duration: 0.35 }
                      }
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* prompt */}
        <div className="flex items-center gap-2 border-b border-white/[0.04] px-4 py-3 font-mono text-[12.5px] sm:px-5">
          <span className="hidden max-w-[42%] truncate text-faint sm:inline">
            {cwd}
          </span>
          <span className="text-zap">$</span>
          <span className="shrink-0 text-muted">{config.prefix}</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="zap-results"
            aria-autocomplete="list"
            aria-activedescendant={
              results[selected] ? `zap-option-${results[selected].id}` : undefined
            }
            aria-label={config.placeholder}
            placeholder={config.placeholder}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="terminal-input min-w-0 flex-1 bg-transparent text-fg caret-zap outline-none placeholder:text-faint/70"
          />
        </div>

        {/* results */}
        <div
          id="zap-results"
          role="listbox"
          aria-label="Search results"
          className="thin-scroll h-[272px] overflow-y-auto"
        >
          {results.length ? (
            results.map((result, index) => {
              const active = index === selected;
              return (
                <button
                  key={result.id}
                  type="button"
                  id={`zap-option-${result.id}`}
                  role="option"
                  aria-selected={active}
                  tabIndex={-1}
                  onMouseMove={() => setSelected(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => commit(result)}
                  className="group relative flex h-[38px] w-full cursor-pointer items-center gap-3 px-3 text-left sm:px-4"
                >
                  {active && (
                    <motion.span
                      layoutId="terminal-selection"
                      className="absolute inset-0 bg-white/[0.055]"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", bounce: 0, duration: 0.28 }
                      }
                    />
                  )}
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-px bg-zap" />
                  )}

                  <span className="relative z-10 w-3 shrink-0 font-mono text-[10px] text-faint">
                    {active ? "›" : ""}
                  </span>
                  <span className="relative z-10 flex shrink-0 items-center">
                    <KindIcon kind={result.kind} />
                  </span>
                  <span className="relative z-10 min-w-0 flex-1 truncate font-mono text-[12.5px] text-muted group-hover:text-fg">
                    <Highlight text={result.text} indices={result.indices} />
                  </span>
                  <span className="relative z-10 hidden shrink-0 font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint sm:block">
                    {result.meta}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="font-mono text-[12px] text-muted">
                No matches for{" "}
                <span className="text-fg">&ldquo;{query}&rdquo;</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="font-mono text-[11px] text-zap hover:underline"
              >
                clear query
              </button>
            </div>
          )}
        </div>

        {/* status line */}
        <div
          aria-live="polite"
          className="flex h-9 items-center border-t border-white/[0.05] px-4 sm:px-5"
        >
          {toast ? (
            <motion.p
              key={toast}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="truncate font-mono text-[11px] text-zap"
            >
              &rarr; {toast}
            </motion.p>
          ) : (
            <p className="font-mono text-[11px] text-faint">
              {results.length} {results.length === 1 ? "match" : "matches"}
              <span className="mx-2 text-line">/</span>
              {mode === "files"
                ? "fuzzy path match"
                : mode === "history"
                  ? "from your shell history"
                  : "from the web"}
            </p>
          )}
        </div>

        {/* key hints */}
        <div className="hidden h-9 items-center justify-between border-t border-white/[0.06] bg-white/[0.015] px-4 font-mono text-[10px] text-faint sm:flex sm:px-5">
          <div className="flex items-center gap-4">
            <span>
              <kbd className="mr-1.5 rounded border border-white/[0.08] bg-white/[0.03] px-1 py-0.5 text-[9px] text-muted">
                &uarr; &darr;
              </kbd>
              move
            </span>
            <span>
              <kbd className="mr-1.5 rounded border border-white/[0.08] bg-white/[0.03] px-1 py-0.5 text-[9px] text-muted">
                &crarr;
              </kbd>
              open
            </span>
            <span>
              <kbd className="mr-1.5 rounded border border-white/[0.08] bg-white/[0.03] px-1 py-0.5 text-[9px] text-muted">
                tab
              </kbd>
              mode
            </span>
            <span>
              <kbd className="mr-1.5 rounded border border-white/[0.08] bg-white/[0.03] px-1 py-0.5 text-[9px] text-muted">
                esc
              </kbd>
              clear
            </span>
          </div>
          <span>zap-search 1.1.0</span>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[10.5px] text-faint">
        Type to search. ↑ ↓ to move, ↵ to open.
      </p>
    </div>
  );
}
