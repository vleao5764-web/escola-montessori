import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, watch } from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const watchedPaths = ["src", "public", "scripts", ".github", "package.json", "vite.config.ts"]
  .map((path) => join(projectRoot, path))
  .filter(existsSync);

let publishing = false;
let queued = false;
let timer;

function run(command, args) {
  return execFileSync(command, args, {
    cwd: projectRoot,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
}

function publish() {
  if (publishing) {
    queued = true;
    return;
  }

  publishing = true;
  try {
    if (!run("git", ["status", "--porcelain"]).trim()) return;
    run("git", ["add", "-A", "--", ".", ":(exclude)*.zip"]);
    const staged = spawnSync("git", ["diff", "--cached", "--quiet"], {
      cwd: projectRoot,
      shell: process.platform === "win32",
    }).status !== 0;
    if (staged) {
      run("git", ["commit", "-m", "Atualiza site da Escola Montessori"]);
      run("git", ["push", "github", "main"]);
      console.log("Alterações enviadas ao GitHub. A publicação será iniciada automaticamente.");
    }
  } catch (error) {
    console.error("Não foi possível enviar as alterações ao GitHub.", error.message);
  } finally {
    publishing = false;
    if (queued) {
      queued = false;
      publish();
    }
  }
}

function schedulePublish() {
  clearTimeout(timer);
  timer = setTimeout(publish, 1500);
}

for (const watchedPath of watchedPaths) {
  watch(watchedPath, { recursive: true }, schedulePublish);
}

console.log("Sincronização automática com o GitHub ativa.");
