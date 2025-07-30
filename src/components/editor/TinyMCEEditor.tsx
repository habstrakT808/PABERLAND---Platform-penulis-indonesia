"use client";

import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditorType } from "tinymce";
import { useRef } from "react";

interface TinyMCEEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
  disabled?: boolean;
}

interface MenuItemCallback {
  (
    items: Array<{
      type: string;
      text: string;
      onAction: () => void;
    }>
  ): void;
}

export default function TinyMCEEditor({
  value,
  onChange,
  placeholder = "Mulai menulis artikel Anda di sini...",
  height = 500,
  disabled = false,
}: TinyMCEEditorProps) {
  const editorRef = useRef<TinyMCEEditorType | null>(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  // Template content untuk berbagai jenis tulisan
  const getTemplate = (type: string) => {
    const templates = {
      artikel: `<h1>Judul Artikel Anda</h1>
<p><em>Tanggal: ${new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</em></p>

<h2>🔍 Pendahuluan</h2>
<p>Tulis pendahuluan yang menarik untuk artikel Anda di sini. Jelaskan mengapa topik ini penting dan apa yang akan pembaca pelajari.</p>

<h2>📝 Pembahasan Utama</h2>
<p>Tulis konten utama artikel Anda di sini. Gunakan:</p>
<ul>
<li><strong>Poin-poin penting</strong> untuk memperjelas ide</li>
<li><em>Penekanan</em> pada kata kunci</li>
<li>Contoh konkret dan data pendukung</li>
</ul>

<blockquote>
<p>"Tambahkan kutipan yang relevan atau insight menarik di sini."</p>
</blockquote>

<h2>💡 Kesimpulan</h2>
<p>Rangkum poin-poin utama dan berikan call-to-action atau pemikiran penutup yang berkesan.</p>`,

      cerpen: `<h1 style="text-align: center;">Judul Cerpen Anda</h1>
<p style="text-align: center;"><em>Oleh: [Nama Penulis]</em></p>
<p style="text-align: center;"><em>${new Date().toLocaleDateString(
        "id-ID"
      )}</em></p>
<hr />

<p>Paragraf pembuka yang langsung menarik perhatian pembaca. Perkenalkan tokoh utama, setting, atau konflik awal.</p>

<p>"Dialog pembuka yang menarik," kata tokoh utama sambil melakukan sesuatu yang menggambarkan karakternya.</p>

<p>Lanjutkan cerita dengan membangun konflik dan mengembangkan karakter. Gunakan:</p>
<ul>
<li>Dialog yang natural dan mengungkap karakter</li>
<li>Deskripsi setting yang vivid</li>
<li>Konflik yang semakin meningkat</li>
</ul>

<p style="text-align: center;"><strong>***</strong></p>

<p>Klimaks cerita - momen paling tegang atau mengharukan.</p>

<p>Resolusi yang memuaskan dan memberikan makna pada cerita.</p>

<p style="text-align: center;"><em>— Tamat —</em></p>`,

      puisi: `<h1 style="text-align: center;">Judul Puisi Anda</h1>
<p style="text-align: center;"><em>Oleh: [Nama Penulis]</em></p>
<hr />

<p style="text-align: center;">
<em>Bait pertama puisi Anda</em><br />
<em>Ekspresikan perasaan atau pemikiran</em><br />
<em>Dengan pilihan kata yang indah</em><br />
<em>Dan irama yang mengalir</em>
</p>

<p style="text-align: center;">
<em>Bait kedua melanjutkan tema</em><br />
<em>Dengan metafora yang kuat</em><br />
<em>Atau simbol yang bermakna</em><br />
<em>Menyentuh jiwa pembaca</em>
</p>

<p style="text-align: center;">
<em>Bait penutup memberikan</em><br />
<em>Kesan mendalam dan berkesan</em><br />
<em>Meninggalkan jejak di hati</em><br />
<em>Yang tak mudah terlupakan</em>
</p>

<p style="text-align: center;"><strong>***</strong></p>`,

      "cerita-rakyat": `<h1 style="text-align: center;">Judul Cerita Rakyat</h1>
<p style="text-align: center;"><em>Cerita Rakyat dari [Daerah Asal]</em></p>
<p style="text-align: center;"><em>Diceritakan kembali oleh: [Nama Anda]</em></p>
<hr />

<p><strong>Pada zaman dahulu kala</strong>, di sebuah desa yang jauh di pedalaman [nama daerah], hiduplah seorang [tokoh utama] yang [karakteristik utama].</p>

<p>Alkisah, [mulai cerita dengan setting dan pengenalan tokoh]. Desa itu dikenal karena [ciri khas desa/masalah yang ada].</p>

<p>Suatu hari, [mulai konflik utama cerita]. [Tokoh utama] harus menghadapi [tantangan/masalah besar].</p>

<blockquote>
<p>"[Pesan moral atau dialog penting dari tokoh bijak]"</p>
</blockquote>

<p>Dengan [sifat positif tokoh], [tokoh utama] berusaha [usaha menyelesaikan masalah]. Namun, perjalanan tidaklah mudah karena [rintangan yang dihadapi].</p>

<p>Akhirnya, [resolusi cerita]. Dan sejak saat itu, [perubahan yang terjadi di desa/hikmah yang didapat].</p>

<p><strong>Pesan Moral:</strong> [Tuliskan pesan moral dari cerita rakyat ini]</p>

<p style="text-align: center;"><em>— Selesai —</em></p>`,

      "novel-berseri": `<h1>Judul Novel - Bab [Nomor]</h1>
<h2>[Judul Bab]</h2>
<p><em>Novel Berseri - Bab ${Math.floor(Math.random() * 20) + 1}</em></p>
<hr />

<p><strong>Ringkasan bab sebelumnya:</strong> [Ringkas kejadian penting dari bab sebelumnya untuk membantu pembaca mengingat alur cerita]</p>

<hr />

<p>[Mulai bab dengan hook yang menarik - bisa berupa dialog, aksi, atau deskripsi yang langsung menarik perhatian]</p>

<p>"[Dialog pembuka yang menunjukkan konflik atau kemajuan plot]," kata [nama tokoh].</p>

<p>[Lanjutkan dengan pengembangan plot, karakter, dan konflik. Untuk novel berseri, pastikan:]</p>

<ul>
<li><strong>Konsistensi karakter</strong> dengan bab-bab sebelumnya</li>
<li><strong>Kemajuan plot</strong> yang signifikan</li>
<li><strong>Cliffhanger</strong> atau hook untuk bab selanjutnya</li>
<li><strong>Pacing</strong> yang sesuai dengan genre</li>
</ul>

<p>[Kembangkan scene utama bab ini dengan detail yang cukup untuk membangun atmosfer dan emosi]</p>

<blockquote>
<p>[Momen refleksi tokoh atau narasi yang memberikan depth pada cerita]</p>
</blockquote>

<p>[Bangun menuju klimaks bab - momen penting yang akan membuat pembaca penasaran dengan bab selanjutnya]</p>

<p>[Akhiri dengan cliffhanger atau resolusi sementara yang membuat pembaca ingin melanjutkan ke bab berikutnya]</p>

<hr />

<p><em><strong>Bersambung ke Bab ${
        Math.floor(Math.random() * 20) + 2
      }...</strong></em></p>

<p><em>Apa yang akan terjadi selanjutnya? Nantikan bab berikutnya!</em></p>`,
      "info-berita": `<h1>Judul Berita/Info</h1>
<p><em>Tanggal: ${new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</em></p>

<h2>📰 Lead (Pembuka)</h2>
<p>Tulis ringkasan inti berita atau info di sini. Jawab pertanyaan: siapa, apa, kapan, di mana, mengapa, dan bagaimana (5W+1H).</p>

<h2>📋 Isi Berita</h2>
<p>Jelaskan detail peristiwa, data, kutipan narasumber, dan kronologi secara berurutan.</p>
<ul>
<li>Fakta utama</li>
<li>Kutipan narasumber</li>
<li>Data pendukung</li>
</ul>

<h2>🔚 Penutup</h2>
<p>Tambahkan informasi tambahan, penjelasan, atau harapan ke depan.</p>`,

      cermin: `<h1 style="text-align: center;">Judul Cermin (Cerita Mini)</h1>
<p style="text-align: center;"><em>Oleh: [Nama Penulis]</em></p>
<p style="text-align: center;"><em>${new Date().toLocaleDateString(
        "id-ID"
      )}</em></p>
<hr />

<p>Paragraf tunggal atau dua paragraf yang langsung menuju inti cerita. Fokus pada satu momen, ide, atau twist yang kuat.</p>

<p style="text-align: center;"><em>— Tamat —</em></p>`,

      "resensi-buku": `<h1>Judul Resensi Buku</h1>
<p><em>Oleh: [Nama Penulis]</em></p>
<hr />

<h2>📚 Identitas Buku</h2>
<ul>
<li>Judul: [Judul Buku]</li>
<li>Penulis: [Nama Penulis Buku]</li>
<li>Penerbit: [Nama Penerbit]</li>
<li>Tahun Terbit: [Tahun]</li>
<li>Jumlah Halaman: [Jumlah]</li>
</ul>

<h2>📝 Ringkasan Isi Buku</h2>
<p>Ringkas isi buku secara objektif, tanpa opini pribadi.</p>

<h2>⭐ Kelebihan & Kekurangan</h2>
<ul>
<li>Kelebihan: [Tulis keunggulan buku]</li>
<li>Kekurangan: [Tulis kekurangan buku]</li>
</ul>

<h2>💡 Penilaian & Kesimpulan</h2>
<p>Berikan penilaian pribadi dan rekomendasi untuk pembaca.</p>`,

      dongeng: `<h1 style="text-align: center;">Judul Dongeng</h1>
<p style="text-align: center;"><em>Dongeng dari [Daerah/Negara]</em></p>
<p style="text-align: center;"><em>Diceritakan oleh: [Nama Anda]</em></p>
<hr />

<p><strong>Pada suatu waktu</strong>, hiduplah [tokoh utama] yang [karakteristik].</p>
<p>Mulai cerita dengan pengenalan tokoh dan setting. Bangun konflik dan petualangan yang penuh imajinasi.</p>

<p>Tambahkan pesan moral di akhir cerita.</p>

<p style="text-align: center;"><em>— Selesai —</em></p>`,

      cerbung: `<h1>Judul Cerbung - Bagian [Nomor]</h1>
<p><em>Oleh: [Nama Penulis]</em></p>
<hr />

<p><strong>Ringkasan bagian sebelumnya:</strong> [Ringkas bagian sebelumnya jika ada]</p>

<p>[Mulai bagian baru dengan hook yang menarik]</p>

<p>[Kembangkan konflik, karakter, dan alur. Akhiri dengan cliffhanger atau pertanyaan yang membuat pembaca ingin lanjut ke bagian berikutnya]</p>

<p style="text-align: center;"><em>Bersambung...</em></p>`,

      novel: `<h1 style="text-align: center;">Judul Novel</h1>
<p style="text-align: center;"><em>Oleh: [Nama Penulis]</em></p>
<p style="text-align: center;"><em>${new Date().toLocaleDateString(
        "id-ID"
      )}</em></p>
<hr />

<h2>Bab 1: [Judul Bab Pertama]</h2>

<p>[Mulai dengan hook yang kuat - bisa berupa aksi, dialog, atau deskripsi yang langsung menarik perhatian pembaca]</p>

<p>"[Dialog pembuka yang menunjukkan karakter atau konflik]," kata [nama tokoh utama].</p>

<p>[Lanjutkan dengan pengembangan karakter, setting, dan plot. Untuk novel, fokus pada:]</p>

<ul>
<li><strong>Karakter yang kompleks</strong> dengan motivasi dan konflik internal</li>
<li><strong>Setting yang vivid</strong> dan atmosfer yang kuat</li>
<li><strong>Plot yang berkembang</strong> dengan konflik eksternal dan internal</li>
<li><strong>Pacing yang seimbang</strong> antara aksi dan refleksi</li>
</ul>

<p>[Kembangkan scene utama dengan detail yang cukup untuk membangun dunia novel]</p>

<blockquote>
<p>[Momen refleksi tokoh atau narasi yang memberikan depth pada cerita]</p>
</blockquote>

<p>[Bangun menuju klimaks bab dengan konflik yang semakin meningkat]</p>

<p>[Akhiri bab dengan resolusi sementara atau pertanyaan yang membuat pembaca ingin lanjut]</p>

<hr />

<p><em><strong>Bersambung ke Bab 2...</strong></em></p>`,

      serial: `<h1 style="text-align: center;">Judul Serial - Episode [Nomor]</h1>
<p style="text-align: center;"><em>Oleh: [Nama Penulis]</em></p>
<p style="text-align: center;"><em>Episode ${
        Math.floor(Math.random() * 10) + 1
      } dari ${Math.floor(Math.random() * 20) + 10}</em></p>
<hr />

<h2>Episode [Nomor]: [Judul Episode]</h2>

<p><strong>Ringkasan episode sebelumnya:</strong> [Ringkas kejadian penting dari episode sebelumnya untuk membantu pembaca mengingat alur cerita]</p>

<hr />

<p>[Mulai episode dengan hook yang menarik - bisa berupa aksi, misteri, atau pengembangan karakter]</p>

<p>"[Dialog pembuka yang menunjukkan dinamika antar karakter atau konflik]," kata [nama tokoh].</p>

<p>[Lanjutkan dengan pengembangan plot yang fokus pada satu episode. Untuk serial, pastikan:]</p>

<ul>
<li><strong>Konsistensi karakter</strong> dengan episode-episode sebelumnya</li>
<li><strong>Plot episode yang lengkap</strong> dengan konflik dan resolusi</li>
<li><strong>Hook untuk episode berikutnya</strong> atau pengembangan arc cerita</li>
<li><strong>Pacing yang sesuai</strong> untuk format serial</li>
</ul>

<p>[Kembangkan scene utama episode dengan detail yang cukup untuk membangun dunia serial]</p>

<blockquote>
<p>[Momen refleksi tokoh atau insight yang memberikan depth pada serial]</p>
</blockquote>

<p>[Bangun menuju klimaks episode dengan konflik yang semakin meningkat]</p>

<p>[Akhiri dengan resolusi episode atau cliffhanger untuk episode berikutnya]</p>

<hr />

<p><em><strong>Episode ${
        Math.floor(Math.random() * 10) + 2
      } akan segera hadir...</strong></em></p>

<p><em>Nantikan episode berikutnya untuk melihat kelanjutan cerita!</em></p>`,
    };

    return templates[type as keyof typeof templates] || templates.artikel;
  };

  return (
    <div className="tinymce-wrapper">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={handleEditorChange}
        disabled={disabled}
        init={{
          height: height,
          menubar: "file edit view insert format tools table help",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
            "emoticons",
            "importcss",
            "autosave",
            "save",
            "directionality",
            "nonbreaking",
            "pagebreak",
            "quickbars",
            "codesample",
            "accordion",
          ],
          toolbar:
            "undo redo | insertTemplate | blocks fontfamily fontsize | " +
            "bold italic underline strikethrough | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | link image media table codesample | " +
            "forecolor backcolor emoticons | fullscreen preview code | help",

          // Toolbar yang muncul saat memilih teks
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          quickbars_insert_toolbar: "quickimage quicktable",

          // Menu context (klik kanan)
          contextmenu: "link image table",

          // Font options
          font_family_formats:
            "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",

          font_size_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",

          // Content styling
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
              font-size: 16px; 
              line-height: 1.6; 
              color: #374151;
              max-width: none;
              padding: 20px;
              background: white;
            }
            h1, h2, h3, h4, h5, h6 { 
              color: #1f2937; 
              margin-top: 1.5em; 
              margin-bottom: 0.5em; 
              font-weight: 600;
            }
            h1 { font-size: 2.25em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.3em; }
            h2 { font-size: 1.875em; color: #4f46e5; }
            h3 { font-size: 1.5em; color: #7c3aed; }
            p { margin-bottom: 1em; text-align: justify; }
            blockquote { 
              border-left: 4px solid #4f46e5; 
              margin: 1.5em 0; 
              padding: 1em 1.5em; 
              background: #f8fafc;
              color: #4b5563;
              font-style: italic;
              border-radius: 0 8px 8px 0;
            }
            code { 
              background-color: #f3f4f6; 
              padding: 0.2em 0.4em; 
              border-radius: 3px; 
              font-family: 'Monaco', 'Consolas', monospace;
              font-size: 0.9em;
              color: #dc2626;
            }
            pre { 
              background-color: #1f2937; 
              color: #f9fafb;
              border-radius: 8px; 
              padding: 1em; 
              overflow-x: auto;
              margin: 1em 0;
              border: 1px solid #374151;
            }
            img { 
              max-width: 100%; 
              height: auto; 
              border-radius: 8px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              margin: 1em 0;
            }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin: 1em 0;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            }
            table td, table th { 
              border: 1px solid #e5e7eb; 
              padding: 12px 16px; 
            }
            table th { 
              background-color: #4f46e5; 
              color: white;
              font-weight: 600;
              text-align: left;
            }
            table tbody tr:nth-child(even) {
              background-color: #f9fafb;
            }
            ul, ol { 
              padding-left: 1.5em; 
              margin: 1em 0;
            }
            li { 
              margin: 0.5em 0; 
            }
            hr {
              border: none;
              height: 2px;
              background: linear-gradient(to right, #4f46e5, #7c3aed, #4f46e5);
              margin: 2em 0;
              border-radius: 1px;
            }
            .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
              color: #9ca3af;
              font-style: italic;
            }
          `,

          // Placeholder
          placeholder: placeholder,

          // Auto-resize
          resize: "both",

          // Paste settings - untuk copy paste dari Word, Google Docs, dll
          paste_as_text: false,
          paste_auto_cleanup_on_paste: true,
          paste_remove_styles: false,
          paste_remove_styles_if_webkit: false,
          paste_word_valid_elements:
            "b,strong,i,em,h1,h2,h3,h4,h5,h6,p,ol,ul,li,a[href],span,color,font-size,font-color,font-family,mark,table,tr,td,th",
          paste_retain_style_properties: "all",

          // Image settings
          image_advtab: true,
          image_caption: true,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",

          // Link settings
          link_title: false,
          link_target_list: [
            { title: "New page", value: "_blank" },
            { title: "Same page", value: "_self" },
          ],

          // Table settings
          table_responsive_width: true,
          table_default_attributes: {
            border: "1",
          },
          table_default_styles: {
            borderCollapse: "collapse",
          },

          // Autosave - sangat penting untuk mencegah kehilangan data
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "paberland-{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",

          // Spell checker
          browser_spellcheck: true,

          // Custom setup untuk menambah fungsionalitas
          setup: (editor: TinyMCEEditorType) => {
            // Custom button untuk template
            editor.ui.registry.addMenuButton("insertTemplate", {
              text: "📝 Template",
              tooltip: "Pilih Template Tulisan",
              fetch: (success) => {
                const items = [
                  {
                    type: "menuitem" as const,
                    text: "📰 Template Info/Berita",
                    onAction: () => {
                      editor.setContent(getTemplate("info-berita"));
                    },
                  },
                  {
                    type: "menuitem" as const,
                    text: "🔎 Template Cermin (Cerita Mini)",
                    onAction: () => {
                      editor.setContent(getTemplate("cermin"));
                    },
                  },
                  {
                    type: "menuitem" as const,
                    text: "📚 Template Resensi Buku",
                    onAction: () => {
                      editor.setContent(getTemplate("resensi-buku"));
                    },
                  },
                  {
                    type: "menuitem" as const,
                    text: "🧚 Template Dongeng",
                    onAction: () => {
                      editor.setContent(getTemplate("dongeng"));
                    },
                  },
                  {
                    type: "menuitem" as const,
                    text: "📝 Template Cerbung",
                    onAction: () => {
                      editor.setContent(getTemplate("cerbung"));
                    },
                  },
                  {
                    type: "menuitem" as const,
                    text: "📰 Template Artikel",
                    onAction: () => {
                      editor.setContent(getTemplate("artikel"));
                    },
                  },
                  {
                    type: "menuitem" as const,
                    text: "📖 Template Cerpen",
                    onAction: () => {
                      editor.setContent(getTemplate("cerpen"));
                    },
                  },
                  {
                    type: "menuitem" as const,
                    text: "🎭 Template Puisi",
                    onAction: () => {
                      editor.setContent(getTemplate("puisi"));
                    },
                  },
                  {
                    type: "menuitem" as const,
                    text: "🏛️ Template Cerita Rakyat",
                    onAction: () => {
                      editor.setContent(getTemplate("cerita-rakyat"));
                    },
                  },
                  {
                    type: "menuitem" as const,
                    text: "📚 Template Novel",
                    onAction: () => {
                      editor.setContent(getTemplate("novel"));
                    },
                  },
                  {
                    type: "menuitem" as const,
                    text: "📚 Template Serial",
                    onAction: () => {
                      editor.setContent(getTemplate("serial"));
                    },
                  },
                ];
                success(items);
              },
            });

            // Custom button untuk statistik tulisan
            editor.ui.registry.addButton("wordStats", {
              text: "📊 Stats",
              tooltip: "Statistik Tulisan",
              onAction: () => {
                const content = editor.getContent({ format: "text" });
                const wordCount = content.trim().split(/\s+/).length;
                const charCount = content.length;
                const charCountNoSpaces = content.replace(/\s/g, "").length;
                const readingTime = Math.ceil(wordCount / 200); // Asumsi 200 kata per menit

                editor.windowManager.alert(
                  `📊 Statistik Tulisan Anda:\n\n` +
                    `📝 Jumlah kata: ${wordCount}\n` +
                    `🔤 Jumlah karakter: ${charCount}\n` +
                    `🔤 Karakter tanpa spasi: ${charCountNoSpaces}\n` +
                    `⏱️ Estimasi waktu baca: ${readingTime} menit\n\n` +
                    `💡 Tips: Artikel yang baik biasanya 300-1500 kata`
                );
              },
            });

            // Event listener untuk auto-save notification
            editor.on("AutoSaveRestore", () => {
              console.log("Auto-saved content restored");
            });
          },

          // Accessibility
          a11y_advanced_options: true,

          // Performance
          convert_urls: false,

          // Security
          extended_valid_elements: "script[src|async|defer|type|charset]",
        }}
      />

      {/* Custom styling untuk integrasi dengan design system */}
      <style jsx global>{`
        .tox-tinymce {
          border-radius: 8px !important;
          border: 1px solid #d1d5db !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
        }

        .dark .tox-tinymce {
          border-color: #4b5563 !important;
        }

        .tox-toolbar__primary {
          background: #f9fafb !important;
          border-bottom: 1px solid #e5e7eb !important;
        }

        .dark .tox-toolbar__primary {
          background: #374151 !important;
          border-bottom-color: #4b5563 !important;
        }

        .tox-toolbar__group {
          border-color: #e5e7eb !important;
        }

        .dark .tox-toolbar__group {
          border-color: #4b5563 !important;
        }

        .tox-tbtn {
          border-radius: 4px !important;
          transition: all 0.2s ease !important;
        }

        .tox-tbtn:hover {
          background: #e5e7eb !important;
          transform: translateY(-1px) !important;
        }

        .dark .tox-tbtn:hover {
          background: #4b5563 !important;
        }

        .tox-edit-area__iframe {
          background: white !important;
        }

        .dark .tox-edit-area__iframe {
          background: #1f2937 !important;
        }

        /* Fullscreen improvements */
        .tox-fullscreen {
          z-index: 9999 !important;
          background: white !important;
        }

        .dark .tox-fullscreen {
          background: #0f172a !important;
        }

        .tox-fullscreen .tox-edit-area__iframe {
          background: white !important;
        }

        .dark .tox-fullscreen .tox-edit-area__iframe {
          background: #0f172a !important;
        }

        /* Menu styling */
        .tox-menu {
          border-radius: 8px !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        }

        /* Notification styling */
        .tox-notification {
          border-radius: 8px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </div>
  );
}
