import re
from pathlib import Path

root = Path('backend/src/LaundryApi/Models')
rows = ['# Database Entities', '', '| Campo | Tipo | Descripción | Requerido | Ejemplo |', '| --- | --- | --- | --- | --- |']

for file in root.glob('*.cs'):
    text = file.read_text(encoding='utf-8')
    class_match = re.search(r'public sealed class (\w+)', text)
    if not class_match:
        continue
    class_name = class_match.group(1)
    rows.append(f'\n## {class_name}\n')
    properties = re.findall(r'\[BsonElement\("([^"]+)"\)\]\s*public [^\n]+ (\w+) \{', text)
    if not properties:
        properties = [(name, name) for name in re.findall(r'public [^\n]+ (\w+) \{', text)]
    for key, prop in properties:
        rows.append(f'| {key} | string | - | no | example |')

Path('docs/database-entities.md').write_text('\n'.join(rows), encoding='utf-8')
