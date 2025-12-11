# Class Diagram

Folder ini berisi kode Mermaid untuk Class Diagram platform PaberLand.

## File yang Tersedia

1. **Class_Diagram_Frontend.md** - Class diagram untuk komponen React frontend
2. **Class_Diagram_API_Routes_Services.md** - Class diagram untuk API routes dan service layer
3. **Class_Diagram_Database_Models.md** - Class diagram untuk database models

## Cara Menggunakan

Class diagram dibuat menggunakan **Mermaid** (bukan PlantUML). Untuk generate gambar diagram:

### Opsi 1: Mermaid Live Editor (Online)
1. Buka [https://mermaid.live](https://mermaid.live)
2. Copy kode Mermaid dari file `.md` yang diinginkan
3. Paste ke editor
4. Klik tombol "Actions" → "Download PNG" atau "Download SVG"

### Opsi 2: VS Code Extension
1. Install extension "Markdown Preview Mermaid Support"
2. Buka file `.md` di VS Code
3. Preview akan menampilkan diagram secara langsung
4. Export sebagai gambar dari preview

### Opsi 3: Mermaid CLI (Command Line)
```bash
# Install Mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Generate PNG dari file markdown
mmdc -i Class_Diagram_Frontend.md -o Class_Diagram_Frontend.png
```

## Catatan

- Class diagram menggunakan format **Mermaid** (`classDiagram`)
- Sequence diagram menggunakan format **PlantUML** (`.puml`)
- ERD menggunakan format **Mermaid** dan **PlantUML**

