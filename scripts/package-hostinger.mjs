import { access, cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(projectRoot, ".output", "public");
const destinationDir = join(projectRoot, "hostinger-public");
const localPublicDir = join(projectRoot, "public");
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

const localAssetsByName = new Map(
  (await filesIn(localPublicDir)).map((file) => [basename(file), file]),
);

await rm(destinationDir, { recursive: true, force: true });
await cp(sourceDir, destinationDir, { recursive: true });
await replaceLovableAssetPaths();

const assetPaths = await collectAssetPaths();
for (const assetPath of assetPaths) {
  const target = resolve(destinationDir, `.${assetPath}`);
  if (!target.startsWith(destinationDir)) throw new Error(`Caminho de asset inválido: ${assetPath}`);
  await mkdir(dirname(target), { recursive: true });

  // A cópia local permite gerar o pacote também no GitHub Actions, onde não há
  // servidor Vite local em execução. O fallback preserva a compatibilidade com
  // assets que sejam fornecidos apenas pelo preview do Lovable.
  const localAsset = resolve(localPublicDir, `.${assetPath}`);
  try {
    await access(localAsset);
    await cp(localAsset, target);
    continue;
  } catch {
    const equivalentLocalAsset = localAssetsByName.get(basename(assetPath));
    if (equivalentLocalAsset) {
      await cp(equivalentLocalAsset, target);
      continue;
    }
    // Continua para o preview do Lovable quando o arquivo não existe no projeto.
  }

  const response = await fetch(`${localAssetServer}${assetPath.replace("/lovable-assets/", "/__l5e/")}`);
  if (!response.ok) throw new Error(`Não foi possível copiar ${assetPath} (${response.status}).`);
  await writeFile(target, new Uint8Array(await response.arrayBuffer()));
}

console.log(`Pacote Hostinger preparado com ${assetPaths.length} recursos locais.`);
console.log(`Pasta: ${relative(projectRoot, destinationDir)}`);
