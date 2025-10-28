# PENGEMBANGAN PLATFORM KOMUNITAS PENULIS LITERASI ANAK PABERLAND BERBASIS WEB MENGGUNAKAN FRAMEWORK NEXT.JS DAN POSTGRESQL

## SKRIPSI

Untuk memenuhi sebagian persyaratan memperoleh gelar Sarjana Komputer

**Disusun oleh:**  

Hafiyan Al Muqaffi Umary  

NIM: 225150207111117

***

**PROGRAM STUDI TEKNIK INFORMATIKA**  

**JURUSAN TEKNIK INFORMATIKA**  

**FAKULTAS ILMU KOMPUTER**  

**UNIVERSITAS BRAWIJAYA**  

**MALANG**  

**2025**

***

## DAFTAR ISI

- [DAFTAR ISI](#daftar-isi)
- [DAFTAR TABEL](#daftar-tabel)
- [DAFTAR GAMBAR](#daftar-gambar)
- [DAFTAR LAMPIRAN](#daftar-lampiran)
- [BAB 1 PENDAHULUAN](#bab-1-pendahuluan)
- [1.1 Latar Belakang](#11-latar-belakang)
- [1.2 Rumusan Masalah](#12-rumusan-masalah)
- [1.3 Tujuan](#13-tujuan)
- [1.4 Manfaat](#14-manfaat)
- [1.5 Batasan Masalah](#15-batasan-masalah)
- [1.6 Sistematika Pembahasan](#16-sistematika-pembahasan)
- [BAB 2 LANDASAN KEPUSTAKAAN](#bab-2-landasan-kepustakaan)
- [2.1 Rekayasa Perangkat Lunak](#21-rekayasa-perangkat-lunak)
- [2.2 Model Proses Perangkat Lunak](#22-model-proses-perangkat-lunak)
- [2.3 Analisis dan Perancangan Sistem](#23-analisis-dan-perancangan-sistem)
- [2.4 Arsitektur Perangkat Lunak](#24-arsitektur-perangkat-lunak)
- [2.5 Pengujian Perangkat Lunak](#25-pengujian-perangkat-lunak)
  - [2.6 Kualitas Perangkat Lunak](#26-kualitas-perangkat-lunak)
- [2.7 Platform Komunitas Online](#27-platform-komunitas-online)
- [BAB 3 METODOLOGI PENELITIAN](#bab-3-metodologi-penelitian)
- [3.1 Tipe Penelitian](#31-tipe-penelitian)
  - [3.2 Model Pengembangan Sistem](#32-model-pengembangan-sistem)
  - [3.3 Objek Penelitian](#33-objek-penelitian)
  - [3.4 Tahapan Penelitian](#34-tahapan-penelitian)
  - [3.5 Instrumen Penelitian](#35-instrumen-penelitian)
  - [3.6 Teknik Pengumpulan Data](#36-teknik-pengumpulan-data)
  - [3.7 Teknik Analisis Data](#37-teknik-analisis-data)
- [BAB 4 ANALISIS KEBUTUHAN SISTEM](#bab-4-analisis-kebutuhan-sistem)
  - [4.1 Identifikasi Stakeholder](#41-identifikasi-stakeholder)
  - [4.2 Analisis Kebutuhan Fungsional](#42-analisis-kebutuhan-fungsional)
  - [4.3 Analisis Kebutuhan Non-Fungsional](#43-analisis-kebutuhan-non-fungsional)
  - [4.4 Pemodelan Kebutuhan](#44-pemodelan-kebutuhan)
  - [4.5 Spesifikasi Kebutuhan Sistem](#45-spesifikasi-kebutuhan-sistem)
- [BAB 5 PERANCANGAN SISTEM](#bab-5-perancangan-sistem)
  - [5.1 Perancangan Arsitektur Sistem](#51-perancangan-arsitektur-sistem)
  - [5.2 Perancangan Basis Data](#52-perancangan-basis-data)
  - [5.3 Perancangan Antarmuka Pengguna](#53-perancangan-antarmuka-pengguna)
  - [5.4 Perancangan Proses Bisnis](#54-perancangan-proses-bisnis)
- [BAB 6 IMPLEMENTASI DAN PENGUJIAN SISTEM](#bab-6-implementasi-dan-pengujian-sistem)
  - [6.1 Implementasi Sistem](#61-implementasi-sistem)
  - [6.2 Pengujian Sistem](#62-pengujian-sistem)
  - [6.3 Analisis Hasil Pengujian](#63-analisis-hasil-pengujian)
- [BAB 7 PENUTUP](#bab-7-penutup)
  - [7.1 Kesimpulan](#71-kesimpulan)
  - [7.2 Saran](#72-saran)
- [DAFTAR REFERENSI](#daftar-referensi)

***

## DAFTAR TABEL

- **Tabel 2.1** Karakteristik Model Proses Perangkat Lunak
- **Tabel 2.2** Kriteria Kualitas Perangkat Lunak ISO/IEC 25010
- **Tabel 3.1** Metrik Pengujian Sistem Platform PaberLand

***

## DAFTAR GAMBAR

- **Gambar 2.1** Model Proses Prototyping dalam RPL
- **Gambar 2.2** Arsitektur Sistem Platform Komunitas Online

***

## DAFTAR LAMPIRAN

***

## BAB 1 PENDAHULUAN

### 1.1 Latar Belakang

Literasi bacaan anak memegang peranan fundamental dalam pembentukan karakter dan daya pikir generasi muda Indonesia. Forum Penulis Bacaan Anak (PaberLand), yang berdiri sejak 2010, telah aktif menjadi wadah bagi ribuan penulis untuk mempublikasikan dan mendiskusikan karya anak dan remaja (Ali Muakhir, 2023). Dengan lebih dari 27.000 anggota yang tersebar di berbagai platform digital seperti Facebook (22.000 member), WhatsApp (1.025 member), Telegram (1.553 member), dan Instagram (2.974 member), komunitas ini telah menjadi contoh nyata ekosistem literasi yang hidup dan berkembang (PaberLand, 2023).

Namun, pengelolaan konten dan interaksi di komunitas berbasis media sosial konvensional memiliki keterbatasan signifikan dari perspektif rekayasa perangkat lunak. Sistem seperti Facebook atau blog tradisional tidak dirancang dengan arsitektur yang mendukung kebutuhan spesifik penulis profesional, seperti editor canggih dengan fitur WYSIWYG, sistem manajemen kategori tulisan yang terstruktur, dan mekanisme moderasi terintegrasi. Studi tentang desain komunitas daring oleh Kraut & Resnick (2012) menunjukkan bahwa keberhasilan platform komunitas sangat dipengaruhi oleh kualitas arsitektur sistem yang mendukung partisipasi sehat, moderasi efektif, dan apresiasi karya yang terstruktur.

Dari perspektif rekayasa perangkat lunak, pengembangan platform komunitas yang efektif memerlukan penerapan metodologi pengembangan yang sistematis dan terstruktur. Analisis struktur diskusi di Reddit (Datta et al., 2022) dan mekanisme voting di Slashdot (Lampe & Resnick, 2004) menunjukkan pentingnya desain arsitektur yang mendukung sistem komentar berulir (threaded comment system) dan sistem apresiasi (like/vote) untuk menjaga kualitas percakapan. Implementasi fitur-fitur ini memerlukan perancangan database yang robust, arsitektur aplikasi yang skalabel, dan antarmuka pengguna yang intuitif.

Dalam konteks teknologi modern, framework seperti Next.js menyediakan arsitektur yang mendukung optimasi performa dan SEO yang krusial untuk platform dengan volume konten tinggi (Vercel, 2024). Integrasi dengan PostgreSQL dan Row Level Security (RLS) memungkinkan implementasi sistem keamanan granular yang essential untuk lingkungan multi-user (PostgreSQL Global Development Group, 2024). Sementara itu, editor teks kaya seperti TinyMCE menyediakan fitur autosave dan version control yang dapat meminimalkan risiko kehilangan data dan meningkatkan produktivitas penulis (Tiny Technologies, 2024).

Berdasarkan analisis kebutuhan komunitas PaberLand dan keterbatasan teknologi yang ada, diperlukan pengembangan sebuah platform web khusus komunitas penulis dengan arsitektur modern, fitur interaksi sosial, dan sistem pengelolaan konten profesional. Penelitian ini bertujuan untuk mengembangkan platform tersebut menggunakan metodologi rekayasa perangkat lunak yang sistematis dengan framework Next.js 15, PostgreSQL, dan TinyMCE sebagai teknologi inti. Pengembangan platform ini diharapkan dapat memberikan solusi yang memenuhi kebutuhan komunitas literasi anak Indonesia secara efektif dan efisien.

### 1.2 Rumusan Masalah

Berdasarkan latar belakang yang telah diuraikan, penelitian ini fokus pada pengembangan platform komunitas penulis literasi anak PaberLand. Rumusan masalah penelitian ini adalah:

1. Bagaimana hasil analisis kebutuhan sistem platform komunitas penulis literasi anak PaberLand?

2. Bagaimana hasil dan analisis perancangan sistem platform komunitas penulis literasi anak PaberLand?

3. Bagaimana hasil dan analisis implementasi sistem platform komunitas penulis literasi anak PaberLand?

4. Bagaimana hasil dan analisis pengujian sistem platform komunitas penulis literasi anak PaberLand?

### 1.3 Tujuan

Berdasarkan rumusan masalah yang telah ditetapkan, tujuan penelitian ini adalah:

1. Menganalisis kebutuhan sistem platform komunitas penulis literasi anak PaberLand berdasarkan kebutuhan fungsional dan non-fungsional.

2. Merancang sistem platform komunitas penulis literasi anak PaberLand dengan arsitektur yang sesuai menggunakan framework Next.js dan PostgreSQL.

3. Mengimplementasikan sistem platform komunitas penulis literasi anak PaberLand sesuai dengan rancangan yang telah dibuat.

4. Menguji sistem platform komunitas penulis literasi anak PaberLand secara fungsional dan non-fungsional untuk memastikan sistem berjalan sesuai kebutuhan.

### 1.4 Manfaat

Penelitian ini diharapkan dapat memberikan manfaat sebagai berikut:

#### Manfaat Akademis:

1. Memberikan kontribusi pada bidang rekayasa perangkat lunak, khususnya dalam pengembangan platform komunitas online dengan fokus pada literasi anak dan penulisan.

2. Menyediakan studi kasus implementasi metodologi pengembangan perangkat lunak dalam membangun aplikasi web modern menggunakan teknologi terkini.

3. Memberikan referensi pengembangan sistem berbasis web untuk penelitian selanjutnya dalam bidang platform komunitas online.

#### Manfaat Praktis:

1. Menghasilkan platform PaberLand yang dapat digunakan oleh komunitas penulis literasi anak Indonesia untuk berbagi dan mengembangkan karya.

2. Menyediakan panduan praktis bagi pengembang lain yang ingin membangun platform komunitas serupa dengan teknologi modern.

3. Mendukung pengembangan ekosistem literasi anak Indonesia melalui platform teknologi yang berkualitas dan mudah diakses.

#### Manfaat Sosial:

1. Mendukung peningkatan kualitas literasi anak Indonesia melalui platform teknologi yang efektif.

2. Memfasilitasi pertumbuhan komunitas penulis bacaan anak yang lebih terorganisir dan produktif.

3. Memberikan kontribusi pada digitalisasi komunitas literasi Indonesia.

### 1.5 Batasan Masalah

Untuk memfokuskan penelitian dan memastikan kedalaman analisis, penelitian ini dibatasi pada:

1. **Ruang Lingkup Sistem**: Pengembangan difokuskan pada platform PaberLand untuk komunitas penulis literasi anak dengan teknologi Next.js 15, PostgreSQL, dan TinyMCE.

2. **Aspek Pengembangan**: Penelitian fokus pada aspek rekayasa perangkat lunak meliputi analisis kebutuhan, perancangan sistem, implementasi fitur, dan pengujian fungsional, bukan pada aspek konten literasi atau pedagogi.

3. **Fitur Utama**: Pengembangan mencakup sistem manajemen pengguna, editor WYSIWYG, publikasi konten, sistem komentar, fitur interaksi sosial (like, follow), sistem pencarian, dan admin panel.

4. **Subjek Pengujian**: Pengujian sistem melibatkan anggota komunitas PaberLand sebagai pengguna target platform.

5. **Metodologi Pengembangan**: Menggunakan model prototyping dalam siklus pengembangan sistem.

6. **Lingkup Teknis**: Pengembangan tidak mencakup aspek deployment infrastruktur tingkat enterprise atau load balancing, namun fokus pada fungsionalitas aplikasi dan keamanan di level aplikasi.

### 1.6 Sistematika Pembahasan

Sistematika pembahasan dalam skripsi ini disusun sebagai berikut:

**BAB 1 PENDAHULUAN** berisi latar belakang penelitian yang menjelaskan pentingnya pengembangan platform komunitas penulis literasi anak dari perspektif rekayasa perangkat lunak, rumusan masalah yang fokus pada analisis kebutuhan, perancangan, implementasi, dan pengujian sistem, tujuan penelitian yang jelas dan terukur, manfaat penelitian bagi akademis dan praktis, batasan masalah untuk memfokuskan penelitian, serta sistematika pembahasan skripsi.

**BAB 2 LANDASAN KEPUSTAKAAN** berisi teori dan konsep rekayasa perangkat lunak yang menjadi dasar pengembangan, meliputi metodologi pengembangan perangkat lunak, model proses prototyping, analisis dan perancangan sistem, arsitektur aplikasi web modern, prinsip-prinsip desain antarmuka pengguna, pengujian perangkat lunak, serta teori tentang platform komunitas online dan sistem interaksi sosial.

**BAB 3 METODOLOGI PENELITIAN** berisi tipe penelitian pengembangan (R&D), model pengembangan prototyping yang digunakan, tahapan-tahapan pengembangan meliputi analisis kebutuhan, perancangan sistem, implementasi, dan pengujian, serta instrumen dan teknik pengumpulan data yang digunakan dalam penelitian.

**BAB 4 ANALISIS KEBUTUHAN SISTEM** berisi hasil identifikasi kebutuhan fungsional dan non-fungsional sistem, analisis kebutuhan pengguna, pemodelan kebutuhan menggunakan use case diagram, dan spesifikasi kebutuhan sistem platform PaberLand.

**BAB 5 PERANCANGAN SISTEM** berisi perancangan arsitektur sistem, perancangan basis data, perancangan antarmuka pengguna, dan perancangan proses bisnis sistem platform PaberLand.

**BAB 6 IMPLEMENTASI DAN PENGUJIAN SISTEM** berisi hasil implementasi sistem berdasarkan rancangan yang telah dibuat, teknologi yang digunakan, hasil pengujian fungsional dan non-fungsional sistem, serta analisis hasil pengujian.

**BAB 7 PENUTUP** berisi kesimpulan dari hasil pengembangan sistem yang telah dilakukan, serta saran untuk pengembangan dan penelitian lebih lanjut.

***

## BAB 2 LANDASAN KEPUSTAKAAN

### 2.1 Rekayasa Perangkat Lunak

Rekayasa Perangkat Lunak (Software Engineering) adalah disiplin ilmu yang menerapkan pendekatan sistematis, terdisiplin, dan terukur untuk pengembangan, operasi, dan pemeliharaan perangkat lunak (Sommerville, 2016). Menurut IEEE (1990), rekayasa perangkat lunak didefinisikan sebagai penerapan pendekatan yang sistematis, terdisiplin, dan dapat dikuantifikasi untuk pengembangan, operasi, dan pemeliharaan perangkat lunak.

Prinsip-prinsip fundamental dalam rekayasa perangkat lunak mencakup modularitas, abstraksi, enkapsulasi, dan hierarki (Pressman & Maxim, 2020). Modularitas memungkinkan sistem dipecah menjadi komponen-komponen yang dapat dikelola secara independen, sementara abstraksi membantu menyembunyikan kompleksitas implementasi dari pengguna. Enkapsulasi memastikan bahwa data dan fungsi yang terkait dikemas dalam unit yang kohesif, sedangkan hierarki memungkinkan organisasi sistem dalam struktur yang teratur.

Dalam konteks pengembangan platform komunitas online, penerapan prinsip-prinsip RPL menjadi krusial untuk memastikan sistem dapat menangani kompleksitas interaksi multi-user, volume data yang besar, dan kebutuhan skalabilitas (Bass et al., 2021). Kualitas perangkat lunak yang dihasilkan sangat bergantung pada sejauh mana prinsip-prinsip ini diterapkan secara konsisten sepanjang siklus pengembangan.

### 2.2 Model Proses Perangkat Lunak

Model proses perangkat lunak menyediakan kerangka kerja untuk mengorganisir aktivitas pengembangan perangkat lunak (Sommerville, 2016). Berbagai model proses telah dikembangkan untuk memenuhi kebutuhan proyek yang berbeda, masing-masing dengan karakteristik, kelebihan, dan keterbatasan yang spesifik.

#### 2.2.1 Model Prototyping

Model prototyping adalah pendekatan pengembangan yang menekankan pada pembuatan prototipe sistem untuk memvalidasi kebutuhan dan desain sebelum implementasi penuh (Pressman & Maxim, 2020). Model ini sangat efektif untuk proyek yang memiliki ketidakpastian tinggi dalam spesifikasi kebutuhan atau ketika stakeholder memerlukan visualisasi konkret dari sistem yang akan dikembangkan.

Tahapan dalam model prototyping meliputi: (1) analisis kebutuhan awal, (2) perancangan prototipe, (3) implementasi prototipe, (4) evaluasi prototipe dengan stakeholder, dan (5) iterasi berdasarkan feedback hingga mencapai spesifikasi yang diinginkan (Davis, 1992). Keunggulan model ini adalah kemampuannya untuk mengurangi risiko kesalahan spesifikasi dan meningkatkan kepuasan pengguna melalui keterlibatan aktif dalam proses pengembangan.

**Gambar 2.1 Model Proses Prototyping dalam RPL**

Dalam konteks pengembangan platform komunitas, model prototyping memungkinkan validasi konsep interaksi sosial dan antarmuka pengguna sebelum implementasi penuh, sehingga mengurangi risiko pengembangan fitur yang tidak sesuai dengan kebutuhan komunitas (Boehm et al., 1984). Model ini dipilih untuk pengembangan platform PaberLand karena karakteristik proyek yang memerlukan iterasi cepat berdasarkan feedback komunitas penulis.

#### 2.2.2 Karakteristik Model Proses

Tabel 2.1 menunjukkan perbandingan karakteristik berbagai model proses perangkat lunak yang relevan untuk pengembangan platform komunitas.

**Tabel 2.1 Karakteristik Model Proses Perangkat Lunak**

| Model | Fleksibilitas | Keterlibatan User | Manajemen Risiko | Cocok untuk |
| --- | --- | --- | --- | --- |
| Waterfall | Rendah | Minimal | Rendah | Proyek dengan kebutuhan stabil |
| Prototyping | Tinggi | Tinggi | Tinggi | Proyek dengan ketidakpastian kebutuhan |
| Spiral | Tinggi | Tinggi | Sangat Tinggi | Proyek berisiko tinggi |
| Agile | Sangat Tinggi | Sangat Tinggi | Tinggi | Proyek dengan perubahan cepat |

### 2.3 Analisis dan Perancangan Sistem

Analisis dan perancangan sistem merupakan fase kritis dalam rekayasa perangkat lunak yang menentukan kualitas produk akhir (Larman, 2004). Fase analisis bertujuan untuk memahami masalah domain dan mengidentifikasi kebutuhan sistem, sementara fase perancangan fokus pada solusi teknis yang memenuhi kebutuhan tersebut.

#### 2.3.1 Analisis Kebutuhan

Analisis kebutuhan melibatkan identifikasi, dokumentasi, dan validasi kebutuhan fungsional dan non-fungsional sistem (Wiegers & Beatty, 2013). Kebutuhan fungsional mendeskripsikan apa yang harus dilakukan sistem, sedangkan kebutuhan non-fungsional mendeskripsikan bagaimana sistem harus berperilaku dalam hal performa, keamanan, dan usability.

Untuk platform komunitas penulis, kebutuhan fungsional mencakup manajemen pengguna, sistem penulisan dan editing, publikasi konten, sistem komentar, dan fitur interaksi sosial. Kebutuhan non-fungsional mencakup performa responsif, keamanan data pengguna, skalabilitas untuk pertumbuhan komunitas, dan usability yang mendukung produktivitas penulis.

#### 2.3.2 Perancangan Arsitektur

Perancangan arsitektur sistem melibatkan pembuatan struktur tingkat tinggi yang mendefinisikan komponen-komponen sistem dan interaksinya (Shaw & Garlan, 1996). Arsitektur yang baik harus memenuhi prinsip-prinsip seperti separation of concerns, loose coupling, high cohesion, dan scalability.

Dalam konteks aplikasi web modern, arsitektur Model-View-Controller (MVC) atau variannya seperti Model-View-ViewModel (MVVM) sering digunakan untuk memisahkan logika bisnis, presentasi, dan data (Fowler, 2002). Framework seperti Next.js mengimplementasikan arsitektur berbasis komponen yang mendukung reusability dan maintainability kode.

### 2.4 Arsitektur Perangkat Lunak

Arsitektur perangkat lunak adalah struktur fundamental sistem yang terdiri dari komponen-komponen perangkat lunak, properti eksternal yang terlihat dari komponen tersebut, dan hubungan di antara mereka (Bass et al., 2021). Arsitektur yang baik menjadi fondasi untuk mencapai kualitas sistem yang diinginkan.

#### 2.4.1 Pola Arsitektur Aplikasi Web

Aplikasi web modern umumnya menggunakan arsitektur berlapis (layered architecture) yang memisahkan presentation layer, business logic layer, dan data access layer (Fowler, 2002). Pemisahan ini memungkinkan pengembangan yang modular, testing yang efektif, dan maintenance yang mudah.

**Gambar 2.2 Arsitektur Sistem Platform Komunitas Online**

Arsitektur client-server dengan RESTful API telah menjadi standar untuk aplikasi web yang memerlukan interaksi real-time dan skalabilitas tinggi (Fielding, 2000). Pendekatan ini memungkinkan pengembangan frontend dan backend secara independen, serta mendukung integrasi dengan berbagai platform dan device. Framework Next.js mengimplementasikan arsitektur full-stack yang mengintegrasikan server-side rendering, API routes, dan client-side interactivity dalam satu framework yang kohesif.

#### 2.4.2 Arsitektur Database

Perancangan database yang efektif memerlukan normalisasi yang tepat untuk mengurangi redundansi data sambil mempertahankan performa query (Codd, 1970). Untuk aplikasi dengan kebutuhan keamanan tinggi, implementasi Row Level Security (RLS) memungkinkan kontrol akses yang granular pada level baris data (PostgreSQL Global Development Group, 2024).

Dalam konteks platform komunitas, desain database harus mendukung relasi kompleks antara pengguna, konten, dan interaksi sosial, sambil mempertahankan integritas referensial dan performa yang optimal untuk operasi read-heavy yang karakteristik dari platform konten.

### 2.5 Pengujian Perangkat Lunak

Pengujian perangkat lunak adalah proses sistematis untuk mengevaluasi dan memverifikasi bahwa sistem memenuhi spesifikasi yang ditetapkan dan berfungsi sesuai harapan (Myers et al., 2011). Pengujian yang efektif memerlukan strategi yang mencakup berbagai level dan jenis pengujian.

#### 2.5.1 Level Pengujian

Pengujian dilakukan pada berbagai level: unit testing untuk menguji komponen individual, integration testing untuk menguji interaksi antar komponen, system testing untuk menguji sistem secara keseluruhan, dan acceptance testing untuk memvalidasi kesesuaian dengan kebutuhan pengguna (ISTQB, 2023).

#### 2.5.2 Jenis Pengujian

Pengujian fungsional memverifikasi bahwa sistem melakukan fungsi yang diharapkan, sementara pengujian non-fungsional mengevaluasi aspek seperti performa, keamanan, dan usability (IEEE, 2017). Untuk platform komunitas, pengujian usability menjadi sangat penting karena kesuksesan platform bergantung pada adopsi dan kepuasan pengguna.

### 2.6 Kualitas Perangkat Lunak

Kualitas perangkat lunak adalah tingkat sejauh mana sistem memenuhi kebutuhan yang dinyatakan dan tersirat ketika digunakan dalam kondisi tertentu (ISO/IEC 25010, 2011). Dalam pengembangan perangkat lunak, kualitas harus menjadi pertimbangan utama sejak fase analisis hingga pengujian.

#### 2.6.1 Model Kualitas ISO/IEC 25010

Standar ISO/IEC 25010 mendefinisikan delapan karakteristik kualitas utama: functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability, dan portability (ISO/IEC, 2011). Karakteristik-karakteristik ini menjadi acuan dalam memastikan sistem yang dikembangkan memenuhi standar kualitas yang baik.

**Tabel 2.2 Kriteria Kualitas Perangkat Lunak ISO/IEC 25010**

| Karakteristik | Sub-karakteristik | Deskripsi | Aspek Pengembangan |
| --- | --- | --- | --- |
| Functional Suitability | Completeness, Correctness, Appropriateness | Tingkat fungsi memenuhi kebutuhan | Kelengkapan implementasi fitur |
| Performance Efficiency | Time behavior, Resource utilization | Performa relatif terhadap sumber daya | Optimasi response time dan throughput |
| Usability | Appropriateness, Learnability, Operability | Kemudahan penggunaan | Desain antarmuka yang intuitif |
| Reliability | Maturity, Availability, Fault tolerance | Kemampuan mempertahankan performa | Penanganan error yang baik |
| Security | Confidentiality, Integrity, Authenticity | Perlindungan informasi dan data | Implementasi keamanan data |
| Maintainability | Modularity, Reusability, Modifiability | Kemudahan modifikasi | Struktur kode yang terorganisir |

#### 2.6.2 Penerapan Standar Kualitas dalam Pengembangan

Dalam pengembangan perangkat lunak, standar kualitas ISO/IEC 25010 dapat dijadikan pedoman dalam setiap fase pengembangan (Fenton & Bieman, 2014). Pada fase analisis kebutuhan, standar ini membantu mengidentifikasi kebutuhan non-fungsional. Pada fase perancangan, standar ini membimbing pemilihan arsitektur yang tepat. Pada fase implementasi, standar ini memastikan kode yang ditulis memenuhi kriteria kualitas. Pada fase pengujian, standar ini menjadi dasar pembuatan test case yang komprehensif.

### 2.7 Platform Komunitas Online

Platform komunitas online adalah sistem yang memfasilitasi interaksi, kolaborasi, dan berbagi konten di antara anggota komunitas dengan minat atau tujuan yang sama (Preece, 2000). Keberhasilan platform komunitas bergantung pada desain yang mendukung partisipasi aktif, membangun kepercayaan, dan memfasilitasi pertukaran nilai di antara anggota.

#### 2.7.1 Desain Interaksi Sosial

Desain sistem interaksi sosial yang efektif memerlukan pemahaman tentang dinamika komunitas dan motivasi partisipasi (Kraut & Resnick, 2012). Fitur-fitur seperti sistem voting, komentar berulir, dan profil pengguna harus dirancang untuk mendorong kontribusi berkualitas dan membangun reputasi yang sehat.

Penelitian oleh Lampe & Resnick (2004) menunjukkan bahwa mekanisme moderasi dan sistem reputasi yang well-designed dapat secara signifikan meningkatkan kualitas diskusi dan mengurangi perilaku yang tidak diinginkan dalam komunitas online.

#### 2.7.2 Arsitektur Sistem Konten

Platform yang berfokus pada konten memerlukan arsitektur yang mendukung manajemen konten yang efisien, sistem pencarian yang powerful, dan kategorisasi yang fleksibel (Halpin et al., 2007). Implementasi Content Management System (CMS) yang terintegrasi dengan fitur sosial memerlukan perancangan database yang dapat menangani relasi kompleks antara pengguna, konten, dan metadata.

Sistem editor yang terintegrasi, seperti WYSIWYG editor, harus dirancang dengan mempertimbangkan usability, performa, dan kompatibilitas dengan berbagai format konten (Nielsen, 2000). Fitur autosave dan version control menjadi essential untuk mencegah kehilangan data dan mendukung workflow penulisan yang produktif.

#### 2.7.3 Pengembangan Platform Komunitas

Pengembangan platform komunitas online memerlukan pendekatan yang mencakup aspek teknis, sosial, dan usability (Preece, 2000). Dalam fase pengembangan, perlu dipertimbangkan aspek-aspek seperti kemudahan partisipasi pengguna, mekanisme kontribusi konten, efektivitas fitur interaksi sosial, dan pengalaman pengguna secara keseluruhan. Platform yang baik harus dirancang dengan mempertimbangkan karakteristik komunitas target dan kebutuhan spesifik mereka.

***

## BAB 3 METODOLOGI PENELITIAN

### 3.1 Tipe Penelitian

Penelitian ini merupakan penelitian pengembangan atau Research and Development (R&D) dalam bidang rekayasa perangkat lunak. Penelitian R&D adalah metode penelitian yang digunakan untuk menghasilkan produk tertentu dan menguji efektivitas produk tersebut (Sugiyono, 2015). Dalam konteks rekayasa perangkat lunak, penelitian R&D digunakan untuk mengembangkan sistem perangkat lunak yang memenuhi kebutuhan pengguna dengan menerapkan metodologi pengembangan yang sistematis.

Penelitian ini menggunakan pendekatan kualitatif dan kuantitatif untuk mendapatkan pemahaman yang komprehensif dalam pengembangan sistem. Data kualitatif diperoleh dari analisis kebutuhan melalui wawancara dan observasi, sedangkan data kuantitatif diperoleh dari hasil pengujian sistem berdasarkan metrik kualitas perangkat lunak ISO/IEC 25010.

### 3.2 Model Pengembangan Sistem

Penelitian ini menggunakan model prototyping dalam pengembangan sistem platform PaberLand. Pemilihan model prototyping didasarkan pada karakteristik proyek yang memerlukan iterasi cepat berdasarkan feedback pengguna dan memiliki ketidakpastian dalam spesifikasi kebutuhan di awal pengembangan (Pressman & Maxim, 2020). Model ini memungkinkan pengembangan sistem dilakukan secara bertahap dengan melibatkan pengguna dalam setiap tahap pengembangan untuk memastikan sistem yang dihasilkan sesuai dengan kebutuhan komunitas.

Proses pengembangan dimulai dengan tahap analisis kebutuhan awal, di mana kebutuhan dasar sistem diidentifikasi melalui studi literatur, wawancara dengan stakeholder komunitas PaberLand, dan analisis platform serupa yang sudah ada. Pada tahap ini, peneliti melakukan pengumpulan data secara komprehensif untuk memahami kebutuhan komunitas penulis literasi anak secara mendalam. Setelah kebutuhan teridentifikasi, dilanjutkan dengan tahap perancangan prototipe yang mencakup pembuatan rancangan arsitektur sistem, rancangan basis data, dan rancangan antarmuka pengguna berdasarkan hasil analisis kebutuhan yang telah dilakukan.

Tahap selanjutnya adalah implementasi prototipe, di mana rancangan sistem direalisasikan menjadi aplikasi yang fungsional menggunakan teknologi yang telah dipilih. Implementasi dilakukan secara modular dan terstruktur untuk memudahkan maintenance dan pengembangan lebih lanjut. Setelah prototipe selesai diimplementasikan, dilakukan tahap evaluasi prototipe dengan melibatkan pengguna untuk mendapatkan feedback terkait fungsionalitas, usability, dan keseluruhan pengalaman pengguna. Feedback yang diperoleh kemudian digunakan sebagai dasar untuk melakukan iterasi dan penyempurnaan sistem hingga mencapai spesifikasi yang diinginkan dan memenuhi kebutuhan yang telah ditetapkan.

### 3.3 Objek Penelitian

Objek penelitian ini adalah platform komunitas penulis literasi anak PaberLand yang dikembangkan menggunakan teknologi web modern. Platform ini dirancang khusus untuk memenuhi kebutuhan komunitas Forum Penulis Bacaan Anak (PaberLand) yang memiliki lebih dari 27.000 anggota tersebar di berbagai platform media sosial. Pengembangan platform ini menggunakan framework Next.js versi 15.4.3 yang diintegrasikan dengan React 19.1.0 dan TypeScript 5.x untuk bagian frontend, sementara untuk backend menggunakan Next.js API Routes yang terintegrasi dengan Supabase 2.52.1. Pemilihan teknologi ini didasarkan pada pertimbangan performa, skalabilitas, dan kemudahan maintenance sistem.

Untuk basis data, sistem ini menggunakan PostgreSQL yang dilengkapi dengan Row Level Security (RLS) untuk memastikan keamanan data pada level baris. Sistem authentication dibangun menggunakan Supabase Auth yang mendukung multiple authentication methods termasuk email/password dan Google OAuth integration. Salah satu fitur unggulan dari platform ini adalah editor WYSIWYG yang menggunakan TinyMCE versi 7.9.1, yang memungkinkan penulis untuk membuat konten dengan interface yang intuitif dan fitur-fitur profesional seperti auto-save dan template system. Untuk styling dan responsiveness, platform ini menggunakan Tailwind CSS versi 4.x yang memastikan tampilan yang konsisten dan optimal di berbagai ukuran layar dan device.

Platform ini dikembangkan dengan sejumlah fitur utama yang dirancang untuk mendukung aktivitas komunitas penulis. Sistem manajemen pengguna dilengkapi dengan authentication dan authorization yang robust untuk mengamankan akses dan data pengguna. Editor WYSIWYG dengan template system dan auto-save memfasilitasi proses penulisan yang produktif dan aman dari kehilangan data. Sistem publikasi dan manajemen konten memungkinkan penulis untuk mengelola karya mereka dengan mudah, sementara fitur interaksi sosial seperti like, comment, dan follow memfasilitasi engagement antar anggota komunitas. Sistem pencarian dan kategorisasi konten memudahkan pengguna untuk menemukan karya yang relevan dengan minat mereka. Untuk keperluan moderasi dan pengelolaan platform, disediakan admin panel yang komprehensif. Seluruh fitur dirancang dengan prinsip responsive design untuk memastikan pengalaman pengguna yang optimal di berbagai device mulai dari desktop hingga mobile.

### 3.4 Tahapan Penelitian

Penelitian ini dilakukan melalui tahapan-tahapan sistematis yang mengikuti model prototyping dalam pengembangan perangkat lunak. Setiap tahapan dirancang untuk menjawab rumusan masalah penelitian secara terstruktur dan komprehensif.

#### 3.4.1 Tahap Analisis Kebutuhan Sistem

Tahap analisis kebutuhan sistem merupakan fase awal yang krusial dalam pengembangan platform PaberLand. Pada tahap ini dilakukan identifikasi dan dokumentasi kebutuhan sistem secara menyeluruh untuk memastikan platform yang dikembangkan sesuai dengan ekspektasi dan kebutuhan komunitas penulis literasi anak. Proses dimulai dengan studi literatur yang mengkaji penelitian terdahulu tentang platform komunitas online, sistem manajemen konten, dan fitur-fitur yang dibutuhkan untuk komunitas penulis. Studi literatur ini memberikan fondasi teoritik dan best practices yang telah terbukti efektif dalam pengembangan platform serupa.

Selanjutnya dilakukan wawancara mendalam dengan stakeholder kunci komunitas PaberLand, termasuk pengurus dan anggota aktif, untuk memahami kebutuhan spesifik, permasalahan yang dihadapi, dan ekspektasi terhadap platform yang akan dikembangkan. Wawancara ini menggunakan panduan wawancara terstruktur yang telah dirancang untuk mengeksplorasi berbagai aspek kebutuhan komunitas. Untuk melengkapi pemahaman tentang kebutuhan sistem, dilakukan juga analisis terhadap platform komunitas penulis yang sudah ada seperti Medium, Wattpad, dan platform sejenis untuk mengidentifikasi fitur-fitur yang relevan dan best practices yang dapat diadopsi.

Hasil dari studi literatur, wawancara, dan analisis platform kemudian diolah dan didokumentasikan dalam bentuk spesifikasi kebutuhan perangkat lunak (Software Requirements Specification) yang mencakup kebutuhan fungsional dan non-fungsional sistem. Kebutuhan fungsional mendeskripsikan fungsi-fungsi yang harus dimiliki sistem, sementara kebutuhan non-fungsional mendeskripsikan karakteristik sistem seperti performa, keamanan, dan usability. Untuk memudahkan komunikasi kebutuhan dengan stakeholder dan tim pengembang, kebutuhan sistem juga dimodelkan secara visual menggunakan use case diagram dan didokumentasikan detail interaksinya dalam use case specification.

#### 3.4.2 Tahap Perancangan Sistem

Tahap perancangan sistem dilakukan setelah kebutuhan sistem teridentifikasi dengan jelas pada tahap sebelumnya. Pada tahap ini, spesifikasi kebutuhan diterjemahkan menjadi rancangan teknis yang siap untuk diimplementasikan. Perancangan arsitektur sistem menjadi fokus utama, di mana struktur keseluruhan aplikasi dirancang menggunakan pola arsitektur yang sesuai dengan karakteristik framework Next.js. Arsitektur dirancang dengan mempertimbangkan prinsip-prinsip modularitas, skalabilitas, dan maintainability, mencakup arsitektur client-server, API routes, dan komponen-komponen utama sistem yang saling terintegrasi.

Perancangan basis data merupakan aspek krusial yang menentukan bagaimana data akan disimpan, diorganisir, dan diakses dalam sistem. Skema basis data PostgreSQL dirancang untuk mendukung semua fitur sistem dengan mempertimbangkan efisiensi query, integritas data, dan skalabilitas. Perancangan mencakup definisi tabel-tabel yang diperlukan, relasi antar tabel, index untuk optimasi performa, serta Row Level Security (RLS) policies untuk memastikan keamanan data pada level granular. Normalisasi database dilakukan untuk mengurangi redundansi data sambil tetap mempertahankan performa yang optimal.

Perancangan antarmuka pengguna dilakukan dengan fokus pada user experience (UX) dan user interface (UI) yang intuitif dan menarik. Proses dimulai dengan pembuatan wireframe sebagai sketsa awal layout dan struktur halaman, dilanjutkan dengan mockup yang lebih detail yang menampilkan visual design termasuk warna, tipografi, dan elemen-elemen grafis. Perancangan antarmuka mengikuti prinsip-prinsip UX design yang baik seperti konsistensi, feedback, dan kemudahan penggunaan, dengan mempertimbangkan accessibility dan responsive design untuk berbagai ukuran layar. Selain itu, perancangan juga mencakup alur proses bisnis utama sistem seperti alur registrasi pengguna, alur penulisan dan publikasi artikel, alur interaksi sosial antar pengguna, dan alur moderasi konten oleh admin, yang divisualisasikan menggunakan flowchart atau activity diagram untuk memudahkan pemahaman dan implementasi.

#### 3.4.3 Tahap Implementasi Sistem

Tahap implementasi sistem merupakan proses merealisasikan rancangan yang telah dibuat menjadi aplikasi yang fungsional dan dapat dioperasikan. Tahap ini dimulai dengan setup environment pengembangan yang mencakup instalasi dan konfigurasi tools yang diperlukan seperti code editor, version control system, dan runtime environment untuk Node.js. Setelah environment siap, dilakukan implementasi database dengan membuat struktur basis data PostgreSQL sesuai dengan rancangan yang telah dibuat, menjalankan migration scripts untuk membuat tabel-tabel dan relasinya, serta mengimplementasikan database functions dan triggers yang diperlukan untuk automasi proses tertentu seperti update counter dan audit logging.

Implementasi backend dilakukan dengan mengembangkan API routes menggunakan framework Next.js yang berfungsi sebagai jembatan komunikasi antara frontend dan database. Setiap API endpoint diimplementasikan dengan business logic yang sesuai dengan kebutuhan sistem dan dilengkapi dengan validasi input, error handling, dan response formatting yang konsisten. Backend diintegrasikan dengan Supabase untuk memanfaatkan layanan authentication dan database operations yang disediakan. Untuk frontend, dikembangkan komponen-komponen React yang modular dan reusable, dengan implementasi routing untuk navigasi antar halaman, state management untuk mengelola state aplikasi, dan integrasi dengan backend API untuk operasi data.

Implementasi fitur-fitur utama sistem dilakukan secara bertahap mengikuti prioritas yang telah ditetapkan. Dimulai dari fitur fundamental seperti sistem authentication yang memungkinkan pengguna untuk register, login, dan mengelola profil mereka. Dilanjutkan dengan implementasi editor WYSIWYG menggunakan TinyMCE yang dilengkapi dengan template system dan auto-save functionality. Sistem manajemen konten diimplementasikan untuk memungkinkan penulis membuat, mengedit, dan mempublikasikan artikel mereka. Fitur interaksi sosial seperti komentar, like, dan follow diimplementasikan untuk memfasilitasi engagement antar anggota komunitas. Sistem pencarian dikembangkan untuk memudahkan pengguna menemukan konten yang relevan, dan admin panel diimplementasikan untuk keperluan moderasi dan pengelolaan platform. Aspek security menjadi perhatian khusus dengan implementasi Row Level Security (RLS) policies, input validation pada setiap form, authentication middleware untuk mengamankan API routes, dan security features lainnya sesuai dengan best practices keamanan aplikasi web.

#### 3.4.4 Tahap Pengujian Sistem

Tahap pengujian sistem dilakukan untuk memastikan bahwa sistem yang telah diimplementasikan berfungsi sesuai dengan kebutuhan dan spesifikasi yang telah ditetapkan. Pengujian fungsional merupakan jenis pengujian utama yang dilakukan untuk memverifikasi bahwa setiap fitur sistem berfungsi sebagaimana mestinya. Pengujian ini menggunakan test case yang telah dirancang berdasarkan use case yang telah didefinisikan pada tahap analisis kebutuhan. Setiap test case mencakup kondisi awal, langkah-langkah pengujian, expected result, dan actual result yang didokumentasikan secara sistematis.

Selain pengujian fungsional, dilakukan juga pengujian non-fungsional untuk mengevaluasi aspek-aspek sistem yang tidak terkait langsung dengan fungsi spesifik namun penting untuk kualitas sistem secara keseluruhan. Pengujian performance dilakukan untuk mengukur response time, throughput, dan resource utilization sistem di berbagai kondisi beban. Pengujian usability dilakukan untuk mengevaluasi kemudahan penggunaan sistem melalui observasi pengguna dalam menjalankan task tertentu dan pengisian kuesioner System Usability Scale (SUS). Pengujian security dilakukan untuk mengidentifikasi potential vulnerabilities dan memastikan implementasi security measures sudah efektif. Pengujian reliability dilakukan untuk memastikan sistem dapat beroperasi secara stabil dalam periode waktu tertentu.

Pengujian integrasi dilakukan untuk menguji interaksi antar komponen sistem dan memastikan bahwa komponen-komponen tersebut dapat bekerja sama dengan baik. Pengujian ini penting untuk mengidentifikasi masalah yang mungkin muncul dari interface antar komponen atau dari asumsi yang berbeda dalam implementasi komponen yang berbeda. User Acceptance Testing (UAT) dilakukan dengan melibatkan pengguna target, yaitu anggota komunitas PaberLand, untuk menguji sistem dalam skenario penggunaan nyata. UAT memberikan feedback yang valuable tentang apakah sistem memenuhi kebutuhan pengguna dan apakah ada aspek yang perlu diperbaiki dari perspektif pengguna. Hasil dari semua jenis pengujian dianalisis secara sistematis untuk mengidentifikasi bugs, issues, dan area yang perlu improvement, kemudian dilakukan perbaikan sesuai dengan prioritas dan tingkat severity masalah yang ditemukan.

### 3.5 Instrumen Penelitian

Penelitian pengembangan platform PaberLand menggunakan berbagai instrumen penelitian yang disesuaikan dengan kebutuhan setiap tahapan pengembangan. Untuk tahap analisis kebutuhan, digunakan panduan wawancara yang berisi daftar pertanyaan terstruktur yang dirancang untuk menggali informasi mendalam dari stakeholder komunitas PaberLand tentang kebutuhan, ekspektasi, dan permasalahan yang dihadapi dalam aktivitas menulis dan berinteraksi di platform digital. Lembar observasi digunakan untuk mencatat hasil observasi sistematik terhadap aktivitas komunitas di media sosial dan platform yang sudah ada, sehingga dapat diidentifikasi pola-pola perilaku dan kebutuhan yang muncul. Checklist fitur digunakan sebagai panduan untuk mengevaluasi kelayakan implementasi berbagai fitur yang potensial untuk disertakan dalam platform berdasarkan kebutuhan komunitas dan keterbatasan teknis yang ada.

Pada tahap perancangan sistem, digunakan Software Design Document Template sebagai panduan untuk mendokumentasikan rancangan arsitektur sistem, basis data, dan antarmuka pengguna secara terstruktur dan komprehensif. Template ini memastikan semua aspek perancangan terdokumentasi dengan baik dan dapat dikomunikasikan dengan jelas. Use Case Template digunakan untuk mendokumentasikan use case diagram dan use case specification yang menggambarkan interaksi antara pengguna dengan sistem. Database design tools seperti tools untuk membuat Entity Relationship Diagram (ERD) digunakan untuk memvisualisasikan struktur dan relasi antar entitas dalam basis data.

Untuk tahap implementasi, digunakan berbagai development tools dan environment yang mendukung proses pengembangan yang efisien dan berkualitas. Visual Studio Code dipilih sebagai code editor utama karena fitur-fiturnya yang lengkap dan ekstensif untuk pengembangan web modern. Git digunakan sebagai version control system untuk tracking perubahan kode dan kolaborasi dalam pengembangan. Node.js dan npm digunakan untuk package management dan menjalankan aplikasi. Supabase CLI digunakan untuk mengelola database dan migration. Development environment mencakup Next.js 15.4.3 sebagai framework utama, TypeScript 5.x untuk type safety, TinyMCE 7.9.1 untuk editor, dan Tailwind CSS 4.x untuk styling. Code quality tools seperti ESLint, TypeScript compiler, dan Prettier digunakan untuk memastikan kode yang dihasilkan memenuhi standar kualitas dan konsistensi yang tinggi.

Pada tahap pengujian, digunakan test case template untuk mendokumentasikan pengujian fungsional secara sistematis berdasarkan use case yang telah didefinisikan. Untuk pengujian performance, digunakan Lighthouse untuk pengujian performa web secara komprehensif, Web Vitals untuk mengukur Core Web Vitals metrics, dan Browser DevTools untuk monitoring performa secara detail. User testing scenario dirancang untuk mencakup workflow utama pengguna seperti registrasi, penulisan artikel, interaksi sosial, dan pencarian konten. System Usability Scale (SUS) Questionnaire digunakan sebagai instrumen standar untuk mengukur usability sistem secara kuantitatif, yang terdiri dari 10 pertanyaan dengan skala Likert yang telah tervalidasi secara internasional.

**Tabel 3.1 Metrik Pengujian Sistem Platform PaberLand**

| Kategori | Metrik | Target | Metode Pengukuran |
| --- | --- | --- | --- |
| Performance | Page Load Time | < 3 detik | Lighthouse testing |
| Performance | API Response Time | < 500ms | Performance monitoring |
| Usability | Task Completion Rate | > 90% | User acceptance testing |
| Usability | SUS Score | > 68 (Above Average) | SUS questionnaire |
| Functionality | Feature Coverage | 100% | Requirements traceability |
| Security | Critical Vulnerabilities | 0 | Security review |
| Maintainability | Code Complexity | < 10 (Cyclomatic) | ESLint analysis |

### 3.6 Teknik Pengumpulan Data

Pengumpulan data dalam penelitian ini dilakukan secara bertahap sesuai dengan tahapan pengembangan sistem. Pada tahap analisis kebutuhan, data dikumpulkan melalui wawancara terstruktur dengan stakeholder komunitas PaberLand yang dipilih secara purposive sampling, terdiri dari 5-10 orang yang merepresentasikan pengurus dan anggota aktif komunitas. Wawancara dilakukan secara mendalam untuk menggali informasi tentang kebutuhan, ekspektasi, dan permasalahan yang dihadapi dalam menggunakan platform digital untuk aktivitas menulis dan berinteraksi. Selain wawancara, dilakukan juga observasi terhadap aktivitas komunitas di platform media sosial yang sudah digunakan seperti Facebook, WhatsApp, Telegram, dan Instagram untuk memahami pola interaksi, jenis konten yang dibagikan, dan dinamika komunikasi dalam komunitas. Studi dokumentasi dilakukan dengan mengkaji dokumen-dokumen terkait komunitas PaberLand seperti profil komunitas, aturan komunitas, dan data keanggotaan, serta dokumentasi platform komunitas penulis serupa yang sudah ada untuk mengidentifikasi best practices dan lessons learned.

Untuk tahap perancangan dan implementasi, data dikumpulkan melalui dokumentasi teknis yang mencatat setiap keputusan desain dan implementasi beserta rasional di baliknya. Dokumentasi ini penting untuk menjaga konsistensi pengembangan dan memudahkan maintenance di masa depan. Kode sumber disimpan dalam repository Git dengan commit message yang deskriptif dan terstruktur untuk melacak history pengembangan dan memudahkan rollback jika diperlukan. Development logs dicatat untuk mendokumentasikan kendala yang dihadapi, solusi yang diterapkan, dan lessons learned selama proses pengembangan, yang dapat menjadi referensi valuable untuk pengembangan selanjutnya atau untuk pengembang lain yang melakukan maintenance sistem.

Pada tahap pengujian, data dikumpulkan melalui test results yang mendokumentasikan hasil pengujian fungsional dan non-fungsional dalam bentuk test report yang komprehensif. Performance metrics dikumpulkan menggunakan tools yang telah ditetapkan seperti Lighthouse dan Web Vitals untuk mendapatkan data objektif tentang performa sistem. User feedback dikumpulkan melalui kuesioner System Usability Scale (SUS) yang diisi oleh peserta User Acceptance Testing, dilengkapi dengan wawancara semi-terstruktur untuk menggali insight kualitatif tentang pengalaman pengguna, kelebihan dan kekurangan sistem, serta saran perbaikan. Data kuantitatif dari pengujian performance dan kuesioner SUS dikombinasikan dengan data kualitatif dari wawancara dan observasi untuk mendapatkan pemahaman yang komprehensif tentang kualitas sistem yang dikembangkan.

### 3.7 Teknik Analisis Data

Analisis data dalam penelitian ini dilakukan sesuai dengan jenis data dan tujuan analisis pada setiap tahapan penelitian. Untuk analisis kebutuhan sistem, data kualitatif yang diperoleh dari wawancara dan observasi dianalisis menggunakan teknik content analysis untuk mengidentifikasi tema-tema yang muncul terkait kebutuhan, ekspektasi, dan permasalahan yang dihadapi komunitas. Proses analisis dimulai dengan transcription wawancara, coding untuk mengidentifikasi unit-unit makna, pengelompokan kode-kode yang serupa menjadi kategori, dan identifikasi pola-pola kebutuhan yang muncul. Analisis ini menghasilkan pemahaman mendalam tentang kebutuhan fungsional dan non-fungsional sistem yang kemudian diterjemahkan menjadi spesifikasi kebutuhan perangkat lunak. Prioritas fitur ditentukan berdasarkan frekuensi kemunculan kebutuhan, tingkat kepentingan yang dinyatakan stakeholder, dan analisis feasibility teknis.

Untuk analisis perancangan sistem, rancangan yang telah dibuat dievaluasi menggunakan teknik design review yang melibatkan expert judgment. Aspek-aspek yang dievaluasi mencakup modularitas arsitektur, skalabilitas sistem untuk mengakomodasi pertumbuhan pengguna dan konten di masa depan, maintainability kode untuk memudahkan pengembangan dan perbaikan selanjutnya, serta adherence terhadap best practices dan design patterns yang established dalam rekayasa perangkat lunak. Evaluasi dilakukan dengan cara walkthrough rancangan dan diskusi dengan ahli dalam bidang rekayasa perangkat lunak dan pengembangan web. Feedback dari evaluasi digunakan untuk melakukan refinement dan penyempurnaan rancangan sebelum masuk ke tahap implementasi, memastikan rancangan yang dihasilkan solid dan siap untuk diimplementasikan.

Analisis hasil pengujian dilakukan dengan menggunakan pendekatan kuantitatif dan kualitatif. Data kuantitatif dari pengujian performance seperti page load time, API response time, dan resource utilization dianalisis menggunakan statistik deskriptif untuk mengetahui nilai rata-rata, median, dan standar deviasi, kemudian dibandingkan dengan target yang telah ditetapkan untuk menentukan apakah sistem memenuhi requirement non-fungsional yang telah didefinisikan. Data dari kuesioner System Usability Scale (SUS) dianalisis menggunakan formula standar SUS untuk menghasilkan skor usability sistem. Skor SUS diinterpretasikan berdasarkan skala yang dikembangkan oleh Bangor et al. (2008), di mana skor di atas 68 dianggap above average dan skor di atas 80 dianggap excellent. Hasil pengujian fungsional dianalisis berdasarkan tingkat keberhasilan test case dengan menghitung pass/fail ratio dan mengidentifikasi pola kegagalan yang mungkin mengindikasikan masalah sistemik. Data kualitatif dari wawancara dengan peserta UAT dianalisis secara thematic untuk mengidentifikasi tema-tema terkait kelebihan sistem, area yang perlu improvement, dan saran pengembangan lebih lanjut. Triangulasi dilakukan dengan menggabungkan hasil analisis kuantitatif dan kualitatif untuk mendapatkan pemahaman yang komprehensif tentang kualitas sistem yang dikembangkan.

***

## BAB 4 ANALISIS KEBUTUHAN SISTEM

### 4.1 Identifikasi Stakeholder

### 4.2 Analisis Kebutuhan Fungsional

### 4.3 Analisis Kebutuhan Non-Fungsional

### 4.4 Pemodelan Kebutuhan

#### 4.4.1 Use Case Diagram

#### 4.4.2 Use Case Specification

### 4.5 Spesifikasi Kebutuhan Sistem

***

## BAB 5 PERANCANGAN SISTEM

### 5.1 Perancangan Arsitektur Sistem

#### 5.1.1 Arsitektur Aplikasi

#### 5.1.2 Arsitektur Client-Server

#### 5.1.3 Komponen Sistem

### 5.2 Perancangan Basis Data

#### 5.2.1 Entity Relationship Diagram (ERD)

#### 5.2.2 Skema Basis Data

#### 5.2.3 Relasi Antar Tabel

### 5.3 Perancangan Antarmuka Pengguna

#### 5.3.1 Wireframe

#### 5.3.2 Mockup Antarmuka

#### 5.3.3 Navigasi Sistem

### 5.4 Perancangan Proses Bisnis

#### 5.4.1 Alur Registrasi Pengguna

#### 5.4.2 Alur Penulisan Artikel

#### 5.4.3 Alur Interaksi Sosial

***

## BAB 6 IMPLEMENTASI DAN PENGUJIAN SISTEM

### 6.1 Implementasi Sistem

#### 6.1.1 Environment Setup

#### 6.1.2 Implementasi Database

#### 6.1.3 Implementasi Backend

#### 6.1.4 Implementasi Frontend

#### 6.1.5 Implementasi Fitur Utama

### 6.2 Pengujian Sistem

#### 6.2.1 Pengujian Fungsional

#### 6.2.2 Pengujian Non-Fungsional

#### 6.2.3 Pengujian Integrasi

#### 6.2.4 User Acceptance Testing

### 6.3 Analisis Hasil Pengujian

#### 6.3.1 Analisis Pengujian Fungsional

#### 6.3.2 Analisis Pengujian Performance

#### 6.3.3 Analisis Pengujian Usability

***

## BAB 7 PENUTUP

### 7.1 Kesimpulan

### 7.2 Saran

***

## DAFTAR REFERENSI

Ali Muakhir. (2023). Forum Penulis Bacaan Anak PABERLAND, 13 Tahun Merawat Literasi Bacaan Anak. Kumparan. Tersedia di: <https://kumparan.com/ali-muakhir/forum-penulis-bacaan-anak-paberland-13-tahun-merawat-literasi-bacaan-anak> [Diakses 15 Agustus 2025]

Bangor, A., Kortum, P. T., & Miller, J. T. (2008). An empirical evaluation of the system usability scale. International Journal of Human-Computer Studies, 66(2), 144-152.

Bass, L., Clements, P., & Kazman, R. (2021). Software Architecture in Practice (4th ed.). Boston: Addison-Wesley Professional.

Boehm, B. W., Gray, T. E., & Seewaldt, T. (1984). Prototyping versus specifying: a multiproject experiment. IEEE Transactions on Software Engineering, SE-10(3), 290-303.

Braun, V., & Clarke, V. (2006). Using thematic analysis in psychology. Qualitative Research in Psychology, 3(2), 77-101.

Codd, E. F. (1970). A relational model of data for large shared data banks. Communications of the ACM, 13(6), 377-387.

Datta, S., Joshi, A., & Ramaswamy, S. (2022). Analyzing the Structure of Reddit Comment Trees. arXiv preprint arXiv:2202.01980.

Davis, A. M. (1992). Operational prototyping: A new development approach. IEEE Software, 9(5), 70-78.

Denzin, N. K. (1978). The Research Act: A Theoretical Introduction to Sociological Methods (2nd ed.). New York: McGraw-Hill.

Fenton, N. E., & Bieman, J. (2014). Software Metrics: A Rigorous and Practical Approach (3rd ed.). Boca Raton: CRC Press.

Fielding, R. T. (2000). Architectural Styles and the Design of Network-based Software Architectures. Doctoral dissertation, University of California, Irvine.

Fowler, M. (2002). Patterns of Enterprise Application Architecture. Boston: Addison-Wesley Professional.

Halpin, H., Robu, V., & Shepherd, H. (2007). The complex dynamics of collaborative tagging. In Proceedings of the 16th international conference on World Wide Web (pp. 211-220). ACM.

IEEE. (1990). IEEE Standard Glossary of Software Engineering Terminology. IEEE Std 610.12-1990. New York: Institute of Electrical and Electronics Engineers.

IEEE. (2017). IEEE Standard for Software and System Test Documentation. IEEE Std 829-2008 (Revision of IEEE Std 829-1998). New York: Institute of Electrical and Electronics Engineers.

ISO/IEC. (2011). ISO/IEC 25010:2011 Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models. Geneva: International Organization for Standardization.

ISTQB. (2023). Standard Glossary of Terms Used in Software Testing Version 4.0. International Software Testing Qualifications Board. Tersedia di: <https://glossary.istqb.org/> [Diakses 20 Agustus 2025]

Kraut, R. E., & Resnick, P. (2012). Building Successful Online Communities: Evidence-Based Social Design. Cambridge: MIT Press.

Lampe, C., & Resnick, P. (2004). Slash(dot) and Burn: Distributed Moderation in a Large Online Conversation Space. In Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (pp. 543-550). ACM.

Larman, C. (2004). Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design and Iterative Development (3rd ed.). Upper Saddle River: Prentice Hall.

Myers, G. J., Sandler, C., & Badgett, T. (2011). The Art of Software Testing (3rd ed.). Hoboken: John Wiley & Sons.

Nielsen, J. (1994). Usability Engineering. San Francisco: Morgan Kaufmann Publishers.

Nielsen, J. (2000). Designing Web Usability: The Practice of Simplicity. Indianapolis: New Riders Publishing.

PostgreSQL Global Development Group. (2025). PostgreSQL 16 Documentation: Row Security Policies. Tersedia di: <https://www.postgresql.org/docs/16/ddl-rowsecurity.html> [Diakses 25 Agustus 2025]

Preece, J. (2000). Online Communities: Designing Usability and Supporting Sociability. New York: John Wiley & Sons.

Pressman, R. S., & Maxim, B. R. (2020). Software Engineering: A Practitioner's Approach (9th ed.). New York: McGraw-Hill Education.

React Team. (2025). React 19 Documentation: Concurrent Features and Server Components. Tersedia di: <https://react.dev/blog/2024/04/25/react-19> [Diakses 10 September 2025]

Sugiyono. (2015). Metode Penelitian dan Pengembangan (Research and Development/R&D). Bandung: Alfabeta.

Shaw, M., & Garlan, D. (1996). Software Architecture: Perspectives on an Emerging Discipline. Upper Saddle River: Prentice Hall.

Sommerville, I. (2016). Software Engineering (10th ed.). Boston: Pearson.

Supabase Inc. (2025). Supabase Documentation: Database, Auth, and Real-time. Tersedia di: <https://supabase.com/docs> [Diakses 5 September 2025]

Tiny Technologies. (2025). TinyMCE Documentation: Rich Text Editor. Tersedia di: <https://www.tiny.cloud/docs/> [Diakses 12 September 2025]

Vercel. (2025). Next.js 15 Documentation: App Router and Performance Optimization. Tersedia di: <https://nextjs.org/docs> [Diakses 8 September 2025]

Wiegers, K., & Beatty, J. (2013). Software Requirements (3rd ed.). Redmond: Microsoft Press.

***

**END OF DOCUMENT**