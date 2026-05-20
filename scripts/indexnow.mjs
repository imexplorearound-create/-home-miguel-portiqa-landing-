// Ping IndexNow (Bing, Yandex) with the URLs we want freshly indexed.
// Usage: node scripts/indexnow.mjs
// Add new URLs to the URLS array as the site grows.

const KEY = "097addb6563a158ffc0801287835a55198d48d6ed43f628ce15f7446672ee6b4";
const HOST = "portiqa.pt";

const URLS = [
  "https://portiqa.pt/",
  "https://portiqa.pt/privacidade",
];

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: URLS,
};

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(`IndexNow status: ${res.status} ${res.statusText}`);
const text = await res.text();
if (text) console.log(`Response body: ${text}`);
if (![200, 202].includes(res.status)) process.exit(1);
