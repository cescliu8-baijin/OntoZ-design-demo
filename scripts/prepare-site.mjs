import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const publicSite = join(projectRoot, "public", "site");
const sourceEntries = [
  "index.html",
  "styles.css",
  "lucide-icons.css",
  "css",
  "js",
  "assets",
];

await rm(publicSite, { recursive: true, force: true });
await mkdir(publicSite, { recursive: true });

for (const entry of sourceEntries) {
  await cp(join(projectRoot, entry), join(publicSite, entry), {
    recursive: true,
  });
}
