# Tool untuk Membuat Flowgraph Otomatis

## Rekomendasi Tool

Berdasarkan gambar yang Anda tunjukkan (menggunakan Visual Paradigm), berikut adalah tool-tool yang dapat digunakan untuk membuat flowgraph dari pseudocode atau kode:

### 1. **Visual Paradigm** (Seperti di gambar Anda)
- **Website:** https://www.visual-paradigm.com/
- **Fitur:**
  - Mendukung pembuatan flowgraph dari pseudocode
  - Interface yang user-friendly
  - Export ke berbagai format (PNG, PDF, SVG)
  - Dapat membuat diagram UML dan flowchart
- **Cara Penggunaan:**
  1. Buka Visual Paradigm
  2. Pilih "Flowchart" atau "Activity Diagram"
  3. Buat node untuk setiap baris pseudocode
  4. Hubungkan node dengan panah sesuai alur
  5. Export sebagai gambar

### 2. **Draw.io / diagrams.net** (Gratis & Online)
- **Website:** https://app.diagrams.net/
- **Fitur:**
  - Gratis dan open source
  - Bisa digunakan online atau offline
  - Mendukung berbagai jenis diagram
  - Export ke PNG, PDF, SVG, dll
- **Cara Penggunaan:**
  1. Buka https://app.diagrams.net/
  2. Pilih "Flowchart" template
  3. Drag & drop shape untuk setiap node
  4. Hubungkan dengan connector
  5. Export sebagai gambar

### 3. **Lucidchart** (Online)
- **Website:** https://www.lucidchart.com/
- **Fitur:**
  - Cloud-based, bisa kolaborasi
  - Template flowgraph siap pakai
  - Integrasi dengan berbagai platform
- **Cara Penggunaan:**
  1. Buat akun (free tier tersedia)
  2. Pilih template "Flowchart"
  3. Buat flowgraph sesuai pseudocode
  4. Export sebagai gambar

### 4. **Mermaid** (Untuk Markdown)
- **Website:** https://mermaid.live/
- **Fitur:**
  - Syntax berbasis text
  - Bisa langsung di-embed di Markdown
  - Gratis dan open source
- **Contoh Syntax:**
  ```mermaid
  flowchart TD
      A[START] --> B{Email/Password Empty?}
      B -->|Yes| C[Display Error]
      B -->|No| D[Set Loading True]
      D --> E[Try Login]
      E --> F{Error?}
      F -->|Yes| G[Display Error]
      F -->|No| H[Success]
      G --> I[Set Loading False]
      H --> I
      C --> I
      I --> J[END]
  ```

### 5. **code2flow** (Otomatis dari Kode)
- **Website:** https://code2flow.com/
- **Fitur:**
  - Mengkonversi kode langsung ke flowchart
  - Mendukung Python, JavaScript, Java, dll
  - Gratis untuk penggunaan dasar
- **Cara Penggunaan:**
  1. Paste kode Anda
  2. Pilih bahasa pemrograman
  3. Generate flowchart otomatis
  4. Download sebagai gambar

### 6. **SmartDraw**
- **Website:** https://www.smartdraw.com/
- **Fitur:**
  - Drag & drop interface
  - Template lengkap
  - Auto-formatting
- **Cara Penggunaan:**
  1. Install SmartDraw
  2. Pilih "Flowchart"
  3. Buat flowgraph manual
  4. Export sebagai gambar

## Cara Membuat Flowgraph dari Pseudocode

### Langkah-langkah Manual:

1. **Identifikasi Node:**
   - Setiap baris pseudocode = 1 node (atau beberapa baris yang berurutan)
   - Node decision (IF, WHILE) = diamond shape
   - Node process = rectangle shape
   - Node start/end = rounded rectangle

2. **Buat Flowgraph:**
   - Mulai dari node 1 (BEGIN)
   - Ikuti alur sesuai pseudocode
   - Untuk IF: buat branch Yes/No
   - Untuk WHILE: buat loop kembali
   - Akhiri dengan node END

3. **Label Node:**
   - Setiap node diberi label sesuai nomor baris pseudocode
   - Contoh: Node 1 = "BEGIN", Node 3 = "IF email IS EMPTY..."

4. **Hubungkan dengan Panah:**
   - Panah menunjukkan alur eksekusi
   - Decision node memiliki 2 panah (Yes/No atau True/False)

### Contoh Flowgraph untuk Login Pengguna:

```
[1: BEGIN] 
    ↓
[2: PREVENT DEFAULT]
    ↓
[3: IF email/password EMPTY?] 
    ├─ Yes → [4: DISPLAY ERROR] → [5: RETURN] → [28: END]
    └─ No ↓
[7: SET isLoading = TRUE]
    ↓
[8: TRY]
    ↓
[9: CALL signInWithPassword]
    ↓
[10: IF error EXISTS?]
    ├─ Yes → [11: IF "Invalid credentials"?]
    │         ├─ Yes → [12: DISPLAY ERROR] → [18: RETURN]
    │         ├─ No → [13: IF "Email not confirmed"?]
    │         │         ├─ Yes → [14: DISPLAY ERROR] → [18: RETURN]
    │         │         └─ No → [16: DISPLAY ERROR] → [18: RETURN]
    │         └─ [17: END IF] → [18: RETURN]
    └─ No ↓
[20: IF data.user EXISTS?]
    ├─ Yes → [21: DISPLAY SUCCESS] → [22: REDIRECT] → [23: END IF]
    └─ No ↓
[24: CATCH] → [25: DISPLAY ERROR]
    ↓
[26: FINALLY] → [27: SET isLoading = FALSE]
    ↓
[28: END]
```

## Rekomendasi untuk Project Anda

**Untuk skripsi, saya rekomendasikan:**

1. **Visual Paradigm** (jika sudah punya license) - seperti di gambar Anda
2. **Draw.io** (gratis) - mudah digunakan, hasil bagus
3. **Mermaid** (jika ingin di-embed langsung di Markdown)

**Langkah selanjutnya:**
1. Pilih salah satu tool di atas
2. Buat flowgraph untuk setiap fungsi (5 fungsi)
3. Export sebagai gambar PNG dengan resolusi tinggi
4. Simpan di folder `docs/diagrams/flowgraph/`
5. Update path gambar di BAB 7

## Struktur Folder yang Disarankan

```
docs/
  diagrams/
    flowgraph/
      flowgraph_login_pengguna.png
      flowgraph_tambah_artikel.png
      flowgraph_update_artikel.png
      flowgraph_hapus_artikel.png
      flowgraph_kelola_pengguna.png
```

Setelah flowgraph dibuat, update path di BAB 7 dari `path/to/flowgraph_*.png` menjadi path yang sebenarnya.

