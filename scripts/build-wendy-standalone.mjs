import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(projectRoot, "dist");
const outputFile = join(outputDirectory, "wendy-standalone.html");

const styleEntries = [
  "css/design-tokens.css", "css/base.css",
  "css/agent-shared.css",
  "css/wendy.css",
  "css/wendy-home.css",
];

const scriptEntries = [
  "assets/lucide.min.js",
  "js/shared.js",
  "js/agent-home-layout.js",
  "js/wendy.js",
];

const socialPlatforms = ["LinkedIn", "Instagram", "TikTok", "YouTube"];
const mimeTypes = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};
const assetAliases = new Map([
  ["designs/wendy-v12/16-linkedin-workspace.jpg", "assets/wendy-v15-industrial-inspection.jpg"],
]);

const readProjectFile = relativePath => readFile(join(projectRoot, relativePath), "utf8");

async function toDataUri(relativePath) {
  const resolvedPath = assetAliases.get(relativePath) || relativePath;
  const mimeType = mimeTypes[extname(resolvedPath).toLowerCase()];
  if (!mimeType) throw new Error(`Unsupported Wendy asset type: ${relativePath}`);
  const contents = await readFile(join(projectRoot, resolvedPath));
  return `data:${mimeType};base64,${contents.toString("base64")}`;
}

function escapeInlineTag(source, tagName) {
  return source.replaceAll(`</${tagName}`, `<\\/${tagName}`);
}

const styles = (await Promise.all(styleEntries.map(readProjectFile))).join("\n\n");
const [lucideSource, sharedSource, layoutSource, originalWendySource] = await Promise.all(
  scriptEntries.map(readProjectFile),
);

const referencedAssets = [
  ...new Set(originalWendySource.match(/(?:assets|designs)\/[A-Za-z0-9_./-]+\.(?:gif|jpe?g|png|svg|webp)/gi) || []),
];

const embeddedAssets = new Map(
  await Promise.all(referencedAssets.map(async path => [path, await toDataUri(path)])),
);

const socialAssets = Object.fromEntries(
  await Promise.all(
    socialPlatforms.map(async platform => {
      const path = `assets/${platform}.svg`;
      return [platform, embeddedAssets.get(path) || await toDataUri(path)];
    }),
  ),
);
const allEmbeddedAssets = Object.fromEntries([
  ...embeddedAssets,
  ...socialPlatforms.map(platform => [`assets/${platform}.svg`, socialAssets[platform]]),
]);

let wendySource = originalWendySource;
let assetIndex = 0;
for (const [path, dataUri] of embeddedAssets) {
  const assetReference = `embeddedAssetUris[${JSON.stringify(path)}]`;
  const placeholder = `__WENDY_EMBEDDED_ASSET_${assetIndex++}__`;
  wendySource = wendySource
    .replaceAll(`'${path}'`, placeholder)
    .replaceAll(path, dataUri)
    .replaceAll(placeholder, assetReference);
}

const dynamicSocialSource = 'src="assets/${file}.svg"';
if (!wendySource.includes(dynamicSocialSource)) {
  throw new Error("Wendy social asset expression changed; update the standalone bundler.");
}

wendySource = wendySource
  .replace(
    "  if (!root) return;",
    `  if (!root) return;\n  const embeddedAssetUris = ${JSON.stringify(allEmbeddedAssets)};`,
  )
  .replace(dynamicSocialSource, 'src="${embeddedAssetUris[\'assets/\' + file + \'.svg\']}"')
  .replace(
    "      return migrateImagePath(node);",
    "      const migratedPath = migrateImagePath(node);\n      return embeddedAssetUris[migratedPath] || migratedPath;",
  );

const scripts = [lucideSource, sharedSource, layoutSource, wendySource]
  .map(source => escapeInlineTag(source, "script"))
  .join("\n\n");

const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="OntoZ 社媒运营 Wendy 独立前端">
    <meta name="color-scheme" content="light">
    <title>社媒运营 Wendy</title>
    <style>
${escapeInlineTag(styles, "style")}

html, body { min-height: 100%; }
body { margin: 0; background: var(--oz-indigo-50); }
#wendyPage { display: block; min-height: 100dvh; overflow-x: hidden; }
    </style>
  </head>
  <body>
    <section class="wendy-page" id="wendyPage" aria-label="社媒运营 Wendy">
      <div id="wendyApp" class="wd-app"></div>
    </section>
    <div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true">
      <i data-lucide="circle-check" aria-hidden="true"></i><span></span>
    </div>
    <script>
if (!/^#wendy(?:\\/|$)/.test(location.hash)) history.replaceState(null, "", "#wendy");
${scripts}
    </script>
  </body>
</html>
`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, html);

const sizeInMegabytes = Buffer.byteLength(html) / 1024 / 1024;
console.log(`Built ${outputFile} (${sizeInMegabytes.toFixed(2)} MiB, ${embeddedAssets.size + socialPlatforms.length} embedded asset references)`);
