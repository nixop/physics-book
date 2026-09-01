import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const baseUrl = process.env.VISUAL_BASE_URL ?? 'http://127.0.0.1:4173/';
let preview = null;

const available = async () => {
  try { return (await fetch(baseUrl)).ok; } catch { return false; }
};

const run = (command, args, options = {}) => new Promise((resolveRun, rejectRun) => {
  const child = spawn(command, args, { cwd: root, stdio: 'inherit', windowsHide: true, ...options });
  child.once('error', rejectRun);
  child.once('exit', (code) => code === 0 ? resolveRun() : rejectRun(new Error(`${command} завершился с кодом ${code}`)));
});

try {
  if (!(await available())) {
    preview = spawn(process.execPath, [resolve(root, 'node_modules', 'vite', 'bin', 'vite.js'), 'preview', '--host', '127.0.0.1'], {
      cwd: root,
      stdio: 'ignore',
      windowsHide: true,
    });
    const deadline = Date.now() + 20_000;
    while (!(await available())) {
      if (preview.exitCode !== null) throw new Error(`Preview завершился с кодом ${preview.exitCode}`);
      if (Date.now() > deadline) throw new Error('Preview не запустился за 20 секунд');
      await new Promise((resolveWait) => setTimeout(resolveWait, 200));
    }
  }
  await run(process.execPath, [resolve(root, 'scripts', 'visual-check.mjs')], { env: { ...process.env, VISUAL_BASE_URL: baseUrl } });
} finally {
  preview?.kill();
}
