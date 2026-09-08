import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(projectRoot, "hostinger-public");
const destinationDir = join(projectRoot, "hostinger-flat");
const textExtensions = new Set([".css", ".html", ".js", ".mjs"]);
const deploymentVersion = Date.now().toString(36);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  }));
  return files.flat();
}

const files = await collectFiles(sourceDir);
const normalise = (path) => path.replaceAll("\\", "/");
const fileMap = new Map(files.map((file) => {
  const sourcePath = normalise(relative(sourceDir, file));
  const targetPath = sourcePath.includes("/") ? `__${sourcePath.replaceAll("/", "__")}` : sourcePath;
  return [sourcePath, targetPath];
}));
const publicPath = (path) => `/${path}${/\.(?:js|css)$/.test(path) ? `?v=${deploymentVersion}` : ""}`;

await rm(destinationDir, { recursive: true, force: true });
await mkdir(destinationDir);

for (const file of files) {
  const sourcePath = normalise(relative(sourceDir, file));
  const targetPath = fileMap.get(sourcePath);
  const extension = extname(file);

  if (!textExtensions.has(extension)) {
    await cp(file, join(destinationDir, targetPath));
    continue;
  }

  let content = await readFile(file, "utf8");
  const assetReference = (flattened) => extension === ".js"
    ? `./${flattened}?v=${deploymentVersion}`
    : publicPath(flattened);
  for (const [original, flattened] of fileMap) {
    content = content.replaceAll(`/${original}`, publicPath(flattened));
  }

  content = content.replace(
    /\/lovable-assets\/assets-v1\/([^/]+)\/([^/"'`\s?#]+)([?#][^"'`\s]*)?/g,
    (match, assetId, assetName, suffix = "") => {
      const flattened = fileMap.get(`lovable-assets/assets-v1/${assetId}/${assetName}`);
      return flattened ? `${publicPath(flattened)}${suffix}` : match;
    },
  );

  // O manifesto do Vite também usa referências relativas como "assets/arquivo.js".
  // Em uma publicação sem pastas, elas precisam apontar para o nome achatado na raiz.
  content = content.replace(/(["'`])assets\/([^"'`\s?#]+)([?#][^"'`]*)?\1/g, (match, quote, assetName, suffix = "") => {
    const flattened = fileMap.get(`assets/${assetName}`);
    return flattened ? `${quote}${assetReference(flattened)}${suffix}${quote}` : match;
  });

  // Alguns imports dinâmicos do Vite já chegam como "./arquivo.js". Eles também
  // precisam apontar para o arquivo achatado que fica na raiz do subdomínio.
  content = content.replace(/(["'`])\.\/([^"'`\/\s?#]+\.js)([?#][^"'`]*)?\1/g, (match, quote, assetName, suffix = "") => {
    const flattened = fileMap.get(`assets/${assetName}`);
    return flattened ? `${quote}${assetReference(flattened)}${suffix}${quote}` : match;
  });

  content = content.replace(/\/((?:index|routes)-[\w-]+\.js)/g, (match, fileName) => {
    const flattened = fileMap.get(`assets/${fileName}`);
    return flattened ? publicPath(flattened) : match;
  });

  const fileDirectory = sourcePath.includes("/") ? sourcePath.slice(0, sourcePath.lastIndexOf("/")) : "";
  content = content.replace(/(["'`])((?:\.\.\/|\.\/)[^"'`\s?#]+)([?#][^"'`]*)?\1/g, (match, quote, candidate, suffix = "") => {
    const resolved = normalise(resolve("/", fileDirectory, candidate)).replace(/^\//, "");
    const flattened = fileMap.get(resolved);
    return flattened ? `${quote}${publicPath(flattened)}${suffix}${quote}` : match;
  });

  await writeFile(join(destinationDir, targetPath), content);
}

// As páginas legais precisam continuar em seus próprios endereços no servidor.
// A cópia adicional mantém a publicação plana do restante do site e atualiza
// /politica-de-privacidade e /termos-de-uso no mesmo envio.
for (const legalPath of ["politica-de-privacidade/index.html", "termos-de-uso/index.html"]) {
  const flattened = fileMap.get(legalPath);
  if (!flattened) continue;
  const nestedPath = join(destinationDir, legalPath);
  await mkdir(dirname(nestedPath), { recursive: true });
  await cp(join(destinationDir, flattened), nestedPath);
}

console.log(`Pacote sem pastas preparado com ${files.length} arquivos.`);
