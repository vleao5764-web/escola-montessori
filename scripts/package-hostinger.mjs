import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(projectRoot, ".output", "public");
const destinationDir = join(projectRoot, "hostinger-public");
const localAssetServer = "http://127.0.0.1:4174";
const textExtensions = new Set([".css", ".html", ".js", ".mjs"]);
const assetPattern = /\/lovable-assets\/assets-v1\/[\w-]+\/[\w.-]+\.(?:png|jpe?g|webp|woff2)/g;

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? filesIn(path) : [path];
    }),
  );
  return files.flat();
}

async function collectAssetPaths() {
  const paths = new Set();
  for (const file of await filesIn(destinationDir)) {
    if (!textExtensions.has(extname(file))) continue;
    const content = await readFile(file, "utf8");
    for (const match of content.matchAll(assetPattern)) paths.add(match[0]);
  }
  return [...paths];
}

async function replaceLovableAssetPaths() {
  for (const file of await filesIn(destinationDir)) {
    if (!textExtensions.has(extname(file))) continue;
    const content = await readFile(file, "utf8");
    const updated = content.replaceAll("/__l5e/", "/lovable-assets/");
    if (updated !== content) await writeFile(file, updated);
  }
}

await rm(destinationDir, { recursive: true, force: true });
await cp(sourceDir, destinationDir, { recursive: true });
await replaceLovableAssetPaths();

const assetPaths = await collectAssetPaths();
for (const assetPath of assetPaths) {
  const response = await fetch(`${localAssetServer}${assetPath.replace("/lovable-assets/", "/__l5e/")}`);
  if (!response.ok) throw new Error(`Não foi possível copiar ${assetPath} (${response.status}).`);
  const target = resolve(destinationDir, `.${assetPath}`);
  if (!target.startsWith(destinationDir)) throw new Error(`Caminho de asset inválido: ${assetPath}`);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, new Uint8Array(await response.arrayBuffer()));
}

console.log(`Pacote Hostinger preparado com ${assetPaths.length} recursos locais.`);
console.log(`Pasta: ${relative(projectRoot, destinationDir)}`);
