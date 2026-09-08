import { execFileSync, spawn } from 'node:child_process';
import { existsSync, readdirSync, watch } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const deployDirectory = join(projectRoot, 'hostinger-flat');
const host = process.env.HOSTINGER_FTP_HOST;
const username = process.env.HOSTINGER_FTP_USERNAME;
const password = process.env.HOSTINGER_FTP_PASSWORD;

if (!host || !username || !password) {
  throw new Error('Defina as credenciais HOSTINGER_FTP antes de iniciar a publicação automática.');
}

let publishing = false;
let queued = false;
let timer;

function run(command, args) {
  execFileSync(command, args, { cwd: projectRoot, stdio: 'inherit', shell: process.platform === 'win32' });
}

function upload(filePath) {
  const destination = `ftp://${host}/${encodeURIComponent(basename(filePath))}`;
  run('curl.exe', [
    '--silent', '--show-error', '--fail', '--connect-timeout', '30', '--ftp-pasv',
    '--user', `${username}:${password}`, '--upload-file', filePath, destination,
  ]);
}

function publish() {
  if (publishing) {
    queued = true;
    return;
  }

  publishing = true;
  console.log(`[${new Date().toLocaleTimeString('pt-BR')}] Publicando na Hostinger...`);
  try {
    run('pnpm.cmd', ['run', 'package:hostinger']);
    run('node.exe', ['scripts/package-hostinger-flat.mjs']);
    readdirSync(deployDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => join(deployDirectory, entry.name))
      .forEach(upload);
    console.log(`[${new Date().toLocaleTimeString('pt-BR')}] Site atualizado.`);
  } catch (error) {
    console.error('A publicação automática falhou. O próximo salvamento tentará novamente.', error.message);
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
  timer = setTimeout(publish, 1200);
}

const watchedPaths = ['src', 'public', 'scripts', 'package.json', 'vite.config.ts', 'app.config.ts']
  .map((path) => join(projectRoot, path))
  .filter(existsSync);

for (const watchedPath of watchedPaths) {
  watch(watchedPath, { recursive: true }, schedulePublish);
}

console.log('Publicação automática ativa para matriculas2027.escolamontessori.com.br.');
publish();
