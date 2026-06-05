import re
from pathlib import Path

root = Path('backend/src/LaundryApi/Models')
classes = []

for file in root.glob('*.cs'):
    text = file.read_text(encoding='utf-8')
    match = re.search(r'public sealed class (\w+)', text)
    if not match:
        continue
    name = match.group(1)
    fields = re.findall(r'public [^\n]+ (\w+) \{', text)
    classes.append((name, fields))

lines = ['# Database Diagram', '', '```mermaid', 'erDiagram']
for name, fields in classes:
    lines.append(f'    {name} {{')
    for field in fields:
        lines.append(f'        string {field}')
    lines.append('    }')

for name, fields in classes:
    if name == 'LaundryOrder':
        lines.append('    LaundryOrder }|--|| Customer : belongs_to')

lines.append('```')
Path('docs/database-diagram.md').write_text('\n'.join(lines), encoding='utf-8')
