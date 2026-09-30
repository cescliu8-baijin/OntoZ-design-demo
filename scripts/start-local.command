#!/bin/zsh
set -eu
cd -- "${0:A:h}/.."
print 'OntoZ 本地演示：http://127.0.0.1:8766/#lucas'
print '请保持此终端窗口打开；按 Ctrl+C 停止。'
exec python3 -B scripts/lucas-demo-server.py --port 8766
