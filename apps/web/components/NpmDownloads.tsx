import { ArrowUpRight } from "./icons";

const PACKAGE = "zap-search";
const RELEASED = "2026-04-11";
const FALLBACK_TOTAL = 1518;

async function totalDownloads(): Promise<number> {
  try {
    const end = new Date().toISOString().slice(0, 10);
    const response = await fetch(
      `https://api.npmjs.org/downloads/point/${RELEASED}:${end}/${PACKAGE}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) return FALLBACK_TOTAL;

    const data = (await response.json()) as { downloads?: unknown };
    return typeof data.downloads === "number" ? data.downloads : FALLBACK_TOTAL;
  } catch {
    return FALLBACK_TOTAL;
  }
}

export async function NpmDownloads() {
  const total = await totalDownloads();

  return (
    <a
      href={`https://www.npmjs.com/package/${PACKAGE}`}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 font-mono text-[11px] text-faint transition-colors hover:text-fg"
    >
      <span className="tabular text-fg">
        {total.toLocaleString("en-US")}
      </span>
      downloads on npm
      <ArrowUpRight className="h-3 w-3 opacity-40 transition-opacity group-hover:opacity-100" />
    </a>
  );
}
