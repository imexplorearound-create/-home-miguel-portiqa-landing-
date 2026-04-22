export const isClient = typeof window !== "undefined";

export const safeStorage = {
  get(key, allowed) {
    if (!isClient) return null;
    try {
      const v = localStorage.getItem(key);
      if (allowed && !allowed.includes(v)) return null;
      return v;
    } catch {
      return null;
    }
  },
  set(key, value) {
    if (!isClient) return;
    try { localStorage.setItem(key, value); } catch {}
  },
};
