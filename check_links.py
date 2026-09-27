import os
import re

links = []
for root, dirs, files in os.walk('src/app'):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                matches = re.findall(r'href=["\'](.*?)["\']', content)
                if matches:
                    print(f"\n--- {path} ---")
                    for m in matches:
                        print(f"  {m}")
