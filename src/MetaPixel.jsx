import { useEffect } from "react";
import { CONSENT_EVENT, readConsent } from "./consent.js";

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

// Idempotent: safe to call on load and again on every consent change.
// `window.fbq` only exists once this loader has run, so its presence is the
// double-init guard.
function initMetaPixel() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.fbq) return;

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
}

// Fire a Lead event — ONLY when the pixel is initialized (consent given).
// No-ops silently otherwise; never throws.
export function trackMetaLead() {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", "Lead");
}

// Renders nothing. Wires consent → pixel init.
export function MetaPixel() {
  useEffect(() => {
    // Already consented from a previous visit → init immediately on load.
    if (readConsent()?.marketing) initMetaPixel();

    // React the moment the user accepts marketing in the banner.
    const onConsent = (e) => {
      if (e.detail?.marketing) initMetaPixel();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return null;
}
