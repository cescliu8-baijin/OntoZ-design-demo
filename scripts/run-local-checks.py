#!/usr/bin/env python3
"""Run existing regressions against disposable data, never the user's database."""
import argparse
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import time
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parent.parent
RUNTIME = Path.home() / '.cache/codex-runtimes/codex-primary-runtime/dependencies/node'


def run(command, env):
    print('\nRunning ' + ' '.join(map(str, command)), flush=True)
    subprocess.run(list(map(str, command)), cwd=ROOT, env=env, check=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--browser', action='store_true', help='Also run Chrome and JavaScript checks')
    parser.add_argument('--port', type=int, default=18767, help='Dedicated test port; must be unused')
    args = parser.parse_args()
    env = dict(os.environ, PYTHONDONTWRITEBYTECODE='1')
    for name in ['test-lucas-publish.py', 'test-lucas-benchmark.py']:
        run([sys.executable, '-B', ROOT / 'scripts' / name], env)
    if not args.browser:
        return
    node = env.get('NODE_BINARY') or shutil.which('node')
    if not node and (RUNTIME / 'bin/node').is_file():
        node = str(RUNTIME / 'bin/node')
    if not node:
        raise RuntimeError('Node is unavailable. Install Node >=22.13 or set NODE_BINARY.')
    playwright = env.get('PLAYWRIGHT_MODULE')
    if not playwright:
        playwright = next((str(p) for p in [ROOT / 'node_modules/playwright', RUNTIME / 'node_modules/playwright'] if (p / 'package.json').is_file()), None)
    if not playwright:
        raise RuntimeError('Playwright is unavailable. Set PLAYWRIGHT_MODULE to its package directory.')
    env['PLAYWRIGHT_MODULE'] = playwright
    for folder, patterns in [('js', ['*.js']), ('scripts', ['*.cjs', '*.mjs'])]:
        for pattern in patterns:
            for path in sorted((ROOT / folder).glob(pattern)):
                run([node, '--check', path], env)
    base = 'http://127.0.0.1:%d/' % args.port
    for key in ['LUCAS_BASE_URL', 'JOHN_BASE_URL', 'WENDY_BASE_URL', 'INQUIRY_BASE_URL', 'DESIGN_SYSTEM_BASE_URL']:
        env[key] = base.rstrip('/') if key == 'LUCAS_BASE_URL' else base
    # The server binds before printing its readiness line. A busy port fails,
    # so tests cannot accidentally connect to an existing user's server.
    with tempfile.TemporaryDirectory(prefix='ontoz-checks-') as data:
        server = subprocess.Popen([sys.executable, '-u', '-B', '-m', 'http.server', str(args.port), '--bind', '127.0.0.1', '--directory', str(ROOT)], cwd=ROOT, env=env, stdout=subprocess.PIPE, text=True)
        try:
            ready = server.stdout.readline()
            if not ready.startswith('Serving HTTP'):
                raise RuntimeError('Test server could not start. Choose an unused --port.')
            for attempt in range(50):
                if server.poll() is not None:
                    raise RuntimeError('Test server stopped unexpectedly.')
                try:
                    with urlopen(base + 'index.html', timeout=1) as response:
                        response.read()
                    break
                except OSError:
                    if attempt == 49:
                        raise
                    time.sleep(.1)
            for name in ['test-lucas-demo.cjs', 'test-lucas-browser.cjs', 'test-john-demo.cjs', 'test-inquiry.cjs', 'test-wendy-home.cjs', 'test-wendy-responsive.cjs', 'test-design-system.cjs']:
                run([node, ROOT / 'scripts' / name], env)
        finally:
            server.terminate()
            try:
                server.wait(timeout=5)
            except subprocess.TimeoutExpired:
                server.kill()
                server.wait()
            server.stdout.close()
    print('\nAll local checks passed; temporary test data removed.')


if __name__ == '__main__':
    try:
        main()
    except (RuntimeError, subprocess.CalledProcessError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
