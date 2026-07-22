import { useEffect } from "react";

/* ---------- Meta Pixel — consent-gated (Consent Mode v2) ----------
 *
 * The pixel does NOT load or initialize while marketing/ad_storage consent is
 * "denied". fbevents.js (the only request to connect.facebook.net) is injected
 * lazily, and ONLY after the user grants marketing consent in the cookie banner
 * — or on load if that consent was already stored from a previous visit.
 *
 * Client-only: every access to window/document/localStorage lives inside an
 * effect or a function, never at module top level. During prerender
 * (renderToString) useEffect never runs, so nothing here touches the DOM or the
 * network — the component simply renders null.
 */

const PIXEL_ID = "1800304264271258";
const CONSENT_KEY = "portiqa_consent_v1";

// Module-scoped flag — the primary double-init guard. Survives re-renders and
// re-mounts within the same page load.
let initialized = false;

function marketingGranted() {
  if (typeof window === "undefined") return false;
  try {
    const stored = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    return !!(stored && stored.marketing);
  } catch (e) {
    return false;
  }
}

// Idempotent: safe to call on load and again on every consent change.
function initMetaPixel() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  // Double-init guard: our flag + Facebook's own `if (f.fbq) return` below.
  if (initialized || window.fbq) {
    initialized = true;
    return;
  }

  // Standard Meta Pixel loader. This is the line that first hits
  // connect.facebook.net, so it must never run before consent is granted.
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
  initialized = true;
}

// Fire a Lead event — ONLY when the pixel is initialized (consent given).
// No-ops silently otherwise; never throws.
export function trackMetaLead() {
  if (typeof window === "undefined") return;
  if (!initialized || typeof window.fbq !== "function") return;
  window.fbq("track", "Lead");
}

// Renders nothing. Wires consent → pixel init.
export function MetaPixel() {
  useEffect(() => {
    // Already consented from a previous visit → init immediately on load.
    if (marketingGranted()) initMetaPixel();

    // React the moment the user accepts marketing in the banner.
    const onConsent = (e) => {
      if (e && e.detail && e.detail.marketing) initMetaPixel();
    };
    window.addEventListener("portiqa:consent", onConsent);
    return () => window.removeEventListener("portiqa:consent", onConsent);
  }, []);

  return null;
}
