import { useCallback, useEffect, useState } from "react";

const KEY = "pw:favorites";

/** Read once at module load so every hook instance starts in sync. */
function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Favourites persist to localStorage and broadcast across components via a
 * custom event, so the tab-bar count and the card hearts never drift apart.
 */
export function useFavorites() {
  const [ids, setIds] = useState<string[]>(read);

  useEffect(() => {
    const sync = () => setIds(read());
    window.addEventListener("pw:favorites", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("pw:favorites", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const next = read().includes(id)
      ? read().filter((x) => x !== id)
      : [...read(), id];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("pw:favorites"));
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, has, count: ids.length };
}
