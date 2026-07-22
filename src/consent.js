import { isClient, safeStorage } from "./storage.js";

/* ---------- Consent contract — single source of truth ----------
 *
 * Shared by the cookie banner (components.jsx) and every consent-gated
 * integration (MetaPixel.jsx). A third, non-importable copy of the key lives
 * in the inline GTM bootstrap in index.html — keep it in sync if the key is
 * ever versioned.
 */

export const CONSENT_KEY = "portiqa_consent_v1";
export const CONSENT_EVENT = "portiqa:consent";

// Stored shape: { analytics: boolean, marketing: boolean, ts: string } | null
export function readConsent() {
  if (!isClient) return null;
  try {
    return JSON.parse(safeStorage.get(CONSENT_KEY) || "null");
  } catch {
    return null;
  }
}

export function writeConsent(payload) {
  safeStorage.set(CONSENT_KEY, JSON.stringify(payload));
}
