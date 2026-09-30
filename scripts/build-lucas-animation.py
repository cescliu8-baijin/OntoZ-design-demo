#!/usr/bin/env python3
"""Build the portable animation from canonical source files; never edit dist by hand."""
import re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
html = (ROOT / 'lucas-animation.html').read_text()
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', lambda m: '<style>\n' + (ROOT / m[1]).read_text() + '\n</style>', html)
html = re.sub(r'<script src="([^"]+)"></script>', lambda m: '<script>\n' + (ROOT / m[1]).read_text().replace('</script', '<\\/script') + '\n</script>', html)
html = html.replace('href="assets/favicon.svg"', 'href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22/%3E"')
output = ROOT / 'dist' / 'Lucas建站流程动画.html'
output.parent.mkdir(exist_ok=True)
output.write_text(html)
print(output)
