import { createServer } from "vite";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = resolve(root, "dist/index.html");

const server = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "warn",
});

try {
  const { Root } = await server.ssrLoadModule("/src/main.jsx");
  const html = renderToString(React.createElement(Root));
  const template = readFileSync(indexPath, "utf-8");
  const out = template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );
  writeFileSync(indexPath, out);
  console.log(`✓ Prerendered ${Buffer.byteLength(html, "utf8").toLocaleString()} bytes of HTML into dist/index.html`);
} finally {
  await server.close();
}
