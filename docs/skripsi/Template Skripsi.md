# **PENGEMBANGAN APLIKASI PENGARSIPAN *PAPER HALAQAH* BERBASIS WEB MENGGUNAKAN MODEL *PROTOTYPING* (STUDI KASUS: LEMBAGA TINGGI PESANTREN LUHUR MALANG)**

## **SKRIPSI**

Untuk memenuhi sebagian persyaratan memperoleh gelar Sarjana Pendidikan

Disusun oleh: Ghaytsa Zahara Faradisa NIM: 175150601111041

PROGRAM STUDI PENDIDIKAN TEKNOLOGI INFORMASI DEPARTEMEN SISTEM INFORMASI  
FAKULTAS ILMU KOMPUTER UNIVERSITAS BRAWIJAYA MALANG  
2025

PENGEMBANGAN APLIKASI PENGARSIPAN PAPER HALAQAH BERBASIS WEB MENGGUNAKAN MODEL PROTOTYPING (STUDI KASUS: LEMBAGA TINGGI PESANTREN LUHUR MALANG)

SKRIPSI

Diajukan untuk memenuhi sebagian persyaratan memperoleh gelar Sarjana Pendidikan

Disusun Oleh : Ghaytsa Zahara Faradisa NIM: 175150601111041

Skripsi ini telah diuji dan dinyatakan lulus pada 15 Januari 2025  
Telah diperiksa dan disetujui oleh:

| Dosen Pembimbing I Ir. Tri Afirianto, S.T., M.T. NIK: 2013098512131001 | Dosen Pembimbing 2 Khalid Rahman, S.Pd.I., M.Pd.I NIK: 2013098505061001 |
| ----- | ----- |

Mengetahui  
Ketua Departemen Sistem Informasi

Ir. Issa Arwani, S.Kom., M.Sc. NIP: 198309222012121003

Saya menyatakan dengan sebenar-benarnya bahwa sepanjang pengetahuan saya, di dalam naskah skripsi ini tidak terdapat karya ilmiah yang pernah diajukan oleh orang lain untuk memperoleh gelar akademik di suatu perguruan tinggi, dan tidak terdapat karya atau pendapat yang pernah ditulis atau diterbitkan oleh orang lain, kecuali yang secara tertulis disitasi dalam naskah ini dan disebutkan dalam daftar referensi.

Apabila ternyata didalam naskah skripsi ini dapat dibuktikan terdapat unsur- unsur plagiasi, saya bersedia skripsi ini digugurkan dan gelar akademik yang telah saya peroleh (sarjana) dibatalkan, serta diproses sesuai dengan peraturan perundang-undangan yang berlaku (UU No. 20 Tahun 2003, Pasal 25 ayat 2 dan  
Pasal 70).

Malang, 22 Januari 2025

Ghaytsa Zahara Faradisa NIM: 175150601111041

Puji syukur kehadirat Allah SWT yang telah melimpahkan rahmatnya, sehingga penulis dapat menyelesaikan Penelitian yang berjudul “Pengembangan Aplikasi Pengarsipan *Paper Halaqah* Berbasis Web Menggunakan Model *Prototyping* (Studi Kasus: Lembaga Tinggi Pesantren Luhur Malang)” Skripsi ini diajukan sebagai tugas akhir dalam rangka menyelesaikan studi program Strata Satu (S-1) Pendidikan Teknologi Informasi di Fakultas Ilmu Komputer Universitas Brawijaya.

Dalam penulisan skripsi ini tidak lepas bantuan dari berbagai pihak, baik moral maupun spiritual yang diberikan kepada penulis. Khususnya kepada dosen pembimbing yang telah membimbing dengan sepenuh hati, sehingga penulis dapat menyusun dan menyelesaikan penelitian skripsi ini dengan baik. Untuk itu penulis mengucapkan rasa syukur dan terima kasih yang sebesar-besarnya kepada :

1. Allah SWT yang telah memberikan kemudahan dan kelancaran dalam mengerjakan skripsi ini  
2. Ir. Tri Afirianto, S.T., M.T. sebagai Dosen Pembimbing 1 dan Khalid Rahman, S.Pd.I., M.Pd.I selaku Dosen Pembimbing 2 yang telah sabar membimbing dan mengarahkan memberi masukan hingga terselesaikannya penelitian ini  
3. Kedua orang tua saya yang selalu memberikan dukungan secara finansial maupun moral dalam situasi apapun  
4. Seluruh dosen dan staf Fakultas Ilmu Komputer Universitas Brawijaya Malang yang telah berkontribusi dalam memberikan pengetahuan selama masa perkuliahan

5. Teman \- teman seperjuangan Prodi Pendidikan Teknologi Informasi Angkatan 2017, yang telah memberikan dukungan dan menjadikan setiap perjalanan perkuliahan penuh kenangan  
6. Semua pihak yang tidak dapat disebutkan satu per satu namun turut serta dalam memberikan kontribusi, baik langsung maupun tidak langsung, dalam penyusunan skripsi ini.

Penulis menyadari bahwa dalam penyusunan skripsi ini masih banyak kesalahan dan kekurangan yang harus diperbaiki. Oleh karena itu, saran dan kritik yang membangun dari berbagai pihak sangat diharapkan dan penulis berharap skripsi ini dapat bermanfaat bagi semua pihak yang membutuhkannya.

###### **Ghaytsa Zahara Faradisa, Pengembangan Aplikasi Pengarsipan *Paper Halaqah* Berbasis Web Menggunakan Model *Prototyping* (Studi Kasus: Lembaga Tinggi Pesantren Luhur Malang)** {#ghaytsa-zahara-faradisa,-pengembangan-aplikasi-pengarsipan-paper-halaqah-berbasis-web-menggunakan-model-prototyping-(studi-kasus:-lembaga-tinggi-pesantren-luhur-malang)}

**Pembimbing: Ir. Tri Afirianto, S.T., M.T., dan Khalid Rahman, S.Pd.I., M.Pd.I**

Kegiatan *halaqah* pada Pesantren Luhur Malang merupakan kegiatan belajar bersama dimana salah satu santriwan dan santriwati mempresentasikan makalah dari judul yang mereka dapatkan, di depan seluruh santri yang memperhatikan presentasinya. Kegiatan ini rutin diselenggarakan setelah jemaah subuh dan istighosah telah selesai dan diselenggarakan tiap hari Senin sampai Sabtu. Secara rutin kegiatan *halaqah* Pesantren Luhur secara rutin menghasilkan dua *paper* dengan topik yang sama selama hari aktif pesantren (Senin \- Sabtu). Jika di taksir dalam setiap bulannya dapat menghasilkan 48 *paper halaqah*, dan 288 *paper* setiap enam bulan. Setiap satu semester, kumpulan makalah tersebut dijilid dan disimpan dalam lemari kantor Pesantren Luhur Malang. Kondisi ini menyebabkan penuhnya percikan yang disimpan didalam lemari kantor, sehingga tidak ada ruang lagi untuk menyimpan percikan tersebut. Penelitian ini bertujuan membangun sistem informasi pengarsipan *halaqah* yang berguna agar proses penyimpanan lebih efisien. Proses elisitasi dimulai dengan observasi dan wawancara, serta dilanjutkan dengan pembuatan prototipe untuk menganalisis kebutuhan pengguna. Analisis pengguna dengan menggunakan prototipe dilakukan sebanyak tiga iterasi dan menghasilkan 29 kebutuhan fungsional dan 2 kebutuhan non fungsional. Setelah melakukan analisis kebutuhan, peneliti melakukan perancangan yang meliputi *class diagram*, *sequence diagram*, physical *database* desain dan dilanjutkan dengan implementasi sistem. Pengujian unit menggunakan *whitebox testing* dengan metode C*yclomatic Complexity* menghasilkan nilai 100% valid pada semua fungsional sistem. Pengujian validitas menggunakan *blackbox testing* dengan metode *Equivalence Partitioning* menghasilkan nilai 90% valid pada fungsional yang diuji.

Kata kunci : sistem informasi, *halaqah*, *prototyping*, laravel, pesantren, *website, white box, black box, basis path testing, equivalence partitioning*

***Ghaytsa Zahara Faradisa, Development of Web-Based Halaqah Paper Archiving Application Using Prototyping Model (Case Study: Lembaga Tinggi Pesantren Luhur Malang)***

***Advisors: Ir. Tri Afirianto, S.T., M.T., and Khalid Rahman, S.Pd.I., M.Pd.I.***

*The halaqah activity at Luhur Islamic Boarding School is a joint learning activity where one of the santriwan and santriwati present a paper from the title they get, in front of all students who pay attention to the presentation. This activity is routinely held after the dawn congregation and istighosah have been completed and held every Monday to Saturday. Routinely, Luhur Islamic Boarding School’s halaqah activities routinely produce two papers with the same topic during the active days of the islamic boarding school (Monday \- Saturday). If it is estimated that every month it can produce 48 halaqah papers, and 288 papers every six months. Every semester, the papers are bound and stored in the office cupboard of Luhur Islamic Boarding School. This condition causes the full spark stored in the office cabinet, so there is no more space to store the spark. This research aims to build a halaqah archiving information system that is useful for a more efficient storage process. The elicitation process began with observations and interviews, and continued with prototyping to analyze user needs. User analysis using prototypes was conducted in three iterations and resulted in 29 functional needs and 2 non-functional needs. After analyzing the needs, the researchers conducted a design which included class diagrams, sequence diagrams, physical database designs and continued with system implementation. Unit testing using whitebox testing with the cyclomatic complexity method produces a 100% valid value on all system functions. Validity testing using blackbox testing with the equivalence partition method produces a 90% valid value on the functional tested.*

*Keywords: information system, halaqah, prototyping, laravel, boarding school, website, white box, black box, basis path testing, equivalence partitioning*

[PENGESAHAN	i](#pengembangan-aplikasi-pengarsipan-paper-halaqah-berbasis-web-menggunakan-model-prototyping-\(studi-kasus:-lembaga-tinggi-pesantren-luhur-malang\))

[PERNYATAAN ORISINALITAS	ii](#saya-menyatakan-dengan-sebenar-benarnya-bahwa-sepanjang-pengetahuan-saya,-di-dalam-naskah-skripsi-ini-tidak-terdapat-karya-ilmiah-yang-pernah-diajukan-oleh-orang-lain-untuk-memperoleh-gelar-akademik-di-suatu-perguruan-tinggi,-dan-tidak-terdapat-karya-atau-pendapat-yang-pernah-ditulis-atau-diterbitkan-oleh-orang-lain,-kecuali-yang-secara-tertulis-disitasi-dalam-naskah-ini-dan-disebutkan-dalam-daftar-referensi.)

[PRAKATA	iii](#puji-syukur-kehadirat-allah-swt-yang-telah-melimpahkan-rahmatnya,-sehingga-penulis-dapat-menyelesaikan-penelitian-yang-berjudul-“pengembangan-aplikasi-pengarsipan-paper-halaqah-berbasis-web-menggunakan-model-prototyping-\(studi-kasus:-lembaga-tinggi-pesantren-luhur-malang\)”-skripsi-ini-diajukan-sebagai-tugas-akhir-dalam-rangka-menyelesaikan-studi-program-strata-satu-\(s-1\)-pendidikan-teknologi-informasi-di-fakultas-ilmu-komputer-universitas-brawijaya.)

[ABSTRAK	iv](#ghaytsa-zahara-faradisa,-pengembangan-aplikasi-pengarsipan-paper-halaqah-berbasis-web-menggunakan-model-prototyping-\(studi-kasus:-lembaga-tinggi-pesantren-luhur-malang\))

[ABSTRACT	v](#ghaytsa-zahara-faradisa,-development-of-web-based-halaqah-paper-archiving-application-using-prototyping-model-\(case-study:-lembaga-tinggi-pesantren-luhur-malang\))

[DAFTAR ISI	vi](#pengesahan-i)

[DAFTAR GAMBAR	ix](#daftar-gambar)

[DAFTAR TABEL	xiv](#daftar-tabel)

[DAFTAR LAMPIRAN	xviii](#lampiran-a-hasil-wawancara-222)

[BAB 1 PENDAHULUAN	1](#latar-belakang)

1. [Latar Belakang	1](#latar-belakang)

   2. [Rumusan Masalah	3](#rumusan-masalah)

   3. [Tujuan	3](#tujuan)

   4. [Manfaat	3](#manfaat)

   5. [Batasan Masalah	4](#batasan-masalah)

   6. [Sistematika Pembahasan	4](#sistematika-pembahasan)

[BAB 2 LANDASAN KEPUSTAKAAN	5](#bab-2-landasan-kepustakaan)

1. [Penelitian Terdahulu	5](#penelitian-terdahulu)

   2. [*Website*	8](#website)

   3. [Profil Pesantren dan Kegiatan *Halaqah*	9](#profil-pesantren-dan-kegiatan-halaqah)

   4. [Model *Prototyping*	11](#model-prototyping)

   5. [Laravel	13](#laravel)

   6. [*Unified Modelling Language* (UML)	14](#unified-modelling-language-\(uml\))

      1. [*Use Case Diagram*	14](#use-case-diagram)

      2. [*Class Diagram*	15](#class-diagram)

      3. [*Sequence Diagram*	15](#sequence-diagram)

   7. [*Entity Relationship Diagram* (ERD)	17](#entity-relationship-diagram-\(erd\))

   8. [Pengujian	18](#pengujian)

      1. [*Black Box Testing*	19](#black-box-testing)

      2. [*White Box Testing*	19](#white-box-testing)

[BAB 3 METODOLOGI	21](#bab-3-metodologi)

1. [Pengumpulan Data Analisis Kebutuhan	22](#pengumpulan-data-analisis-kebutuhan)

   2. [Perancangan Sistem	22](#perancangan-sistem)

   3. [Implementasi	23](#implementasi)

   4. [Pengujian	23](#pengujian-1)

   5. [Kesimpulan dan Saran	23](#kesimpulan-dan-saran)

[BAB 4 REKAYASA KEBUTUHAN	24](#bab-4-rekayasa-kebutuhan)

1. [Elisitasi Kebutuhan	24](#elisitasi-kebutuhan)

   2. [Identifikasi Pengguna Awal	25](#identifikasi-pengguna-awal)

   3. [Analisis Kebutuhan dengan *Prototyping*	25](#analisis-kebutuhan-dengan-prototyping)

      1. [*Prototyping* Iterasi 1	25](#prototyping-iterasi-1)

      2. [*Prototyping* Iterasi 2	35](#prototyping-iterasi-2)

      3. [*Prototyping* Iterasi 3	58](#prototyping-iterasi-3)

   4. [Hasil Analisis Kebutuhan	100](#hasil-analisis-kebutuhan)

      1. [Kebutuhan Pengguna, Sistem dan Batasan	100](#kebutuhan-pengguna,-sistem-dan-batasan)

      2. [Identifikasi Pengguna Akhir	103](#identifikasi-pengguna-akhir)

      3. [Kebutuhan Fungsional dan Non-Fungsional	104](#kebutuhan-fungsional-dan-non-fungsional)

      4. [*Use Case Diagram*	110](#use-case-diagram-1)

      5. [*Use Case Scenario*	111](#use-case-scenario)

   5. [*Entity Relational Diagram* (ERD)	135](#entity-relational-diagram-\(erd\))

[BAB 5 PERANCANGAN SISTEM	137](#bab-5-perancangan-sistem)

1. [*Class Diagram*	137](#class-diagram-1)

   2. [*Sequence Diagram*	138](#sequence-diagram-1)

      1. [*Sequence Diagram Login*	138](#sequence-diagram-login)

      2. [*Sequence Diagram* Tambah Makalah *Halaqah*	139](#sequence-diagram-tambah-makalah-halaqah)

      3. [*Sequence Diagram* Lihat Makalah *Halaqah*	139](#sequence-diagram-lihat-makalah-halaqah)

      4. [*Sequence Diagram* Ubah Makalah *Halaqah*	140](#sequence-diagram-ubah-makalah-halaqah)

      5. [*Sequence Diagram* Hapus Makalah *Halaqah*	141](#sequence-diagram-hapus-makalah-halaqah)

      6. [*Sequence Diagram* Cari Makalah *Halaqah*	142](#sequence-diagram-cari-makalah-halaqah)

      7. [*Sequence Diagram* Tambah Penulis *Halaqah*	143](#sequence-diagram-tambah-penulis-halaqah)

      8. [*Sequence Diagram* Lihat Penulis *Halaqah*	144](#sequence-diagram-lihat-penulis-halaqah)

      9. [*Sequence Diagram* Ubah Penulis *Halaqah*	145](#sequence-diagram-ubah-penulis-halaqah)

      10. [*Sequence Diagram* Hapus Penulis *Halaqah*	146](#sequence-diagram-hapus-penulis-halaqah)

   3. [*Physical Database Design* (PDD)	147](#physical-database-design-\(pdd\))

[BAB 6 IMPLEMENTASI	148](#bab-6-implementasi)

1. [*Login*	148](#login)

   2. [Tambah Kategori	149](#tambah-kategori)

   3. [Ubah Kategori	149](#ubah-kategori)

   4. [Hapus Kategori	150](#hapus-kategori)

   5. [Tambah Jilid	150](#tambah-jilid)

   6. [Ubah Jilid	151](#ubah-jilid)

   7. [Hapus Jilid	151](#hapus-jilid)

   8. [Tambah Penulis	152](#tambah-penulis)

   9. [Ubah Penulis	152](#ubah-penulis)

   10. [Hapus Penulis	153](#hapus-penulis)

   11. [Tambah Jadwal	153](#tambah-jadwal)

[BAB 7 PENGUJIAN	154](#bab-7-pengujian)

1. [Rancangan Pengujian	154](#rancangan-pengujian)

   1. [Pengujian *Black Box Testing*	154](#pengujian-black-box-testing)

      2. [Pengujian *White Box Testing*	161](#pengujian-white-box-testing)

   2. [Pelaksanaan Pengujian	195](#pelaksanaan-pengujian)

      1. [Pengujian *Black Box Testing*	195](#pengujian-black-box-testing-1)

      2. [Pengujian *White Box Testing*	206](#pengujian-white-box-testing-1)

   3. [Evaluasi Hasil Pengujian	215](#evaluasi-hasil-pengujian)

      1. [Pengujian *Black Box Testing*	215](#pengujian-black-box-testing-2)

      2. [Pengujian *White Box Testing*	217](#pengujian-white-box-testing-2)

[BAB 8 KESIMPULAN DAN SARAN	219](#bab-8-kesimpulan-dan-saran)

1. [Kesimpulan	219](#kesimpulan)

   2. [Saran	219](#saran)

[DAFTAR REFERENSI	220](#daftar-referensi)

# **DAFTAR GAMBAR** {#daftar-gambar}

[Gambar 2.1 Diagram metode *Prototyping*	12](#gambar-2.1-diagram-metode-prototyping)

[Gambar 3.1 Diagram alur metode penelitian	21](#gambar-3.1-diagram-alur-metode-penelitian)

[Gambar 4.1 Tampilan *wireframe* halaman beranda	26](#gambar-4.1-tampilan-wireframe-halaman-beranda)

[Gambar 4.2 Tampilan *wireframe* halaman cari	27](#gambar-4.2-tampilan-wireframe-halaman-cari)

[Gambar 4.3 Tampilan *wireframe* halaman data *halaqah* dengan akses admin	28](#gambar-4.3-tampilan-wireframe-halaman-data-halaqah-dengan-akses-admin)

[Gambar 4.4 Tampilan *wireframe* halaman tambah data *halaqah* dengan akses](#gambar-4.4-tampilan-wireframe-halaman-tambah-data-halaqah-dengan-akses-admin) [admin	29](#gambar-4.4-tampilan-wireframe-halaman-tambah-data-halaqah-dengan-akses-admin)

[Gambar 4.5 Tampilan *wireframe* halaman profil dengan akses admin	30](#gambar-4.5-tampilan-wireframe-halaman-profil-dengan-akses-admin)

[Gambar 4.6 Tampilan prototipe halaman beranda	31](#gambar-4.6-tampilan-prototipe-halaman-beranda)

[Gambar 4.7 Tampilan prototipe halaman cari	32](#gambar-4.7-tampilan-prototipe-halaman-cari)

[Gambar 4.8 Tampilan prototipe halaman data *halaqah* dengan akses admin	33](#gambar-4.8-tampilan-prototipe-halaman-data-halaqah-dengan-akses-admin)

[Gambar 4.9 Tampilan prototipe halaman profil dengan akses admin	33](#gambar-4.9-tampilan-prototipe-halaman-profil-dengan-akses-admin)

[Gambar 4.10 Tampilan *wireframe* halaman beranda	36](#gambar-4.10-tampilan-wireframe-halaman-beranda)

[Gambar 4.11 Tampilan *wireframe* halaman cari	37](#gambar-4.11-tampilan-wireframe-halaman-cari)

[Gambar 4.12 Tampilan *wireframe* halaman jadwal	38](#gambar-4.12-tampilan-wireframe-halaman-jadwal)

[Gambar 4.13 Tampilan *wireframe* halaman data *halaqah* dengan akses admin 39](#gambar-4.13-tampilan-wireframe-halaman-data-halaqah-dengan-akses-admin) [Gambar 4.14 Tampilan *wireframe* halaman data jadwal dengan akses admin	40](#gambar-4.14-tampilan-wireframe-halaman-data-jadwal-dengan-akses-admin)  
[Gambar 4.15 Tampilan *wireframe* halaman data kategori dengan akses admin 41](#gambar-4.15-tampilan-wireframe-halaman-data-kategori-dengan-akses-admin) [Gambar 4.16 Tampilan *wireframe* halaman profil	42](#gambar-4.16-tampilan-wireframe-halaman-profil)  
[Gambar 4.17 Tampilan *wireframe* halaman tambah *halaqah* dengan akses admin](#gambar-4.17-tampilan-wireframe-halaman-tambah-halaqah-dengan-akses-admin)  
[.	43](#gambar-4.17-tampilan-wireframe-halaman-tambah-halaqah-dengan-akses-admin)

[Gambar 4.18 Tampilan *wireframe* halaman tambah jadwal dengan akses admin](#gambar-4.18-tampilan-wireframe-halaman-tambah-jadwal-dengan-akses-admin)  
[.	44](#gambar-4.18-tampilan-wireframe-halaman-tambah-jadwal-dengan-akses-admin)

[Gambar 4.19 Tampilan *wireframe* halaman kategori dengan akses admin	45](#gambar-4.19-tampilan-wireframe-halaman-kategori-dengan-akses-admin)

[Gambar 4.20 Tampilan prototipe halaman beranda	46](#gambar-4.20-tampilan-prototipe-halaman-beranda)

[Gambar 4.21 Tampilan prototipe halaman jadwal	47](#gambar-4.21-tampilan-prototipe-halaman-jadwal)

[Gambar 4.22 Tampilan prototipe halaman cari	48](#gambar-4.22-tampilan-prototipe-halaman-cari)

[Gambar 4.23 Tampilan prototipe halaman profil dengan akses admin	49](#gambar-4.23-tampilan-prototipe-halaman-profil-dengan-akses-admin)

[Gambar 4.24 Tampilan prototipe halaman data *halaqah* dengan akses admin . 50](#gambar-4.24-tampilan-prototipe-halaman-data-halaqah-dengan-akses-admin) [Gambar 4.25 Tampilan prototipe halaman kategori dengan akses admin	51](#gambar-4.25-tampilan-prototipe-halaman-kategori-dengan-akses-admin)  
[Gambar 4.26 Tampilan prototipe halaman jadwal dengan akses admin	51](#gambar-4.26-tampilan-prototipe-halaman-jadwal-dengan-akses-admin)

[Gambar 4.27 Tampilan prototipe halaman tambah kategori dengan akses admin](#gambar-4.27-tampilan-prototipe-halaman-tambah-kategori-dengan-akses-admin)  
[.	52](#gambar-4.27-tampilan-prototipe-halaman-tambah-kategori-dengan-akses-admin)

[Gambar 4.28 Tampilan prototipe halaman tambah jadwal dengan akses admin53](#gambar-4.28-tampilan-prototipe-halaman-tambah-jadwal-dengan-akses-admin) [Gambar 4.29 Tampilan prototipe halaman ubah jadwal dengan akses admin	54](#gambar-4.29-tampilan-prototipe-halaman-ubah-jadwal-dengan-akses-admin)  
[Gambar 4.30 Tampilan prototipe halaman ubah kategori dengan akses admin 55](#gambar-4.30-tampilan-prototipe-halaman-ubah-kategori-dengan-akses-admin)

[Gambar 4.31 Tampilan prototipe halaman kategori dengan tambahan notifikasi](#gambar-4.31-tampilan-prototipe-halaman-kategori-dengan-tambahan-notifikasi)

[.	56](#gambar-4.31-tampilan-prototipe-halaman-kategori-dengan-tambahan-notifikasi)

[Gambar  4.32 Tampilan prototipe halaman data *halaqah* dengan tambahan](#gambar-4.32-tampilan-prototipe-halaman-data-halaqah-dengan-tambahan-notifikasi) [notifikasi	57](#gambar-4.32-tampilan-prototipe-halaman-data-halaqah-dengan-tambahan-notifikasi)

[Gambar 4.33 Tampilan prototipe halaman jadwal dengan tambahan notifikasi 57](#gambar-4.33-tampilan-prototipe-halaman-jadwal-dengan-tambahan-notifikasi) [Gambar 4.34 Tampilan *wireframe* halaman beranda	60](#gambar-4.34-tampilan-wireframe-halaman-beranda)  
[Gambar 4.35 Tampilan *wireframe* halaman cari	61](#gambar-4.35-tampilan-wireframe-halaman-cari)

[Gambar 4.36 Tampilan *wireframe* halaman jadwal *halaqah*	62](#gambar-4.36-tampilan-wireframe-halaman-jadwal-halaqah)

[Gambar 4.37 Tampilan *wireframe* halaman material *halaqah*	63](#gambar-4.37-tampilan-wireframe-halaman-material-halaqah)

[Gambar 4.38 Tampilan *wireframe* halaman data penulis dengan akses admin . 64](#gambar-4.38-tampilan-wireframe-halaman-data-penulis-dengan-akses-admin)

[Gambar 4.39 Tampilan *wireframe* halaman data material *halaqah* dengan akses](#gambar-4.39-tampilan-wireframe-halaman-data-material-halaqah-dengan-akses-admin) [admin	65](#gambar-4.39-tampilan-wireframe-halaman-data-material-halaqah-dengan-akses-admin)

[Gambar 4.40 Tampilan *wireframe* halaman profil dengan akses admin	66](#gambar-4.40-tampilan-wireframe-halaman-profil-dengan-akses-admin)

[Gambar 4.41 Tampilan *wireframe* halaman data *halaqah* dengan akses admin 67](#gambar-4.41-tampilan-wireframe-halaman-data-halaqah-dengan-akses-admin) [Gambar 4.42 Tampilan *wireframe* halaman data jadwal	68](#gambar-4.42-tampilan-wireframe-halaman-data-jadwal)

[Gambar 4.43 Tampilan *wireframe* halaman data jilid dengan akses admin	69](#gambar-4.43-tampilan-wireframe-halaman-data-jilid-dengan-akses-admin)

[Gambar 4.44 Tampilan *wireframe* halaman data kategori dengan akses admin 70](#gambar-4.44-tampilan-wireframe-halaman-data-kategori-dengan-akses-admin)

[Gambar 4.45 Tampilan *wireframe* halaman tambah data *halaqah* dengan akses](#gambar-4.45-tampilan-wireframe-halaman-tambah-data-halaqah-dengan-akses-admin) [admin	71](#gambar-4.45-tampilan-wireframe-halaman-tambah-data-halaqah-dengan-akses-admin)

[Gambar 4.46 Tampilan *wireframe* halaman tambah data jadwal	72](#gambar-4.46-tampilan-wireframe-halaman-tambah-data-jadwal)

[Gambar 4.47 Tampilan *wireframe* halaman tambah jilid dengan akses kategori 73](#gambar-4.47-tampilan-wireframe-halaman-tambah-jilid-dengan-akses-kategori) [Gambar 4.48 Tampilan *wireframe* halaman tambah kategori dengan akses admin](#gambar-4.48-tampilan-wireframe-halaman-tambah-kategori-dengan-akses-admin)  
[.	74](#gambar-4.48-tampilan-wireframe-halaman-tambah-kategori-dengan-akses-admin)

[Gambar 4.49 Tampilan *wireframe* halaman tambah penulis dengan akses admin](#gambar-4.49-tampilan-wireframe-halaman-tambah-penulis-dengan-akses-admin)  
[.	75](#gambar-4.49-tampilan-wireframe-halaman-tambah-penulis-dengan-akses-admin)

[Gambar  4.50 Tampilan *wireframe* halaman tambah material dengan akses](#gambar-4.50-tampilan-wireframe-halaman-tambah-material-dengan-akses-admin) [admin	76](#gambar-4.50-tampilan-wireframe-halaman-tambah-material-dengan-akses-admin)

[Gambar 4.51 Tampilan prototipe halaman beranda	77](#gambar-4.51-tampilan-prototipe-halaman-beranda)

[Gambar 4.52 Tampilan prototipe halaman jadwal	78](#gambar-4.52-tampilan-prototipe-halaman-jadwal)

[Gambar 4.53 Tampilan prototipe halaman cari	79](#gambar-4.53-tampilan-prototipe-halaman-cari)

[Gambar 4.54 Tampilan prototipe halaman material *halaqah*	80](#gambar-4.54-tampilan-prototipe-halaman-material-halaqah)

[Gambar 4.55 Tampilan prototipe halaman data *halaqah* dengan akses admin . 81](#gambar-4.55-tampilan-prototipe-halaman-data-halaqah-dengan-akses-admin) [Gambar 4.56 Tampilan prototipe halaman data jadwal dengan akses admin  82](#gambar-4.56-tampilan-prototipe-halaman-data-jadwal-dengan-akses-admin)  
[Gambar 4.57 Tampilan prototipe halaman data jilid dengan akses admin    83](#gambar-4.57-tampilan-prototipe-halaman-data-jilid-dengan-akses-admin)

[Gambar 4.58 Tampilan prototipe halaman data kategori dengan akses admin . 84](#gambar-4.58-tampilan-prototipe-halaman-data-kategori-dengan-akses-admin) [Gambar 4.59 Tampilan prototipe halaman data material dengan akses admin . 85](#gambar-4.59-tampilan-prototipe-halaman-data-material-dengan-akses-admin) [Gambar 4.60 Tampilan prototipe halaman data penulis dengan akses admin  86](#gambar-4.60-tampilan-prototipe-halaman-data-penulis-dengan-akses-admin)  
[Gambar 4.61 Tampilan prototipe halaman tambah penulis dengan akses admin](#gambar-4.61-tampilan-prototipe-halaman-tambah-penulis-dengan-akses-admin)  
[.	86](#gambar-4.61-tampilan-prototipe-halaman-tambah-penulis-dengan-akses-admin)

[Gambar 4.62 Tampilan prototipe halaman data penulis dengan akses admin	87](#gambar-4.62-tampilan-prototipe-halaman-data-penulis-dengan-akses-admin)

[Gambar  4.63 Tampilan prototipe halaman data jadwal dengan tambahan](#gambar-4.63-tampilan-prototipe-halaman-data-jadwal-dengan-tambahan-notifikasi) [notifikasi	88](#gambar-4.63-tampilan-prototipe-halaman-data-jadwal-dengan-tambahan-notifikasi)

[Gambar 4.64 Tampilan prototipe halaman data jilid dengan tambahan notifikasi](#gambar-4.64-tampilan-prototipe-halaman-data-jilid-dengan-tambahan-notifikasi)  
[.	88](#gambar-4.64-tampilan-prototipe-halaman-data-jilid-dengan-tambahan-notifikasi)

[Gambar 4.65 Tampilan prototipe halaman data kategori dengan tambahan](#gambar-4.65-tampilan-prototipe-halaman-data-kategori-dengan-tambahan-notifikasi) [notifikasi	89](#gambar-4.65-tampilan-prototipe-halaman-data-kategori-dengan-tambahan-notifikasi)

[Gambar 4.66 Tampilan prototipe halaman data material dengan tambahan](#gambar-4.66-tampilan-prototipe-halaman-data-material-dengan-tambahan-notifikasi) [notifikasi	89](#gambar-4.66-tampilan-prototipe-halaman-data-material-dengan-tambahan-notifikasi)

[Gambar  4.67 Tampilan prototipe halaman data penulis dengan tambahan](#gambar-4.67-tampilan-prototipe-halaman-data-penulis-dengan-tambahan-notifikasi) [notifikasi	90](#gambar-4.67-tampilan-prototipe-halaman-data-penulis-dengan-tambahan-notifikasi)

[Gambar 4.68 Tampilan prototipe halaman tambah jilid dengan akses admin	90](#gambar-4.68-tampilan-prototipe-halaman-tambah-jilid-dengan-akses-admin)

[Gambar 4.69 Tampilan prototipe halaman tambah kategori dengan akses admin](#gambar-4.69-tampilan-prototipe-halaman-tambah-kategori-dengan-akses-admin)  
[.	91](#gambar-4.69-tampilan-prototipe-halaman-tambah-kategori-dengan-akses-admin)

[Gambar 4.70 Tampilan prototipe halaman tambah jadwal dengan akses admin92](#gambar-4.70-tampilan-prototipe-halaman-tambah-jadwal-dengan-akses-admin) [Gambar 4.71 Tampilan prototipe halaman tambah material dengan akses admin](#gambar-4.71-tampilan-prototipe-halaman-tambah-material-dengan-akses-admin)

[.	93](#gambar-4.71-tampilan-prototipe-halaman-tambah-material-dengan-akses-admin)

[Gambar 4.72 Tampilan prototipe halaman tambah penulis dengan akses admin](#gambar-4.72-tampilan-prototipe-halaman-tambah-penulis-dengan-akses-admin)  
[.	94](#gambar-4.72-tampilan-prototipe-halaman-tambah-penulis-dengan-akses-admin)

[Gambar 4.73 Tampilan prototipe halaman ubah jadwal dengan akses admin  95](#gambar-4.73-tampilan-prototipe-halaman-ubah-jadwal-dengan-akses-admin)

[Gambar 4.74 Tampilan prototipe halaman ubah jilid dengan akses admin    96](#gambar-4.74-tampilan-prototipe-halaman-ubah-jilid-dengan-akses-admin)

[Gambar 4.75 Tampilan prototipe halaman ubah kategori dengan akses admin 97](#gambar-4.75-tampilan-prototipe-halaman-ubah-kategori-dengan-akses-admin) [Gambar 4.76 Tampilan prototipe halaman ubah template dengan akses admin98](#gambar-4.76-tampilan-prototipe-halaman-ubah-template-dengan-akses-admin) [Gambar 4.77 Tampilan prototipe halaman ubah penulis dengan akses admin 99](#gambar-4.77-tampilan-prototipe-halaman-ubah-penulis-dengan-akses-admin)

[Gambar 4.78 Keterangan dari kode identifikasi fitur	104](#gambar-4.78-keterangan-dari-kode-identifikasi-fitur)

[Gambar 4.79 Keterangan dari kode kebutuhan fungsional	106](#gambar-4.79-keterangan-dari-kode-kebutuhan-fungsional)

[Gambar 4.80 Keterangan dari kode kebutuhan non fungsional	109](#gambar-4.80-keterangan-dari-kode-kebutuhan-non-fungsional)

[Gambar 4.81 Usecase diagram dari sistem pengarsipan *paper halaqah*	110](#gambar-4.81-usecase-diagram-dari-sistem-pengarsipan-paper-halaqah)

[Gambar 4.82 Hasil rancangan ERD (*Entity Relationship Diagram*)	136](#gambar-4.82-hasil-rancangan-erd-\(entity-relationship-diagram\))

[Gambar 5.1 Rancangan *class diagram controller*	137](#gambar-5.1-rancangan-class-diagram-controller)

[Gambar 5.2 Rancangan *class diagram model*	138](#gambar-5.2-rancangan-class-diagram-model)

[Gambar 5.3 *Sequence diagram* login	138](#gambar-5.3-sequence-diagram-login)

[Gambar 5.4 *Sequence diagram* tambah makalah *halaqah*	139](#gambar-5.4-sequence-diagram-tambah-makalah-halaqah)

[Gambar 5.5 *Sequence diagram* lihat makalah *halaqah*	140](#gambar-5.5-sequence-diagram-lihat-makalah-halaqah)

[Gambar 5.6 *Sequence diagram* ubah makalah *halaqah*	141](#gambar-5.6-sequence-diagram-ubah-makalah-halaqah)

[Gambar 5.7 *Sequence diagram* hapus makalah *halaqah*	142](#gambar-5.7-sequence-diagram-hapus-makalah-halaqah)

[Gambar 5.8 *Sequence diagram* cari makalah *halaqah*	143](#gambar-5.8-sequence-diagram-cari-makalah-halaqah)

[Gambar 5.9 *Sequence diagram* tambah penulis *halaqah*	144](#gambar-5.9-sequence-diagram-tambah-penulis-halaqah)

[Gambar 5.10 *Sequence diagram* lihat penulis *halaqah*	145](#gambar-5.10-sequence-diagram-lihat-penulis-halaqah)

[Gambar 5.11 *Sequence diagram* ubah penulis *halaqah*	146](#gambar-5.11-sequence-diagram-ubah-penulis-halaqah)

[Gambar 5.12 *Sequence diagram* hapus penulis *halaqah*	147](#gambar-5.12-sequence-diagram-hapus-penulis-halaqah)

[Gambar 5.13 Rancangan *database* sistem informasi pengarsipan *halaqah*	147](#gambar-5.13-rancangan-database-sistem-informasi-pengarsipan-halaqah)

[Gambar 7.1 *Flowgraph* dari *pseudocode* fungsi *update* profil	164](#gambar-7.1-flowgraph-dari-pseudocode-fungsi-update-profil)

[Gambar 7.2 *Flowgraph* dari *pseudocode* fungsi *add* kategori	166](#gambar-7.2-flowgraph-dari-pseudocode-fungsi-add-kategori)

[Gambar 7.3 *Flowgraph* dari *pseudocode* fungsi *update* kategori	168](#gambar-7.3-flowgraph-dari-pseudocode-fungsi-update-kategori)

[Gambar 7.4 *Flowgraph* dari *pseudocode* fungsi *delete* kategori	170](#gambar-7.4-flowgraph-dari-pseudocode-fungsi-delete-kategori)

[Gambar 7.5 *Flowgraph* dari *pseudocode* fungsi *add* jilid	172](#gambar-7.5-flowgraph-dari-pseudocode-fungsi-add-jilid)

[Gambar 7.6 *Flowgraph* dari *pseudocode* fungsi *update* jilid	174](#gambar-7.6-flowgraph-dari-pseudocode-fungsi-update-jilid)

[Gambar 7.7 *Flowgraph* dari *pseudocode* fungsi *delete* jilid	176](#gambar-7.7-flowgraph-dari-pseudocode-fungsi-delete-jilid)

[Gambar 7.8 *Flowgraph* dari *pseudocode* fungsi *add* penulis	178](#gambar-7.8-flowgraph-dari-pseudocode-fungsi-add-penulis)

[Gambar 7.9 *Flowgraph* dari *pseudocode* fungsi *update* penulis	180](#gambar-7.9-flowgraph-dari-pseudocode-fungsi-update-penulis)

[Gambar 7.10 *Flowgraph* dari *pseudocode* fungsi *delete* penulis	182](#gambar-7.10-flowgraph-dari-pseudocode-fungsi-delete-penulis)

[Gambar 7.11 *Flowgraph* dari *pseudocode* fungsi *add halaqah*	184](#gambar-7.11-flowgraph-dari-pseudocode-fungsi-add-halaqah)

[Gambar 7.12 *Flowgraph* dari *pseudocode* fungsi *update halaqah*	186](#gambar-7.12-flowgraph-dari-pseudocode-fungsi-update-halaqah)

[Gambar 7.13 *Flowgraph* dari *pseudocode* fungsi *delete halaqah*	188](#gambar-7.13-flowgraph-dari-pseudocode-fungsi-delete-halaqah)

[Gambar 7.14 *Flowgraph* dari *pseudocode* fungsi *add* jadwal	190](#gambar-7.14-flowgraph-dari-pseudocode-fungsi-add-jadwal)

[Gambar 7.15 *Flowgraph* dari *pseudocode* fungsi *update* jadwal	192](#gambar-7.15-flowgraph-dari-pseudocode-fungsi-update-jadwal)

[Gambar 7.16 *Flowgraph* dari *pseudocode* fungsi *delete* jadwal	194](#gambar-7.16-flowgraph-dari-pseudocode-fungsi-delete-jadwal)

# **DAFTAR TABEL** {#daftar-tabel}

[Tabel 2.1 Penelitian Terdahulu	5](#tabel-2.1-penelitian-terdahulu)

[Tabel 2.2 Daftar komponen *use case diagram* beserta deskripsinya (A. S. dan](#tabel-2.2-daftar-komponen-use-case-diagram-beserta-deskripsinya-\(a.-s.-dan-shalahuddin,-2018\)) [Shalahuddin, 2018\)	14](#tabel-2.2-daftar-komponen-use-case-diagram-beserta-deskripsinya-\(a.-s.-dan-shalahuddin,-2018\))

[Tabel 2.3 Daftar komponen *class diagram* beserta deskripsinya	15](#tabel-2.3-daftar-komponen-class-diagram-beserta-deskripsinya)

[Tabel 2.4 Komponen diagram *sequence*	16](#tabel-2.4-komponen-dari-sequence-diagram)

[Tabel 2.5 Komponen *Entity Relationship Diagram*	17](#tabel-2.5-komponen-entity-relationship-diagram)

[Tabel 4.1 Hasil elisitasi kebutuhan dari wawancara dan observasi	24](#tabel-4.1-hasil-elisitasi-kebutuhan-dari-wawancara-dan-observasi)

[Tabel 4.2 Identifikasi pengguna awal	25](#tabel-4.2-identifikasi-pengguna-awal)

[Tabel 4.3 Daftar kebutuhan pengguna pada *prototyping* iterasi 1	26](#tabel-4.3-daftar-kebutuhan-pengguna-pada-prototyping-iterasi-1)

[Tabel 4.4 Daftar umpan balik dari pengguna pada *prototyping* iterasi 1	34](#tabel-4.4-daftar-umpan-balik-dari-pengguna-pada-prototyping-iterasi-1)

[Tabel 4.5 Daftar perubahan prototipe yang perlu dilakukan	35](#tabel-4.5-daftar-perubahan-prototipe-yang-perlu-dilakukan)

[Tabel 4.6 Daftar kebutuhan pengguna pada *prototyping* iterasi 2	35](#tabel-4.6-daftar-kebutuhan-pengguna-pada-prototyping-iterasi-2)

[Tabel 4.7 Daftar umpan balik dari pengguna pada *prototyping* iterasi 2	58](#tabel-4.7-daftar-umpan-balik-dari-pengguna-pada-prototyping-iterasi-2)

[Tabel 4.8 Daftar kebutuhan pengguna pada *prototyping* iterasi 3	58](#tabel-4.8-daftar-kebutuhan-pengguna-pada-prototyping-iterasi-3)

[Tabel 4.9 Daftar umpan balik pengguna pada *prototyping* iterasi 3	99](#tabel-4.9-daftar-umpan-balik-pengguna-pada-prototyping-iterasi-3)

[Tabel 4.10 Daftar kebutuhan pengguna dalam bentuk final	100](#tabel-4.10-daftar-kebutuhan-pengguna-dalam-bentuk-final)

[Tabel 4.11 Daftar aktivitas yang diperlukan pada sistem	102](#no)

[Tabel 4.12 Batasan-batasan dalam sistem	103](#tabel-4.12-batasan-batasan-dalam-sistem)

[Tabel 4.13 Identifikasi pengguna akhir	103](#tabel-4.13-identifikasi-pengguna-akhir)

[Tabel 4.14 Daftar fitur yang diperlukan untuk sistem	104](#tabel-4.14-daftar-fitur-yang-diperlukan-untuk-sistem)

[Tabel 4.15 Daftar kebutuhan fungsional sistem	107](#tabel-4.15-daftar-kebutuhan-fungsional-sistem)

[Tabel 4.16 Daftar kebutuhan non fungsional sistem	110](#kode-fitur)

[Tabel 4.17 *Use case scenario* login	111](#tabel-4.17-use-case-scenario-login)

[Tabel 4.18 *Use case scenario* tambah *paper halaqah*	112](#tabel-4.18-use-case-scenario-tambah-paper-halaqah)

[Tabel 4.19 *Use case scenario* lihat daftar *paper halaqah*	113](#tabel-4.19-use-case-scenario-lihat-daftar-paper-halaqah)

[Tabel 4.20 *Use case scenario* ubah *paper halaqah*	114](#tabel-4.20-use-case-scenario-ubah-paper-halaqah)

[Tabel 4.21 *Use case scenario* hapus *paper halaqah*	115](#tabel-4.21-use-case-scenario-hapus-paper-halaqah)

[Tabel 4.22 *Use case scenario* cari *paper halaqah*	115](#tabel-4.22-use-case-scenario-cari-paper-halaqah)

[Tabel 4.23 *Use case scenario* unduh *paper halaqah*	116](#tabel-4.23-use-case-scenario-unduh-paper-halaqah)

[Tabel 4.24 *Use case scenario* pratinjau *halaqah*	117](#tabel-4.24-use-case-scenario-pratinjau-halaqah)

[Tabel 4.25 *Use case scenario* tambah data jadwal	118](#tabel-4.25-use-case-scenario-tambah-data-jadwal)

[Tabel 4.26 *Use case scenario* melihat jadwal *halaqah*	118](#tabel-4.26-use-case-scenario-melihat-jadwal-halaqah)

[Tabel 4.27 *Use case scenario* ubah data jadwal	119](#tabel-4.27-use-case-scenario-ubah-data-jadwal)

[Tabel 4.28 *Use case scenario* hapus jadwal	120](#tabel-4.28-use-case-scenario-hapus-jadwal)

[Tabel 4.29 *Use case scenario* tambah data penulis	121](#tabel-4.29-use-case-scenario-tambah-data-penulis)

[Tabel 4.30 *Use case scenario* lihat data penulis	122](#tabel-4.30-use-case-scenario-lihat-data-penulis)

[Tabel 4.31 *Use case scenario* ubah data penulis	122](#tabel-4.31-use-case-scenario-ubah-data-penulis)

[Tabel 4.32 *Use case scenario* hapus penulis	123](#tabel-4.32-use-case-scenario-hapus-penulis)

[Tabel 4.33 *Use case scenario* tambah data jilid	124](#tabel-4.33-use-case-scenario-tambah-data-jilid)

[Tabel 4.34 *Use case scenario* melihat jilid *halaqah*	125](#tabel-4.34-use-case-scenario-melihat-jilid-halaqah)

[Tabel 4.35 *Use case scenario* ubah data jilid	125](#tabel-4.35-use-case-scenario-ubah-data-jilid)

[Tabel 4.36 *Use case scenario* hapus jilid *halaqah*	126](#tabel-4.36-use-case-scenario-hapus-jilid-halaqah)

[Tabel 4.37 *Use case scenario* tambah data kategori	127](#tabel-4.37-use-case-scenario-tambah-data-kategori)

[Tabel 4.38 *Use case scenario* melihat kategori *halaqah*	128](#tabel-4.38-use-case-scenario-melihat-kategori-halaqah)

[Tabel 4.39 *Use case scenario* ubah data kategori	128](#tabel-4.39-use-case-scenario-ubah-data-kategori)

[Tabel 4.40 *Use case scenario* hapus kategori *halaqah*	129](#tabel-4.40-use-case-scenario-hapus-kategori-halaqah)

[Tabel 4.41 *Use case scenario* tambah data jadwal	130](#tabel-4.41-use-case-scenario-tambah-data-jadwal)

[Tabel 4.42 *Use case scenario* mengunduh dokumen material *halaqah*	131](#tabel-4.42-use-case-scenario-mengunduh-dokumen-material-halaqah)

[Tabel 4.43 *Use case scenario* ubah material	132](#tabel-4.43-use-case-scenario-ubah-material)

[Tabel 4.44 *Use case scenario* hapus material *halaqah*	133](#tabel-4.44-use-case-scenario-hapus-material-halaqah)

[Tabel 4.45 *Use case scenario* ubah profil admin	134](#tabel-4.45-use-case-scenario-ubah-profil-admin)

[Tabel 4.46 *Use case scenario* logout	135](#tabel-4.46-use-case-scenario-logout)

[Tabel 6.1 Kode program dari fungsi login	148](#tabel-6.1-kode-program-dari-fungsi-login)

[Tabel 6.2 Kode program dari fungsi tambah kategori	149](#tabel-6.2-kode-program-dari-fungsi-tambah-kategori)

[Tabel 6.3 Kode program dari fungsi kategori	149](#tabel-6.3-kode-program-dari-fungsi-kategori)

[Tabel 6.4 Kode program dari fungsi hapus kategori	150](#tabel-6.4-kode-program-dari-fungsi-hapus-kategori)

[Tabel 6.5 Kode program dari fungsi tambah jilid	150](#tabel-6.5-kode-program-dari-fungsi-tambah-jilid)

[Tabel 6.6 Kode program dari fungsi *update* jilid	151](#tabel-6.6-kode-program-dari-fungsi-update-jilid)

[Tabel 6.7 Kode program dari fungsi hapus jilid	151](#tabel-6.7-kode-program-dari-fungsi-hapus-jilid)

[Tabel 6.8 Kode program dari fungsi tambah penulis	152](#tabel-6.8-kode-program-dari-fungsi-tambah-penulis)

[Tabel 6.9 Kode program dari fungsi ubah penulis	152](#tabel-6.9-kode-program-dari-fungsi-ubah-penulis)

[Tabel 6.10 Kode program dari fungsi hapus penulis	153](#tabel-6.10-kode-program-dari-fungsi-hapus-penulis)

[Tabel 6.11 Kode program dari fungsi tambah jadwal	153](#tabel-6.11-kode-program-dari-fungsi-tambah-jadwal)

[Tabel 7.1 Format tabel pengujian *black box testing*	154](#tabel-7.1-format-tabel-pengujian-black-box-testing)

[Tabel 7.2 Pengisian tabel *black box testing* sesuai dengan format tabel	155](#tabel-7.2-pengisian-tabel-black-box-testing-sesuai-dengan-format-tabel)

[Tabel 7.3 Daftar fungsi untuk pengujian *white box testing*	161](#tabel-7.3-daftar-fungsi-untuk-pengujian-white-box-testing)

[Tabel 7.4 Format tabel *pseudocode* untuk *basis path testing*	162](#tabel-7.4-format-tabel-pseudocode-untuk-basis-path-testing)

[Tabel 7.5 *Pseudocode* dari fungsi *update* profil	163](#tabel-7.5-pseudocode-dari-fungsi-update-profil)

[Tabel 7.6 Daftar kasus yang akan diuji pada fungsi *update* profil	165](#tabel-7.6-daftar-kasus-yang-akan-diuji-pada-fungsi-update-profil)

[Tabel 7.7 *Pseudocode* dari fungsi *add* kategori	165](#tabel-7.7-pseudocode-dari-fungsi-add-kategori)

[Tabel 7.8 Daftar kasus yang akan diuji pada fungsi *add* kategori	167](#tabel-7.8-daftar-kasus-yang-akan-diuji-pada-fungsi-add-kategori)

[Tabel 7.9 *Pseudocode* dari fungsi *update* kategori	167](#tabel-7.9-pseudocode-dari-fungsi-update-kategori)

[Tabel 7.10 Daftar kasus yang akan diuji pada fungsi *update* kategori	169](#tabel-7.10-daftar-kasus-yang-akan-diuji-pada-fungsi-update-kategori)

[Tabel 7.11 *Pseudocode* dari fungsi *delete* kategori	169](#tabel-7.11-pseudocode-dari-fungsi-delete-kategori)

[Tabel 7.12 Daftar kasus yang akan diuji pada fungsi *delete* kategori	171](#tabel-7.12-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-kategori)

[Tabel 7.13 *Pseudocode* dari fungsi *add* jilid	171](#tabel-7.13-pseudocode-dari-fungsi-add-jilid)

[Tabel 7.14 Daftar kasus yang akan diuji pada fungsi *add* jilid	173](#tabel-7.14-daftar-kasus-yang-akan-diuji-pada-fungsi-add-jilid)

[Tabel 7.15 *Pseudocode* dari fungsi *update* jilid	173](#tabel-7.15-pseudocode-dari-fungsi-update-jilid)

[Tabel 7.16 Daftar kasus yang akan diuji pada fungsi *update* jilid	175](#tabel-7.16-daftar-kasus-yang-akan-diuji-pada-fungsi-update-jilid)

[Tabel 7.17 *Pseudocode* dari fungsi *delete* jilid	175](#tabel-7.17-pseudocode-dari-fungsi-delete-jilid)

[Tabel 7.18 Daftar kasus yang akan diuji pada fungsi *delete* jilid	176](#tabel-7.18-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-jilid)

[Tabel 7.19 *Pseudocode* dari fungsi *add* penulis	177](#tabel-7.19-pseudocode-dari-fungsi-add-penulis)

[Tabel 7.20 Daftar kasus yang akan diuji pada fungsi *add* penulis	179](#tabel-7.20-daftar-kasus-yang-akan-diuji-pada-fungsi-add-penulis)

[Tabel 7.21 *Pseudocode* dari fungsi *update* penulis	179](#tabel-7.21-pseudocode-dari-fungsi-update-penulis)

[Tabel 7.22 Daftar kasus yang akan diuji pada fungsi *update* penulis	181](#tabel-7.22-daftar-kasus-yang-akan-diuji-pada-fungsi-update-penulis)

[Tabel 7.23 *Pseudocode* dari fungsi *delete* penulis	181](#tabel-7.23-pseudocode-dari-fungsi-delete-penulis)

[Tabel 7.24 Daftar kasus yang akan diuji pada fungsi *delete* penulis	183](#tabel-7.24-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-penulis)

[Tabel 7.25 *Pseudocode* dari fungsi *add halaqah*	183](#tabel-7.25-pseudocode-dari-fungsi-add-halaqah)

[Tabel 7.26 Daftar kasus yang akan diuji pada fungsi *add halaqah*	185](#tabel-7.26-daftar-kasus-yang-akan-diuji-pada-fungsi-add-halaqah)

[Tabel 7.27 *Pseudocode* dari fungsi *update halaqah*	185](#tabel-7.27-pseudocode-dari-fungsi-update-halaqah)

[Tabel 7.28 Daftar kasus yang akan diuji pada fungsi *update halaqah*	187](#tabel-7.28-daftar-kasus-yang-akan-diuji-pada-fungsi-update-halaqah)

[Tabel 7.29 *Pseudocode* dari fungsi *delete halaqah*	187](#tabel-7.29-pseudocode-dari-fungsi-delete-halaqah)

[Tabel 7.30 Daftar kasus yang akan diuji pada fungsi *delete halaqah*	189](#tabel-7.30-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-halaqah)

[Tabel 7.31 *Pseudocode* dari fungsi *add* jadwal	189](#tabel-7.31-pseudocode-dari-fungsi-add-jadwal)

[Tabel 7.32 Daftar kasus yang akan diuji pada fungsi *add* jadwal	191](#tabel-7.32-daftar-kasus-yang-akan-diuji-pada-fungsi-add-jadwal)

[Tabel 7.33 *Pseudocode* dari fungsi *update* jadwal	191](#tabel-7.33-pseudocode-dari-fungsi-update-jadwal)

[Tabel 7.34 Daftar kasus yang akan diuji pada fungsi *update* jadwal	193](#tabel-7.34-daftar-kasus-yang-akan-diuji-pada-fungsi-update-jadwal)

[Tabel 7.35 *Pseudocode* dari fungsi *delete* jadwal	193](#tabel-7.35-pseudocode-dari-fungsi-delete-jadwal)

[Tabel 7.36 Daftar kasus yang akan diuji pada fungsi *delete* jadwal	195](#tabel-7.36-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-jadwal)

[Tabel 7.37 Hasil pengujian *black box testing*	195](#tabel-7.37-hasil-pengujian-black-box-testing)

[Tabel 7.38 Hasil uji pada fungsi *update* profil	207](#no-1)

[Tabel 7.39 Hasil uji pada fungsi *add* kategori	207](#tabel-7.39-hasil-uji-pada-fungsi-add-kategori)

[Tabel 7.40 Hasil uji pada fungsi *update* kategori	208](#tabel-7.40-hasil-uji-pada-fungsi-update-kategori)

[Tabel 7.41 Hasil uji pada fungsi *delete* kategori	208](#tabel-7.41-hasil-uji-pada-fungsi-delete-kategori)

[Tabel 7.42 Hasil uji pada fungsi *add* jilid	209](#tabel-7.42-hasil-uji-pada-fungsi-add-jilid)

[Tabel 7.43 Hasil uji pada fungsi *update* jilid	209](#tabel-7.43-hasil-uji-pada-fungsi-update-jilid)

[Tabel 7.44 Hasil uji pada fungsi *delete* jilid	210](#tabel-7.44-hasil-uji-pada-fungsi-delete-jilid)

[Tabel 7.45 Hasil uji pada fungsi *add* penulis	211](#tabel-7.45-hasil-uji-pada-fungsi-add-penulis)

[Tabel 7.46 Hasil uji pada fungsi *update* penulis	211](#tabel-7.46-hasil-uji-pada-fungsi-update-penulis)

[Tabel 7.47 Hasil uji pada fungsi *delete* penulis	212](#tabel-7.47-hasil-uji-pada-fungsi-delete-penulis)

[Tabel 7.48 Hasil uji pada fungsi *add halaqah*	212](#tabel-7.48-hasil-uji-pada-fungsi-add-halaqah)

[Tabel 7.49 Hasil uji pada fungsi *update halaqah*	213](#tabel-7.49-hasil-uji-pada-fungsi-update-halaqah)

[Tabel 7.50 Hasil uji pada fungsi *delete halaqah*	213](#tabel-7.50-hasil-uji-pada-fungsi-delete-halaqah)

[Tabel 7.51 Hasil uji pada fungsi *add* jadwal	214](#tabel-7.51-hasil-uji-pada-fungsi-add-jadwal)

[Tabel 7.52 Hasil uji pada fungsi *update* jadwal	214](#tabel-7.52-hasil-uji-pada-fungsi-update-jadwal)

[Tabel 7.53 Hasil uji pada fungsi *delete* jadwal	215](#tabel-7.53-hasil-uji-pada-fungsi-delete-jadwal)

[Tabel 7.54 Kesimpulan dari pengujian *black box testing*	215](#tabel-7.54-kesimpulan-dari-pengujian-black-box-testing)

[Tabel 7.55 Kesimpulan dari pengujian *white box testing*	217](#tabel-7.55-kesimpulan-dari-pengujian-white-box-testing)

LAMPIRAN A HASIL WAWANCARA	222

LAMPIRAN B PENGUJIAN BLACK BOX	225

LAMPIRAN C PENGUJIAN WHITE BOX	238

1. ## **Latar Belakang** {#latar-belakang}

Karya ilmiah adalah hasil pemikiran seorang ilmuwan yang melibatkan studi pustaka, mengumpulkan pengalaman, penelitian, serta pengetahuan dari peneliti sebelumnya, dengan tujuan untuk mengembangkan ilmu pengetahuan, teknologi, dan seni. Brotowidjoyo (2002) berpendapat bahwa karya ilmiah adalah karangan ilmu pengetahuan yang menyajikan fakta umum dan ditulis secara metodologi penulisan yang baik dan benar, dan dapat dibuktikan apakah benar atau tidak dari ilmu pengetahuan yang diteliti. Penulisan karya ilmiah harus ditulis dengan konkret, formal, dan spesifik. The Liang Gie (2022) juga setuju dengan pendapat tersebut dan menambahkan bahwa karya ilmiah adalah tulisan yang membahas suatu topik ilmu pengetahuan, biasanya ditujukan kepada orang-orang yang bekerja atau terlibat dalam bidang tersebut.

Makalah adalah karya tulis ilmiah yang menyajikan suatu masalah dengan pembahasan berdasarkan data di lapangan yang bersifat empiris \- objektif. Pada umumnya, makalah ditulis untuk memenuhi tugas terstruktur untuk disajikan dalam forum ilmiah. Makalah mengkaji suatu masalah atau fenomena yang ditulis dengan sistematis dan diikuti analisis yang masuk akal dan bersifat objektif. Sistematika atau isi dari makalah terdiri dari tiga bab, yaitu pendahuluan, pembahasan dan kesimpulan.

Lembaga Tinggi Pesantren Luhur Malang merupakan sebuah lembaga pesantren diapit oleh tiga universitas negeri di Malang, yaitu Universitas Brawijaya, Universitas Negeri Malang dan Universitas Maulana Malik Ibrahim. Pesantren ini terletak di Jl. Raya Sumbersari No. 88 Malang. Lokasi pesantren yang terletak di tengah kampus menyebabkan pesantren ini hanya menerima santri tingkat mahasiswa. Dikarenakan Pesantren Luhur hanya berisi mahasiswa, cara berpikir dan metode belajar yang diterapkan dalam pesantren lebih independen. Pesantren luhur menerapkan metode mengajar yang mengombinasikan antara pengajaran klasik kitab kuning dengan pengajaran modern yang mencakup ilmu pengetahuan umum. Salah satu program kegiatan dari Pesantren Luhur yang menerapkan pengajaran modern adalah *halaqah*.

Dalam bahasa Arab kata *halaqah* memiliki definisi "lingkaran". Istilah lingkaran dalam dunia pendidikan islam mengacu pada sebuah kelompok belajar di mana setiap orang duduk melingkar dan berdiskusi bersama. Selama sesi berdiskusi terdapat orang yang memandu berjalannya diskusi tersebut. Kegiatan *halaqah* di Pesantren Luhur rutin diselenggarakan setiap hari, kecuali hari Minggu, di mana waktu pelaksanaannya setelah jemaah subuh dan *istighosah* selesai. Jalannya kegiatan *halaqah* masuk tanggung jawab tim Litbang (Penelitian dan Pengembangan). Tim Litbang merupakan salah satu departemen dari pengurus Pesantren Luhur. Sistem kegiatan *halaqah* diawali dengan memilih santriwan dan santriwati beserta judulnya yang akan dijadwalkan *halaqah* dalam dua minggu ke depan. Penentuan judul bagi santri tidak diperkenankan sesuai

dengan latar belakang disiplin ilmunya, hal ini berguna untuk memperkaya perspektif santri dari disiplin ilmu lain. Judul yang sudah disesuaikan kemudian diberikan kepada masing-masing santri. Santri diberi waktu dua minggu untuk masa pengerjaannya. Hasil pengerjaannya berupa dokumen presentasi dan makalah atau sering disebut dengan *paper halaqah*. Dokumen presentasi dan makalah yang telah dikerjakan oleh santri wajib dipresentasikan di depan seluruh santri Pesantren Luhur setelah jemaah subuh dan *istighosah* selesai. Setelah makalah dipresentasikan, dilanjutkan dengan sesi diskusi bersama seluruh santri. Pada tahap penutupan *halaqah*, tim Litbang merangkum hasil diskusi dan diakhiri dengan doa bersama sebagai penutup kegiatan.

Makalah yang sudah dipresentasikan santri diberikan kepada Litbang setelah kegiatan *halaqah* ditutup. Makalah yang diterima tim Litbang setiap harinya diseleksi untuk dijilid setiap enam bulan. Kumpulan makalah yang telah dijilid sering disebut sebagai “Percikan Ilmu Pengetahuan”. Makalah yang dihasilkan dari kegiatan *halaqah* secara konsisten menghasilkan 48 makalah *halaqah* setiap bulan dan 288 makalah setiap enam bulan. Makalah yang telah dijilid kemudian disimpan dalam lemari kantor Pesantren Luhur Malang. Kondisi ini menyebabkan penuhnya percikan yang disimpan di dalam lemari kantor sehingga tidak ada ruang lagi untuk menyimpan percikan tersebut.

Berdasarkan permasalahan tersebut penelitian ini berfokus dalam mengembangkan pengarsipan *halaqah* dalam bentuk *website* dengan objek penelitian di Lembaga Tinggi Pesantren Luhur Malang. Pengembangan sistem informasi pengarsipan *halaqah* menggunakan teknologi Laravel sebagai fondasi *website* dan MySQL untuk proses penyimpanan data. Mengembangkan sistem informasi pengarsipan *halaqah* dalam bentuk *website* dikarenakan *website* dapat diakses dalam berbagai jenis perangkat dan berbagai ukuran layar perangkat. Selain itu, Damian Ryan (2020) menyatakan *website* sangat cocok dikembangkan dalam fungsi pencarian dan pengisian *form* yang kompleks. Hal ini selaras dengan kebutuhan santri dalam mencari referensi pada makalah *halaqah* dan tim Litbang yang melakukan pengarsipan *halaqah*.

Pembahasan pada penelitian ini dimulai dari penggalian kebutuhan pengguna hingga proses pengembangan *website* dengan menerapkan salah satu metode pengembangan dari SDLC (*System Development Life Cycle*), yaitu menggunakan metode *Prototyping*. Model *Prototyping* adalah salah satu model pengembangan SDLC (*System Development Life Cycle*) yang menerapkan proses iterasi dan berfokus pada pembuatan prototipe (Mall, 2018). Menurut Pressman (2020) metode *Prototyping* dapat mempermudah pengembang untuk mengetahui kebutuhan pengguna dengan lebih spesifik. Keunggulan dari model pengembangan *Prototyping* adalah pengguna turut berperan aktif dalam pembuatan prototipe sehingga dapat meminimalkan kesalahan seiring proses pembuatan sistem tersebut. Kekurangan model *Prototyping* adalah pengguna bisa saja menganggap prototipe sebagai produk final, selain itu pembuatan prototipe yang terlalu fokus pada tampilan sehingga mengabaikan aspek fungsional  dari  sistem  (Sommerville,  2016).  Dalam  penelitian  ini  akan

memanfaatkan model *Prototyping* dalam analisis kebutuhan pengguna, baik berupa kebutuhan fungsional maupun non fungsional. Selama pelaksanaan *Prototyping* pengguna juga diberikan penjelasan terkait prototipe bahwa prototipe yang dibuat bukanlah produk final dan pengguna harus turut aktif dalam menentukan kebutuhan pengguna. Hal ini agar tidak terjadi miskomunikasi antara peneliti sebagai pengembang dengan pengguna selama proses pengembangan sistem berlangsung.

2. ## **Rumusan Masalah** {#rumusan-masalah}

1. Bagaimanakah  hasil  analisis  kebutuhan  pengguna  aplikasi  pengarsipan  
   *halaqah* berbasis *website* di Lembaga Tinggi Pesantren Luhur Malang?  
2. Bagaimanakah hasil pengujian aplikasi pengarsipan *halaqah* berbasis *website*  
   di Lembaga Tinggi Pesantren Luhur Malang?  
3. Apakah	hasil	implementasi	dapat	mempermudah	pengguna	dalam mengakses referensi percikan?

   3. ## **Tujuan** {#tujuan}

1. Melakukan  analisis  kebutuhan  pengguna  aplikasi  pengarsipan  *halaqah*  
   berbasis *website* di Lembaga Tinggi Pesantren Luhur Malang  
2. Melakukan  pengujian  terhadap  aplikasi  pengarsipan  *halaqah*  berbasis

   *website* di Lembaga Tinggi Pesantren Luhur Malang.

3. Melakukan uji coba untuk melihat apakah hasil implementasi dapat mempermudah pengguna dalam mengakses referensi percikan.

   4. ## **Manfaat** {#manfaat}

1. Bagi Lembaga Tinggi Pesantren Luhur Malang

   *Website* yang dihasilkan dari penelitian dapat mempermudah dalam pengarsipan dan pencarian judul *paper halaqah*, menyediakan kemudahan sumber informasi belajar, serta pengembangan literatur ilmu supaya para santri dapat belajar dengan lebih efektif juga efisien.

2. Bagi Universitas Brawijaya

   Penelitian ini menjadi referensi untuk penelitian selanjutnya untuk peneliti lain dengan tema yang berkaitan di masa mendatang, memberikan kontribusi sebagai tambahan literatur dan wawasan terkait pengembabngan teknologi inofrmasi berupa *website* pengarsipan *paper halaqah*.

3. Bagi Masyarakat

   Disediakannya hasil pengembangan teknologi informasi berupa *website* yang memiliki kemudahan untuk diakses oleh masyarakat umum sebagai media bahan pembelajaran ilmu agama.

   5. ## **Batasan Masalah** {#batasan-masalah}

1. Iterasi perbaikan ulang dalam elisitasi kebutuhan yang menggunakan metode *Prototyping* dibatasi maksimal lima iterasi. Hal ini karena iterasi tersebut sudah mewakili berbagai penelitian *prototyping* di lembaga pendidikan atau pesantren yang sudah ada.

2. *Stakeholder* merupakan pihak santri dan anggota tim Litbang.

   6. ## **Sistematika Pembahasan** {#sistematika-pembahasan}

1. BAB 1 PENDAHULUAN

   Pendahuluan berisi uraian mengenai latar belakang, rumusan masalah, tujuan penelitian, manfaat penelitian, batasan masalah, dan sistematika pembahasan. Bab ini merupakan awal mula dari penelitian yang dilakukan penulis.

2. BAB 2 LANDASAN KEPUSTAKAAN

   Landasan kepustakaan berisi uraian dan pembahasan tentang teori, konsep, metode, dan sistem dari pustaka ilmiah maupun referensi yang didapatkan.

3. BAB 3 METODOLOGI PENELITIAN

   Metodologi penelitian merupakan proses dan langkah-langkah penulis dalam menjalankan penelitian.

4. BAB 4 REKAYASA KEBUTUHAN

   Rekayasa kebutuhan berisi analisis dan spesifikasi kebutuhan pengguna maupun perangkat lunak dengan menggunakan *prototyping*, penentuan kebutuhan fungsional dan non-fungsional, pembuatan usecase diagram dan usecase *scenario*.

5. BAB 5 PERANCANGAN SISTEM

   Perancangan berisi rancangan-rancangan sistem, yang mempermudah proses pengembangan agar lebih efektif. Bab ini berisi rancangan struktur kelas, yaitu *class diagram*, desain alur sistem dari *sequence diagram* dan rancangan basis data.

6. BAB 6 IMPLEMENTASI

   Implementasi dari berisi kumpulan kode implementasi sistem informasi pengarsipan *halaqah* setiap fitur-fiturnya

7. BAB 7 PENGUJIAN  
   Pengujian *white box* dan *black box* diterapkan pada sistem informasi pengarsipan *halaqah* setelah program tersebut selesai dibuat. Proses perancangan dan pelaksanaan pengujian dijelaskan pada bab ini.  
8. BAB 8 KESIMPULAN DAN SARAN

   Kesimpulan dari keseluruhan hasil dan pembahasan serta saran rekomendasi hal-hal yang perlu dilakukan untuk mengembangkan penelitian pada masa mendatang.

# **BAB 2 LANDASAN KEPUSTAKAAN** {#bab-2-landasan-kepustakaan}

1. ## **Penelitian Terdahulu** {#penelitian-terdahulu}

*Website* pengelolaan dan pengarsipan *paper halaqah* Pesantren Luhur memiliki referensi yang mengacu pada penelitian terdahulu. Acuan tersebut sebagaimana dijelaskan pada Tabel 2.1.

**Tabel 2.1 Penelitian terdahulu**

| No. | Informasi Penelitian | Persamaan | Perbedaan |
| :---- | :---- | :---- | :---- |
| 1\. | **Judul**: PENGEMBANGAN SISTEM INFORMASI PENGELOLAAN DATA SANTRI DI PONDOK PESANTREN ASH- SHOFI BERBASIS WEB **Penulis**: Bunyamin **Nama Jurnal:** Jurnal Algoritma Sekolah Tinggi Teknologi Garut **Tahun Terbit:** 2015 | Objek penelitian berupa pondok pesantren. Menerapkan UML (*Unified Modelling Language*) seperti *usecase diagram, usecase scenario, activity diagram, sequence diagram* dan *class diagram*. Hasil pengembangan sistem informasi berupa *website* yang dikembangkan menggunakan bahasa PHP, CSS dan HTML dengan basis data MySQL. | Lokasi objek penelitian di pondok pesantren yang berbeda. Metodologi yang diterapkan menggunakan USDP (*Unified Software Development Process*) |

| No. | Informasi Penelitian | Persamaan | Perbedaan |
| :---- | :---- | :---- | :---- |
| 2\. | **Judul**: RANCANG BANGUN STIKI *CLASS FACILITIES E- COMPLAINT* **Penulis**: Ni Kadek Ariasih **Nama Jurnal:** LONTAR KOMPUTER **Tahun Terbit:** 2017 | Hasil pengembangan berupa *website* yang dikembangkan menggunakan bahasa PHP, CSS dan HTML dengan basis data MySQL. Menggunakan metodologi pengembangan *prototyping*. Membuat *prototyping* terlebih dahulu untuk mengetahui kebutuhan pengguna lebih spesifik. | Topik sistem informasi berupa pengaduan layanan terhadap fasilitas kelas. Dalam alur pengembangan terdapat pembuatan DFD. Tidak ada pengujian yang dijelaskan dalam jurnal tersebut. |
| 3\. | **Judul**: PENGEMBANGAN APLIKASI BERLATIH MEMBACA CEPAT BERBAHASA INGGRIS BERBASIS *PROGRESSIVE WEB APP* DENGAN METODE *PROTOTYPING* **Penulis**: Muhammad Fajar Alfath **Nama Jurnal:** Jurnal Teknologi Informasi dan Ilmu Komputer (JTIIK) **Tahun Terbit:** 2023 | Menggunakan metodologi pengembangan *prototyping*. Salah satu pengujian yang diterapkan menggunakan *black box testing*. | Topik sistem informasi berupa aplikasi berlatih membaca cepat. Aplikasi yang dikembangkan berupa Proressive Web Apps (PWA) |

| No. | Informasi Penelitian | Persamaan | Perbedaan |
| :---- | :---- | :---- | :---- |
| 3\. | **Judul**: PENGEMBANGAN APLIKASI BERLATIH MEMBACA CEPAT BERBAHASA INGGRIS BERBASIS *PROGRESSIVE WEB APP* DENGAN METODE *PROTOTYPING* **Penulis**: Muhammad Fajar Alfath **Nama Jurnal:** Jurnal Teknologi Informasi dan Ilmu Komputer (JTIIK) **Tahun Terbit:** 2023 | Menggunakan metodologi pengembangan *prototyping*. Salah satu pengujian yang diterapkan menggunakan *black box testing*. | Topik sistem informasi berupa aplikasi berlatih membaca cepat. Aplikasi yang dikembangkan berupa Proressive Web Apps (PWA) |
| 4\. | **Judul**: PENGUJIAN *BLACK BOX* MENGGUNAKAN TEKNIK *EQUIVALENCE PARTITIONS* PADA *APLIKASI E- LEARNING* BERBASIS WEB **Penulis**: Amanda Amalia **Nama Jurnal:** Building of Informatica, Technology and Science (BITS) **Tahun Terbit:** 2021 | Melakukan pengujian *black box* dengan metode E*quivalance Partitioning* pada aplikasi berbasis web. | Penelitian yang dilakukan hanya berfokus pada pengujian *black box*, bukan pengembangan. |

| No. | Informasi Penelitian | Persamaan | Perbedaan |
| :---- | :---- | :---- | :---- |
| 5\. | **Judul**: PENGEMBANGAN APLIKASI WEB *TRACER STUDY* FAKULTAS ILMU KOMPUTER UNIVERSITAS BRAWIJAYA MENGGUNAKAN METODE PROTOTIPE **Penulis**: Alfa Yolanda Putri Yulianti **Nama Jurnal:** Jurnal Pengembangan Teknologi Informasi dan Ilmu Komputer (J-PTIIK) **Tahun Terbit:** 2019 | Menggunakan metodologi pengembangan *prototyping*. Menerapkan UML (*Unified Modelling Language*) seperti *usecase diagram, usecase scenario, activity diagram, sequence diagram* dan *class diagram*. Hasil pengembangan sistem informasi berupa *website* yang dikembangkan menggunakan Laravel yang berbasis bahasa PHP, CSS dan HTML dengan basis data MySQL. Salah satu pengujian yang digunakan adalah pengujian *black box* dengan metode *Cyclomatic Complexity*. | Topik sistem informasi berupa aplikasi *tracer study* berbasis web. Lokasi objek penelitian terletak di Fakultas Ilmu Komputer Universitas Brawijaya Malang. |

2. ### ***Website*** {#website}

*Website* merupakan sebuah media yang memiliki banyak halaman yang saling terhubung (*hyperlink*), di mana *website* memiliki fungsi dalam memberikan informasi berupa teks, gambar, video, suara dan animasi atau penggabungan dari semuanya (Elgamar, 2020). Adanya *website* tentu tidak akan lepas dengan bahasa pemrograman karena *website* sendiri dibentuk dari satu atau lebih bahasa pemrograman. *Website* biasanya ada yang memerlukan basis data, ada yang tidak. *Website* yang tidak membutuhkan basis data biasanya tidak memiliki fitur yang kompleks. Sedangkan *website* yang membutuhkan basis data, memiliki

fitur yang kompleks atau memiliki data yang saling berelasi dan perlu disimpan dalam basis data.

Beberapa bahasa pemrograman yang akan digunakan penulis dalam membangun *website* untuk penelitian ini adalah: HTML, CSS, *Javascript*, dan PHP. Untuk implementasi basis data, akan menggunakan MySQL.

3. ## **Profil Pesantren dan Kegiatan *Halaqah*** {#profil-pesantren-dan-kegiatan-halaqah}

Lembaga Tinggi Pesantren Luhur Malang merupakan sebuah lembaga pesantren diapit oleh tiga universitas negeri di Malang, yaitu Universitas Brawijaya, Universitas Negeri Malang dan Universitas Maulana Malik Ibrahim. Pesantren ini terletak di Jl. Raya Sumbersari No. 88 Malang. Dikarenakan Pesantren Luhur hanya berisi mahasiswa, cara berpikir dan metode belajar yang diterapkan dalam pesantren lebih independen. Selain dari cara berpikir yang lebih independen, para santri yang berasal dari berbagai universitas di Malang dapat meningkatkan solidaritas para santri. Keberagaman ini sesuai dengan semboyan Pesantren Luhur, yaitu *Triple Co*. Terdapat tiga simbol kata dari *Triple Co* yang dijadikan prinsip oleh para santri, yaitu *Co Ownership*, *Co Responbility*, dan *Co Determination*. *Co Ownership* memiliki arti rasa saling memiliki sesama santri Pesantren Luhur. Rasa saling memiliki yang tumbuh di antara para santri membuat setiap tantangan terasa lebih ringan dan setiap kebahagiaan menjadi lebih berarti. *Co Responbility* memiliki arti rasa saling bertanggung jawab. Adanya rasa saling bertanggung jawab membuat setiap anggota merasa memiliki peran penting dalam mencapai tujuan bersama. *Co Determination* memiliki arti rasa saling menentukan. Keputusan yang diambil dari suatu hal selalu mencerminkan rasa saling menentukan, memastikan setiap suara didengar dan dihargai dalam prosesnya.

Terdapat banyak kegiatan yang diadakan di Lembaga Tinggi Pesantren Luhur. Banyaknya kegiatan tersebut dibagi menjadi tiga macam, yaitu kegiatan tahunan dan kegiatan wajib. Kegiatan tahunan memiliki empat macam kegiatan. Kegiatan tahunan yang pertama adalah Ziarah Wali. Ziarah wali merupakan suatu kegiatan di mana para santri berkunjung ke makam para wali dan pendiri pesantren luhur. Tradisi ini dilakukan untuk menghormati jasa-jasa para wali dalam penyebaran agama islam serta jasa-jasa pendiri pesantren luhur dalam mendirikan pesantren. Pawai 17 Agustus merupakan kegiatan tahunan kedua yang diadakan setiap tanggal 17 Agustus. Dalam kegiatannya, pesantren mengadakan lomba-lomba yang hanya diikut santri dan parade yang mengelilingi lingkungan warga dengan rute yang telah ditentukan. Kegiatan ketiga, yaitu Festival Ramadan, merupakan kegiatan untuk menyambut bulan Ramadan dengan sukacita. Pada umumnya, kegiatan ini mengadakan lomba-lomba untuk setiap blok kamar dan ditampilkan di panggung setiap haru sabtu dan minggu. Lomba-lomba yang diadakan biasanya berupa lomba pidato, *banjari*, drama, dll. Kegiatan yang terakhir adalah *Haul* dan *Harlah*. *Haul* merupakan kegiatan memperingati hari kematian seseorang. Dalam hal ini *haul* diadakan untuk memperingati wafatnya Almaghfurlah Prof. Dr. Kyai H. Achmad Mudlor S.H sebagai pendiri Lembaga

Tinggi Pesantren Luhur Malang (LTPLM). Sedangkan *harlah* diadakan untuk meperingati hari berdirinya Pesantren Luhur.

Kegiatan wajib dalam pesantren hampir sama dengan kegiatan pesantren lain. Kegiatan tersebut merupakan kegiatan jemaah salat subuh dan magrib disertai dengan *istighosah* (zikir bersama) setelah salat jemaah, pengajian kitab kuning di waktu asar (sore hari) dan isya’ (malam hari), pengajian *Madrasah Diniyyah At – Tahdzibiyyah* di waktu isya’ (malam hari) dan *halaqah* ilmiah yang dilaksanakan setelah *istighosah* salat subuh.

Salah satu kegiatan wajib dari Pesantren Luhur adalah *halaqah*, di mana alur dari kegiatan ini dimulai dengan dengan pemilihan santri sebanyak 24 orang oleh tim Litbang (Penelitan dan Pengembangan) untuk diberikan judul *halaqah* selama dua minggu ke depan. Selanjutnya, tim Litbang membuat judul dan menyesuaikannnya kepada masing-masing santri. Adapun ketentuan pemilihan santri dan judul *halaqah* sebagai berikut:

1. Judul diusahakan tidak diperkenankan sesuai dengan latar belakang disiplin ilmunya. Hal ini berguna agar dapat memperkaya perspektif santri dari disiplin ilmu lain.

2. Diutamakan menggunakan judul dari pendiri Lembaga Tinggi Pesantren Luhur Malang, yaitu Prof. Dr. K.H. Ahmad Mudlor S.H.

3. Diusahakan santri belum pernah mendapat jadwal *halaqah* sebelumnya dan jadwal *halaqah* tidak bentrok dengan jadwal kuliah santri.

Judul yang telah ditentukan untuk memperkaya wawasan santri dari disiplin ilmu lain kemudian diberikan waktu dua minggu untuk mempelajari dan mengerjakannya. Hasil pengerjaannya berupa materi presentasi dan makalah atau sering disebut dengan *paper halaqah* yang kemudian dipresentasikan di kegiatan *halaqah* sesuai jadwal yang telah ditentukan.

Selama masa pengerjaan, adakalanya santri membutuhkan referensi di kantor Pesantren Luhur Malang. Di dalam kantor tersebut terdapat lemari yang berisikan kumpulan *paper halaqah* yang dijilid tiap semester. *Paper* yang dijilid sering disebut sebagai Percikan. Untuk melihat isi buku tersebut, santri perlu izin tim Litbang karena hanya Litbang yang mempunyai akses lemari dan katalog referensi tersebut. Selain itu, santri juga dilarang membawa keluar makalah yang telah dijilid. Satu hal yang diperbolehkan untuk santri ketika ingin mendapatkan materi yang ada di Percikan, yaitu memfoto materi referensi yang telah mereka dapatkan.

Ketika tiba waktu presentasi *halaqah*, santri wajib mempresentasikan materi *halaqah* yang telah didapatkannya serta memberikan *paper* (makalah) dan presentasi dalam bentuk dokumen digital kepada tim Litbang. Masing-masing santri diberikan batas waktu presentasi selama 10 menit. Setelah presentasi, diadakan diskusi bersama dengan seluruh santri yang mengikuti jemaah salat subuh. Setiap 6 bulan, tim Litbang menyortir *paper halaqah* mana yang layak untuk diarsipkan. *Paper halaqah* yang layak nantinya akan dijilid dan disimpan di

lemari referensi yang terdapat di kantor Pesantren Luhur Malang. Oleh karena itu, penelitian ini berfokus dalam membantu pihak pesantren untuk menyediakan ruang pengarsipan dan pencarian referensi dalam bentuk digital, yaitu *website* pengarsipan *paper halaqah* Lembaga Tinggi Pesantren Luhur Malang (LTPLM).

4. **Model *Prototyping***

Penemuan masalah perlu digali lebih dalam, untuk menentukan cocok tidaknya dijadikan penelitian. Masalah dari latar belakang pada bab sebelumnya digali menggunakan wawancara dan observasi, namun dalam proses wawancara, pihak kepentingan tidak sepenuhnya paham dengan kebutuhannya. Hal ini membuat penulis menerapkan model *Prototyping*. *Prototyping* merupakan versi awal perangkat lunak yang dirancang untuk mendemonstrasikan konsep, mengeksplorasi desain dan menggali suatu masalah dan kemungkinan solusi (Sommerville, 2016). Meskipun *prototyping* dapat digunakan sebagai model proses yang berdiri sendiri, *prototyping* lebih sering digunakan sebagai teknik yang dapat diimplementasikan dalam model proses lain (Pressman dan Maxim, 2020). Dalam penelitian ini *Prototyping* diimplementasikan pada tahap Analisis Kebutuhan. Penerapan model *Prototyping* dalam penelitian ini berfungsi membantu proses elisitasi dan analisis kebutuhan sistem.  
![][image1]

**Gambar 2.1 Diagram metode *Prototyping***

Sumber : Rajib Mall (2018)

Pada Gambar 2.1 proses pembuatan *prototyping* dimulai dengan bertemu dan komunikasi dengan pengguna. Hal ini berguna untuk mendefinisikan tujuan perangkat lunak dan tujuan dibuatnya prototipe, serta identifikasi persyaratan. Setelah pendefinisian tujuan dilanjutkan dengan perencanaan dan pemodelan desain cepat. Dalam tahap ini desain berfokus pada representasi aspek perangkat lunak yang akan terlihat oleh pengguna. Ketika perencanaan desain cepat sudah siap dilanjutkan dengan pembuatan prototipe. Pada tahap akhir, prototipe yang sudah jadi dievaluasi oleh pemangku kepentingan. Jika terdapat kebutuhan baru yang perlu ditambahkan, maka proses *prototyping* kembali ke tahap awal dengan versi terbaru. Sebaliknya, jika tidak ada kebutuhan yang perlu

ditambahkan lagi, maka proses *prototyping* telah selesai. Pada penelitian ini, proses *prototyping* yang selesai dilanjutkan ke tahap Desain.

5. ## **Laravel** {#laravel}

Dalam dunia pengembangan *website*, terdapat beberapa bahasa yang dapat digunakan untuk membuat *website*, salah satunya adalah bahasa PHP. Selain itu, proses pengembangan aplikasi yang terbuat dari web dapat dengan mudah dikerjakan dengan bantuan *framework*. Laravel merupakan *framework* yang dibuat dari bahasa PHP guna meringankan dan memperpendek waktu dalam membuat *website*. *Framework* ini dibuat dengan pendekatan *Model View Controller* (MVC), yang membagi tugas antara tampilan dan penyimpanan data. Dengan menggunakan Laravel, pengembang dapat fokus pada logika bisnis dari aplikasi mereka tanpa harus menghabiskan banyak waktu untuk menangani tugas-tugas rutin seperti autentikasi pengguna, pengelolaan *database*, dan *routing*.

Salah satu keunggulan utama Laravel adalah ketersediaan fitur-fitur bawaan yang komprehensif, seperti sistem *routing* yang fleksibel, sistem template Blade yang intuitif, dan ORM (*Object-Relational Mapping*) *Eloquent* yang powerful. *Eloquent* memudahkan pengembang untuk berinteraksi dengan *database* menggunakan sintaks yang sederhana dan mudah dipahami. Selain itu, Laravel juga menyediakan alat migrasi *database* yang memungkinkan pengembang untuk mengubah dan memigrasi skema *database* dengan mudah seiring dengan perkembangan aplikasi.

Laravel juga dikenal dengan komunitasnya yang besar dan aktif, yang menyediakan banyak sekali dokumentasi, tutorial, dan paket-paket tambahan yang dapat memperluas fungsionalitas *framework* ini. Dengan dukungan dari komunitas ini, developer dapat menemukan solusi untuk berbagai macam tantangan teknis yang mereka hadapi selama proses pengembangan. Laravel juga terus diperbarui dengan fitur-fitur baru dan peningkatan performa, yang menjadikannya salah satu pilihan utama bagi developer web di seluruh dunia.

Selain itu, Laravel hadir dengan berbagai alat pengujian dan *debugging* yang membantu pengembang memastikan bahwa aplikasi mereka bebas dari *bug* dan berjalan dengan lancar. Fitur seperti PHPUnit untuk pengujian unit dan Laravel Telescope untuk *debugging* memberikan kepercayaan diri kepada developer dalam mengelola dan memelihara aplikasi mereka. Hal ini sangat penting dalam menciptakan aplikasi yang handal dan *scalable*.

Secara keseluruhan, Laravel adalah *framework* yang sangat efektif dan efisien untuk pengembangan aplikasi web. Dengan sintaks yang elegan, dokumentasi yang lengkap, dan ekosistem yang mendukung, Laravel memungkinkan developer untuk menciptakan aplikasi web yang canggih dan berkualitas tinggi dalam waktu yang relatif singkat. Bagi developer yang mencari alat yang kuat dan fleksibel untuk proyek web mereka, Laravel adalah pilihan yang sangat baik.

6. ### ***Unified Modelling Language*** **(UML)** {#unified-modelling-language-(uml)}

UML merupakan pemodelan secara visual dengan maksud untuk mendapat spesifikasi dari kebutuhan yang diperoleh, mengembangkan dan merekam artefak dari sistem yang dikembangkan (Rumbaugh et al., 2004). Penulis menerapkan beberapa UML dalam penelitian ini sebagai berikut :

1. ##### ***Use Case Diagram*** {#use-case-diagram}

*Use case diagram* adalah diagram yang berisi sekumpulan *use case*. *Use case* merepresentasikan fungsionalitas yang dimiliki oleh sistem, aktor yang terlibat dalam sistem dan interaksi antara aktor dengan *use case* pada sistem yang bekerja dengan situasi tertentu dalam mencapai tujuan yang ditentukan (Rumbaugh et al., 2004). Simbol-simbol yang terdapat pada *use case diagram* ditunjukkan pada [Tabel 2.2](#tabel-2.2-daftar-komponen-use-case-diagram-beserta-deskripsinya-\(a.-s.-dan-shalahuddin,-2018\)).

**Tabel 2.2 Daftar komponen *use case diagram* beserta deskripsinya** (A. S. dan Shalahuddin, 2018\)

| Nama | Deskripsi |
| ----- | ----- |
| ![][image2] | ***Use case***, kumpulan skenario sistem dalam menggapai tujuan |
|  ![][image3] | **Aktor**, pengguna sistem |
|  ![][image4] | **Asosiasi**, representasi komunikasi antara *use case* dan aktor |
|  ![][image5] | **Generalisasi**, hubungan *use case* yang identik dengan *use case* lain. Aktor juga dapat melakukan generalisasi |
|   ![][image6] | ***Extend*** adalah hubungan antara *use case* yang menjadi pelengkap dengan *use case* utama. *Use case* utama dapat bersifat independen. Arah panah mengarah pada *use case* utama |

**Tabel 2.2 Daftar komponen *use case diagram* beserta deskripsinya (Lanjutan)**

| Nama | Deskripsi |
| ----- | ----- |
|  ![][image7] | ***Include*** adalah hubungan antara *use case* pelengkap dengan *use case* utama dimana *use case* utama bergantung pada *use case* tambahan. |

2. ##### ***Class Diagram*** {#class-diagram}

Dalam merepresentasikan elemen-elemen deklaratif secara statis dapat menggunakan *class diagram*. Tujuan dari diagram ini untuk mendeskripsikan objek dan hubungan antar objek yang ada. Komponen yang dimiliki *class diagram* diuraikan pada Tabel 2.3.

**Tabel 2.3 Daftar komponen *class diagram* beserta deskripsinya**

| Nama | Deskripsi |
| ----- | ----- |
|  ![][image8] | **Nama\_kelas** merupakan objek dari sistem. **Atribut** bertujuan menampilkan karakterisitik dari kelas. **Operasi** merupakan perilaku kelas. |
|  ![][image9] | **Asosiasi** adalah relasi antar kelas. |
|  ![][image10] | **Dependensi** adalah representasi relasi kelas yang butuh kelas lain sebagai parameter. |
|  ![][image11] | **Generalisasi** adalah representasi relasi kelas anak dan kelas induk |
|  ![][image12] | **Komposisi** representasi relasi antar kelas yang saling bergantung |
|  ![][image13] | **Agregasi** representasi relasi antar kelas yang tidak saling bergantung. |

3. ##### ***Sequence Diagram*** {#sequence-diagram}

Diagram *sequence* merupakan diagram yang menunjukkan transisi suatu *events* dari satu objek ke objek lainnya. Diagram ini juga mempresentasikan *class-class* utama dan *events* yang mengalir dari satu *class* ke *class* lainnya (Pressman dan Maxim, 2020). Singkatnya, diagram *sequence* menunjukkan interaksi antara aktor dengan sistem dan antara komponen-komponen sistem.

Adapun komponen-komponen yang digunakan dalam perancangan diagram  
*sequence* ditunjukkan pada [Tabel 2.4](#tabel-2.4-komponen-dari-sequence-diagram).

**Tabel 2.4 Komponen dari *sequence diagram***

| Simbol | Deskripsi |
| ----- | ----- |
|  ![][image14]  Atau nama aktor Tanpa waktu aktif | **Aktor** dapat dimaknai sebagai orang, proses, atau sistem lain yang berada di luar sistem informasi yang akan dibuat. |
|  | ***Lifeline*** **(Garis hidup)** sering diilustrasikan dengan garis putus- putus. Memiliki fungsi menggambarkan aktivitas suatu obyek. |
|  Nama obyek : nama kelas | **Obyek** merupakan sebuah obyek yang berinteraksi dengan pesan. |
|   | ***Activation*** **box (Waktu aktif)** merupakan sebuah tanda bahwa komponen manapun yang terhubung dengan *activation* box menjadi aktif dan saling berinteraksi satu sama lain. |
|  \<\<create\>\> | ***Create message*** **(Pesan tipe *create*)** menunjukkan bahwa objek baru sedang dalam proses pembentukan. Arah panah dari pesan ini mengarah kepada obyek baru yang akan dibuat. |
|  1:nama\_method() | ***Call or Function message*** **(Pesan tipe call)** menunjukkan obyek yang memanggil fungsi dari obyek lain, bisa juga memanggil fungsi dari obyek itu sendiri. |

**Tabel 2.4 Komponen diagram *sequence* (Lanjutan)**

| Simbol | Deskripsi |
| ----- | ----- |
| 1:masukan | ***Send message*** **(Pesan tipe kirim)** menunjukkan bahwa data (bisa juga masukan atau informasi) dikirm oleh obyek ke obyek lain. Obyek yang menerima informasi menjadi titik tujuan panah tersebut. |
| 1:keluaran | ***Return message*** **(Pesan tipe kembali)** merupakan pesan ketika fungsi telah dijalankan dan menghasilkan respons yang perlu dikembalikan pada obyek pengirim. |
| \<\<destroy\>\> | ***Destroy message*** **(Pesan dihancurkan)** menandakan bahwa objek telah dihancurkan. *Destroy message* harus ada ketika *create message* dibuat. |

7. ### ***Entity Relationship Diagram*** **(ERD)** {#entity-relationship-diagram-(erd)}

*Entity Relationship Diagram* (ERD) merupakan bentuk grafis yang digunakan untuk menggambarkan entitas, atribut, dan hubungan antara entitas dalam suatu basis data. ERD berguna memvisualisasikan struktur basis data dengan jelas dan merinci. Proses penyimpanan data, akses data dan memanipulasi data dapat dianalisis secara keseluruhan dengan melihat ERD (Pressman dan Maxim, 2020). Dalam ERD, terdapat berbagai macam simbol yang dapat diterapkan sebagaimana dijelaskan pada tabel [Tabel 2.5](#tabel-2.5-komponen-entity-relationship-diagram).

**Tabel 2.5 Komponen *Entity Relationship Diagram***

| Nama | Deskripsi |
| ----- | ----- |
|    | ***Entity***, merupakan tempat menyimpan data. Dalam penerapan basis data entitas merupakan tabel. Dalam ERD, entitas berbentuk persegi empat. Nama dalam entitas seringkali menggunakan kata benda, sebelum menjadi nama tabel. |

**Tabel 2.5 Komponen *Entity Relationship Diagram* (Lanjutan)**

| Nama | Deskripsi |
| ----- | ----- |
|    | ***Entity***, merupakan tempat menyimpan data. Dalam penerapan basis data entitas merupakan tabel. Dalam ERD, entitas berbentuk persegi empat. Nama dalam entitas seringkali menggunakan kata benda, sebelum menjadi nama tabel. |
|   | ***Field***, seringkali disebut sebagai atribut. *Field* merupakan data yang disimpan dalam entitas. Dalam penerapan basis data atribut sering berbentuk kolom pada tabel. |
|  Field1 | ***Primary key***, salah satu jenis atribut. Biasanya digunakan sebagai kunci akses *record* yang diinginkan. |
|   | ***Multivalued Attributes***, merupakan salah satu atribut yang memiliki nilai lebih dari satu. |
|   | **Relasi**, berfungsi menghubungkan antar entitas. Penamaan pada relasi sering menggunakan kata kerja. |
|   | ***Association***, menguhubungkan antar relasi dengan entitas. |

8. ## **Pengujian** {#pengujian}

Pengujian sistem adalah serangkaian proses yang dirancang untuk memastikan program komputer melakukan apa yang seharusnya dilakukan, dan sebaliknya, untuk memastikan bahwa program tidak melakukan apa yang tidak diharapkan.

Tugas utama seorang penguji adalah menemukan *bug* sebanyak mungkin dan mencari tahu bagaimana mereka muncul. Jadi dapat dikatakan bahwa pengujian (*testing*) adalah proses mengeksekusi suatu program dengan tujuan untuk menemukan *bug*. Pengujian adalah proses penting dalam siklus pengembangan perangkat lunak untuk memastikan kualitas perangkat lunak. Pengujian yang diterapkan pada penelitian ini adalah *black box testing, white box testing* dan uji kompatibilitas.

1. ##### ***Black Box Testing*** {#black-box-testing}

*Black box testing* yang juga disebut *behavioral testing* atau *functional testing*, berfokus pada persyaratan fungsional dari perangkat lunak tersebut. *Black box testing* tidak menguji desain dan kode program, melainkan menguji apakah fungsi-fungsi, masukan, dan keluaran sistem memenuhi spesifikasi yang dibutuhkan. Dalam pengujian ini, penguji mengetahui apa yang harus dilakukan oleh program, tetapi tidak memiliki pengetahuan tentang bagaimana melakukannya. Menurut Pressman (2020) terdapat tiga macam metode B*lack Box Testing,* yaitu *Interface Testing, Equivalence Testing* dan *Boundary Value Analysis*. Penelitian ini *menerapkan black box testing* dengan menggunakan metode *Equivalence Partitioning.*

*Equivalence partitioning* merupakan metode *Black Box Testing* yang membagi domain masukan program ke dalam beberapa grup di mana pengujian dilakukan. Pengujian ini dapat mengetahui bermacam-macam *error* (misalnya, salahnya pemrosesan karakter dari masukan yang diberikan) yang mungkin memerlukan banyak uji coba untuk dieksekusi sebelum kesalahan umum diamati oleh pengguna sebenarnya.

Desain pengujian *equivalence partitioning* berdasar pada evaluasi *equivalence class* untuk kondisi masukan datanya. *Equivalence class* mewakili status valid tidaknya data masukan. Data masukan biasanya berupa nilai numerik tertentu, rentang nilai, kumpulan nilai terkait, atau kondisi boolean.

2. ##### ***White Box Testing*** {#white-box-testing}

Pengujian *white box* merupakan salah satu bentuk pengujian perangkat lunak yang menitikberatkan pada pemeriksaan struktur internal dan rincian implemetasi perangkat lunak. Fungsi pengujian *white box* adalah menjamin komponen berupa fungsi-fungsi, pernyataan, percabangan dan jalur kode diuji secara lengkap dan menyeluruh. Terdapat enam macam teknik pengujian dalam *white box testing* menurut Pressman, yaitu:

1. *Statement Coverage*

   Teknik *statement coverage* memeriksa setiap pernyataan dalam kode apakah ada kode yang tidak terpakai atau tidak terjangkau. Dalam pelaksanaannya, teknik ini dapat dijalankan minimal satu kali pengujian.

   2. *Branch Coverage*

   Teknik ini menguji keputusan-keputusan atau percabangan dalam kode baik kondisi *true* (benar) maupun *false* (salah).

      3. *Path Coverage*

   Teknik ini melakukan pengujian pada semua jalur yang terlibat dalam kode mencakup *loop* (perulangan) maupun *nested* (kondisi bersarang).

   Teknik ini memastikan pernyataan dan kondisi yang bervariasi dapat dieksekusi dengan baik.

         4. *Condition Coverage*

   Teknik ini melakukan pemeriksaan kondisi *Boolean* dan mengevaluasi perubahan kondisi dalam kode implementasi.

         5. *Loop Coverage*

   *Loop coverage* melakukan uji coba kode dalam kasus *looping* (perulangan). Dalam prosesnya, teknik ini memastikan apakah kode dapat berjalan dengan baik ketika dieksekusi nol kali, satu kali dan beberapa kali.

         6. *Data Flow Testing*

   Mengecek variabel, inisialisasi, pendefinisian dan aliran data program dilakukan pada teknik data flow *testing*. Teknik ini berfungsi untuk menguji bermacam-macam skenario aliran data.

*Cyclomatic complexity* merupakan metrik kualitas perangkat lunak yang digunakan untuk menemukan kompleksitas logis dari sebuah perangkat lunak dengan mempertimbangkan *Control Flow Graph* (CFG). Metrik ini diperkenalkan oleh Thomos J. McCube pada tahun 1976 dan termasuk dalam *path testing*. Angka *Cyclomatic* dapat didefinisikan dengan merepresentasikan sebuah program sebagai *Flow Graph*. *Flow graph* terdiri dari *node*, yang mewakili pernyataan pemrosesan, sedangkan *edge* mewakili aliran kontrol antar *node*.

# **BAB 3 METODOLOGI** {#bab-3-metodologi}

Metode penelitian menerapkan metode pengembangan dari *SDLC (System Development Life Cycle)* yaitu *Prototyping*. Diagram alur yang diterapkan penulis ditampilkan dalam gambar 3.1.

**Gambar 3.1 Diagram alur metode penelitian**

1. ## **Pengumpulan Data Analisis Kebutuhan** {#pengumpulan-data-analisis-kebutuhan}

Tahap analisis kebutuhan nantinya akan dilakukan elisitasi dengan menggunakan metode *Prototyping*. Langkah penerapan *prototyping* dilakukan sesuai dengan diagram yang dijelaskan pada bab 2\. Langkah awal dari *prototyping* adalah komunikasi. Komunikasi dilakukan dengan berdiskusi antara penulis dan pengguna untuk pemahaman dan penentuan tujuan dibuatnya prototipe. Tujuan dibuatnya prototipe dalam tahap Analisis Kebutuhan adalah untuk menentukan kebutuhan fungsional dan non-fungsional sistem. Langkah selanjutnya, yaitu *Quick Plan* dan *Quick Design* dimulai dengan menentukan kebutuhan inti sistem dan diterapkan dalam bentuk *high fidelity design,* yaitu *mockup*. Dalam tahap pembuatan *prototyping*, bentuk *prototyping* yang dibuat adalah *wireframe*. Ketika prototipe sudah dibuat, prototipe dievaluasi oleh pengguna. Apabila terdapat penambahan kebutuhan baru, maka dilakukan iterasi pada proses *prototyping* (kembali ke tahap awal *prototyping*). Sebaliknya jika pengguna menyetujui hasil prototipe, maka daftar kebutuhan yang didapat dari prototipe dirangkum dan dipaparkan secara lebih terperinci dalam bentuk kebutuhan fungsional dan non fungsional. Setelah kebutuhan fungsional dan non fungsional, dilanjutkan dengan merancang *use case diagram*, *use case scenario* dan ERD (*Entity Relationship Diagram*). Langkah awal dalam tahap ini dimulai dengan *use case diagram*. *Use case diagram* dibuat berdasarkan daftar kebutuhan fungsional dan non-fungsional yang telah dibuat pada tahap sebelumnya. Setelah *use case* dibuat dilanjutkan dengan *use case scenario* di mana alur-alur interaksi antara user dengan sistem dijelaskan pada *use case scenario*. Tahap terakhir dari analisis kebutuan, peneliti membuat ERD, yang berguna untuk menentukan struktur basis data agar lebih efisien.

2. ## **Perancangan Sistem** {#perancangan-sistem}

Tahap perancangan ini penulis membuat rancangan dalam bentuk pemodelan UML (*Unified Modelling Language*), prototipe dan ERD (*Entity Relationship Diagram*). Pemodelan UML dalam penelitian ini menggunakan *class diagram* dan *sequence diagram*. *Use case scenario* yang telah dibuat dijadikan dasar dari pembuatan *class diagram*. Saat *class*\-*class* telah ditentukan dan dirancang, *class*\-*class* dan *scenario* tersebut dibuat gambaran alur sistemnya, proses ini dinamakan pembuatan *sequence diagram*. Selanjutnya, penulis mendesain PDD (*Pyshical Data Design*) yang berfungsi mendeskripsikan struktur tabel lebih detail seperti tipe data dari kolom tabel.

Langkah terakhir, yaitu penulis membuat prototipe dalam *mock-up*. Prototipe yang dibuat dalam tahap ini memiliki tujuan yang berbeda dengan prototipe pada tahap sebelumnya. Tujuan prototipe di sini adalah untuk memberikan gambaran antarmuka sistem dengan detail, yang disertai komponen-komponen antarmuka (seperti tombol, tabel, warna). Prototipe yang selesai dibuat dapat dilanjutkan ke tahap Implementasi Sistem.

3. ## **Implementasi** {#implementasi}

Pengembangan aplikasi *website* ini menggunakan *framework* Codeigniter yang merupakan *framework* dari bahasa PHP (*Hypertext PreProcessor*). *Framework* ini diterapkan untuk bagian server. Antarmuka dari *website* ini dikembangkan menggunakan *framework* Bootstrap dan untuk basis data menggunakan bahasa MySQL.

4. ## **Pengujian** {#pengujian-1}

Tahap pengujian merupakan tahap di mana pengujian dilakukan ketika salah satu fitur selesai dikembangkan. Pengujian ini menggunakan *Whitebox Testing* dan *Blackbox Testing*.

5. ## **Kesimpulan dan Saran** {#kesimpulan-dan-saran}

Tahap kesimpulan dan saran merupakan tahap terakhir dari penelitian ini. Tahap ini dibagi dua bagian: kesimpulan dan saran. Kesimpulan berisi pernyataan singkat terkait hasil penelitian yang diperoleh berdasarkan tujuan yang sudah ditentukan. Bagian ini juga mencerminkan jawaban dari pertanyaan yang dirumuskan dalam rumusan masalah. Saran berisi pernyataan ringkas tentang masalah atau hal yang dapat dilakukan untuk mengembangkan penelitian ini lebih lanjut.

# **BAB 4 REKAYASA KEBUTUHAN** {#bab-4-rekayasa-kebutuhan}

Data dari hasil wawancara dengan satu pihak Litbang dan satu pihak santri disertai observasi selama kegiatan berlangsung dibutuhkan untuk menetapkan kebutuhan-kebutuhan pengguna. Kebutuhan pengguna yang akan akan dijelaskan pada bab ini dibagi menjadi beberapa jenis, yaitu kebutuhan fungsional, kebutuhan non-fungsional, kebutuhan perangkat lunak (*software*) dan kebutuhan perangkat keras (*hardware*). Proses penentuan kebutuhan pengguna dimulai dengan elisitasi kebutuhan, dilanjutkan dengan *prototyping*. *Prototyping* dibuat dan diberikan kepada pengguna untuk melakukan uji coba secara langsung. Pengguna yang sudah melakukan uji coba diminta untuk memberikan umpan balik apakah ada perbaikan, penambahan fitur dan pengurangan fitur. Jika terdapat perubahan fitur, maka prototipe dibuat ulang dan diberikan kepada pengguna kembali. Proses tersebut dilakukan secara repetisi hingga pengguna menyetujui hasil prototipe tersebut. Namun, dalam penelitian ini jumlah repetisi diberi batasan maksimal 3 iterasi. Setelah *prototyping* berakhir, hasil akhir prototipe di telaah untuk menetapkan analisis kebutuhan pengguna.

1. ## **Elisitasi Kebutuhan** {#elisitasi-kebutuhan}

Elisitasi kebutuhan merupakan sekumpulan aktivitas yang ditujukan untuk menemukan kebutuhan suatu sistem melalui komunikasi dengan pelanggan, pengguna sistem dan pihak lain yang memiliki kepentingan dalam pengembangan sistem (Sommerville, 2016). Elisitasi kebutuhan menggunakan teknik wawancara dan observasi yang kemudian dianalisis permasalahan pada kegiatan *halaqah* di Pesantren Luhur. Pelaksanaan wawancara melibatkan satu santri dan satu anggota Litbang, yang diharapkan dapat membantu menentukan kebutuhan pengguna dan kebutuhan sistem. Hasil analisis permasalahan ditampilkan pada [Tabel 4.1](#tabel-4.1-hasil-elisitasi-kebutuhan-dari-wawancara-dan-observasi)

**Tabel 4.1 Hasil elisitasi kebutuhan dari wawancara dan observasi**

| No | Masalah | Dampak | Solusi |
| :---- | :---- | :---- | :---- |
| 1 | *Paper halaqah* yang dicetak | Proses | Dibuat *website* |
|  | lalu dikumpulkan dan dijilid. | percetakan dan | yang dapat |
|  |  | proses jilid | menyimpan |
|  |  | memakan biaya. | *paper* dalam |
|  |  |  | bentuk *file* PDF. |
| 2 | Percikan (*Paper* yang sudah | Hingga saat ini |  |
|  | dijilid) disimpan dalam rak | rak kantor penuh |  |
|  | buku kantor. | dan tidak ada |  |
|  |  | ruang lagi untuk |  |
|  |  | menyimpan |  |
|  |  | percikan. |  |

**Tabel 4.1 Hasil elisitasi kebutuhan dari wawancara dan observasi (Lanjutan)**

| No | Masalah | Dampak | Solusi |
| :---- | :---- | :---- | :---- |
| 3 | Tidak ada katalog untuk mencari judul *paper* yang diinginkan | Pengguna kesusahan dalam mencari judul *paper*. | Dibuat daftar dan fitur pencarian dalam *website*. |

2. ## **Identifikasi Pengguna Awal** {#identifikasi-pengguna-awal}

Jumlah pengguna yang diidentifikasi dari hasil elisitasi yang dilaksanakan sebelumnya berjumlah dua jenis pengguna. Penjelasan terkait jenis pengguna beserta peranannya dijabarkan pada [Tabel 4.2](#tabel-4.2-identifikasi-pengguna-awal). Pada penjelasannya istilah admin memiliki arti Litbang sebagai pengguna sistem admin dan istilah pengunjung memiliki arti santri atau seluruh orang yang mengakses *website halaqah* Pesantren Luhur.

###### **Tabel 4.2 Identifikasi pengguna awal** {#tabel-4.2-identifikasi-pengguna-awal}

| No | Nama Pengguna | Aktivitas yang dibutuhkan |
| :---- | :---- | :---- |
| 1 | Admin (Litbang) | Pengguna dapat memasuki atau keluar dari sistem admin. |
|  |  | Pengguna dapat mengunggah, melihat, mengubah, menghapus dan mencari *paper halaqah* Pesantren Luhur dari sistem admin. |
| 2 | Pengunjung | Pengguna dapat mengunduh, melihat, membaca dan mencari *paper halaqah* Pesantren Luhur dari sistem admin. |

Proses identifikasi pengguna memerlukan umpan balik dari pengguna, umpan balik dilakukan satu orang dari tim Litbang dan satu santri. Evaluasi dilakukan melalui diskusi tatap muka antara peneliti dengan pengguna. Hasil evaluasi menyatakan bahwa semua pengguna menyetujui hasil identifikasi pengguna awal tanpa ada perbaikan maupun penambahan yang diperlukan.

3. **Analisis Kebutuhan dengan *Prototyping***

   1. ***Prototyping*** **Iterasi 1**

Sebelum membuat *prototyping*, peneliti perlu membuat analisis kebutuhan pengguna sementara beserta *wireframe* (kerangka kerja) berdasarkan elisitasi yang telah dibuat sebelumnya. Analisis kebutuhan pengguna sementara disajikan pada [Tabel 4.3](#tabel-4.3-daftar-kebutuhan-pengguna-pada-prototyping-iterasi-1).

###### **Tabel 4.3 Daftar kebutuhan pengguna pada *prototyping* iterasi 1** {#tabel-4.3-daftar-kebutuhan-pengguna-pada-prototyping-iterasi-1}

| No | Kebutuhan Pengguna |
| :---- | ----- |
| 1 | Admin dapat mengunggah *paper halaqah* Pesantren Luhur |
| 2 | Admin dapat melihat *paper halaqah* Pesantren Luhur |
| 3 | Admin dapat membaca *paper halaqah* Pesantren Luhur |
| 4 | Admin dapat mengubah *paper halaqah* Pesantren Luhur |
| 5 | Admin dapat menghapus *paper halaqah* Pesantren Luhur |
| 6 | Admin dapat mencari *paper halaqah* Pesantren Luhur |
| 7 | Pengunjung dapat mengunduh *paper halaqah* Pesantren Luhur |
| 8 | Pengunjung dapat melihat *paper halaqah* Pesantren Luhur |
| 9 | Pengunjung dapat membaca *paper halaqah* Pesantren Luhur |
| 10 | Pengunjung dapat mencari *paper halaqah* Pesantren Luhur |

Sesudah analisis kebutuhan selesai dibuat, tahap selanjutnya adalah pembuatan *wireframe*. Hasil *wireframe* yang dibuat berdasarkan analisis kebutuhan sementara diperlihatkan pada [Gambar 4.1](#gambar-4.1-tampilan-wireframe-halaman-beranda) hingga [Gambar 4.5](#gambar-4.5-tampilan-wireframe-halaman-profil-dengan-akses-admin).

**Gambar 4.1 Tampilan *wireframe* halaman beranda**

Pada [Gambar 4.1,](#gambar-4.1-tampilan-wireframe-halaman-beranda) terdapat sebuah kotak bersilang berukuran besar yang terletak disebelah kanan layar. Kotak ini merupakan gambar yang berguna

menambah estetika layar. Sedangkan disebelah kiri, terdapat teks berukuran besar beserta tombol guna mengarahkan pengunjung menuju tindakan ‘pencarian makalah *paper halaqah*’. Tombol tersebut nantinya akan membuka halaman ‘cari’ saat ditekan pengguna. Pada bagian atas terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini. Sedangkan bagian kanan berisi simbol- simbol kecil yang mewakili dari media sosial yang dimiliki pesantren. *Top navigation bar* ini nantinya akan selalu ada di halaman pengunjung.

**Gambar 4.2 Tampilan *wireframe* halaman cari**

[Gambar 4.2](#gambar-4.2-tampilan-wireframe-halaman-cari) merupakan tampilan kerangka dari halaman cari. Halaman ini berisi *top navigation bar*, judul halaman dan sebuah tabel. Tabel ini berisi daftar *file paper halaqah* yang akan ditampilkan secara urut dari yang terbaru ke terlama. Dua kotak kecil di bagian kanan tabel merupakan tombol yang terlibat dengan pengguna ketika situs web sudah selesai dibuat. Pada bagian atas terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan yang akan selalu ada di halaman pengunjung. Bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren,

sedangkan bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini.

**Gambar 4.3 Tampilan *wireframe* halaman data *halaqah* dengan akses admin**

[Gambar 4.3](#gambar-4.3-tampilan-wireframe-halaman-data-halaqah-dengan-akses-admin) merupakan halaman data *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah tabel. Pada *top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. Tabel ini berisi daftar *file* makalah data *halaqah* yang dapat admin tambah, lalu tiga kotak kecil di bagian kanan tabel merupakan tombol yang terlibat dengan pengguna ketika situs web sudah selesai dibuat.  
![][image15]

**Gambar 4.4 Tampilan *wireframe* halaman tambah data *halaqah* dengan akses admin**

[Gambar 4.4](#gambar-4.4-tampilan-wireframe-halaman-tambah-data-halaqah-dengan-akses-admin) merupakan halaman tambah data *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi top navibation bar, *side navigation bar*, judul halaman dan *form* dari tambah *halaqah*. Kotak-kotak yang terlihat berbaris dan sejajar ini merupakan kotak input, yang nantinya diisi teks oleh admin. Jumlah input yang ada di halaman tambah data *halaqah* ada sembilan input diantaranya yakni judul, penulis, kategori, prodi/jurusan, fakultas, universitas, angkatan, jilid dan unggah *file paper*.  
![][image16]

###### **Gambar 4.5 Tampilan *wireframe* halaman profil dengan akses admin** {#gambar-4.5-tampilan-wireframe-halaman-profil-dengan-akses-admin}

[Gambar 4.5](#gambar-4.5-tampilan-wireframe-halaman-profil-dengan-akses-admin) ini merupakan halaman profil admin yang hanya bisa diakses oleh admin. Halaman ini berisi *top navibation bar*, *side navigation bar*, judul halaman dan *form* dari tambah *halaqah*. Kotak-kotak yang terlihat berbaris dan sejajar ini merupakan kotak *input*, yang nantinya diisi teks oleh admin. Jumlah *input* yang ada di halaman profil ada 5 input diantaranya yakni nama, *email*, no hp, alamat dan *password* baru.

Bagian utama dari *prototyping*, yaitu pembuatan prototipe, dibuat seusai pembuatan *wireframe* selesai. Bentuk prototipe berdasarkan *wireframe* yang telah dibuat sebelumnya ditampilkan pada [Gambar 4.6](#gambar-4.6-tampilan-prototipe-halaman-beranda) hingga [Gambar 4.9](#gambar-4.9-tampilan-prototipe-halaman-profil-dengan-akses-admin).  
![][image17]

###### **Gambar 4.6 Tampilan prototipe halaman beranda** {#gambar-4.6-tampilan-prototipe-halaman-beranda}

[Gambar 4.6](#gambar-4.6-tampilan-prototipe-halaman-beranda) merupakan halaman beranda yang bisa diakses oleh semua orang. Halaman ini berwarna inti biru, yang memiliki arti kebijaksanaan dan dapat memberi kesan kepercayaan. Disebelah kanan layar terdapat gambar ilustrasi yang tampak seperti sedang mencari buku. Gambar ini dipilih agar dapat mewakili tujuan dari fungsi web ini, yaitu mencari *file paper halaqah*. Disebelah kiri terdapat teks judul halaman dan tombol yang memiliki kegunaan untuk mengarahkan pengunjung menuju tindakan mengklik tombol tersebut lalu selanjutnya akan mengarah ke halaman cari saat ditekan.  
![][image18]

###### **Gambar 4.7 Tampilan prototipe halaman cari** {#gambar-4.7-tampilan-prototipe-halaman-cari}

[Gambar 4.7](#gambar-4.7-tampilan-prototipe-halaman-cari) merupakan halaman cari materi *halaqah* yang dapat diakses pengguna ketika pengguna ingin mencari dan mengunduh *file paper halaqah*. Pengguna juga dapat memperbanyak jumlah daftar *file paper* yang ada di tabel, dengan cara menekan dropdown yang bertuliskan “*show entries*”. Jika ingin mencari, pengguna dapat mengetikkan apa yang ingin dicari maka secara otomatis tabel akan menampilkan hasil pencariannya. Jika sistem tidak menemukan apa yang ingin dicari pengguna, maka tabel tersebut akan tampak kosong. Pada bagian atas terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini. Sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren. *Top navigation bar* ini nantinya akan selalu ada di halaman pengunjung.  
![][image19]

###### **Gambar 4.8 Tampilan prototipe halaman data *halaqah* dengan akses admin** {#gambar-4.8-tampilan-prototipe-halaman-data-halaqah-dengan-akses-admin}

[Gambar 4.8](#gambar-4.8-tampilan-prototipe-halaman-data-halaqah-dengan-akses-admin) merupakan halaman data *halaqah* yang hanya bisa diakses oleh admin. Tabel ini berisi daftar *file paper* data *halaqah* yang dapat ditambah admin, lalu ada tiga kotak kecil di bagian kanan tabel merupakan tombol “unduh” “ubah” dan “hapus” yang terlibat dengan pengguna ketika situs web digunakan. Pada sisi bagian kiri halaman terdapat *side navigation bar* yang berisikan “*home*”, “data kategori”, “data jilid”, “data penulis”, “data jadwal”, “data *halaqah*”, “data template”, “pro*file*”, dan “*log out*”.

###### **Gambar 4.9 Tampilan prototipe halaman profil dengan akses admin** {#gambar-4.9-tampilan-prototipe-halaman-profil-dengan-akses-admin}

[Gambar 4.9](#gambar-4.9-tampilan-prototipe-halaman-profil-dengan-akses-admin) merupakan halaman pro*file* tambah data *halaqah* yang hanya bisa diakses oleh admin. Terdapat kotak-kotak yang terlihat berbaris dan sejajar

ini merupakan kotak input, yang nantinya diisi teks oleh admin. Pada sisi bagian kiri halaman terdapat *side navigation bar* yang berisikan “*home*”, “data kategori”, “data jilid”, “data penulis”, “data jadwal”, “data *halaqah*”, “data template”, “pro*file*”, dan “*log out*”.

Prototipe yang telah selesai dibuat dievaluasi oleh enam pengguna, dua diantaranya merupakan anggota Litbang, sedangkan sisanya merupakan santri pesantren luhur yang diambil secara acak. Hasil evaluasi berupa umpan balik yang dirangkum dan dapat dilihat pada [Tabel 4.4](#tabel-4.4-daftar-umpan-balik-dari-pengguna-pada-prototyping-iterasi-1).

###### **Tabel 4.4 Daftar umpan balik dari pengguna pada *prototyping* iterasi 1** {#tabel-4.4-daftar-umpan-balik-dari-pengguna-pada-prototyping-iterasi-1}

| Nama Pengguna | Umpan Balik |
| :---- | ----- |
| Tim Litbang 1 | Tampilan sudah bagus, bentuk font terlalu bulat. |
| Tim Litbang 2 | Tampilan bagus. Susah menambahkan kategori karena harus ketik manual. Tambahkan fitur tambah, lihat, ubah dan hapus kategori |
| Santri 1 | Tampilan bagus. Tidak ada saran perubahan prototipe. |
| Santri 2 | Tambahkan fitur lihat jadwal |
| Santri 3 | Tambahkan fitur lihat jadwal |
| Santri 4 | Font bentuk font terlalu bulat. |

Dari umpan balik yang telah dikumpulkan, dapat disimpulkan bahwa terdapat perbaikan yang harus dilakukan pada prototipe. Perbaikan tersebut berupa perubahan bentuk font dengan jenis font yang tampak lebih rapat dibading sebelumnya, penambahan fitur kelola kategori pada tampilan admin dan fitur lihat jadwal pada tampilan pengunjung. Penambahan fitur kelola kategori dilakukan dengan menambahkan fitur tambah, lihat, ubah dan hapus kategori. Untuk penambahan fitur lihat jadwal pada akses pengunjung, tentu diperlukan penambahan fitur tambah, lihat, ubah dan hapus jadwal pada akses admin. Rangkuman perbaikan yang harus dilakukan pada iterasi selanjutnya ditampilkan pada [Tabel 4.5](#tabel-4.5-daftar-perubahan-prototipe-yang-perlu-dilakukan).

###### **Tabel 4.5 Daftar perubahan prototipe yang perlu dilakukan** {#tabel-4.5-daftar-perubahan-prototipe-yang-perlu-dilakukan}

| No | Daftar Perubahan Prototipe |
| :---- | ----- |
| 1 | Menambahkan fitur tambah, lihat, ubah dan hapus kategori pada akses admin |
| 2 | Menambahkan fitur tambah, lihat, ubah dan hapus jadwal pada akses admin |
| 3 | Menambahkan fitur lihat jadwal pada akses pengunjung |
| 4 | Mengubah jenis font dengan bentuk font yang terlihat lebih rapat |

2. ***Prototyping*** **Iterasi 2**

Sebelum membuat *prototyping*, peneliti perlu membuat analisis kebutuhan pengguna sementara beserta *wireframe* (kerangka kerja) berdasarkan elisitasi yang telah dibuat sebelumnya. Analisis kebutuhan pengguna sementara disajikan pada [Tabel 4.6](#tabel-4.6-daftar-kebutuhan-pengguna-pada-prototyping-iterasi-2).

###### **Tabel 4.6 Daftar kebutuhan pengguna pada *prototyping* iterasi 2** {#tabel-4.6-daftar-kebutuhan-pengguna-pada-prototyping-iterasi-2}

| No | Kebutuhan Pengguna |
| :---- | ----- |
| 1 | Admin dapat mengunggah *paper halaqah* Pesantren Luhur |
| 2 | Admin dapat melihat *paper halaqah* Pesantren Luhur |
| 3 | Admin dapat membaca *paper halaqah* Pesantren Luhur |
| 4 | Admin dapat mengubah *paper halaqah* Pesantren Luhur |
| 5 | Admin dapat menghapus *paper halaqah* Pesantren Luhur |
| 6 | Admin dapat mencari *paper halaqah* Pesantren Luhur |
| 7 | Admin dapat menambah kategori *halaqah* Pesantren Luhur |
| 8 | Admin dapat melihat kategori *halaqah* Pesantren Luhur |
| 9 | Admin dapat mengubah kategori *halaqah* Pesantren Luhur |
| 10 | Admin dapat menghapus kategori *halaqah* Pesantren Luhur |
| 11 | Admin dapat menambah jadwal *halaqah* Pesantren Luhur |
| 12 | Admin dapat melihat jadwal *halaqah* Pesantren Luhur |
| 13 | Admin dapat mengubah jadwal *halaqah* Pesantren Luhur |
| 14 | Admin dapat menghapus jadwal *halaqah* Pesantren Luhur |
| 15 | Pengunjung dapat mengunduh *paper halaqah* Pesantren Luhur |
| 16 | Pengunjung dapat melihat *paper halaqah* Pesantren Luhur |

**Tabel 4.6 Daftar kebutuhan pengguna pada *prototyping* iterasi 2 (Lanjutan)**

| No | Kebutuhan Pengguna |
| :---- | ----- |
| 17 | Pengunjung dapat membaca *paper halaqah* Pesantren Luhur |
| 18 | Pengunjung dapat mencari *paper halaqah* Pesantren Luhur |
| 19 | Pengunjung dapat melihat jadwal *halaqah* |

Sesudah analisis kebutuhan selesai dibuat, tahap selanjutnya adalah pembuatan *wireframe*. Hasil *wireframe* yang dibuat berdasarkan analisis kebutuhan sementara diperlihatkan pada [Gambar 4.10](#gambar-4.10-tampilan-wireframe-halaman-beranda) hingga [Gambar 4.19](#gambar-4.19-tampilan-wireframe-halaman-kategori-dengan-akses-admin).

**Gambar 4.10 Tampilan *wireframe* halaman beranda**

Pada [Gambar 4.10](#gambar-4.10-tampilan-wireframe-halaman-beranda), terdapat sebuah kotak bersilang berukuran besar yang terletak disebelah kanan layar. Kotak ini merupakan gambar yang berguna menambah estetika layar. Sedangkan disebelah kiri, terdapat teks berukuran besar beserta tombol guna mengarahkan pengunjung menuju tindakan ‘pencarian makalah *paper halaqah*’. Tombol tersebut nantinya akan membuka halaman ‘cari’ saat ditekan pengguna. Pada bagian atas terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini. Sedangkan bagian kanan berisi simbol- simbol kecil yang mewakili dari media sosial yang dimiliki pesantren. *Top navigation bar* ini nantinya akan selalu ada di halaman pengunjung.  
![][image20]

**Gambar 4.11 Tampilan *wireframe* halaman cari**

[Gambar 4.11](#gambar-4.11-tampilan-wireframe-halaman-cari) merupakan tampilan kerangka dari halaman pencarian data *file*. Halaman ini berisi *top navigation bar*, judul halaman dan sebuah tabel. Tabel ini berisi daftar *file paper halaqah* yang akan ditampilkan secara urut dari yang terbaru ke terlama. Dua kotak kecil di bagian kanan tabel merupakan tombol yang terlibat dengan pengguna ketika situs web sudah selesai dibuat. Pada bagian atas terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan yang akan selalu ada di halaman pengunjung. Bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren, sedangkan bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini.  
![][image21]

**Gambar 4.12 Tampilan *wireframe* halaman jadwal**

Pada [Gambar 4.12](#gambar-4.12-tampilan-wireframe-halaman-jadwal) merupakan tampilan kerangka halaman yang memberikan informasi jadwal *halaqah* secara terorganisir. Halaman ini berisi *top navigation bar*, judul halaman, dan tabel informasi jadwal *halaqah*. Pada bagian atas terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan yang akan selalu ada di halaman pengunjung. Bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren, sedangkan bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini. Tabel informasi jadwal *halaqah* yang terdapat kolom hari dan tanggal, lalu kolom judul materi dan nama-nama pematerinya, dan kolom nama tim pembahas.  
![][image22]

**Gambar 4.13 Tampilan *wireframe* halaman data *halaqah* dengan akses admin**

[Gambar 4.13](#gambar-4.13-tampilan-wireframe-halaman-data-halaqah-dengan-akses-admin) merupakan halaman data *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah tabel. Pada *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “*home*”, “data kategori”, “data *halaqah*”, “data jadwal”, “pro*file*”, dan “*log out*”. Bagian tabel data *halaqah* pada sisi kiri judul halaman ada tombol untuk dapat tambah data *halaqah* lalu di dalam tabel ada dua belas masukan yakni judul, penulis, kategori, prodi/jurusan, fakultas, universitas, angkatan, jilid dan unggah *file paper* yang terdapat tombol “unduh”, “ubah” dan “hapus”.  
![][image23]

###### **Gambar 4.14 Tampilan *wireframe* halaman data jadwal dengan akses admin** {#gambar-4.14-tampilan-wireframe-halaman-data-jadwal-dengan-akses-admin}

[Gambar 4.14](#gambar-4.14-tampilan-wireframe-halaman-data-jadwal-dengan-akses-admin) merupakan halaman tambah data jadwal *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman disebelah kiri layar, tombol disebelah kanan layar dan sebuah tabel. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Side navigation bar* ini berisikan “*home*”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “pro*file*”, dan “*log out*”. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu dibagian sisi kanannya terdapat informasi hari dan tanggal akses. Pada halaman ini admin dapat menambah dan mengubah data jadwal *halaqah*. Tabel data jadwal *halaqah* ada empat masukan yakni ID, nama materi *halaqah*, tanggal *halaqah*, nama-nama pemateri *halaqah*, serta tombol aksi “ubah” dan “hapus”.  
![][image24]

###### **Gambar 4.15 Tampilan *wireframe* halaman data kategori dengan akses admin** {#gambar-4.15-tampilan-wireframe-halaman-data-kategori-dengan-akses-admin}

[Gambar 4.15](#gambar-4.15-tampilan-wireframe-halaman-data-kategori-dengan-akses-admin) merupakan halaman tambah data kategori *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman disebelah kiri layar, tombol disebelah kanan layar dan sebuah tabel. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu dibagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “*home*”, “data kategori”, “data *halaqah*”, “data jadwal”, “pro*file*”, dan “*log out*”. Pada halaman ini admin dapat menambah dan mengubah data kategori *halaqah*, terdapat ada dua masukan pada tabel data kategori yakni ID, nama kategori materi *halaqah*, serta tombol aksi “ubah” dan “hapus”.  
![][image16]

**Gambar 4.16 Tampilan *wireframe* halaman profil**

[Gambar 4.16](#gambar-4.16-tampilan-wireframe-halaman-profil) merupakan halaman *update* untuk edit dan input pro*file* baru yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk *update* pro*file* administrator. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “*home*”, “data *halaqah*”, “pro*file*”, dan “*log out*”. Pada halaman ini admin dapat menambah dan mengubah data profil administrator, ada lima kolom masukan yakni nama ID, *email*, nomor telepon, alamat, dan *password* baru, lalu ada tombol “update” di bagian bawah halaman.  
![][image25]

**Gambar 4.17 Tampilan *wireframe* halaman tambah *halaqah* dengan akses admin**

[Gambar 4.17](#gambar-4.17-tampilan-wireframe-halaman-tambah-halaqah-dengan-akses-admin) merupakan halaman untuk menambah data *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman disebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah data *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu dibagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “*home*”, “data *halaqah*”, “pro*file*”, dan “*log out*”. Pada halaman ini admin dapat menambah dan mengubah data *halaqah*, terdapat ada sembilan kolom masukan yakni judul nama *halaqah*, nama penulis, nama kategori, prodi/jurusan, fakultas, universitas, angkatan, jilid, dan unggah *file paper*, lalu ada tombol “update” di bagian bawah halaman.  
![][image26]

###### **Gambar 4.18 Tampilan *wireframe* halaman tambah jadwal dengan akses admin** {#gambar-4.18-tampilan-wireframe-halaman-tambah-jadwal-dengan-akses-admin}

[Gambar 4.18](#gambar-4.18-tampilan-wireframe-halaman-tambah-jadwal-dengan-akses-admin) merupakan halaman *form* tambah data jadwal *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman disebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah jadwal *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu dibagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “*home*”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “pro*file*”, dan “*log out*”. Pada halaman ini admin dapat menambah data jadwal *halaqah*, terdapat ada tiga kolom masukan yakni judul nama *halaqah*, tanggal pelaksanaan *halaqah*, nama pemateri, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.  
![][image27]

###### **Gambar 4.19 Tampilan *wireframe* halaman kategori dengan akses admin** {#gambar-4.19-tampilan-wireframe-halaman-kategori-dengan-akses-admin}

[Gambar 4.19](#gambar-4.19-tampilan-wireframe-halaman-kategori-dengan-akses-admin) merupakan halaman *form* tambah data kategori *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman disebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu dibagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “*home*”, “data kategori”, “data *halaqah*”, “data jadwal”, “pro*file*”, dan “*log out*”. Pada halaman ini admin dapat menambah data kategori *halaqah*, terdapat ada satu kolom masukan yakni nama kategori *halaqah*, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.

Bagian utama dari *prototyping*, yaitu pembuatan prototipe, dibuat seusai pembuatan *wireframe* selesai. Bentuk prototipe berdasarkan *wireframe* yang telah dibuat sebelumnya ditampilkan pada [Gambar 4.20](#gambar-4.20-tampilan-prototipe-halaman-beranda) hingga [Gambar 4.33](#gambar-4.33-tampilan-prototipe-halaman-jadwal-dengan-tambahan-notifikasi).  
![][image17]

###### **Gambar 4.20 Tampilan prototipe halaman beranda** {#gambar-4.20-tampilan-prototipe-halaman-beranda}

[Gambar 4.20](#gambar-4.20-tampilan-prototipe-halaman-beranda) merupakan halaman beranda yang bisa diakses oleh semua orang. Halaman ini berwarna inti biru, yang memiliki arti kebijaksanaan dan dapat memberi kesan kepercayaan. Disebelah kanan layar terdapat gambar ilustrasi yang tampak seperti sedang mencari buku. Gambar ini dipilih agar dapat mewakili tujuan dari fungsi web ini, yaitu mencari *file paper halaqah*. Disebelah kiri terdapat teks judul halaman dan tombol yang memiliki kegunaan untuk mengarahkan pengunjung menuju tindakan mengklik tombol tersebut lalu selanjutnya akan mengarah ke halaman cari saat ditekan. Terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini, sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren.  
![][image28]

###### **Gambar 4.21 Tampilan prototipe halaman jadwal** {#gambar-4.21-tampilan-prototipe-halaman-jadwal}

[Gambar 4.21](#gambar-4.21-tampilan-prototipe-halaman-jadwal) merupakan halaman jadwal *halaqah*, yang berisikan ada judul halaman, tabel informasi jadwal *halaqah*, dan *top navigation bar*. Tabel informasi jadwal *halaqah* yang terdapat kolom hari dan tanggal, lalu kolom judul materi dan nama-nama pematerinya, dan kolom nama tim pembahas. Terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini, sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren.  
![][image18]

###### **Gambar 4.22 Tampilan prototipe halaman cari** {#gambar-4.22-tampilan-prototipe-halaman-cari}

[Gambar 4.22](#gambar-4.22-tampilan-prototipe-halaman-cari) merupakan halaman cari materi *halaqah* yang dapat diakses pengguna ketika pengguna ingin mencari dan mengunduh *file paper halaqah*. Pengguna juga dapat memperbanyak jumlah daftar *file paper* yang ada di tabel, dengan cara menekan dropdown yang bertuliskan “show entries”. Jika ingin mencari, pengguna dapat mengetikkan apa yang ingin dicari maka secara otomatis tabel akan menampilkan hasil pencariannya. Jika sistem tidak menemukan apa yang ingin dicari pengguna, maka tabel tersebut akan tampak kosong. Pada bagian atas terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini. Sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren. *Top navigation bar* ini nantinya akan selalu ada di halaman pengunjung.  
![][image29]

###### **Gambar 4.23 Tampilan prototipe halaman profil dengan akses admin** {#gambar-4.23-tampilan-prototipe-halaman-profil-dengan-akses-admin}

[Gambar 4.23](#gambar-4.23-tampilan-prototipe-halaman-profil-dengan-akses-admin) merupakan halaman *update* untuk edit dan input pro*file* baru yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk *update* pro*file* administrator. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “*home*”, “data *halaqah*”, “pro*file*”, dan “*log out*”. Pada halaman ini admin dapat menambah dan mengubah data profil administrator, ada lima kolom masukan yakni nama ID, *email*, nomor telepon, alamat, dan *password* baru, lalu ada tombol “update” di bagian bawah halaman.  
![][image19]

###### **Gambar 4.24 Tampilan prototipe halaman data *halaqah* dengan akses admin** {#gambar-4.24-tampilan-prototipe-halaman-data-halaqah-dengan-akses-admin}

[Gambar 4.24](#gambar-4.24-tampilan-prototipe-halaman-data-halaqah-dengan-akses-admin) merupakan halaman untuk menambah data *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah data *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “*home*”, “data *halaqah*”, “pro*file*”, dan “*log out*”. Pada halaman ini admin dapat menambah dan mengubah data *halaqah*, terdapat ada sembilan kolom masukan yakni judul nama *halaqah*, nama penulis, nama kategori, prodi/jurusan, fakultas, universitas, angkatan, jilid, dan unggah *file paper*, lalu ada tombol “update” di bagian bawah halaman.  
![][image30]

###### **Gambar 4.25 Tampilan prototipe halaman kategori dengan akses admin** {#gambar-4.25-tampilan-prototipe-halaman-kategori-dengan-akses-admin}

Pada [Gambar 4.25](#gambar-4.25-tampilan-prototipe-halaman-kategori-dengan-akses-admin) terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini, sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren. sedangkan bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini.

###### **Gambar 4.26 Tampilan prototipe halaman jadwal dengan akses admin** {#gambar-4.26-tampilan-prototipe-halaman-jadwal-dengan-akses-admin}

[Gambar  4.26](#gambar-4.26-tampilan-prototipe-halaman-jadwal-dengan-akses-admin) merupakan halaman untuk menambah data jadwal *halaqah*  
yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side*

*navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah jadwal *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “*home*”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “pro*file*”, dan “*log out*”. Pada halaman ini admin dapat menambah data jadwal *halaqah*, terdapat ada tiga kolom masukan yakni judul nama *halaqah*, penulis, tanggal pelaksanaan *halaqah*, nama pemateri, serta ada tombol “ubah” dan “hapus”.

###### **Gambar 4.27 Tampilan prototipe halaman tambah kategori dengan akses admin** {#gambar-4.27-tampilan-prototipe-halaman-tambah-kategori-dengan-akses-admin}

[Gambar 4.27](#gambar-4.27-tampilan-prototipe-halaman-tambah-kategori-dengan-akses-admin) merupakan halaman *form* tambah data kategori *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “*home*”, “data kategori”, “data *halaqah*”, “data jadwal”, “pro*file*”, dan “*log out*”. Pada halaman ini admin dapat menambah data kategori *halaqah*, terdapat ada satu kolom masukan yakni nama kategori *halaqah*, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.  
![][image31]

###### **Gambar 4.28 Tampilan prototipe halaman tambah jadwal dengan akses admin** {#gambar-4.28-tampilan-prototipe-halaman-tambah-jadwal-dengan-akses-admin}

[Gambar 4.28](#gambar-4.28-tampilan-prototipe-halaman-tambah-jadwal-dengan-akses-admin) merupakan halaman *form* tambah data jadwal *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi top navigation bar, side navigation bar, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah data jadwal *halaqah*. Top navigation bar dan side navigation bar selalu ada di semua halaman administrator. Top Navigation bar di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. Side navigation bar ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah data jadwal *halaqah*, terdapat ada tiga kolom masukan yakni judul nama *halaqah*, penulis, tanggal pelaksanaan *halaqah*, nama pemateri, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.  
![][image32]

###### **Gambar 4.29 Tampilan prototipe halaman ubah jadwal dengan akses admin** {#gambar-4.29-tampilan-prototipe-halaman-ubah-jadwal-dengan-akses-admin}

[Gambar 4.29](#gambar-4.29-tampilan-prototipe-halaman-ubah-jadwal-dengan-akses-admin) merupakan halaman *form* ubah jadwal *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk mengubah jadwal *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat mengubah data jadwal *halaqah*, terdapat ada tiga kolom masukan yakni judul nama *halaqah*, nama penulis, tanggal pelaksanaan *halaqah*, nama pemateri, serta ada tombol “simpan” dan “tutup” di bagian bawah formulir.  
![][image33]

###### **Gambar 4.30 Tampilan prototipe halaman ubah kategori dengan akses admin** {#gambar-4.30-tampilan-prototipe-halaman-ubah-kategori-dengan-akses-admin}

[Gambar 4.30](#gambar-4.30-tampilan-prototipe-halaman-ubah-kategori-dengan-akses-admin) merupakan halaman *form* mengubah kategori *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol di sebelah kanan layar dan sebuah kolom masukan untuk mengubah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat mengubah data kategori *halaqah*, terdapat ada satu kolom masukan yakni nama kategori *halaqah*, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.  
![][image34]

###### **Gambar 4.31 Tampilan prototipe halaman kategori dengan tambahan notifikasi** {#gambar-4.31-tampilan-prototipe-halaman-kategori-dengan-tambahan-notifikasi}

[Gambar 4.31](#gambar-4.31-tampilan-prototipe-halaman-kategori-dengan-tambahan-notifikasi) merupakan halaman *update* hasil dari proses mengedit atau mengubah data kategori *halaqah* yang hanya dapat dilakukan oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol di sebelah kanan layar dan sebuah kolom masukan untuk mengubah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”.  
![][image35]

###### **Gambar 4.32 Tampilan prototipe halaman data *halaqah* dengan tambahan notifikasi** {#gambar-4.32-tampilan-prototipe-halaman-data-halaqah-dengan-tambahan-notifikasi}

[Gambar	4.32](#gambar-4.32-tampilan-prototipe-halaman-data-halaqah-dengan-tambahan-notifikasi) merupakan halaman *update* hasil dari proses mengedit atau mengubah data *halaqah* yang hanya dapat dilakukan oleh admin.

###### **Gambar 4.33 Tampilan prototipe halaman jadwal dengan tambahan notifikasi** {#gambar-4.33-tampilan-prototipe-halaman-jadwal-dengan-tambahan-notifikasi}

[Gambar 4.33](#gambar-4.33-tampilan-prototipe-halaman-jadwal-dengan-tambahan-notifikasi) merupakan halaman *update* hasil dari proses mengedit atau mengubah data jadwal *halaqah* yang hanya dapat dilakukan oleh admin.

Prototipe yang telah selesai dibuat dievaluasi oleh enam pengguna, dua diantaranya merupakan anggota Litbang, sedangkan sisanya merupakan santri

pesantren luhur yang diambil secara acak. Hasil evaluasi berupa umpan balik yang dirangkum dan dapat dilihat pada [Tabel 4.7](#tabel-4.7-daftar-umpan-balik-dari-pengguna-pada-prototyping-iterasi-2).

###### **Tabel 4.7 Daftar umpan balik dari pengguna pada *prototyping* iterasi 2** {#tabel-4.7-daftar-umpan-balik-dari-pengguna-pada-prototyping-iterasi-2}

| Nama Pengguna | Umpan Balik |
| :---- | ----- |
| Tim Litbang 1 | Font sudah cocok. Tambahkan fitur tambah, lihat, ubah dan hapus pada jilid dan penulis. |
| Tim Litbang 2 | Tambahkan fitur tambah, lihat, ubah dan hapus pada penulis. |
| Santri 1 | Tampilan bagus. Tidak ada saran perubahan prototipe. |
| Santri 2 | Tidak ada saran perubahan prototipe. |
| Santri 3 | Tambahkan fitur unduh peraturan dan ketentuan *halaqah*. Tambahkan fitur unduh logo Pesantren Luhur |
| Santri 4 | Tambahkan fitur unduh template *paper halaqah*. |

3. ***Prototyping*** **Iterasi 3**

Sebelum membuat *prototyping*, peneliti perlu membuat analisis kebutuhan pengguna sementara beserta *wireframe* (kerangka kerja) berdasarkan elisitasi yang telah dibuat sebelumnya. Analisis kebutuhan pengguna sementara disajikan pada [Tabel 4.8](#tabel-4.8-daftar-kebutuhan-pengguna-pada-prototyping-iterasi-3).

###### **Tabel 4.8 Daftar kebutuhan pengguna pada *prototyping* iterasi 3** {#tabel-4.8-daftar-kebutuhan-pengguna-pada-prototyping-iterasi-3}

| No | Kebutuhan Pengguna |
| :---- | ----- |
| 1 | Admin dapat mengunggah *paper halaqah* Pesantren Luhur |
| 2 | Admin dapat melihat *paper halaqah* Pesantren Luhur |
| 3 | Admin dapat membaca *paper halaqah* Pesantren Luhur |
| 4 | Admin dapat mengubah *paper halaqah* Pesantren Luhur |
| 5 | Admin dapat menghapus *paper halaqah* Pesantren Luhur |
| 6 | Admin dapat mencari *paper halaqah* Pesantren Luhur |
| 7 | Admin dapat menambah kategori *halaqah* Pesantren Luhur |
| 8 | Admin dapat melihat kategori *halaqah* Pesantren Luhur |

**Tabel 4.8 Daftar kebutuhan pengguna pada *prototyping* iterasi 3 (Lanjutan)**

| No | Kebutuhan Pengguna |
| :---- | ----- |
| 9 | Admin dapat mengubah kategori *halaqah* Pesantren Luhur |
| 10 | Admin dapat menghapus kategori *halaqah* Pesantren Luhur |
| 11 | Admin dapat menambah jadwal *halaqah* Pesantren Luhur |
| 12 | Admin dapat melihat jadwal *halaqah* Pesantren Luhur |
| 13 | Admin dapat mengubah jadwal *halaqah* Pesantren Luhur |
| 14 | Admin dapat menghapus jadwal *halaqah* Pesantren Luhur |
| 15 | Admin dapat menambah jilid *halaqah* Pesantren Luhur |
| 16 | Admin dapat melihat jilid *halaqah* Pesantren Luhur |
| 17 | Admin dapat mengubah jilid *halaqah* Pesantren Luhur |
| 18 | Admin dapat menghapus jilid *halaqah* Pesantren Luhur |
| 19 | Admin dapat menambah material *halaqah* Pesantren Luhur |
| 20 | Admin dapat melihat material *halaqah* Pesantren Luhur |
| 21 | Admin dapat mengubah material *halaqah* Pesantren Luhur |
| 22 | Admin dapat menghapus material *halaqah* Pesantren Luhur |
| 23 | Admin dapat menambah penulis *halaqah* Pesantren Luhur |
| 24 | Admin dapat melihat penulis *halaqah* Pesantren Luhur |
| 25 | Admin dapat mengubah penulis *halaqah* Pesantren Luhur |
| 26 | Admin dapat menghapus penulis *halaqah* Pesantren Luhur |
| 27 | Pengunjung dapat mengunduh *paper halaqah* Pesantren Luhur |
| 28 | Pengunjung dapat melihat *paper halaqah* Pesantren Luhur |
| 29 | Pengunjung dapat membaca *paper halaqah* Pesantren Luhur |
| 30 | Pengunjung dapat mencari *paper halaqah* Pesantren Luhur |
| 31 | Pengunjung dapat melihat jadwal *halaqah* |
| 32 | Pengunjung dapat melihat material *halaqah* Pesantren Luhur |
| 33 | Pengunjung dapat mengunduh material *halaqah* Pesantren Luhur |

Sesudah analisis kebutuhan selesai dibuat, tahap selanjutnya adalah pembuatan *wireframe*. Hasil *wireframe* yang dibuat berdasarkan analisis kebutuhan sementara diperlihatkan pada [Gambar 4.34](#gambar-4.34-tampilan-wireframe-halaman-beranda) hingga [Gambar 4.50](#gambar-4.50-tampilan-wireframe-halaman-tambah-material-dengan-akses-admin).

![][image36]

**Gambar 4.34 Tampilan *wireframe* halaman beranda**

[Gambar 4.34](#gambar-4.34-tampilan-wireframe-halaman-beranda) terdapat sebuah kotak bersilang berukuran besar yang terletak disebelah kanan layar. Kotak ini merupakan gambar yang berguna menambah estetika layar. Sedangkan di sebelah kiri, terdapat teks berukuran besar beserta tombol guna mengarahkan pengunjung menuju tindakan ‘pencarian makalah *paper halaqah*’. Tombol tersebut nantinya akan membuka halaman ‘cari’ saat ditekan pengguna. Pada bagian atas terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini. Sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren. *Top navigation bar* ini nantinya akan selalu ada di halaman pengunjung.  
![][image20]

**Gambar 4.35 Tampilan *wireframe* halaman cari**

[Gambar 4.35](#gambar-4.35-tampilan-wireframe-halaman-cari) merupakan tampilan kerangka dari halaman cari *halaqah*. Halaman ini berisi top navigation bar, judul halaman dan sebuah tabel. Tabel ini berisi daftar file *paper halaqah* yang akan ditampilkan secara urut dari yang terbaru ke terlama. Dua kotak kecil di bagian kanan tabel merupakan tombol yang terlibat dengan pengguna ketika situs web sudah selesai dibuat.  
![][image21]

**Gambar 4.36 Tampilan *wireframe* halaman jadwal *halaqah***

[Gambar 4.36](#gambar-4.36-tampilan-wireframe-halaman-jadwal-halaqah) merupakan halaman yang memberikan informasi jadwal *halaqah* secara terorganisir. Halaman ini berisi *top navigation bar*, judul halaman dan sebuah tabel informasi jadwal *halaqah*. Tabel informasi jadwal *halaqah* yang terdapat kolom hari dan tanggal, lalu kolom judul materi dan nama-nama pematerinya, dan kolom nama tim pembahas. Terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini, sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren. sedangkan bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini.  
![][image37]

**Gambar 4.37 Tampilan *wireframe* halaman material *halaqah***

[Gambar 4.37](#gambar-4.37-tampilan-wireframe-halaman-material-halaqah) halaman ini kerangka halaman berisi materi *halaqah*, yang berisi file-file materi *halaqah* dan *top navigation bar*. Pada halaman ini kumpulan file materi *halaqah* yang dapat diunduh atau hanya dilihat saja. Terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini, sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren. sedangkan bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini.  
![][image38]

###### **Gambar 4.38 Tampilan *wireframe* halaman data penulis dengan akses admin** {#gambar-4.38-tampilan-wireframe-halaman-data-penulis-dengan-akses-admin}

[Gambar 4.38](#gambar-4.38-tampilan-wireframe-halaman-data-penulis-dengan-akses-admin) merupakan halaman yang hanya dapat diakses oleh admin untuk menambah dan mengubah data penulis *halaqah*. Halaman ini berisi *top navigation bar, side navigation bar,* judul halaman, dan tabel menambah atau mengubah data penulis.*Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data terupdate”, “profile”, dan “log out”. *Top navigation bar* dan *Side navigation bar* selalu ada di semua halaman administrator. Tabel menambah atau mengubah data penulis terdapat lima kolom masukan yakni judul ID nama penulis, jurusan, fakultas, universitas, angkatan, serta ada tombol “ubah” dan “hapus”.  
![][image39]

**Gambar 4.39 Tampilan *wireframe* halaman data material *halaqah* dengan akses admin**

[Gambar 4.39](#gambar-4.39-tampilan-wireframe-halaman-data-material-halaqah-dengan-akses-admin) merupakan halaman untuk edit dan input profile baru yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk *update* profile administrator. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data *halaqah*”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah dan mengubah data profil administrator, ada lima kolom masukan yakni nama ID, *email*, nomor telepon, alamat, dan *password* baru, lalu ada tombol “update” di bagian bawah halaman.  
![][image40]

###### **Gambar 4.40 Tampilan *wireframe* halaman profil dengan akses admin** {#gambar-4.40-tampilan-wireframe-halaman-profil-dengan-akses-admin}

[Gambar 4.40](#gambar-4.40-tampilan-wireframe-halaman-profil-dengan-akses-admin) merupakan halaman untuk mengubah data template bahan materi *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisikan ada judul halaman, tabel menambah data template file materi *halaqah*, *side navigation bar* dan *top navigation bar*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. T*op Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Tabel untuk menambah data template bahan materi *halaqah* terdapat empat kolom masukan yakni ID, nama materi *halaqah*, foto thumbnail, tombol unduh file materi *halaqah*, serta tombol aksi “ubah” dan “hapus”.  
![][image41]

**Gambar 4.41 Tampilan *wireframe* halaman data *halaqah* dengan akses admin**

[Gambar 4.41](#gambar-4.41-tampilan-wireframe-halaman-data-halaqah-dengan-akses-admin) merupakan halaman untuk mengubah data jadwal *halaqah* yang hanya bisa diakses oleh admin. Pada halaman ini berisikan ada judul halaman, tabel informasi jadwal *halaqah*, *side navigation bar* dan *top navigation bar*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. T*op Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data penulis”, “data jilid”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Tabel informasi jadwal *halaqah* yang terdapat empat kolom masukan ID, judul nama *halaqah*, hari dan tanggal, nama pemateri, serta ada tombol “ubah” dan “hapus”.  
![][image42]

###### **Gambar 4.42 Tampilan *wireframe* halaman data jadwal** {#gambar-4.42-tampilan-wireframe-halaman-data-jadwal}

[Gambar 4.42](#gambar-4.42-tampilan-wireframe-halaman-data-jadwal) merupakan halaman untuk menambah atau mengubah data *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah atau mengubah data *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah dan mengubah data *halaqah*, terdapat ada sembilan kolom masukan yakni judul nama *halaqah*, nama penulis, nama kategori, prodi/jurusan, fakultas, universitas, angkatan, jilid, dan unduh file *paper*, lalu ada tombol “ubah” dan “hapus”.  
![][image43]

###### **Gambar 4.43 Tampilan *wireframe* halaman data jilid dengan akses admin** {#gambar-4.43-tampilan-wireframe-halaman-data-jilid-dengan-akses-admin}

[Gambar 4.43](#gambar-4.43-tampilan-wireframe-halaman-data-jilid-dengan-akses-admin) merupakan halaman mengubah data kategori *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah atau mengubah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah atau mengubah data kategori *halaqah*, terdapat ada dua kolom masukan yakni ID, nama kategori *halaqah*, serta ada tombol “ubah” dan “hapus”.  
![][image44]

###### **Gambar 4.44 Tampilan *wireframe* halaman data kategori dengan akses admin** {#gambar-4.44-tampilan-wireframe-halaman-data-kategori-dengan-akses-admin}

[Gambar 4.44](#gambar-4.44-tampilan-wireframe-halaman-data-kategori-dengan-akses-admin) merupakan halaman untuk mengubah data jilid *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk mengubah data jilid *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Pada halaman ini admin dapat mengubah data jilid *halaqah*, terdapat ada dua kolom masukan yakni ID, nama *halaqah*, serta ada tombol “ubah” dan “hapus”.  
![][image45]

**Gambar 4.45 Tampilan *wireframe* halaman tambah data *halaqah* dengan akses admin**

[Gambar 4.45](#gambar-4.45-tampilan-wireframe-halaman-tambah-data-halaqah-dengan-akses-admin) merupakan halaman *form* untuk menambah data *halaqah* yang hanya bisa diakses oleh admin. Halaman ini untuk menambah data *halaqah* yang hanya dapat diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah data *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data *halaqah*”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah dan mengubah data *halaqah*, terdapat ada sembilan kolom masukan yakni judul nama *halaqah*, nama penulis, nama kategori, prodi/jurusan, fakultas, universitas, angkatan, jilid, dan unggah file *paper*, lalu ada tombol “simpan” dan “tutup” di bagian bawah kolom.  
![][image46]

###### **Gambar 4.46 Tampilan *wireframe* halaman tambah data jadwal** {#gambar-4.46-tampilan-wireframe-halaman-tambah-data-jadwal}

[Gambar 4.46](#gambar-4.46-tampilan-wireframe-halaman-tambah-data-jadwal) merupakan halaman *form* untuk menambah data jadwal *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk mengubah jadwal *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat mengubah data jadwal *halaqah*, terdapat ada tiga kolom masukan yakni judul nama *halaqah*, nama penulis, tanggal pelaksanaan *halaqah*, nama pemateri, serta ada tombol “simpan” dan “tutup” di bagian bawah formulir.  
![][image47]

###### **Gambar 4.47 Tampilan *wireframe* halaman tambah jilid dengan akses kategori** {#gambar-4.47-tampilan-wireframe-halaman-tambah-jilid-dengan-akses-kategori}

[Gambar 4.47](#gambar-4.47-tampilan-wireframe-halaman-tambah-jilid-dengan-akses-kategori) merupakan halaman *form* menambah data jilid *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah data jilid *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah jilid *halaqah* terdapat ada satu kolom masukan yakni judul nama *halaqah*, serta ada tombol “simpan” dan “tutup” di bagian bawah formulir.  
![][image48]

###### **Gambar 4.48 Tampilan *wireframe* halaman tambah kategori dengan akses admin** {#gambar-4.48-tampilan-wireframe-halaman-tambah-kategori-dengan-akses-admin}

[Gambar 4.48](#gambar-4.48-tampilan-wireframe-halaman-tambah-kategori-dengan-akses-admin) merupakan halaman *form* untuk menambah data kategori *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah data kategori *halaqah*, terdapat ada dua kolom masukan yakni ID, nama kategori *halaqah*, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.  
![][image49]

###### **Gambar 4.49 Tampilan *wireframe* halaman tambah penulis dengan akses admin** {#gambar-4.49-tampilan-wireframe-halaman-tambah-penulis-dengan-akses-admin}

[Gambar 4.49](#gambar-4.49-tampilan-wireframe-halaman-tambah-penulis-dengan-akses-admin) merupakan halaman *form* untuk menambah data penulis *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah data penulis *halaqah*, terdapat ada lima kolom masukan yakni nama, jurusan, fakultas, universitas, angkatan, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.  
![][image50]

###### **Gambar 4.50 Tampilan *wireframe* halaman tambah material dengan akses admin** {#gambar-4.50-tampilan-wireframe-halaman-tambah-material-dengan-akses-admin}

[Gambar 4.50](#gambar-4.50-tampilan-wireframe-halaman-tambah-material-dengan-akses-admin) merupakan halaman *form* untuk menambah data template yang hanya bisa diakses oleh admin. Halaman ini berisi ada judul halaman, tabel menambah data template file materi *halaqah*, *side navigation bar* dan *top navigation bar*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. T*op Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Tabel untuk menambah data template bahan materi *halaqah* terdapat tiga kolom masukan yakni nama materi *halaqah*, foto thumbnail, tombol unduh file materi *halaqah*, serta tombol “simpan” dan “tutup” di bagian bawah.

Bagian utama dari *prototyping*, yaitu pembuatan prototipe, dibuat seusai pembuatan *wireframe* selesai. Bentuk prototipe berdasarkan *wireframe* yang telah dibuat sebelumnya ditampilkan pada [Gambar 4.51](#gambar-4.51-tampilan-prototipe-halaman-beranda) hingga [Gambar 4.77](#gambar-4.77-tampilan-prototipe-halaman-ubah-penulis-dengan-akses-admin).  
![][image17]

###### **Gambar 4.51 Tampilan prototipe halaman beranda** {#gambar-4.51-tampilan-prototipe-halaman-beranda}

[Gambar 4.51](#gambar-4.51-tampilan-prototipe-halaman-beranda) merupakan halaman beranda yang bisa diakses oleh semua orang. Halaman ini berwarna inti biru, yang memiliki arti kebijaksanaan dan dapat memberi kesan kepercayaan. Disebelah kanan layar terdapat gambar ilustrasi yang tampak seperti sedang mencari buku. Gambar ini dipilih agar dapat mewakili tujuan dari fungsi web ini, yaitu mencari file *paper halaqah*. Disebelah kiri terdapat teks judul halaman dan tombol yang memiliki kegunaan untuk mengarahkan pengunjung menuju tindakan mengklik tombol tersebut lalu selanjutnya akan mengarah ke halaman cari saat ditekan. Terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini, sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren.  
![][image28]

###### **Gambar 4.52 Tampilan prototipe halaman jadwal** {#gambar-4.52-tampilan-prototipe-halaman-jadwal}

[Gambar 4.52](#gambar-4.52-tampilan-prototipe-halaman-jadwal) merupakan halaman jadwal *halaqah*, yang berisikan ada judul halaman, tabel informasi jadwal *halaqah*, dan *top navigation bar*. Tabel informasi jadwal *halaqah* yang terdapat kolom hari dan tanggal, lalu kolom judul materi dan nama-nama pematerinya, dan kolom nama tim pembahas. Terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini, sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren.  
![][image18]

###### **Gambar 4.53 Tampilan prototipe halaman cari** {#gambar-4.53-tampilan-prototipe-halaman-cari}

[Gambar 4.53](#gambar-4.53-tampilan-prototipe-halaman-cari) merupakan halaman cari materi *halaqah* yang dapat diakses pengguna ketika pengguna ingin mencari dan mengunduh file *paper halaqah*. Pengguna juga dapat memperbanyak jumlah daftar file *paper* yang ada di tabel, dengan cara menekan *dropdown* yang bertuliskan “show entries”. Jika ingin mencari, pengguna dapat mengetikkan apa yang ingin dicari maka secara otomatis tabel akan menampilkan hasil pencariannya. Jika sistem tidak menemukan apa yang ingin dicari pengguna, maka tabel tersebut akan tampak kosong. Pada bagian atas terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini. Sedangkan bagian kanan berisi simbol-simbol kecil yang mewakili dari media sosial yang dimiliki pesantren. *Top navigation bar* ini nantinya akan selalu ada di halaman pengunjung.  
![][image51]

###### **Gambar 4.54 Tampilan prototipe halaman material *halaqah*** {#gambar-4.54-tampilan-prototipe-halaman-material-halaqah}

[Gambar 4.54](#gambar-4.54-tampilan-prototipe-halaman-material-halaqah) merupakan halaman berisi materi *halaqah*, yang berisi file-file materi *halaqah* dan *top navigation bar*. Pada halaman ini kumpulan file materi *halaqah* yang dapat diunduh atau hanya dilihat saja. Terdapat *top navigation bar* yang dibagi menjadi dua bagian, bagian kiri dan bagian kanan. Bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini, sedangkan bagian kanan berisi simbol- simbol kecil yang mewakili dari media sosial yang dimiliki pesantren. sedangkan bagian kiri berisi daftar menu yang dapat membantu pengguna dalam mengakses fitur atau halaman yang terdapat pada situs ini.  
![][image19]

###### **Gambar 4.55 Tampilan prototipe halaman data *halaqah* dengan akses admin** {#gambar-4.55-tampilan-prototipe-halaman-data-halaqah-dengan-akses-admin}

[Gambar 4.55](#gambar-4.55-tampilan-prototipe-halaman-data-halaqah-dengan-akses-admin) merupakan halaman data *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah atau mengubah data *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah dan mengubah data *halaqah*, terdapat ada sembilan kolom masukan yakni judul nama *halaqah*, nama penulis, nama kategori, prodi/jurusan, fakultas, universitas, angkatan, jilid, dan unduh file *paper*, lalu ada tombol “ubah” dan “hapus”.  
![][image52]

###### **Gambar 4.56 Tampilan prototipe halaman data jadwal dengan akses admin** {#gambar-4.56-tampilan-prototipe-halaman-data-jadwal-dengan-akses-admin}

[Gambar 4.56](#gambar-4.56-tampilan-prototipe-halaman-data-jadwal-dengan-akses-admin) merupakan halaman data jadwal *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisikan ada judul halaman, tabel informasi jadwal *halaqah*, *side navigation bar* dan *top navigation bar*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. T*op Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data penulis”, “data jilid”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Tabel informasi jadwal *halaqah* yang terdapat empat kolom masukan ID, judul nama *halaqah*, hari dan tanggal, nama pemateri, serta ada tombol “ubah” dan “hapus”.  
![][image53]

###### **Gambar 4.57 Tampilan prototipe halaman data jilid dengan akses admin** {#gambar-4.57-tampilan-prototipe-halaman-data-jilid-dengan-akses-admin}

[Gambar 4.57](#gambar-4.57-tampilan-prototipe-halaman-data-jilid-dengan-akses-admin) merupakan halaman data jilid yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk mengubah data jilid *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Pada halaman ini admin dapat mengubah data jilid *halaqah*, terdapat ada dua kolom masukan yakni ID, nama *halaqah*, serta ada tombol “ubah” dan “hapus”.  
![][image30]

###### **Gambar 4.58 Tampilan prototipe halaman data kategori dengan akses admin** {#gambar-4.58-tampilan-prototipe-halaman-data-kategori-dengan-akses-admin}

[Gambar 4.58](#gambar-4.58-tampilan-prototipe-halaman-data-kategori-dengan-akses-admin) merupakan halaman data kategori yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol di sebelah kanan layar dan sebuah kolom masukan untuk mengubah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat mengubah data kategori *halaqah*, terdapat ada tiga kolom masukan yakni ID, nama kategori *halaqah*, serta ada tombol “ubah” dan “hapus”.  
![][image54]

###### **Gambar 4.59 Tampilan prototipe halaman data material dengan akses admin** {#gambar-4.59-tampilan-prototipe-halaman-data-material-dengan-akses-admin}

[Gambar 4.59](#gambar-4.59-tampilan-prototipe-halaman-data-material-dengan-akses-admin) merupakan halaman data template yang hanya bisa diakses oleh admin. Halaman ini berisikan ada judul halaman, tabel menambah data template file materi *halaqah*, *side navigation bar* dan *top navigation bar*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. T*op Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Tabel untuk menambah data template bahan materi *halaqah* terdapat empat kolom masukan yakni ID, nama materi *halaqah*, foto thumbnail, tombol unduh file materi *halaqah*, serta tombol aksi “ubah” dan “hapus”.  
![][image55]

###### **Gambar 4.60 Tampilan prototipe halaman data penulis dengan akses admin** {#gambar-4.60-tampilan-prototipe-halaman-data-penulis-dengan-akses-admin}

[Gambar 4.60](#gambar-4.60-tampilan-prototipe-halaman-data-penulis-dengan-akses-admin) merupakan halaman data penulis yang hanya bisa diakses oleh admin.

###### **Gambar 4.61 Tampilan prototipe halaman tambah penulis dengan akses admin** {#gambar-4.61-tampilan-prototipe-halaman-tambah-penulis-dengan-akses-admin}

[Gambar 4.61](#gambar-4.61-tampilan-prototipe-halaman-tambah-penulis-dengan-akses-admin) merupakan halaman profil yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk *update* profile administrator. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan

tanggal akses. *Side navigation bar* ini berisikan “home”, “data *halaqah*”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah dan mengubah data profil administrator, ada lima kolom masukan yakni nama ID, *email*, nomor telepon, alamat, dan *password* baru, lalu ada tombol “update” di bagian bawah halaman.

###### **Gambar 4.62 Tampilan prototipe halaman data penulis dengan akses admin** {#gambar-4.62-tampilan-prototipe-halaman-data-penulis-dengan-akses-admin}

[Gambar 4.62](#gambar-4.62-tampilan-prototipe-halaman-data-penulis-dengan-akses-admin) merupakan halaman pembaharuan data *halaqah* yang hanya bisa diakses oleh admin.  
![][image56]

###### **Gambar 4.63 Tampilan prototipe halaman data jadwal dengan tambahan notifikasi** {#gambar-4.63-tampilan-prototipe-halaman-data-jadwal-dengan-tambahan-notifikasi}

[Gambar	4.63](#gambar-4.63-tampilan-prototipe-halaman-data-jadwal-dengan-tambahan-notifikasi) merupakan halaman *update* atau pembaharuan data jadwal  
*halaqah* yang hanya bisa diakses oleh admin.

###### **Gambar 4.64 Tampilan prototipe halaman data jilid dengan tambahan notifikasi** {#gambar-4.64-tampilan-prototipe-halaman-data-jilid-dengan-tambahan-notifikasi}

[Gambar	4.64](#gambar-4.64-tampilan-prototipe-halaman-data-jilid-dengan-tambahan-notifikasi) merupakan halaman pembaharuan data jilid *halaqah* yang hanya bisa diakses oleh admin.  
![][image34]

###### **Gambar 4.65 Tampilan prototipe halaman data kategori dengan tambahan notifikasi** {#gambar-4.65-tampilan-prototipe-halaman-data-kategori-dengan-tambahan-notifikasi}

[Gambar 4.65](#gambar-4.65-tampilan-prototipe-halaman-data-kategori-dengan-tambahan-notifikasi) merupakan halaman pembaharuan data kategori *halaqah* yang hanya bisa diakses oleh admin.

###### **Gambar 4.66 Tampilan prototipe halaman data material dengan tambahan notifikasi** {#gambar-4.66-tampilan-prototipe-halaman-data-material-dengan-tambahan-notifikasi}

[Gambar 4.66](#gambar-4.66-tampilan-prototipe-halaman-data-material-dengan-tambahan-notifikasi) merupakan halaman pembaharuan data penulis *halaqah* yang hanya bisa diakses oleh admin.  
![][image57]

###### **Gambar 4.67 Tampilan prototipe halaman data penulis dengan tambahan notifikasi** {#gambar-4.67-tampilan-prototipe-halaman-data-penulis-dengan-tambahan-notifikasi}

[Gambar 4.67](#gambar-4.67-tampilan-prototipe-halaman-data-penulis-dengan-tambahan-notifikasi) merupakan halaman pembaharuan data penulis *halaqah* yang hanya bisa diakses oleh admin.

###### **Gambar 4.68 Tampilan prototipe halaman tambah jilid dengan akses admin** {#gambar-4.68-tampilan-prototipe-halaman-tambah-jilid-dengan-akses-admin}

[Gambar 4.68](#gambar-4.68-tampilan-prototipe-halaman-tambah-jilid-dengan-akses-admin) merupakan halaman *form* untuk menambah data jilid *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah data jilid *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan

“home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah jilid *halaqah* terdapat ada satu kolom masukan yakni judul nama *halaqah*, serta ada tombol “simpan” dan “tutup” di bagian bawah formulir.

###### **Gambar 4.69 Tampilan prototipe halaman tambah kategori dengan akses admin** {#gambar-4.69-tampilan-prototipe-halaman-tambah-kategori-dengan-akses-admin}

[Gambar 4.69](#gambar-4.69-tampilan-prototipe-halaman-tambah-kategori-dengan-akses-admin) merupakan halaman *form* untuk menambah data kategori *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah data kategori *halaqah*, terdapat ada dua kolom masukan yakni ID, nama kategori *halaqah*, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.  
![][image31]

###### **Gambar 4.70 Tampilan prototipe halaman tambah jadwal dengan akses admin** {#gambar-4.70-tampilan-prototipe-halaman-tambah-jadwal-dengan-akses-admin}

[Gambar 4.70](#gambar-4.70-tampilan-prototipe-halaman-tambah-jadwal-dengan-akses-admin) merupakan halaman *form* untuk menambah data template *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi ada judul halaman, tabel menambah data template file materi *halaqah*, *side navigation bar* dan *top navigation bar*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. T*op Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Tabel untuk menambah data template bahan materi *halaqah* terdapat tiga kolom masukan yakni nama materi *halaqah*, foto thumbnail, tombol unduh file materi *halaqah*, serta tombol “simpan” dan “tutup” di bagian bawah.  
![][image58]

###### **Gambar 4.71 Tampilan prototipe halaman tambah material dengan akses admin** {#gambar-4.71-tampilan-prototipe-halaman-tambah-material-dengan-akses-admin}

[Gambar 4.71](#gambar-4.71-tampilan-prototipe-halaman-tambah-material-dengan-akses-admin) merupakan halaman *form* untuk menambah data jadwal *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk mengubah jadwal *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah data jadwal *halaqah*, terdapat ada tiga kolom masukan yakni judul nama *halaqah*, nama penulis, tanggal pelaksanaan *halaqah*, nama pemateri, serta ada tombol “simpan” dan “tutup” di bagian bawah formulir.  
![][image59]

###### **Gambar 4.72 Tampilan prototipe halaman tambah penulis dengan akses admin** {#gambar-4.72-tampilan-prototipe-halaman-tambah-penulis-dengan-akses-admin}

[Gambar 4.72](#gambar-4.72-tampilan-prototipe-halaman-tambah-penulis-dengan-akses-admin) merupakan halaman *form* untuk menambah data penulis *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat menambah data penulis *halaqah*, terdapat lima kolom masukan yakni nama, jurusan, fakultas, universitas, angkatan, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.  
![][image32]

###### **Gambar 4.73 Tampilan prototipe halaman ubah jadwal dengan akses admin** {#gambar-4.73-tampilan-prototipe-halaman-ubah-jadwal-dengan-akses-admin}

[Gambar 4.73](#gambar-4.73-tampilan-prototipe-halaman-ubah-jadwal-dengan-akses-admin) merupakan halaman *form* untuk mengubah jadwal *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk mengubah jadwal *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat mengubah data jadwal *halaqah*, terdapat ada tiga kolom masukan yakni judul nama *halaqah*, nama penulis, tanggal pelaksanaan *halaqah*, nama pemateri, serta ada tombol “simpan” dan “tutup” di bagian bawah formulir.  
![][image60]

###### **Gambar 4.74 Tampilan prototipe halaman ubah jilid dengan akses admin** {#gambar-4.74-tampilan-prototipe-halaman-ubah-jilid-dengan-akses-admin}

[Gambar 4.74](#gambar-4.74-tampilan-prototipe-halaman-ubah-jilid-dengan-akses-admin) merupakan halaman *form* untuk mengubah jilid *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah data jilid *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat mengubah jilid *halaqah* terdapat ada satu kolom masukan yakni judul nama *halaqah*, serta ada tombol “simpan” dan “tutup” di bagian bawah formulir.  
![][image33]

###### **Gambar 4.75 Tampilan prototipe halaman ubah kategori dengan akses admin** {#gambar-4.75-tampilan-prototipe-halaman-ubah-kategori-dengan-akses-admin}

[Gambar 4.75](#gambar-4.75-tampilan-prototipe-halaman-ubah-kategori-dengan-akses-admin) merupakan halaman *form* untuk mengubah kategori *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat mengubah data kategori *halaqah*, terdapat ada dua kolom masukan yakni ID, nama kategori *halaqah*, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.  
![][image61]

###### **Gambar 4.76 Tampilan prototipe halaman ubah template dengan akses admin** {#gambar-4.76-tampilan-prototipe-halaman-ubah-template-dengan-akses-admin}

[Gambar 4.76](#gambar-4.76-tampilan-prototipe-halaman-ubah-template-dengan-akses-admin) merupakan halaman *form* untuk mengubah template materi *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi ada judul halaman, tabel menambah data template file materi *halaqah*, *side navigation bar* dan *top navigation bar*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. T*op Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data jilid”, “data penulis”, “data *halaqah*”, “data jadwal”, “data template”, “profile”, dan “log out”. Tabel untuk mengubah data template bahan materi *halaqah* terdapat tiga kolom masukan yakni nama materi *halaqah*, foto thumbnail, tombol unduh file materi *halaqah*, serta tombol “simpan” dan “tutup” di bagian bawah.  
![][image62]

###### **Gambar 4.77 Tampilan prototipe halaman ubah penulis dengan akses admin** {#gambar-4.77-tampilan-prototipe-halaman-ubah-penulis-dengan-akses-admin}

[Gambar 4.77](#gambar-4.77-tampilan-prototipe-halaman-ubah-penulis-dengan-akses-admin) merupakan halaman *form* untuk mengubah data penulis *halaqah* yang hanya bisa diakses oleh admin. Halaman ini berisi *top navigation bar*, *side navigation bar*, judul halaman di sebelah kiri layar, tombol disebelah kanan layar dan sebuah kolom masukan untuk menambah kategori *halaqah*. *Top navigation bar* dan *side navigation bar* selalu ada di semua halaman administrator. *Top Navigation bar* di sebelah kiri berisi tulisan judul halaman yang menandakan bahwa halaman ini hanya dapat diakses oleh admin, lalu di bagian sisi kanannya terdapat informasi hari dan tanggal akses. *Side navigation bar* ini berisikan “home”, “data kategori”, “data *halaqah*”, “data jadwal”, “profile”, dan “log out”. Pada halaman ini admin dapat mengubah data penulis *halaqah*, terdapat lima kolom masukan yakni nama, jurusan, fakultas, universitas, angkatan, serta ada tombol “simpan” dan “tutup” di bagian sisi bawah formulir.

Prototipe yang telah selesai dibuat dievaluasi oleh enam pengguna, dua diantaranya merupakan anggota Litbang, sedangkan sisanya merupakan santri pesantren luhur yang diambil secara acak. Hasil evaluasi berupa umpan balik yang dirangkum dan dapat dilihat pada [Tabel 4.9](#tabel-4.9-daftar-umpan-balik-pengguna-pada-prototyping-iterasi-3).

**Tabel 4.9 Daftar umpan balik pengguna pada *prototyping* iterasi 3**

| Nama Pengguna | Umpan Balik |
| :---- | ----- |
| Tim Litbang 1 | Tidak ada saran perubahan prototipe. |
| Tim Litbang 2 | Tampilan bagus. Tidak ada saran perubahan prototipe. |

| Nama Pengguna | Umpan Balik |
| :---- | ----- |
| Santri 1 | Tampilan bagus. Tidak ada saran perubahan prototipe. |
| Santri 2 | Tampilan bagus. Tidak ada saran perubahan prototipe. |
| Santri 3 | Tampilan bagus. Tidak ada saran perubahan prototipe. |
| Santri 4 | Tidak ada saran perubahan prototipe. |

4. ## **Hasil Analisis Kebutuhan** {#hasil-analisis-kebutuhan}

   1. #### **Kebutuhan Pengguna, Sistem dan Batasan** {#kebutuhan-pengguna,-sistem-dan-batasan}

Selain analisis permasalahan, analisis kebutuhan pengguna dan kebutuhan sistem juga didapat dari elisitasi kebutuhan. Kebutuhan pengguna merepresentasikan tujuan pengguna ketika sistem hendak dibangun. Kebutuhan sistem menjelaskan fungsi atau fitur dari sistem yang berinteraksi satu dengan yang lain. Analisis kebutuhan pengguna dan kebutuhan sistem dipaparkan pada [Tabel 4.10.](#tabel-4.10-daftar-kebutuhan-pengguna-dalam-bentuk-final)

###### **Tabel 4.10 Daftar kebutuhan pengguna dalam bentuk final** {#tabel-4.10-daftar-kebutuhan-pengguna-dalam-bentuk-final}

| No | Kebutuhan Pengguna |
| :---- | ----- |
| 1 | Admin dapat mengunggah *paper halaqah* Pesantren Luhur |
| 2 | Admin dapat melihat *paper halaqah* Pesantren Luhur |
| 3 | Admin dapat membaca *paper halaqah* Pesantren Luhur |
| 4 | Admin dapat mengubah *paper halaqah* Pesantren Luhur |
| 5 | Admin dapat menghapus *paper halaqah* Pesantren Luhur |
| 6 | Admin dapat mencari *paper halaqah* Pesantren Luhur |
| 7 | Admin dapat menambah kategori *halaqah* Pesantren Luhur |
| 8 | Admin dapat melihat kategori *halaqah* Pesantren Luhur |
| 9 | Admin dapat mengubah kategori *halaqah* Pesantren Luhur |
| 10 | Admin dapat menghapus kategori *halaqah* Pesantren Luhur |
| 11 | Admin dapat menambah jadwal *halaqah* Pesantren Luhur |
| 12 | Admin dapat melihat jadwal *halaqah* Pesantren Luhur |

| No | Kebutuhan Pengguna |
| :---- | ----- |
| 13 | Admin dapat mengubah jadwal *halaqah* Pesantren Luhur |
| 14 | Admin dapat menghapus jadwal *halaqah* Pesantren Luhur |
| 15 | Admin dapat menambah jilid *halaqah* Pesantren Luhur |
| 16 | Admin dapat melihat jilid *halaqah* Pesantren Luhur |
| 17 | Admin dapat mengubah jilid *halaqah* Pesantren Luhur |
| 18 | Admin dapat menghapus jilid *halaqah* Pesantren Luhur |
| 19 | Admin dapat menambah material *halaqah* Pesantren Luhur |
| 20 | Admin dapat melihat material *halaqah* Pesantren Luhur |
| 21 | Admin dapat mengubah material *halaqah* Pesantren Luhur |
| 22 | Admin dapat menghapus material *halaqah* Pesantren Luhur |
| 23 | Admin dapat menambah penulis *halaqah* Pesantren Luhur |
| 24 | Admin dapat melihat penulis *halaqah* Pesantren Luhur |
| 25 | Admin dapat mengubah penulis *halaqah* Pesantren Luhur |
| 26 | Admin dapat menghapus penulis *halaqah* Pesantren Luhur |
| 27 | Pengunjung dapat mengunduh *paper halaqah* Pesantren Luhur |
| 28 | Pengunjung dapat melihat *paper halaqah* Pesantren Luhur |
| 29 | Pengunjung dapat membaca *paper halaqah* Pesantren Luhur |
| 30 | Pengunjung dapat mencari *paper halaqah* Pesantren Luhur |
| 31 | Pengunjung dapat melihat jadwal *halaqah* |
| 32 | Pengunjung dapat melihat material *halaqah* Pesantren Luhur |
| 33 | Pengunjung dapat mengunduh material *halaqah* Pesantren Luhur |

| No | Aktivitas | Penjelasan |
| :---- | ----- | ----- |
| 1 | Login | Sistem hanya menerima Litbang untuk memasuki sistem admin. Penyeleksian pengguna berdasarkan dengan nama pengguna dan kata sandi. Apabila nama pengguna atau kata sandi tidak sesuai, maka pengguna tidak dapat memasuki sistem admin. |
| 2 | Mengelola data *paper halaqah* | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari *paper halaqah* Pesantren Luhur dari admin. |
| 3 | Logout | Sistem dapat mengeluarkan sesi admin dari sistem admin. |
| 4 | Kategori | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari kategori *halaqah* Pesantren Luhur dari admin. |
| 5 | Jadwal | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari jadwal *halaqah* Pesantren Luhur dari admin. |
| 6 | Jilid | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari nomor jilid *paper halaqah* Pesantren Luhur dari admin. |
| 7 | Material | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari material *halaqah* Pesantren Luhur dari admin. |
| 8 | Penulis | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari penulis dari *paper halaqah* Pesantren Luhur dari admin. |

Dalam proses analisis kebutuhan pengguna dan kebutuhan sistem, terdapat batasan-batasan yang ditemukan. Batasan-batasan tersebut dideskripsikan pada [Tabel 4.12.](#tabel-4.12-batasan-batasan-dalam-sistem)

**Tabel 4.12 Batasan-batasan dalam sistem**

| No | Batasan |
| :---- | ----- |
| 1 | *File paper halaqah* harus dalam jenis pdf |
| 2 | Tiap *file paper halaqah* berukuran maksimal 50mb |
| 3 | Nama pengguna admin maksimal 64 karakter |
| 4 | Kata sandi admin maksimal 128 karakter |
|  5 | Nama pengguna dan kata sandi tidak diperbolehkan menggunakan spasi |
| 6 | Nama pengguna tidak boleh menggunakan karakter diakritik \~ |
|  7 | Nama pengguna tidak boleh menggunakan simbol kecuali *hyphen* (-) dan *underscore* (\_) |
| 8 | Kata sandi bersifat *case-sensitive* |

2. #### **Identifikasi Pengguna Akhir** {#identifikasi-pengguna-akhir}

   **Tabel 4.13 Identifikasi pengguna akhir**

| No | Nama Pengguna | Aktivitas Yang Dibutuhkan |
| :---- | :---- | :---- |
| 1 | Admin (Litbang) | Pengguna dapat memasuki atau keluar dari sistem admin. |
|  |  | Pengguna dapat mengunggah, melihat, mengubah, menghapus dan mencari *paper halaqah* Pesantren Luhur dari sistem admin. |
|  |  | Pengguna dapat mengunggah, melihat, mengubah, menghapus dan mencari jadwal *halaqah* Pesantren Luhur dari sistem admin. |
|  |  | Pengguna dapat mengunggah, melihat, mengubah, menghapus dan mencari penulis dari *paper halaqah* Pesantren Luhur dari sistem admin. |
|  |  | Pengguna dapat mengunggah, melihat, mengubah, menghapus dan mencari nomor jilid *paper halaqah* Pesantren Luhur dari admin. |
|  |  | Pengguna dapat mengunggah, melihat, mengubah, menghapus dan mencari kategori *halaqah* Pesantren Luhur dari admin. |

**Tabel 4.13 Identifikasi pengguna akhir (Lanjutan)**

| No | Nama Pengguna | Aktivitas Yang Dibutuhkan |
| :---- | :---- | :---- |
| 2 | Pengunjung | Pengguna dapat mengunduh, melihat, membaca dan mencari *paper halaqah* Pesantren Luhur dari sistem admin. |
|  |  | Pengguna dapat melihat jadwal *halaqah* |
|  |  | Pengguna dapat mengunduh material *halaqah* |

3. #### **Kebutuhan Fungsional dan Non-Fungsional** {#kebutuhan-fungsional-dan-non-fungsional}

Kebutuhan fungsional menjelaskan mengenai apa saja yang dapat dilakukan pengguna untuk berinteraksi dengan sistem. Kebutuhan non-fungsional menjelaskan tentang atribut kualitas yang harus dipenuhi sistem.

1. ***Identifikasi Fitur***

###### **Gambar 4.78 Keterangan dari kode identifikasi fitur** {#gambar-4.78-keterangan-dari-kode-identifikasi-fitur}

[Gambar 4.78](#gambar-4.78-keterangan-dari-kode-identifikasi-fitur) menampilkan cara untuk memberikan penamaan kode fitur. APPA dalam kode fitur merupakan kepanjangan dari Aplikasi Pengarsipan *Paper Halaqah*. FT melambangkan kode identifikasi fitur yang berarti *Features*. Nomor urut kode fitur dituliskan di akhir kode, bertempat di huruf X. Hasil identifikasi fitur dijelaskan pada [Tabel 4.14](#tabel-4.14-daftar-fitur-yang-diperlukan-untuk-sistem).

###### **Tabel 4.14 Daftar fitur yang diperlukan untuk sistem** {#tabel-4.14-daftar-fitur-yang-diperlukan-untuk-sistem}

| Kode Fitur | Nama Fitur | Deskripsi Fitur |
| :---- | :---- | :---- |
| APPA-FT-01 | Login | Sistem dapat digunakan Litbang untuk masuk ke dalam halaman admin |

| Kode Fitur | Nama Fitur | Deskripsi Fitur |
| :---- | :---- | :---- |
| APPA-FT-02 | Mengelola data *paper halaqah* | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari *paper halaqah* Pesantren Luhur dari admin. |
| APPA-FT-03 | Mengelola data jadwal *halaqah* | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari jadwal *halaqah* Pesantren Luhur dari admin. |
| APPA-FT-04 | Mengelola data penulis *paper halaqah* | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari penulis *paper halaqah* Pesantren Luhur dari admin. |
| APPA-FT-05 | Mengelola data jilid *paper halaqah* | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari jilid *paper halaqah* Pesantren Luhur dari admin. |
| APPA-FT-06 | Mengelola data kategori *halaqah* | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari kategori *halaqah* Pesantren Luhur dari admin. |

| Kode Fitur | Nama Fitur | Deskripsi Fitur |
| :---- | :---- | :---- |
| APPA-FT-07 | Mengelola data material *halaqah* | Sistem dapat mengeksekusi perintah mengunggah, melihat, mengubah, menghapus dan mencari material *halaqah* Pesantren Luhur dari admin. |
| APPA-FT-08 | Mengelola profil *halaqah* | Sistem dapat mengeksekusi perintah melihat, mengubah, menghapus profil *halaqah* Pesantren Luhur dari admin. |
| APPA-FT-09 | Logout | Sistem dapat mengeluarkan sesi admin dari sistem admin. |
| APPA-FT-10 | Responsif | Sistem dapat dijalankan dengan baik pada semua ukuran layar perangkat. |
| APPA-FT-11 | Kompatibilitas | Sistem dapat berfungsi pada berbagai jenis browser |

2. ***Kebutuhan Fungsional***

###### **Gambar 4.79 Keterangan dari kode kebutuhan fungsional** {#gambar-4.79-keterangan-dari-kode-kebutuhan-fungsional}

[Gambar 4.79](#gambar-4.79-keterangan-dari-kode-kebutuhan-fungsional) menampilkan cara untuk memberikan penamaan kode fitur. APPA dalam kode fitur merupakan kepanjangan dari Aplikasi Pengarsipan *Paper*

*Halaqah*. FR melambangkan kode kebutuhan fungsional yang berarti *Functional Requirements*. Nomor urut kode fitur dituliskan di akhir kode, bertempat di huruf  
X. Hasil identifikasi fitur dijelaskan pada [Tabel 4.15.](#tabel-4.15-daftar-kebutuhan-fungsional-sistem)

**Tabel 4.15 Daftar kebutuhan fungsional sistem**

| Kode Fitur | Kode Fungsional | Deskripsi Kebutuhan Fungsional |
| :---- | :---- | :---- |
| APPA-FT-01 | APPA-FR-01 | Sistem dapat digunakan Litbang untuk masuk ke dalam halaman admin |
| APPA-FT-02 | APPA-FR-02 | Sistem dapat mengeksekusi perintah mengunggah *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-03 | Sistem dapat mengeksekusi perintah melihat *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-04 | Sistem dapat mengeksekusi perintah mengubah *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-05 | Sistem dapat mengeksekusi perintah menghapus *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-06 | Sistem dapat mengeksekusi perintah mencari *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-07 | Sistem dapat mengeksekusi perintah mengunduh *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-08 | Sistem dapat mengeksekusi perintah pratinjau *paper halaqah* Pesantren Luhur dari admin. |
| APPA-FT-03 | APPA-FR-09 | Sistem dapat mengeksekusi perintah menambah jadwal *halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-10 | Sistem dapat mengeksekusi perintah melihat jadwal *halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-11 | Sistem dapat mengeksekusi perintah mengubah jadwal *halaqah* Pesantren Luhur dari admin. |

| Kode Fitur | Kode Fungsional | Deskripsi Kebutuhan Fungsional |
| :---- | :---- | :---- |
|  | APPA-FR-12 | Sistem dapat mengeksekusi perintah *delete* jadwal *halaqah* Pesantren Luhur dari admin. |
| APPA-FT-04 | APPA-FR-13 | Sistem dapat mengeksekusi perintah menambah penulis *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-14 | Sistem dapat mengeksekusi perintah melihat penulis *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-15 | Sistem dapat mengeksekusi perintah mengubah penulis *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-16 | Sistem dapat mengeksekusi perintah menghapus penulis *paper halaqah* Pesantren Luhur dari admin. |
| APPA-FT-05 | APPA-FR-17 | Sistem dapat mengeksekusi perintah menambah jilid *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-18 | Sistem dapat mengeksekusi perintah melihat jilid *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-19 | Sistem dapat mengeksekusi perintah mengubah jilid *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-20 | Sistem dapat mengeksekusi perintah menghapus jilid *paper halaqah* Pesantren Luhur dari admin. |
| APPA-FT-06 | APPA-FR-21 | Sistem dapat mengeksekusi perintah menambah kategori *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-22 | Sistem dapat mengeksekusi perintah melihat kategori *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-23 | Sistem dapat mengeksekusi perintah mengubah kategori *paper halaqah* Pesantren Luhur dari admin. |

| Kode Fitur | Kode Fungsional | Deskripsi Kebutuhan Fungsional |
| :---- | :---- | :---- |
|  | APPA-FR-24 | Sistem dapat mengeksekusi perintah menghapus kategori *paper halaqah* Pesantren Luhur dari admin. |
| APPA-FT-07 | APPA-FR-25 | Sistem dapat mengeksekusi perintah menambah material *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-26 | Sistem dapat mengeksekusi perintah melihat material *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-27 | Sistem dapat mengeksekusi perintah mengubah material *paper halaqah* Pesantren Luhur dari admin. |
|  | APPA-FR-28 | Sistem dapat mengeksekusi perintah menghapus material *paper halaqah* Pesantren Luhur dari admin. |
| APPA-FT-08 | APPA-FR-29 | Sistem dapat mengeksekusi perintah mengubah data profil admin. |
| APPA-FT-09 | APPA-FR-30 | Sistem dapat mengeluarkan sesi admin dari sistem admin. |

3. **Kebutuhan Non Fungsional**

**Gambar 4.80 Keterangan dari kode kebutuhan non fungsional**

[Gambar 4.80](#gambar-4.80-keterangan-dari-kode-kebutuhan-non-fungsional) menampilkan cara untuk memberikan penamaan kode fitur. APPA dalam kode fitur merupakan kepanjangan dari Aplikasi Pengarsipan *Paper Halaqah*. FNR melambangkan kode kebutuhan non fungsional yang berarti *Functional Non Requirements*. Nomor urut kode kebutuhan non fungsional dituliskan di akhir kode, bertempat di huruf X. Hasil identifikasi fitur dijelaskan pada [Tabel 4.16](#kode-fitur).

|  Kode Fitur | Kode Non- Fungsional | Deskripsi Kebutuhan Non- Fungsional |
| :---- | :---- | :---- |
| APPA-FT-10 | APPA-NFR-01 | Sistem dapat dijalankan dengan baik pada semua ukuran layar perangkat. |
| APPA-FT-11 | APPA-NFR-02 | Sistem dapat berfungsi pada berbagai jenis browser |

4. ##### ***Use Case Diagram*** {#use-case-diagram-1}

*Use case diagram* merupakan salah satu cara untuk menggambarkan hubungan kebutuhan pengguna dan sistem. Hubungan antara *use case* dan aktor diilustrasikan pada *use case diagram*. Pada sistem informasi pengarsipan *halaqah* proses pembuatan *use case diagram* berlandaskan pada kebutuhan fungsional sistem. Ilustrasi dari keterlibatan aktor dengan setiap *use case* ditampilkan pada [Gambar 4.81.](#gambar-4.81-usecase-diagram-dari-sistem-pengarsipan-paper-halaqah)

###### **Gambar 4.81 Usecase diagram dari sistem pengarsipan *paper halaqah*** {#gambar-4.81-usecase-diagram-dari-sistem-pengarsipan-paper-halaqah}

Dari keseluruhan *use case*, aktor pengunjung hanya terlibat pada *use case*, lihat jadwal, lihat material, unduh makalah, lihat daftar makalah, pratinjau makalah, cari makalah dan login. Berbeda dengan aktor pengunjung, aktor admin dapat terlibat dengan semua *use case*, kecuali login. Jika ingin mengakses fitur

tambah lihat ubah dan hapus data dari admin (CRUD), maka pengunjung harus melakukan login terlebih dahulu. Pada [Gambar 4.81](#gambar-4.81-usecase-diagram-dari-sistem-pengarsipan-paper-halaqah) menghasilkan dua aktor, yaitu pengunjung dan admin. Selain itu, penelitian ini juga menghasilkan 30 *use case* yang mencakup 23 *use case* terlibat dengan admin dan 7 *use case* terlibat dengan pengunjung.

5. ##### ***Use Case Scenario*** {#use-case-scenario}

Saat *use case diagram* telah selesai dibuat, akan sulit untuk melangkah ke depan dalam proses pengembangan tanpa mengetahui bagaimana sistem diakses oleh pengguna. Dalam hal ini, peneliti memanfaatkan *use case scenario* yang dibuat berdasarkan *use case diagram*. Masing-masing *use case* dibuatkan alur skenario iteraksi antara pengguna dan sistem. Bentuk *use case scenario* ditunjukkan dari [Tabel 4.17](#tabel-4.17-use-case-scenario-login) hingga [Tabel 4.46](#tabel-4.46-use-case-scenario-logout).

1. ***Use Case Scenario*** **Login**

Rincinan mengenai skenario pengguna terhadap *use case login* ditampilkan pada [Tabel 4.17](#tabel-4.17-use-case-scenario-login).

**Tabel 4.17 *Use case scenario login***

| *Use case scenario login* |  |
| ----- | :---- |
| ***Objective*** | Pengunjung melakukan login untuk memasuki halaman admin |
| ***Actor*** | Pengunjung. |
| ***Pre- Condition*** | Mengakses halaman login |
| ***Main Flow*** | Sistem menampilkan halaman login Pengunjung memasukkan *username* Pengunjung memasukkan *password* Pengunjung menekan tombol login Sistem mencocokkan *username* dan *password* pada *database* sistem *Username* dan *password* sesuai dengan *database* sistem |

**Tabel 4.17 *Use case scenario login* (Lanjutan)**

| *Use case scenario* login |  |
| :---- | :---- |
| ***Alternative flows*** | 5a. *Username* atau *password* tidak sesuai dengan *database* sistem 5a.1	Sistem menampilkan pesan “*Username* atau *password* yang anda masukkan salah” |
| ***Post- condition*** | Sistem menampilkan halaman utama admin |

2. ***Use Case Scenario*** **Tambah Makalah *Halaqah***

   Rincinan mengenai skenario pengguna terhadap *use case* tambah makalah

*halaqah* ditampilkan pada [Tabel 4.18.](#tabel-4.18-use-case-scenario-tambah-paper-halaqah)

**Tabel 4.18 *Use case scenario* tambah *paper halaqah***

| *Use case scenario* tambah *paper halaqah* |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menambah data *paper halaqah* |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data *halaqah* Sistem menampilkan daftar *paper halaqah* Admin menekan tombol tambah yang berada pada atas tabel Sistem menampilkan halaman tambah data *paper halaqah* Admin memasukkan data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |

**Tabel 4\.*18 Use case scenario* tambah *paper halaqah* (Lanjutan)**

| *Use case scenario* tambah *paper halaqah* |  |
| ----- | :---- |
| ***Post-condition*** | Sistem menambahkan data baru pada *database* |

3. ***Use case Scenario*** **Lihat Makalah *Halaqah***

   Rincinan mengenai skenario pengguna terhadap *use case* lihat daftar makalah

*halaqah* ditampilkan pada [Tabel 4.19.](#tabel-4.19-use-case-scenario-lihat-daftar-paper-halaqah)

**Tabel 4.19 *Use case scenario* lihat daftar *paper halaqah***

| *Use case scenario* lihat daftar *paper halaqah* |  |
| ----- | :---- |
| ***Objective*** | Pengunjung dapat melihat daftar *halaqah* dalam *website* pengarsipan *paper halaqah*. |
| ***Actor*** | Pengunjung. |
| ***Pre-Condition*** | **\-** |
| ***Main Flow*** | Pengunjung membuka halaman cari Sistem menampilkan halaman cari Sistem menampilkan daftar *halaqah* terbaru |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Menampilkan daftar *halaqah* terbaru |

4. ***Use Case Scenario*** **Ubah Makalah *Halaqah***

   Rincinan mengenai skenario pengguna terhadap *use case* ubah makalah

*halaqah* ditampilkan pada [Tabel 4.20.](#tabel-4.20-use-case-scenario-ubah-paper-halaqah)

**Tabel 4.20 *Use case scenario* ubah *paper halaqah***

| *Use case scenario* ubah *paper halaqah* |  |
| ----- | :---- |
| ***Objective*** | Admin dapat mengubah data *paper halaqah* |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data *halaqah* Sistem menampilkan daftar *paper halaqah* Admin menekan tombol ubah pada sisi kanan tabel Sistem menampilkan halaman ubah data *paper halaqah* Sistem menampilkan data yang akan diubah admin Admin mengubah data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menyimpan perubahan |

5. ***Use Case Scenario*** **Hapus Makalah *Halaqah***

   Rincinan mengenai skenario pengguna terhadap *use case* hapus makalah

*halaqah* ditampilkan pada [Tabel 4.21.](#tabel-4.21-use-case-scenario-hapus-paper-halaqah)

**Tabel 4.21 *Use case scenario* hapus *paper halaqah***

| *Use case scenario* hapus *paper halaqah* |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menghapus data *paper halaqah* |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data *halaqah* Sistem menampilkan daftar *paper halaqah* Admin menekan tombol hapus pada sisi kanan tabel Sistem menghapus data *paper halaqah* yang dipilih admin |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Data *paper* yang dipilih admin telah terhapus |

6. ***Use Case Scenario*** **Cari Makalah *Halaqah***

   Rincinan mengenai skenario pengguna terhadap *use case* cari makalah

*halaqah* ditampilkan pada [Tabel 4.22.](#tabel-4.22-use-case-scenario-cari-paper-halaqah)

**Tabel 4.22 *Use case scenario* cari *paper halaqah***

| *Use case scenario* cari *paper halaqah* |  |
| ----- | :---- |
| ***Objective*** | Pengunjung dapat mencari *paper halaqah* dalam *website* pengarsipan *paper halaqah*. |
| ***Actor*** | Pengunjung. |
| ***Pre- Condition*** | Menu cari sudah ditekan |

| *Use case scenario* cari *paper halaqah* |  |
| ----- | :---- |
| ***Main Flow*** | Sistem menampilkan halaman jelajahi. Pengunjung mengetikkan judul *halaqah* yang ingin dicari di dalam *website* pengarsipan *paper halaqah*. Sistem mencocokkan judul *halaqah* dari pengunjung dengan data *halaqah* di dalam *website*. Sistem menampilkan hasil pencarian sesuai dengan keinginan pengunjung. |
| ***Alternative flows*** | 6a. Sistem tidak menemukan data sesuai keinginan pengunjung. 6a.1 Sistem menampilkan pesan “Data yang dicari tidak tersedia”. |
| ***Post- condition*** | Menampilkan hasil pencarian. |

7. ***Use Case Scenario*** **Unduh Makalah *Halaqah***

   Rincinan mengenai skenario pengguna terhadap *use case* unduh makalah

*halaqah* ditampilkan pada [Tabel 4.23.](#tabel-4.23-use-case-scenario-unduh-paper-halaqah)

**Tabel 4.23 *Use case scenario* unduh *paper halaqah***

| *Use case scenario* unduh *paper halaqah* |  |
| ----- | :---- |
| ***Objective*** | Pengunjung dapat mengunduh salah satu *halaqah* dalam bentuk dokumen pdf. |
| ***Actor*** | Pengunjung. |
| ***Pre- Condition*** | Membuka menu jelajahi atau setelah berhasil melakukan pencarian *halaqah* dalam laman jelajahi. |
| ***Main Flow*** | Pengunjung menekan tombol unduh pada salah satu judul di daftar *halaqah* Sistem memproses data *halaqah* yang akan diunduh. Sistem mengunduh *halaqah* dalam bentuk dokumen pdf. |

| *Use case scenario* unduh *paper halaqah* |  |
| ----- | :---- |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Mengunduh *halaqah* dalam dokumen pdf. |

8. ***Use Case Scenario*** **Pratinjau Makalah *Halaqah***

   Rincinan mengenai skenario pengguna terhadap *use case* pratinjau makalah

*halaqah* ditampilkan pada [Tabel 4.24.](#tabel-4.24-use-case-scenario-pratinjau-halaqah)

**Tabel 4.24 *Use case scenario* pratinjau *halaqah***

| *Use case scenario* pratinjau *halaqah* |  |
| ----- | :---- |
| ***Objective*** | Pengunjung dapat meninjau salah satu *halaqah* secara lengkap di dalam *website* pengarsipan *paper halaqah*. |
| ***Actor*** | Pengunjung. |
| ***Pre-Condition*** | Membuka menu jelajahi atau setelah berhasil melakukan pencarian *halaqah* dalam laman jelajahi. |
| ***Main Flow*** | Pengunjung menekan tombol pratinjau pada salah satu judul di daftar *halaqah*. Sistem menampilkan isi *halaqah* secara keseluruhan. |
| ***Alternative flows*** | 2a.1 Sistem tidak dapat menampilkan isi *halaqah* pada tab baru karena dokumen tidak kompatibel dalam browser. 2a.2 Sistem mengunduh material yang dipilih pengunjung dalam bentuk *file* |
| ***Post- condition*** | Menampilkan isi *halaqah* secara keseluruhan. |

9. ***Use Case Scenario*** **Tambah Jadwal *Halaqah***

   Rincinan mengenai skenario pengguna terhadap *use case* tambah jadwal

*halaqah* ditampilkan pada [Tabel 4.25.](#tabel-4.25-use-case-scenario-tambah-data-jadwal)

**Tabel 4.25 *Use case scenario* tambah data jadwal**

| *Use case scenario* tambah data jadwal |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menambah data jadwal |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data jadwal Sistem menampilkan data jadwal Admin menekan tombol tambah yang berada pada atas tabel Sistem menampilkan halaman tambah data jadwal Admin memasukkan data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menambahkan data baru pada *database* |

10. ***Use Case Scenario*** **Lihat Jadwal *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* lihat jadwal

*halaqah* ditampilkan pada [Tabel 4.26.](#tabel-4.26-use-case-scenario-melihat-jadwal-halaqah)

**Tabel 4.26 *Use case scenario* melihat jadwal *halaqah***

| *Use case scenario* melihat jadwal *halaqah* |  |
| ----- | :---- |
| ***Objective*** | Pengunjung dapat melihat jadwal *halaqah* dalam dua minggu ke depan. |
| ***Actor*** | Pengunjung. |

| *Use case scenario* melihat jadwal *halaqah* |  |
| ----- | :---- |
| ***Pre-Condition*** | Sudah membuka *website* |
| ***Main Flow*** | Pengunjung menekan menu jadwal yang terletak dibagian kiri atas *website*. Sistem mencari data jadwal dalam basis data Sistem menampilkan jadwal *halaqah* dalam halaman jadwal. |
| ***Alternative flows*** | 2a. Sistem tidak menemukan data jadwal dalam basis data 2a.1 Sistem menampilkan pesan “Jadwal tidak ditemukan” |
| ***Post-condition*** | Menampilkan jadwal *halaqah* dalam dua minggu ke depan. |

11. ***Use Case Scenario*** **Ubah Jadwal *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* ubah jadwal

*halaqah* ditampilkan pada [Tabel 4.27.](#tabel-4.27-use-case-scenario-ubah-data-jadwal)

**Tabel 4.27 *Use case scenario* ubah data jadwal**

| *Use case scenario* ubah data jadwal |  |
| ----- | :---- |
| ***Objective*** | Admin dapat mengubah data jadwal |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |

| *Use case scenario* ubah data jadwal |  |
| ----- | :---- |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data jadwal Sistem menampilkan daftar data jadwal Admin menekan tombol ubah pada sisi kanan tabel Sistem menampilkan halaman ubah data jadwal Sistem menampilkan data yang akan diubah admin Admin mengubah data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menyimpan perubahan |

12. ***Use Case Scenario*** **Hapus Jadwal *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* hapus jadwal

*halaqah* ditampilkan pada [Tabel 4.28.](#tabel-4.28-use-case-scenario-hapus-jadwal)

**Tabel 4.28 *Use case scenario* hapus jadwal**

| *Use case scenario* hapus jadwal |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menghapus data jadwal |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data jadwal Sistem menampilkan daftar data jadwal Admin menekan tombol hapus pada sisi kanan tabel Sistem menghapus data jadwal yang dipilih admin |

| *Use case scenario* hapus jadwal |  |
| ----- | :---- |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Data jadwal yang dipilih admin telah terhapus |

13. ***Use Case Scenario*** **Tambah Penulis *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* tambah penulis

*halaqah* ditampilkan pada [Tabel 4.29.](#tabel-4.29-use-case-scenario-tambah-data-penulis)

**Tabel 4.29 *Use case scenario* tambah data penulis**

| *Use case scenario* tambah data penulis |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menambah data penulis |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data penulis Sistem menampilkan daftar data penulis Admin menekan tombol tambah yang berada pada atas tabel Sistem menampilkan halaman tambah data penulis Admin memasukkan data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menambahkan data baru pada *database* |

14. ***Use Case Scenario*** **Lihat Penulis *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* lihat penulis

*halaqah* ditampilkan pada [Tabel 4.30.](#tabel-4.30-use-case-scenario-lihat-data-penulis)

**Tabel 4.30 *Use case scenario* lihat data penulis**

| *Use case scenario* lihat data penulis |  |
| ----- | :---- |
| ***Objective*** | Admin dapat melihat data penulis |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data penulis Sistem menampilkan daftar data penulis |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menampilkan daftar data penulis |

15. ***Use Case Scenario*** **Ubah Penulis *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* ubah penulis

*halaqah* ditampilkan pada [Tabel 4.31.](#tabel-4.31-use-case-scenario-ubah-data-penulis)

**Tabel 4.31 *Use case scenario* ubah data penulis**

| *Use case scenario* ubah data penulis |  |
| ----- | :---- |
| ***Objective*** | Admin dapat mengubah data penulis |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |

**Tabel 4.31 *Use case scenario* ubah data penulis (Lanjutan)**

| *Use case scenario* ubah data penulis |  |
| ----- | :---- |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data penulis Sistem menampilkan daftar data penulis Admin menekan tombol ubah pada sisi kanan tabel Sistem menampilkan halaman ubah data penulis Sistem menampilkan data yang akan diubah admin Admin mengubah data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menyimpan perubahan |

16. ***Use Case Scenario*** **Hapus Penulis *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* hapus penulis

*halaqah* ditampilkan pada [Tabel 4.32.](#tabel-4.32-use-case-scenario-hapus-penulis)

**Tabel 4.32 *Use case scenario* hapus penulis**

| *Use case scenario* hapus penulis |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menghapus data penulis |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data penulis Sistem menampilkan daftar data penulis Admin menekan tombol hapus pada sisi kanan tabel Sistem menghapus data penulis yang dipilih admin |

| *Alternative flows* | \- |
| :---- | :---- |
| ***Post-condition*** | Data penulis yang dipilih admin telah terhapus |

**Tabel 4.32 *Use case scenario* hapus penulis (Lanjutan)**

| *Use case scenario* hapus penulis |  |
| ----- | :---- |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Data penulis yang dipilih admin telah terhapus |

17. ***Use Case Scenario*** **Tambah Jilid *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* tambah jilid

*halaqah* ditampilkan pada [Tabel 4.33.](#tabel-4.33-use-case-scenario-tambah-data-jilid)

**Tabel 4.33 *Use case scenario* tambah data jilid**

| *Use case scenario* tambah data jilid |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menambah data jilid |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data jilid Sistem menampilkan data jilid Admin menekan tombol tambah yang berada pada atas tabel Sistem menampilkan halaman tambah data jilid Admin memasukkan data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menambahkan data baru pada *database* |

18. ***Use Case Scenario*** **Lihat Jilid *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* lihat jilid *halaqah*

ditampilkan pada [Tabel 4.34.](#tabel-4.34-use-case-scenario-melihat-jilid-halaqah)

**Tabel 4.34 *Use case scenario* melihat jilid *halaqah***

| *Use case scenario* melihat jilid *halaqah* |  |
| ----- | :---- |
| ***Objective*** | Pengunjung dapat melihat jilid *halaqah* |
| ***Actor*** | Pengunjung. |
| ***Pre-Condition*** | Sudah membuka *website* |
| ***Main Flow*** | Pengunjung menekan menu jilid yang terletak dibagian kiri atas *website*. Sistem mencari data jilid dalam basis data Sistem menampilkan jilid *halaqah* dalam halaman jilid. |
| ***Alternative flows*** | 2a. Sistem tidak menemukan data jilid dalam basis data 2a.1 Sistem menampilkan pesan “Jilid tidak ditemukan” |
| ***Post-condition*** | Menampilkan jilid *halaqah* |

19. ***Use Case Scenario*** **Ubah Jilid *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* ubah jilid *halaqah*

ditampilkan pada [Tabel 4.35.](#tabel-4.35-use-case-scenario-ubah-data-jilid)

**Tabel 4.35 *Use case scenario* ubah data jilid**

| *Use case scenario* ubah data jilid |  |
| ----- | :---- |
| ***Objective*** | Admin dapat mengubah data jilid |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |

| *Use case scenario* ubah data jilid |  |
| ----- | :---- |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data jilid Sistem menampilkan daftar data jilid Admin menekan tombol ubah pada sisi kanan tabel Sistem menampilkan halaman ubah data jilid Sistem menampilkan data yang akan diubah admin Admin mengubah data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menyimpan perubahan |

20. ***Use Case Scenario*** **Hapus Jilid *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* hapus jilid *halaqah*

ditampilkan pada [Tabel 4.36.](#tabel-4.36-use-case-scenario-hapus-jilid-halaqah)

**Tabel 4.36 *Use case scenario* hapus jilid *halaqah***

| *Use case scenario* hapus jilid *halaqah* |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menghapus data jilid |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data jilid Sistem menampilkan daftar data jilid Admin menekan tombol hapus pada sisi kanan tabel Sistem menghapus data jilid yang dipilih admin |

| *Use case scenario* hapus jilid *halaqah* |  |
| ----- | :---- |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Data jilid yang dipilih admin telah terhapus |

21. ***Use Case Scenario*** **Tambah Kategori *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* tambah kategori

*halaqah* ditampilkan pada [Tabel 4.37.](#tabel-4.37-use-case-scenario-tambah-data-kategori)

**Tabel 4.37 *Use case scenario* tambah data kategori**

| *Use case scenario* tambah data kategori |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menambah data kategori |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data kategori Sistem menampilkan data kategori Admin menekan tombol tambah yang berada pada atas tabel Sistem menampilkan halaman tambah data kategori Admin memasukkan data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menambahkan data baru pada *database* |

22. ***Use Case Scenario*** **Lihat Kategori *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* lihat kategori

*halaqah* ditampilkan pada [Tabel 4.38.](#tabel-4.38-use-case-scenario-melihat-kategori-halaqah)

**Tabel 4.38 *Use case scenario* melihat kategori *halaqah***

| *Use case scenario* melihat kategori *halaqah* |  |
| ----- | :---- |
| ***Objective*** | Pengunjung dapat melihat kategori *halaqah* |
| ***Actor*** | Pengunjung. |
| ***Pre-Condition*** | Sudah membuka *website* |
| ***Main Flow*** | Pengunjung menekan menu kategori yang terletak dibagian kiri atas *website*. Sistem mencari data kategori dalam basis data Sistem menampilkan kategori *halaqah* dalam halaman kategori. |
| ***Alternative flows*** | 2a. Sistem tidak menemukan data kategori dalam basis data 2a.1 Sistem menampilkan pesan “Kategori tidak ditemukan” |
| ***Post-condition*** | Menampilkan kategori *halaqah*. |

23. ***Use Case Scenario*** **Ubah Kategori *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* ubah kategori

*halaqah* ditampilkan pada [Tabel 4.39.](#tabel-4.39-use-case-scenario-ubah-data-kategori)

**Tabel 4.39 *Use case scenario* ubah data kategori**

| *Use case scenario* ubah data kategori |  |
| ----- | :---- |
| ***Objective*** | Admin dapat mengubah data kategori |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |

| *Use case scenario* ubah data kategori |  |
| ----- | :---- |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data kategori Sistem menampilkan daftar data kategori Admin menekan tombol ubah pada sisi kanan tabel Sistem menampilkan halaman ubah data kategori Sistem menampilkan data yang akan diubah admin Admin mengubah data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menyimpan perubahan |

24. ***Use Case Scenario*** **Hapus Kategori *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* hapus kategori

*halaqah* ditampilkan pada [Tabel 4.40.](#tabel-4.40-use-case-scenario-hapus-kategori-halaqah)

**Tabel 4.40 *Use case scenario* hapus kategori *halaqah***

| *Use case scenario* hapus kategori *halaqah* |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menghapus data kategori |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data kategori Sistem menampilkan daftar data kategori Admin menekan tombol hapus pada sisi kanan tabel Sistem menghapus data kategori yang dipilih admin |

| *Use case scenario* hapus kategori *halaqah* |  |
| ----- | :---- |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Data kategori yang dipilih admin telah terhapus |

25. ***Use Case Scenario*** **Tambah Material *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* tambah material

*halaqah* ditampilkan pada [Tabel 4.41.](#tabel-4.41-use-case-scenario-tambah-data-jadwal)

**Tabel 4.41 *Use case scenario* tambah data jadwal**

| *Use case scenario* tambah data jadwal |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menambah data jadwal |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data jadwal Sistem menampilkan data jadwal Admin menekan tombol tambah yang berada pada atas tabel Sistem menampilkan halaman tambah data jadwal Admin memasukkan data sesuai yang diinginkan Admin menekan tombol simpan |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menambahkan data baru pada *database* |

26. ***Use Case Scenario*** **Lihat Material *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* lihat material

*halaqah* ditampilkan pada

**Tabel 4.42 *Use case scenario* mengunduh dokumen material *halaqah***

| *Use case scenario* mengunduh dokumen material *halaqah* |  |
| ----- | :---- |
| ***Objective*** | Pengunjung dapat melihat dan mengunduh material yang berkaitan dengan *halaqah*. |
| ***Actor*** | Pengunjung. |
| ***Pre- Condition*** | \- |
| ***Main Flow*** | Pengunjung membuka halaman material Sistem menampilkan halaman material Pengunjung menekan tombol unduh pada salah satu daftar material yang ditampilkan. Sistem memproses perintah dan dokumen yang akan diunduh Sistem mengunduh material yang dipilih pengunjung dalam bentuk *file* |
| ***Alternative flows*** | 2a. Pengunjung menekan tombol lihat pada salah satu daftar material yang ditampilkan. 2a.1	Sistem menampilkan dokumen material *halaqah* pada tab baru 2b. Pengunjung menekan tombol lihat pada salah satu daftar material yang ditampilkan. 2b.1 Sistem tidak dapat menampilkan dokumen material pada tab baru karena dokumen tidak kompatibel dalam browser. 2b.2 Sistem mengunduh material yang dipilih pengunjung dalam bentuk dokumen |
| ***Post- condition*** | Dokumen telah diunduh dan dapat dibuka pada perangkat pengguna. |

27. ***Use Case Scenario*** **Ubah Material *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* ubah material

*halaqah* ditampilkan pada [Tabel 4.42.](#tabel-4.42-use-case-scenario-mengunduh-dokumen-material-halaqah)

**Tabel 4.43 *Use case scenario* ubah material**

| *Use case scenario* ubah material |  |
| ----- | :---- |
| ***Objective*** | Admin dapat mengubah material *halaqah* |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data material Sistem menampilkan halaman material Admin menekan tombol ubah pada bagian salah satu data material Sistem menampilkan pop up Admin memilih *file* yang akan diunggah Sistem mengunggah *file* |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem memberi pesan “*File* berhasil diunggah” |

28. ***Use Case Scenario*** **Hapus Material *Halaqah***

    Rincinan mengenai skenario pengguna terhadap *use case* hapus material

*halaqah* ditampilkan pada [Tabel 4.44.](#tabel-4.44-use-case-scenario-hapus-material-halaqah)

**Tabel 4.44 *Use case scenario* hapus material *halaqah***

| *Use case scenario* hapus material *halaqah* |  |
| ----- | :---- |
| ***Objective*** | Admin dapat menghapus data material |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data material Sistem menampilkan daftar data material Admin menekan tombol hapus pada sisi kanan tabel Sistem menghapus data material yang dipilih admin |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Data material yang dipilih admin telah terhapus |

29. ***Use Case Scenario*** **Ubah Profil Admin**

Rincinan mengenai skenario pengguna terhadap *use case* ubah profil admin ditampilkan pada [Tabel 4.45.](#tabel-4.45-use-case-scenario-ubah-profil-admin)

**Tabel 4.45 *Use case scenario* ubah profil admin**

| *Use case scenario* ubah profil admin |  |
| ----- | :---- |
| ***Objective*** | Admin dapat mengubah profil admin |
| ***Actor*** | Admin |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu data profil Sistem menampilkan halaman profil Admin mengubah data profil Admin menekan tombol ubah pada bagian profil admin Sistem memproses dan menyimpan perubahan data profil |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem memberi pesan “Data profil telah diubah” |

30. ***Use Case Scenario*** **Logout**

Rincinan mengenai skenario pengguna terhadap *use case* logout admin ditampilkan pada [Tabel 4.46.](#tabel-4.46-use-case-scenario-logout)

**Tabel 4.46 *Use case scenario* logout**

| *Use case scenario* logout |  |
| ----- | :---- |
| ***Objective*** | Pengunjung melakukan logout untuk keluar dari halaman admin |
| ***Actor*** | Admin. |
| ***Pre-Condition*** | Berhasil login sebagai admin. |
| ***Main Flow*** | Sistem menampilkan halaman utama Admin memilih menu logout |
| ***Alternative flows*** | \- |
| ***Post-condition*** | Sistem menampilkan halaman beranda pengunjung |

5. ### ***Entity Relational Diagram*** **(ERD)** {#entity-relational-diagram-(erd)}

Dalam pembuatan basis data diperlukan analisis tentang hubungan antar satu data dengan data lain agar tidak terjadi kesalahan dalam menyimpan data. Analisis basis data pada sistem informasi pengarsipan *halaqah* menerapkan *Entity Relationship Diagram* (ERD). ERD merupakan bentuk visualisasi sederhana dari struktur basis data agar dapat memahami relasi antar data dan bagaimana data tersebut disimpan. Gambaran ERD dari sistem informasi pengarsipan *halaqah* ditunjukkan pada [Gambar 4.82](#gambar-4.82-hasil-rancangan-erd-\(entity-relationship-diagram\)).

![][image63]

**Gambar 4.82 Hasil rancangan ERD (*Entity Relationship Diagram*)**

# **BAB 5 PERANCANGAN SISTEM** {#bab-5-perancangan-sistem}

1. ### ***Class Diagram*** {#class-diagram-1}

Dalam perancangan *class diagram* pada sistem informasi pengarsipan *paper halaqah*, menghasilkan dua *class diagram*, yaitu *class diagram controller* dan *class diagram model*. [Gambar 5.1](#gambar-5.1-rancangan-class-diagram-controller) merupakan bentuk *class diagram controller* yang terdiri dari tiga *controller* meliputi IndexController, LoginController dan AdminController. IndexController berfokus pada kebutuhan-kebutuhan atau fitur yang ditujukan pada pengunjung. LoginController berfungsi sebagai memproses serta memverifikasi *email* dan *password* admin. Sedangkan AdminController, berfokus pada fitur-fitur yang hanya dapat diakses oleh admin.

**Gambar 5.1 Rancangan *class diagram controller***

![][image64]

**Gambar 5.2 Rancangan *class diagram model***

2. ### ***Sequence Diagram*** {#sequence-diagram-1}

*Sequence diagram* menjelaskan interaksi yang dilakukan antar objek satu sama lain dalam suatu urutan waktu tertentu. Dalam penelitian ini pembuatan *sequence diagram* mengacu pada *use case scenario* dan *class diagram*. Hasil *sequence diagram* dipaparkan dalam hingga

1. ##### ***Sequence Diagram Login*** {#sequence-diagram-login}

Gambaran proses interaksi antar sistem saat pengunjung akan melakukan login dapat diamati pada [Gambar 5.3](#gambar-5.3-sequence-diagram-login).

**Gambar 5.3 *Sequence diagram* login**

2. ***Sequence Diagram* Tambah Makalah *Halaqah***

Gambaran proses interaksi antar sistem saat admin akan menambah data makalah *halaqah* baru dapat diamati pada [Gambar 5.4](#gambar-5.4-sequence-diagram-tambah-makalah-halaqah)

**Gambar 5.4 *Sequence diagram* tambah makalah *halaqah***

3. ***Sequence Diagram*** **Lihat Makalah *Halaqah***

Gambaran proses interaksi antar sistem saat admin akan melihat data makalah *halaqah* dapat diamati pada [Gambar 5.5](#gambar-5.5-sequence-diagram-lihat-makalah-halaqah).  
![][image65]

**Gambar 5.5 *Sequence diagram* lihat makalah *halaqah***

4. ***Sequence Diagram*** **Ubah Makalah *Halaqah***

   Gambaran proses interaksi antar sistem saat admin akan mengubah makalah

*halaqah* dapat diamati pada [Gambar 5.6](#gambar-5.6-sequence-diagram-ubah-makalah-halaqah).  
![][image66]

**Gambar 5.6 *Sequence diagram* ubah makalah *halaqah***

5. ***Sequence Diagram*** **Hapus Makalah *Halaqah***

   Gambaran proses interaksi antar sistem saat admin akan menghapus makalah

*halaqah* dapat diamati pada [Gambar 5.7](#gambar-5.7-sequence-diagram-hapus-makalah-halaqah).  
![][image67]

**Gambar 5.7 *Sequence diagram* hapus makalah *halaqah***

6. ***Sequence Diagram*** **Cari Makalah *Halaqah***

Gambaran proses interaksi antar sistem saat pengunjung akan mencari makalah *halaqah* dapat diamati pada [Gambar 5.8](#gambar-5.8-sequence-diagram-cari-makalah-halaqah).  
![][image68]

**Gambar 5.8 *Sequence diagram* cari makalah *halaqah***

7. ***Sequence Diagram*** **Tambah Penulis *Halaqah***

   Gambaran proses interaksi antar sistem saat admin akan menambah penulis

*halaqah* dapat diamati pada [Gambar 5.9](#gambar-5.9-sequence-diagram-tambah-penulis-halaqah).  
![][image69]

**Gambar 5.9 *Sequence diagram* tambah penulis *halaqah***

8. ***Sequence Diagram*** **Lihat Penulis *Halaqah***

   Gambaran proses interaksi antar sistem saat admin akan melihat penulis

*halaqah* dapat diamati pada [Gambar 5.10](#gambar-5.10-sequence-diagram-lihat-penulis-halaqah).  
![][image70]

**Gambar 5.10 *Sequence diagram* lihat penulis *halaqah***

9. ***Sequence Diagram*** **Ubah Penulis *Halaqah***

   Gambaran proses interaksi antar sistem saat admin akan mengubah penulis

*halaqah* dapat diamati pada [Gambar 5.11](#gambar-5.11-sequence-diagram-ubah-penulis-halaqah).  
![][image66]

**Gambar 5.11 *Sequence diagram* ubah penulis *halaqah***

10. ***Sequence Diagram*** **Hapus Penulis *Halaqah***

    Gambaran proses interaksi antar sistem saat admin akan menghapus penulis

*halaqah* dapat diamati pada [Gambar 5.12](#gambar-5.12-sequence-diagram-hapus-penulis-halaqah).  
![][image71]

**Gambar 5.12 *Sequence diagram* hapus penulis *halaqah***

3. ### ***Physical Database Design*** **(PDD)** {#physical-database-design-(pdd)}

Perancangan database sistem informasi pengarsipan *halaqah* mengacu pada desain ERD. Perbedaan antara ERD dengan PDD adalah PDD memiliki keterangan tipe data dari masing-masing field. Hasil desain PDD mendapatkan tujuh tabel yang ditampilkan pada [Gambar 5.13](#gambar-5.13-rancangan-database-sistem-informasi-pengarsipan-halaqah).

**Gambar 5.13 Rancangan *database* sistem informasi pengarsipan *halaqah***

# **BAB 6 IMPLEMENTASI** {#bab-6-implementasi}

1. ### ***Login*** {#login}

Program *login* menggunakan kelas LoginController. Kelas LoginController diwariskan dari kelas Controller. Program *login* dijelaskan mengenai verifikasi *email* dan *password* sebagaimana ditampilkan pada tabel [Tabel 6.1](#tabel-6.1-kode-program-dari-fungsi-login).

**Tabel 6.1 Kode program dari fungsi login**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 | *class* LoginController extends Controller { public function login() { return view('login'); } public function prosesLogin(Request $request) { if	(Auth::attempt(\['*email*'=\>$request- \>*email*,'*password*'=\>$request-\>*password*\])) { if (Auth::User()-\>level \== "Admin") { return \\Redirect::to('/admin/*home*'); } else { \\Session::flash('msg\_login','*Email* Atau *Password* Salah\!'); return \\Redirect::to('/login'); } } else { \\Session::flash('msg\_login','*Email*	Atau	*Password* Salah\!'); return \\Redirect::to('/login'); } } public function logout(){ Auth::logout(); return \\Redirect::to('/'); } } |
| :---- | :---- |

2. ## **Tambah Kategori** {#tambah-kategori}

Pada program tambah kategori menggunakan fungsi addKategori() yang terdapat dalam kelas AdminController. Kelas ini diwariskan dari kelas Controller. Bentuk dan isi dari fungsi addKategori() ditampilkan pada [Tabel 6.2](#tabel-6.2-kode-program-dari-fungsi-tambah-kategori).

**Tabel 6.2 Kode program dari fungsi tambah kategori**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 | *class* AdminController extends Controller { public function addKategori(Request $request) { DB::beginTransaction(); try { $kategori \= new Kategori; $kategori-\>name \= $request-\>name; $kategori-\>save(); DB::commit(); \\Session::flash('msg\_success','Kategori	Berhasil Ditambah\!'); return Redirect::route('admin.kategori'); } catch (Exception $e) { DB::rollback(); \\Session::flash('msg\_error','Somethings Wrong\!'); return Redirect::route('admin.kategori'); } } } |
| :---- | :---- |

3. ## **Ubah Kategori** {#ubah-kategori}

Pada program ubah kategori menggunakan fungsi updateKategori() yang terdapat dalam kelas AdminController. Kelas ini diwariskan dari kelas Controller. Bentuk dan isi dari fungsi updateKategori() ditampilkan pada [Tabel 6.4](#tabel-6.4-kode-program-dari-fungsi-hapus-kategori).

**Tabel 6.3 Kode program dari fungsi kategori**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 | *class* AdminController extends Controller { public function updateKategori(Request $request) { DB::beginTransaction(); try { $kategori \= Kategori::find($request-\>id); $kategori-\>name \= $request-\>name; $kategori-\>save(); DB::commit(); \\Session::flash('msg\_success','Kategori	Berhasil Diubah\!'); return Redirect::route('admin.kategori'); } catch (Exception $e) { DB::rollback(); \\Session::flash('msg\_error','Somethings Wrong\!'); return Redirect::route('admin.kategori'); } } } |
| :---- | :---- |

4. ## **Hapus Kategori** {#hapus-kategori}

Pada program hapus kategori menggunakan fungsi deleteKategori() yang terdapat dalam kelas AdminController. Kelas ini diwariskan dari kelas Controller. Bentuk dan isi dari fungsi deleteKategori() ditampilkan pada [Tabel 6.4](#tabel-6.4-kode-program-dari-fungsi-hapus-kategori).

**Tabel 6.4 Kode program dari fungsi hapus kategori**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 | *class* AdminController extends Controller { public function updateKategori(Request $request) { DB::beginTransaction(); try { $kategori \= Kategori::find($request-\>id); $kategori-\>name \= $request-\>name; $kategori-\>save(); DB::commit(); \\Session::flash('msg\_success','Kategori	Berhasil Diubah\!'); return Redirect::route('admin.kategori'); } catch (Exception $e) { DB::rollback(); \\Session::flash('msg\_error','Somethings Wrong\!'); return Redirect::route('admin.kategori'); } } } |
| :---- | :---- |

5. ## **Tambah Jilid** {#tambah-jilid}

Pada program tambah jilid menggunakan fungsi addJilid() yang terdapat dalam kelas AdminController. Kelas ini diwariskan dari kelas Controller. Bentuk dan isi dari fungsi addJilid() ditampilkan pada [Tabel 6.5](#tabel-6.5-kode-program-dari-fungsi-tambah-jilid).

**Tabel 6.5 Kode program dari fungsi tambah jilid**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 | *class* AdminController extends Controller { public function addJilid(Request $request) { DB::beginTransaction(); try { $jilid \= new Jilid; $jilid-\>name \= $request-\>name; $jilid-\>save(); DB::commit(); \\Session::flash('msg\_success','Jilid	Berhasil Ditambah\!'); return Redirect::route('admin.jilid'); } catch (Exception $e) { DB::rollback(); \\Session::flash('msg\_error','Somethings Wrong\!'); return Redirect::route('admin.jilid'); } } } |
| :---- | :---- |

6. ## **Ubah Jilid** {#ubah-jilid}

Pada program ubah jilid menggunakan fungsi updateJilid() yang terdapat dalam kelas AdminController. Kelas ini diwariskan dari kelas Controller. Bentuk dan isi dari fungsi updateJilid() ditampilkan pada [Tabel 6.6](#tabel-6.6-kode-program-dari-fungsi-update-jilid).

**Tabel 6.6 Kode program dari fungsi *update* jilid**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 | *class* AdminController extends Controller { public function updateJilid(Request $request) { DB::beginTransaction(); try { $jilid \= Jilid::find($request-\>id); $jilid-\>name \= $request-\>name; $jilid-\>save(); DB::commit(); \\Session::flash('msg\_success','Jilid	Berhasil Diubah\!'); return Redirect::route('admin.jilid'); } catch (Exception $e) { DB::rollback(); \\Session::flash('msg\_error','Somethings Wrong\!'); return Redirect::route('admin.jilid'); } } } |
| :---- | :---- |

7. ## **Hapus Jilid** {#hapus-jilid}

Pada program hapus jilid menggunakan fungsi deleteJilid() yang terdapat dalam kelas AdminController. Kelas ini diwariskan dari kelas Controller. Bentuk dan isi dari fungsi deleteJilid() ditampilkan pada

**Tabel 6.7 Kode program dari fungsi hapus jilid**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 | *class* AdminController extends Controller { public function deleteJilid($id) { DB::beginTransaction(); try { $jilid \= Jilid::where('id',$id)-\>first(); $jilid-\>delete(); DB::commit(); \\Session::flash('msg\_success','Data Jilid Berhasil Dihapus\!'); return Redirect::route('admin.jilid'); } catch (Exception $e) { DB::rollback(); \\Session::flash('msg\_error','Somethings Wrong\!'); return Redirect::route('admin.jilid'); } } } |
| :---- | :---- |

8. ## **Tambah Penulis** {#tambah-penulis}

Pada program tambah penulis menggunakan fungsi addPenulis() yang terdapat dalam kelas AdminController. Kelas ini diwariskan dari kelas Controller. Bentuk dan isi dari fungsi addPenulis() ditampilkan pada [Tabel 6.8](#tabel-6.8-kode-program-dari-fungsi-tambah-penulis).

**Tabel 6.8 Kode program dari fungsi tambah penulis**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 | *class* AdminController extends Controller{ public function addPenulis(Request $request) { DB::beginTransaction(); try { $penulis \= new Penulis; $penulis-\>name \= $request-\>name; $penulis-\>jurusan \= $request-\>jurusan; $penulis-\>fakultas \= $request-\>fakultas; $penulis-\>universitas \= $request-\>universitas; $penulis-\>angkatan \= $request-\>angkatan; $penulis-\>save(); DB::commit(); \\Session::flash('msg\_success','Penulis	Berhasil Ditambah\!'); return Redirect::route('admin.penulis'); } catch (Exception $e) { DB::rollback(); \\Session::flash('msg\_error','Somethings Wrong\!'); return Redirect::route('admin.penulis'); } } } |
| :---- | :---- |

9. ## **Ubah Penulis** {#ubah-penulis}

Pada program ubah penulis menggunakan fungsi updatePenulis() yang terdapat dalam kelas AdminController. Kelas ini diwariskan dari kelas Controller. Bentuk dan isi dari fungsi updatePenulis() ditampilkan pada [Tabel 6.9](#tabel-6.9-kode-program-dari-fungsi-ubah-penulis).

**Tabel 6.9 Kode program dari fungsi ubah penulis**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 | *class* AdminController extends Controller{ public function updatePenulis(Request $request) { DB::beginTransaction(); try { $penulis \= Penulis::find($request-\>id); $penulis-\>name \= $request-\>name; $penulis-\>jurusan \= $request-\>jurusan; $penulis-\>fakultas \= $request-\>fakultas; $penulis-\>universitas \= $request-\>universitas; $penulis-\>angkatan \= $request-\>angkatan; $penulis-\>save(); DB::commit(); \\Session::flash('msg\_success','Penulis	Berhasil Diubah\!'); return Redirect::route('admin.penulis'); } catch (Exception $e) { DB::rollback(); \\Session::flash('msg\_error','Somethings Wrong\!'); return Redirect::route('admin.penulis'); } } } |
| :---- | :---- |

10. ## **Hapus Penulis** {#hapus-penulis}

Pada program hapus penulis menggunakan fungsi deletePenulis() yang terdapat dalam kelas AdminController. Kelas ini diwariskan dari kelas Controller. Bentuk dan isi dari fungsi deletePenulis() ditampilkan pada [Tabel 6.10](#tabel-6.10-kode-program-dari-fungsi-hapus-penulis).

**Tabel 6.10 Kode program dari fungsi hapus penulis**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 | *class* AdminController extends Controller { public function deletePenulis($id) { DB::beginTransaction(); try { $penulis \= Penulis::where('id',$id)-\>first(); $penulis-\>delete(); DB::commit(); \\Session::flash('msg\_success','Data	Penulis Berhasil Dihapus\!'); return Redirect::route('admin.penulis'); } catch (Exception $e) { DB::rollback(); \\Session::flash('msg\_error','Somethings Wrong\!'); return Redirect::route('admin.penulis'); } } } |
| :---- | :---- |

11. ## **Tambah Jadwal** {#tambah-jadwal}

Pada program tambah jadwal menggunakan fungsi addJadwal() yang terdapat dalam kelas AdminController. Kelas ini diwariskan dari kelas Controller. Bentuk dan isi dari fungsi addJadwal() ditampilkan pada [Tabel 6.11](#tabel-6.11-kode-program-dari-fungsi-tambah-jadwal).

**Tabel 6.11 Kode program dari fungsi tambah jadwal**

| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 | *class* AdminController extends Controller { public function addJadwal(Request $request) { DB::beginTransaction(); try { $jadwal \= new Jadwal; $jadwal-\>judul \= $request-\>judul; $jadwal-\>id\_penulis \= $request-\>id\_penulis; $jadwal-\>tanggal \= $request-\>tanggal; $jadwal-\>pemateri \= $request-\>pemateri; $jadwal-\>save(); DB::commit(); \\Session::flash('msg\_success','Jadwal	Berhasil Ditambah\!'); return Redirect::route('admin.jadwal'); } catch (Exception $e) { DB::rollback(); \\Session::flash('msg\_error','Somethings Wrong\!'); return Redirect::route('admin.jadwal'); } } } |
| :---- | :---- |

# **BAB 7 PENGUJIAN** {#bab-7-pengujian}

1. ## **Rancangan Pengujian** {#rancangan-pengujian}

   1. **Pengujian *Black Box Testing***

Pengujian *black box testing* yang dijalankan pada Sistem Informasi Pengarsipan *Halaqah* dengan menerapkan metode *Equivalence Partitioning*. Pengujian ini dimulai dengan membuat tabel yang bertujuan untuk memeriksa apakah masukan-masukan yang diberikan pada kolom input valid atau tidak valid. Pengujian ini dilakukan dengan merujuk pada pengujian yang telah dilaksanakan oleh Nando Krishna Carera (2022) dan Amanda Amalia (2021) dengan beberapa modifikasi. Pada rancangan pengujian, format tabel pengujian *black box testing* dibuat dan disajikan dalam [Tabel 7.1.](#tabel-7.1-format-tabel-pengujian-black-box-testing)

**Tabel 7.1 Format tabel pengujian *black box testing***

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | ----- | :---: | :---: |
| 1 | \- | \- | \- | \- |
| 2 | \- | \- | \- | \- |
| 3 | \- | \- | \- | \- |
| … | \- | \- | \- | \- |

Pada [Tabel 7.1](#tabel-7.1-format-tabel-pengujian-black-box-testing) terdapat lima kolom, dimana deskripsi fungsi dari masing-masing kolom akan dipaparkan sebagai berikut :

1. Kolom 'No' berfungsi untuk memberikan nomor urut pada setiap pengujian yang akan dilaksanakan.

2. Kolom “Kode Fungsional” berisi kode fungsional dari kebutuhan fungsional yang telah dideskripsikan dalam Bab Rekayasa Kebutuhan (Bab 4). Karena pengujian ini hanya menguji masukan-masukan yang diberikan pada kolom input, maka tidak semua kode fungsional akan digunakan dalam pengujian ini.

3. Kolom “Kode Uji” merupakan kolom yang berisi kode dari pengujian yang  
   dilakukan pada setiap kode fungsionalnya

4. Kolom “Kasus Uji” berisi masukan-masukan yang akan diuji pada sistem informasinya.

5. Kolom “Hasil yang Diharapkan” merupakan harapan terhadap hasil yang

   didapatkan setelah melakukan pengujian

Hasil pengisian tabel sesuai dengan format [Tabel 7.1](#tabel-7.1-format-tabel-pengujian-black-box-testing), didapatkan 14 kode fungsional, 42 kode uji, 42 kasus uji dan 42 hasil yang diharapkan. Bentuk pengisian tabel dijabarkan pada [Tabel 7.2](#tabel-7.2-pengisian-tabel-black-box-testing-sesuai-dengan-format-tabel).

**Tabel 7.2 Pengisian tabel *black box testing* sesuai dengan format tabel**

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan |
| :---- | :---- | :---- | :---- | :---- |
| 1 | APPA-FR- 01 | 001 | Mengisi kolom *email* yang tidak sesuai dengan format *email* (Contoh format *email* : [anonim@gmail.com)](mailto:anonim@gmail.com) dan menekan tombol masuk | Sistem menolak permintaan login dan menampilkan pesan “The *email* is invalid” |
| 2 |  | 002 | Mengisi *password* yang berjumlah kurang dari 8 karakter dan menekan tombol masuk | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” |
| 3 |  | 003 | Mengisi *password* melebihi 32 karakter | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” |
| 4 |  | 004 | Melakukan login dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan login dan menampilkan pesan “Please fill out this field” |
| 5 |  | 005 | Melakukan login dimana *email* tidak sesuai dengan *database* | Sistem menolak permintaan login dan menampilkan pesan “*Email* Atau *Password* Salah\!” |
| 6 |  | 006 | Melakukan login dimana *password* tidak sesuai dengan *database* | Sistem menolak permintaan login dan menampilkan pesan “*Email* Atau *Password* Salah\!” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan |
| :---- | :---- | :---- | :---- | :---- |
| 7 |  | 007 | Melakukan login dimana *email* dan *password* sesuai dengan *database* | Sistem menampilkan halaman utama admin |
| 8 | APPA-FR- 02 | 001 | Mengunggah data makalah *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 9 |  | 002 | Mengunggah data makalah *halaqah* dimana *file* makalah *halaqah* berjenis selain pdf | Sistem menolak permintaan unggah data dan menampilkan pesan “The *file* type must .pdf” |
| 10 |  | 003 | Mengunggah data makalah *halaqah* dimana semua input telah diisi dan *file* makalah *halaqah* berjenis pdf | Sistem memproses dan mengunggah data serta menampilkan pesan “Makalah *halaqah* berhasil ditambah\!” |
| 11 | APPA-FR- 04 | 001 | Mengubah data makalah *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |
| 12 |  | 002 | Mengubah data makalah *halaqah* dimana *file* makalah *halaqah* berjenis selain pdf | Sistem menolak permintaan ubah data dan menampilkan pesan “The *file* type must .pdf” |
| 13 |  | 003 | Mengubah data makalah *halaqah* dimana semua input telah diisi dan *file* makalah *halaqah* berjenis pdf | Sistem memproses dan mengubah data serta menampilkan pesan “Makalah *halaqah* berhasil diubah\!” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan |
| :---: | :---- | :---- | :---- | :---- |
| 14 | APPA-FR- 08 | 001 | Menambah data jadwal *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 15 |  | 002 | Menambah data jadwal *halaqah* dengan mengisi semua inputnya | Sistem memproses dan mengunggah data serta menampilkan pesan “Jadwal *halaqah* berhasil ditambah\!” |
| 16 | APPA-FR- 10 | 001 | Mengubah data jadwal *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |
| 17 |  | 002 | Mengubah data jadwal *halaqah* dengan mengisi semua inputnya | Sistem memproses dan mengubah data serta menampilkan pesan “Jadwal *halaqah* berhasil diubah\!” |
| 18 | APPA-FR- 12 | 001 | Menambah data penulis *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 19 |  | 002 | Menambah data penulis *halaqah* dengan mengisi semua inputnya | Sistem memproses dan menambah data serta menampilkan pesan “Penulis berhasil ditambah\!” |
| 20 | APPA-FR- 14 | 001 | Mengubah data penulis *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan |
| :---: | :---- | :---- | :---- | :---- |
| 21 |  | 002 | Mengubah data penulis *halaqah* dengan mengisi semua inputnya | Sistem memproses dan mengubah data serta menampilkan pesan “Penulis berhasil diubah\!” |
| 22 | APPA-FR- 16 | 001 | Menambah data jilid *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 23 |  | 002 | Menambah data jilid *halaqah* dengan mengisi input nama | Sistem memproses dan menambah data serta menampilkan pesan “Data jilid berhasil ditambah\!” |
| 24 | APPA-FR- 18 | 001 | Mengubah data jilid *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |
| 25 |  | 002 | Mengubah data jilid *halaqah* dengan mengisi input nama | Sistem memproses dan mengubah data serta menampilkan pesan “Data jilid berhasil diubah\!” |
| 26 | APPA-FR- 20 | 001 | Menambah data kategori *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 27 |  | 002 | Menambah data kategori *halaqah* dengan mengisi input nama | Sistem memproses dan menambah data serta menampilkan pesan “Data kategori berhasil ditambah\!” |
| 28 | APPA-FR- 22 | 001 | Mengubah data kategori *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan |
| :---: | :---- | :---- | :---- | :---- |
| 29 |  | 002 | Mengubah data kategori *halaqah* dengan mengisi input nama | Sistem memproses dan mengubah data serta menampilkan pesan “Data kategori berhasil diubah\!” |
| 30 | APPA-FR- 24 | 001 | Menambah data material *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 31 |  | 002 | Menambah data material *halaqah* dimana *file* thumbnail diisi selain *file* gambar | Sistem menolak permintaan unggah data dan menampilkan pesan “The *file* type must jpg/png” |
| 32 |  | 003 | Menambah data material *halaqah* dimana semua input telah diisi dan *file* thumbnail *halaqah* berjenis *file* gambar | Sistem memproses dan menambah data serta menampilkan pesan “Data material berhasil ditambah\!” |
| 33 | APPA-FR- 26 | 001 | Mengubah data material *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |
| 34 |  | 002 | Mengubah data material *halaqah* dimana *file* thumbnail diisi selain *file* gambar | Sistem menolak permintaan ubah data dan menampilkan pesan “The *file* type must jpg/png” |
| 35 |  | 003 | Mengubah data material *halaqah* dimana semua input telah diisi dan *file* thumbnail *halaqah* berjenis *file* gambar | Sistem memproses dan mengubah data serta menampilkan pesan “Data material berhasil diubah\!” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan |
| :---: | :---- | :---- | :---- | :---- |
| 36 | APPA-FR- 28 | 001 | Mengubah data profil dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |
| 37 |  | 002 | Mengisi kolom nama hanya dengan angka dan simbol non- alfanumerik | Sistem menolak permintaan ubah data dan menampilkan pesan “The ” |
| 38 |  | 003 | Mengisi kolom *email* yang tidak sesuai dengan format *email* (Contoh format *email* : [anonim@gmail.com)](mailto:anonim@gmail.com) | Sistem menolak permintaan ubah dan menampilkan pesan “The *email* is invalid” |
| 39 |  | 004 | Mengisi kolom no hp hanya dengan huruf dan simbol non- alfanumerik | Sistem menolak permintaan ubah dan menampilkan pesan “The phone is invalid” |
| 40 |  | 005 | Mengisi kolom alamat hanya dengan angka dan simbol non- alfanumerik | Sistem menolak permintaan ubah dan menampilkan pesan “The address is invalid” |
| 41 |  | 006 | Mengisi *password* yang berjumlah kurang dari 8 karakter | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” |
| 42 |  | 007 | Mengisi *password* melebihi 32 karakter | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” |

2. **Pengujian *White Box Testing***

Pengujian *white box testing* atau sering disebut dengan pengujian kotak putih dijalankan pada Sistem Informasi Pengarsipan *Halaqah* dengan menerapkan metode *Basis Path Testing* dan menggunakan tolak ukur *cyclomatic complexity*. Pada perancangan pengujian *white box testing*, perlu dibuat struktur algoritma kode program dalam bentuk *pseudocode*, *flowgraph*, penentuan jalur independen dan tabel berisi daftar kasus uji dari masing-masing jalur. Karena pengujian ini menggunakan metode *Basis Path Testing* dimana penentuan jalur (*path*) harus didasari tiap fungsi/function dari program, maka perlu menentukan fungsi mana yang akan diuji. Fungsi yang memiliki kondisi atau jalur independen lebih dari satu akan dipilih dan diuji (Pressman dan Maxim, 2020). Selama proses penentuan fungsi, ditemukan 19 fungsi yang akan diuji. Fungsi-fungsi yang telat diidentifikasi ditampilkan pada.

**Tabel 7.3 Daftar fungsi untuk pengujian *white box testing***

| No | Nama Fungsi |
| :---- | ----- |
| 1 | *Update* Pro*file* |
| 2 | *Add* Kategori |
| 3 | *Update* Kategori |
| 4 | *Delete* Kategori |
| 5 | *Add* Jilid |
| 6 | *Update* Jilid |
| 7 | *Delete* Jilid |
| 8 | *Add* Penulis |
| 9 | *Update* Penulis |
| 10 | *Delete* Penulis |
| 11 | *Add Halaqah* |
| 12 | *Update Halaqah* |
| 13 | *Delete Halaqah* |
| 14 | *Add* Jadwal |
| 15 | *Update* Jadwal |
| 16 | *Delete* Jadwal |
| 17 | *Add* Material |
| 18 | *Update* Material |
| 19 | *Delete* Material |

Masing-masing dari fungsi nantinya akan dibuatkan *pseudocode* didalam tabel. Tabel yang dibuat merujuk pada penelitian milik (Yulianti, 2019), dengan beberapa penyesuaian. Format tabel *pseudocode* dibuat dan disajikan dalam

**Tabel 7.4 Format tabel *pseudocode* untuk *basis path testing***

| No | *Pseudocode* 1: Function \[Nama Method\] | *Node* |
| :---- | :---- | :---- |
| 1 | \- | \- |
| 2 | \- | \- |
| 3 | \- | \- |
| … | … | … |

Pada terdapat tiga kolom, dimana deskripsi fungsi dari masing-masing kolom akan dipaparkan sebagai berikut :

1. Kolom 'No' berfungsi untuk memberikan nomor urut pada setiap pengujian yang akan dilaksanakan.

2. Kolom ‘*Pseudocode* 1: Function \[Nama Method\]’ merupakan kolom yang  
   berisi *pseudocode* setiap baris.

3. Kolom ‘*Node* ’ berfungsi menentukan *node* dari tiap baris *pseudocode*.

Fungsi yang sudah ditentukan sebelumnya dibuat *pseudocode* dalam format [Tabel 7.4](#tabel-7.4-format-tabel-pseudocode-untuk-basis-path-testing). Setelah *pseudocode* selesai dibuat, dilakukan pembuatan *flowgraph* untuk setiap *pseudocode*. *Flowgraph* yang sudah jadi kemudian dihitung jumlah *node* dan edge-nya, dan selanjutnya dilakukan perhitungan menggunakan rumus *cyclomatic complexity*. Hasil perhitungan nantinya dijadikan acuan untuk membuat jalur independen. Tahap terakhir dari perancangan pengujian *whitebox*, yaitu membuat kasus uji dari masing-masing fungsi yang dipaparkan dalam bentuk tabel. Tabel tersebut nantinya akan digunakan dalam proses pelaksanaan pengujian *white box*. Untuk proses perancangan masing-masing fungsi dari *pseudocode* hingga tabel uji, akan dijelaskan pada subbab berikutnya.

1. **Fungsi *Update* Profil**

Fungsi *Update* Profil adalah fungsi yang digunakan dalam sistem untuk mengubah data profil admin tim Litbang. Bentuk *pseudocode* dari fungsi *update* profil ditunjukkan pada [Tabel 7.5](#tabel-7.5-pseudocode-dari-fungsi-update-profil), sedangkan bentuk *flowgraph* ditunjukkan pada [Tabel 7.5.](#tabel-7.5-pseudocode-dari-fungsi-update-profil)

**Tabel 7.5 *Pseudocode* dari fungsi *update* profil**

| No | *Pseudocode* 1: Function updateProfil(request) | *Node* |
| :---- | ----- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | IF request.*password* IS NOT EMPTY THEN | 3 |
| 4 | user \= FIND User BY request.id | 4 |
| 5 | user.name \= request.name | 5 |
| 6 | user.*email* \= request.*email* | 6 |
| 7 | user.no\_hp \= request.no\_hp | 7 |
| 8 | user.alamat \= request.alamat | 8 |
| 9 | user.*password* \= HASH(request.*password*) | 9 |
| 10 | user.SAVE() | 10 |
| 11 12 | ELSE user \= FIND User BY request.id | 11 |
| 13 | user.name \= request.name | 12 |
| 14 | user.*email* \= request.*email* | 13 |
| 15 | user.no\_hp \= request.no\_hp | 14 |
| 16 | user.alamat \= request.alamat | 15 |
| 17 | user.SAVE() | 16 |
| 18 | END IF | 17 |
| 19 | COMMIT TRANSACTION | 18 |
| 20 | SET session.msg\_success \= 'Pro*file* Berhasil Diubah\!' | 19 |
| 21 | RETURN Redirect to 'admin.pro*file*' | 20 |
| 22 23 | CATCH Exception AS e: ROLLBACK TRANSACTION | 21 |
| 24 | SET session.msg\_error \= 'Somethings Wrong\!' | 22 |
| 25 | RETURN Redirect to 'admin.pro*file*' | 23 |
| 26 | END | 24 |

![][image72]

**Gambar 7.1 *Flowgraph* dari *pseudocode* fungsi *update* profil**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 19 − 18 \+ 2

\= 3

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 3\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 3 jalur yaitu : Jalur 1 : 1-2-21-22-23-24  
Jalur 2 : 1-2-3-4-5-6-7-8-9-10-17-18-19-20-24

Jalur 3 : 1-2-3-11-12-13-14-15-16-17-18-19-20-24

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.6](#tabel-7.6-daftar-kasus-yang-akan-diuji-pada-fungsi-update-profil).

###### **Tabel 7.6 Daftar kasus yang akan diuji pada fungsi *update* profil** {#tabel-7.6-daftar-kasus-yang-akan-diuji-pada-fungsi-update-profil}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul		pesan “Something Wrong\!” dan	menampilkan halaman profil admin |
| 2 | Ubah profil disertai mengisi kolom *password* baru | Data dapat disimpan (termasuk *password*) dan muncul pesan “Profil berhasil diubah”. Sistem menampilkan halaman profil admin |
| 3 | Ubah profil tanpa mengisi kolom *password* baru | Data dapat disimpan (kecuali *password*) dan muncul pesan “Profil berhasil diubah”. Sistem menampilkan halaman profil admin |

2. **Fungsi *Add* Kategori**

Fungsi *add* kategori adalah fungsi yang digunakan dalam sistem untuk menambah data kategori *halaqah*. Bentuk *pseudocode* dari fungsi *add* kategori ditunjukkan pada [Tabel 7.7](#tabel-7.7-pseudocode-dari-fungsi-add-kategori), sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.2](#gambar-7.2-flowgraph-dari-pseudocode-fungsi-add-kategori).

**Tabel 7.7 *Pseudocode* dari fungsi *add* kategori**

| No | *Pseudocode* 2: Function addKategori(request) | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | kategori \= NEW Kategori | 3 |
| 4 | kategori.name \= request.name | 4 |
| 5 | kategori.name \= request.name | 5 |
| 6 | kategori.SAVE() | 6 |
| 7 | COMMIT TRANSACTION | 7 |
| 8 | SET session.msg\_success \= 'Kategori Berhasil Ditambah\!' | 8 |
| 9 | RETURN Redirect to 'admin.kategori' | 9 |
| 10 11 | CATCH Exception AS e: ROLLBACK TRANSACTION | 10 |
| 12 | SET session.msg\_error \= 'Somethings Wrong\!' | 11 |
| 13 | RETURN Redirect to 'admin.kategori' | 12 |
| 14 | END | 13 |

![][image73]

**Gambar 7.2 *Flowgraph* dari *pseudocode* fungsi *add* kategori**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 13 − 13 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-9-10-11-12-13  
Jalur 2 : 1-2-3-4-5-6-7-8-13

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.8](#tabel-7.8-daftar-kasus-yang-akan-diuji-pada-fungsi-add-kategori).

###### **Tabel 7.8 Daftar kasus yang akan diuji pada fungsi *add* kategori** {#tabel-7.8-daftar-kasus-yang-akan-diuji-pada-fungsi-add-kategori}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Kategori.name berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Kategori berhasil ditambah”. Sistem menampilkan halaman kategori admin |

3. **Fungsi *Update* Kategori**

Fungsi *Update* Kategori adalah fungsi yang digunakan dalam sistem untuk mengubah data kategori *halaqah*. Bentuk *pseudocode* dari fungsi *update* kategori ditunjukkan pada [Tabel 7.9](#tabel-7.9-pseudocode-dari-fungsi-update-kategori), sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.3](#gambar-7.3-flowgraph-dari-pseudocode-fungsi-update-kategori).

**Tabel 7.9 *Pseudocode* dari fungsi *update* kategori**

| No | *Pseudocode* 3: Function updateKategori(request) | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | kategori \= FIND Kategori BY request.id | 3 |
| 4 | kategori.name \= request.name | 4 |
| 5 | kategori.SAVE() | 5 |
| 6 | COMMIT TRANSACTION | 6 |
| 7 | SET session.msg\_success \= 'Kategori Berhasil Diubah\!' | 7 |
| 8 | RETURN Redirect to 'admin.kategori' | 8 |
| 9 10 | CATCH Exception AS e: ROLLBACK TRANSACTION | 9 |
| 11 | SET session.msg\_error \= 'Somethings Wrong\!' | 10 |
| 12 | RETURN Redirect to 'admin.kategori' | 11 |
| 13 | END | 12 |

![][image74]

**Gambar 7.3 *Flowgraph* dari *pseudocode* fungsi *update* kategori**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 12 − 12 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-9-10-11-12  
Jalur 2 : 1-2-3-4-5-6-7-8-12

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.10.](#tabel-7.10-daftar-kasus-yang-akan-diuji-pada-fungsi-update-kategori)

###### **Tabel 7.10 Daftar kasus yang akan diuji pada fungsi *update* kategori** {#tabel-7.10-daftar-kasus-yang-akan-diuji-pada-fungsi-update-kategori}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Kategori.name berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Kategori berhasil diubah”. Sistem menampilkan halaman kategori admin |

4. **Fungsi *Delete* Kategori**

Fungsi *delete* kategori adalah fungsi yang digunakan dalam sistem untuk menghapus data kategori *halaqah*. Bentuk *pseudocode* dari fungsi *delete* kategori ditunjukkan pada [Tabel 7.11](#tabel-7.11-pseudocode-dari-fungsi-delete-kategori), sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.4](#gambar-7.4-flowgraph-dari-pseudocode-fungsi-delete-kategori).

**Tabel 7.11 *Pseudocode* dari fungsi *delete* kategori**

| No | *Pseudocode* 4: Function deleteKategori(id) | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | kategori \= FIND Kategori WHERE id \= id | 3 |
| 4 | kategori.DELETE() | 4 |
| 5 | COMMIT TRANSACTION | 5 |
| 6 | SET session.msg\_success \= 'Data Kategori Berhasil Dihapus\!' | 6 |
| 7 | RETURN Redirect to 'admin.kategori' | 7 |
| 8 9 | CATCH Exception AS e: ROLLBACK TRANSACTION | 8 |
| 10 | SET session.msg\_error \= 'Somethings Wrong\!' | 9 |
| 11 | RETURN Redirect to 'admin.kategori' | 10 |
| 12 | END | 11 |

![][image75]

**Gambar 7.4 *Flowgraph* dari *pseudocode* fungsi *delete* kategori**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 11 – 11 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-8-9-10-11  
Jalur 2 : 1-2-3-4-5-6-7-11

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.12.](#tabel-7.12-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-kategori)

###### **Tabel 7.12 Daftar kasus yang akan diuji pada fungsi *delete* kategori** {#tabel-7.12-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-kategori}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter id dari fungsi deleteKategori() berisi nilai yang sesuai dengan basis data (Jika terdapat data kategori dalam basis data) | Data dapat disimpan dan muncul pesan “Kategori berhasil dihapus”. Sistem menampilkan halaman kategori admin |

5. **Fungsi *Add* Jilid**

Fungsi *add* jilid adalah fungsi yang digunakan dalam sistem untuk menambah data jilid *halaqah*. Bentuk *pseudocode* dari fungsi *add* jilid ditunjukkan pada [Tabel 7.13,](#tabel-7.13-pseudocode-dari-fungsi-add-jilid) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.5](#gambar-7.5-flowgraph-dari-pseudocode-fungsi-add-jilid).

**Tabel 7.13 *Pseudocode* dari fungsi *add* jilid**

| No | *Pseudocode* 5: Function addJilid(request) | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | jilid \= NEW Jilid | 3 |
| 4 | jilid.name \= request.name | 4 |
| 5 | jilid.SAVE() | 5 |
| 6 | COMMIT TRANSACTION | 6 |
| 7 | SET session.msg\_success \= Jilid Berhasil Ditambah\!\!' | 7 |
| 8 | RETURN Redirect to 'admin.jilid | 8 |
| 9 10 | CATCH Exception AS e: ROLLBACK TRANSACTION | 9 |
| 11 | SET session.msg\_error \= 'Somethings Wrong\!' | 10 |
| 12 | RETURN Redirect to 'admin.jilid | 11 |
| 13 | END | 12 |

![][image76]

**Gambar 7.5 *Flowgraph* dari *pseudocode* fungsi *add* jilid**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 12 – 12 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-9-10-11-12  
Jalur 2 : 1-2-3-4-5-6-7-8-12

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.14.](#tabel-7.14-daftar-kasus-yang-akan-diuji-pada-fungsi-add-jilid)

###### **Tabel 7.14 Daftar kasus yang akan diuji pada fungsi *add* jilid** {#tabel-7.14-daftar-kasus-yang-akan-diuji-pada-fungsi-add-jilid}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Jilid.name berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Jilid berhasil ditambah”. Sistem menampilkan halaman jilid admin |

6. **Fungsi *Update* Jilid**

Fungsi *update* jilid adalah fungsi yang digunakan dalam sistem untuk mengubah data jilid *halaqah*. Bentuk *pseudocode* dari fungsi *update* jilid ditunjukkan pada [Tabel 7.15,](#tabel-7.15-pseudocode-dari-fungsi-update-jilid) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.6](#gambar-7.6-flowgraph-dari-pseudocode-fungsi-update-jilid).

**Tabel 7.15 *Pseudocode* dari fungsi *update* jilid**

| No | *Pseudocode* 6: Function updateJilid(request) | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | jilid \= FIND Jilid BY request.id | 3 |
| 4 | jilid.name \= request.name | 4 |
| 5 | jilid.SAVE() | 5 |
| 6 | COMMIT TRANSACTION | 6 |
| 7 | SET session.msg\_success \= Jilid Berhasil Diubah\!\!' | 7 |
| 8 | RETURN Redirect to 'admin.jilid | 8 |
| 9 10 | CATCH Exception AS e: ROLLBACK TRANSACTION | 9 |
| 11 | SET session.msg\_error \= 'Somethings Wrong\!' | 10 |
| 12 | RETURN Redirect to 'admin.jilid | 11 |
| 13 | END | 12 |

![][image76]

**Gambar 7.6 *Flowgraph* dari *pseudocode* fungsi *update* jilid**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 12 – 12 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-9-10-11-12  
Jalur 2 : 1-2-3-4-5-6-7-8-12

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.16.](#tabel-7.16-daftar-kasus-yang-akan-diuji-pada-fungsi-update-jilid)

###### **Tabel 7.16 Daftar kasus yang akan diuji pada fungsi *update* jilid** {#tabel-7.16-daftar-kasus-yang-akan-diuji-pada-fungsi-update-jilid}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Jilid.name berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Jilid berhasil diubah”. Sistem menampilkan halaman jilid admin |

7. **Fungsi *Delete* Jilid**

Fungsi *delete* jilid adalah fungsi yang digunakan dalam sistem untuk menghapus data jilid *halaqah*. Bentuk *pseudocode* dari fungsi *delete* jilid ditunjukkan pada [Tabel 7.17,](#tabel-7.17-pseudocode-dari-fungsi-delete-jilid) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.7](#gambar-7.7-flowgraph-dari-pseudocode-fungsi-delete-jilid).

**Tabel 7.17 *Pseudocode* dari fungsi *delete* jilid**

| No | *Pseudocode* 7: Function deleteJilid(id) | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | jilid \= FIND Jilid WHERE id \= id | 3 |
| 4 | jilid.DELETE() | 4 |
| 5 | COMMIT TRANSACTION | 5 |
| 6 | SET session.msg\_success \= 'Data Jilid Berhasil Dihapus\!' | 6 |
| 7 | RETURN Redirect to 'admin.jilid | 7 |
| 8 9 | CATCH Exception AS e: ROLLBACK TRANSACTION | 8 |
| 10 | SET session.msg\_error \= 'Somethings Wrong\!' | 9 |
| 11 | RETURN Redirect to 'admin.jilid | 10 |
| 12 | END | 11 |

![][image77]

**Gambar 7.7 *Flowgraph* dari *pseudocode* fungsi *delete* jilid**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 11 – 11 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-8-9-10-11  
Jalur 2 : 1-2-3-4-5-6-7-11

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.18.](#tabel-7.18-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-jilid)

###### **Tabel 7.18 Daftar kasus yang akan diuji pada fungsi *delete* jilid** {#tabel-7.18-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-jilid}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter id dari fungsi deleteJilid() berisi nilai yang sesuai dengan basis data (Jika terdapat data kategori dalam basis data) | Data dapat disimpan dan muncul pesan “Jilid berhasil dihapus”. Sistem menampilkan halaman kategori admin |

8. **Fungsi *Add* Penulis**

Fungsi *add* penulis adalah fungsi yang digunakan dalam sistem untuk menambah data penulis *halaqah*. Bentuk *pseudocode* dari fungsi *add* penulis ditunjukkan pada [Tabel 7.19,](#tabel-7.19-pseudocode-dari-fungsi-add-penulis) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.8](#gambar-7.8-flowgraph-dari-pseudocode-fungsi-add-penulis).

**Tabel 7.19 *Pseudocode* dari fungsi *add* penulis**

| No | *Pseudocode* 8: Function addPenulis(request) | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | penulis \= NEW Penulis | 3 |
| 4 | penulis.name \= request.name | 4 |
| 5 | penulis.jurusan \= request.jurusan | 5 |
| 6 | penulis.fakultas \= request.fakultas | 6 |
| 7 | penulis.universitas \= request.universitas | 7 |
| 8 | penulis.angkatan \= request.angkatan | 8 |
| 9 | penulis.SAVE() | 9 |
| 10 | COMMIT TRANSACTION | 10 |
| 11 | SET session.msg\_success \= 'Penulis Berhasil Ditambah\!' | 11 |
| 12 | RETURN Redirect to 'admin.penulis' | 12 |
| 13 | CATCH Exception AS e: ROLLBACK TRANSACTION | 13 |
| 14 | SET session.msg\_error \= 'Somethings Wrong\!' | 14 |
| 15 | RETURN Redirect to 'admin.penulis' | 15 |
| 16 | END | 16 |

![][image78]

**Gambar 7.8 *Flowgraph* dari *pseudocode* fungsi *add* penulis**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 16 – 16 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-13-14-15  
Jalur 2 : 1-2-3-4-5-6-7-8-9-10-11-12-16

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.20.](#tabel-7.20-daftar-kasus-yang-akan-diuji-pada-fungsi-add-penulis)

###### **Tabel 7.20 Daftar kasus yang akan diuji pada fungsi *add* penulis** {#tabel-7.20-daftar-kasus-yang-akan-diuji-pada-fungsi-add-penulis}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Penulis.name berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Penulis berhasil ditambah”. Sistem menampilkan halaman kategori admin |

9. **Fungsi *Update* Penulis**

Fungsi *update* penulis adalah fungsi yang digunakan dalam sistem untuk mengubah data penulis *halaqah*. Bentuk *pseudocode* dari fungsi *update* penulis ditunjukkan pada [Tabel 7.21,](#tabel-7.21-pseudocode-dari-fungsi-update-penulis) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.9](#gambar-7.9-flowgraph-dari-pseudocode-fungsi-update-penulis).

**Tabel 7.21 *Pseudocode* dari fungsi *update* penulis**

| No | *Pseudocode* 9: Function updatePenulis(request) | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | penulis \= FIND Penulis BY request.id | 3 |
| 4 | penulis.name \= request.name | 4 |
| 5 | penulis.jurusan \= request.jurusan | 5 |
| 6 | penulis.fakultas \= request.fakultas | 6 |
| 7 | penulis.universitas \= request.universitas | 7 |
| 8 | penulis.angkatan \= request.angkatan | 8 |
| 9 10 | penulis.SAVE() | 9 |
| 11 | COMMIT TRANSACTION | 10 |
| 12 | SET session.msg\_success \= Penulis Berhasil Diubah\!\!' | 11 |
| 13 | RETURN Redirect to 'admin.penulis | 12 |
| 14 15 | CATCH Exception AS e: ROLLBACK TRANSACTION | 13 |
| 16 | SET session.msg\_error \= 'Somethings Wrong\!' | 14 |
| 17 | RETURN Redirect to 'admin.penulis | 15 |
| 18 | END | 16 |

![][image78]

**Gambar 7.9 *Flowgraph* dari *pseudocode* fungsi *update* penulis**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 16 – 16 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-13-14-15  
Jalur 2 : 1-2-3-4-5-6-7-8-9-10-11-12-16

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.22](#tabel-7.22-daftar-kasus-yang-akan-diuji-pada-fungsi-update-penulis) .

###### **Tabel 7.22 Daftar kasus yang akan diuji pada fungsi *update* penulis** {#tabel-7.22-daftar-kasus-yang-akan-diuji-pada-fungsi-update-penulis}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Penulis.name berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Penulis berhasil diubah”. Sistem menampilkan halaman kategori admin |

10. ***Fungsi Delete Penulis***

Fungsi *delete* penulis adalah fungsi yang digunakan dalam sistem untuk menghapus data penulis *halaqah*. Bentuk *pseudocode* dari fungsi *delete* penulis ditunjukkan pada [Tabel 7.23,](#tabel-7.23-pseudocode-dari-fungsi-delete-penulis) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.10.](#gambar-7.10-flowgraph-dari-pseudocode-fungsi-delete-penulis)

**Tabel 7.23 *Pseudocode* dari fungsi *delete* penulis**

| No | *Pseudocode* 10: Function deletePenulis(id) | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | Penulis \= FIND Penulis WHERE id \= id | 3 |
| 4 | penulis.DELETE() | 4 |
| 5 | COMMIT TRANSACTION | 5 |
| 6 | SET session.msg\_success \= 'Data Penulis Berhasil Dihapus\!' | 6 |
| 7 | RETURN Redirect to 'admin.penulis | 7 |
| 8 9 | CATCH Exception AS e: ROLLBACK TRANSACTION | 8 |
| 10 | SET session.msg\_error \= 'Somethings Wrong\!' | 9 |
| 11 | RETURN Redirect to 'admin.penulis | 10 |
| 12 | END | 11 |

![][image79]

**Gambar 7.10 *Flowgraph* dari *pseudocode* fungsi *delete* penulis**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 11 – 11 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-8-9-10-11  
Jalur 2 : 1-2-3-4-5-6-7-11

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.24](#tabel-7.24-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-penulis).

###### **Tabel 7.24 Daftar kasus yang akan diuji pada fungsi *delete* penulis** {#tabel-7.24-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-penulis}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter id dari fungsi deletePenulis() berisi nilai yang sesuai dengan basis data (Jika terdapat data kategori dalam basis data) | Data dapat disimpan dan muncul pesan “Penulis berhasil dihapus”. Sistem menampilkan halaman penulis admin |

11. **Fungsi *Add Halaqah***

Fungsi *add halaqah* adalah fungsi yang digunakan dalam sistem untuk menambah data *halaqah*. Bentuk *pseudocode* dari fungsi *add halaqah* ditunjukkan pada [Tabel 7.25,](#tabel-7.25-pseudocode-dari-fungsi-add-halaqah) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.11.](#gambar-7.11-flowgraph-dari-pseudocode-fungsi-add-halaqah)

**Tabel 7.25 *Pseudocode* dari fungsi *add halaqah***

| No | *Pseudocode* 11: Function add*Halaqah*(request) | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | namafoto \= "*File Halaqah* " \+ request.judul \+ " " \+ CURRENT\_TIMESTAMP | 3 |
| 4 | extension \= request.*file*('*file*').extension() | 4 |
| 5 | photo \= FORMAT('%s.%0.8s', namafoto, extension) | 5 |
| 6 | destination \= base\_*path*() \+ '/public/*file*' | 6 |
| 7 | request.*file*('*file*').move(destination, photo) | 7 |
| 8 | *halaqah* \= NEW *Halaqah* | 8 |
| 9 | *halaqah*.judul \= request.judul | 9 |
| 10 | *halaqah*.id\_penulis \= request.id\_penulis | 10 |
| 11 | *halaqah*.id\_kategori \= request.id\_kategori | 11 |
| 12 | *halaqah*.id\_jilid \= request.id\_jilid | 12 |
| 13 | *halaqah*.*file* \= photo | 13 |
| 14 | *halaqah*.SAVE() | 14 |
| 15 | COMMIT TRANSACTION | 15 |
| 16 | SET session.msg\_success \= 'Penulis Berhasil Ditambah\!' | 16 |
| 17 | RETURN Redirect to 'admin.*halaqah* | 17 |
| 18 19 | CATCH Exception AS e: ROLLBACK TRANSACTION | 18 |
| 20 | SET session.msg\_error \= 'Somethings Wrong\!' | 19 |
| 21 | RETURN Redirect to 'admin.*halaqah* | 20 |
| 22 | END | 21 |

![][image80]

**Gambar 7.11 *Flowgraph* dari *pseudocode* fungsi *add halaqah***

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 14 – 14 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-18-19-20-21  
Jalur 2 : 1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-16-17-21

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.26.](#tabel-7.26-daftar-kasus-yang-akan-diuji-pada-fungsi-add-halaqah)

###### **Tabel 7.26 Daftar kasus yang akan diuji pada fungsi *add halaqah*** {#tabel-7.26-daftar-kasus-yang-akan-diuji-pada-fungsi-add-halaqah}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter id dari fungsi add*Halaqah*() berisi nilai yang sesuai dengan basis data (Jika terdapat data *halaqah* dalam basis data) | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil ditambah”. Sistem menampilkan halaman *halaqah* admin |

12. **Fungsi *Update Halaqah***

Fungsi *Update halaqah* adalah fungsi yang digunakan dalam sistem untuk mengubah data *halaqah*. Bentuk *pseudocode* dari fungsi *update halaqah* ditunjukkan pada [Tabel 7.27,](#tabel-7.27-pseudocode-dari-fungsi-update-halaqah) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.12.](#gambar-7.12-flowgraph-dari-pseudocode-fungsi-update-halaqah)

**Tabel 7.27 *Pseudocode* dari fungsi *update halaqah***

| No | *Pseudocode* 12: Function update*Halaqah*(request) | *Node* |
| :---- | ----- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | *halaqah* \= FIND *Halaqah* BY request.id | 3 |
| 4 | *halaqah*.judul \= request.judul | 4 |
| 5 | *halaqah*.id\_penulis \= request.id\_penulis | 5 |
| 6 | *halaqah*.id\_kategori \= request.id\_kategori | 6 |
| 7 | *halaqah*.id\_jilid \= request.id\_jilid | 7 |
| 8 | IF NOT EMPTY(request.*file*) THEN | 8 |
| 9 | *DELETE FILE* FROM public\_*path*('*file*/' \+ *halaqah*.*file*) | 9 |
| 10 | namafoto \= "*File Halaqah* " \+ request.judul \+ " " \+ CURRENT\_TIMESTAMP | 10 |
| 11 | extension \= request.*file*('*file*').extension() | 11 |
| 12 | photo \= FORMAT('%s.%0.8s', namafoto, extension) | 12 |
| 13 | destination \= base\_*path*() \+ '/public/*file*' | 13 |
| 14 | request.*file*('*file*').move(destination, photo) | 14 |
| 15 | *halaqah*.*file* \= photo | 15 |
| 16 | END IF | 16 |
| 17 | *halaqah*.SAVE() | 17 |
| 18 | COMMIT TRANSACTION | 18 |
| 19 | SET session.msg\_success \= 'Penulis Berhasil Diubah\!' | 19 |
| 20 | RETURN Redirect to 'admin.*halaqah* | 20 |
| 22 22 | CATCH Exception AS e: ROLLBACK TRANSACTION | 21 |
| 23 | SET session.msg\_error \= 'Somethings Wrong\!' | 22 |
| 24 | RETURN Redirect to 'admin.*halaqah* | 23 |
| 25 | END | 24 |

![][image81]

**Gambar 7.12 *Flowgraph* dari *pseudocode* fungsi *update halaqah***

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 20 – 19 \+ 2

\= 3

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 3\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 3 jalur yaitu : Jalur 1 : 1-2-21-22-23-24

Jalur 2 : 1-2-3-4-5-6-7-8-17-18-19-20-24

Jalur 3 : 1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-16-17-18-19-20-24

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.28](#tabel-7.28-daftar-kasus-yang-akan-diuji-pada-fungsi-update-halaqah).

**Tabel 7.28 Daftar kasus yang akan diuji pada fungsi *update halaqah***

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Request.*file* memiliki nilai sebelum diubah. | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil diubah”. Sistem menampilkan halaman *halaqah* admin. *File* tersimpan ke dalam folder public/*file*. |
| 3 | Request.*file* Tidak memiliki nilai apapun (kosong) | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil diubah”. Sistem menampilkan halaman *halaqah* admin. |

13. **Fungsi *Delete Halaqah***

Fungsi *delete halaqah* adalah fungsi yang digunakan dalam sistem untuk menghapus data *halaqah*. Bentuk *pseudocode* dari fungsi *delete halaqah* ditunjukkan pada [Tabel 7.29,](#tabel-7.29-pseudocode-dari-fungsi-delete-halaqah) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.13.](#gambar-7.13-flowgraph-dari-pseudocode-fungsi-delete-halaqah)

**Tabel 7.29 *Pseudocode* dari fungsi *delete halaqah***

| No | *Pseudocode* 1: Function *Delete Halaqah* | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | *halaqah* \= FIND *Halaqah* WHERE id \= id | 3 |
| 4 | *DELETE FILE* FROM public\_*path*('*file*/' \+ *halaqah*.*file*) | 4 |
| 5 | *halaqah*.DELETE() | 5 |
| 6 | COMMIT TRANSACTION | 6 |
| 7 | SET session.msg\_success \= 'Data *Halaqah* Berhasil Dihapus\!' | 7 |
| 8 9 | RETURN Redirect to 'admin.*halaqah* | 8 |
| 10 | CATCH Exception AS e: ROLLBACK TRANSACTION | 9 |
| 11 | SET session.msg\_error \= 'Somethings Wrong\!' | 10 |
| 12 | RETURN Redirect to 'admin.*halaqah* | 11 |
| 13 | END | 12 |

![][image74]

**Gambar 7.13 *Flowgraph* dari *pseudocode* fungsi *delete halaqah***

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G) \= E – N \+ 2

\= 12 – 12 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-9-10-11-12  
Jalur 2 : 1-2-3-4-5-6-7-8-12

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.30.](#tabel-7.30-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-halaqah)

**Tabel 7.30 Daftar kasus yang akan diuji pada fungsi *delete halaqah***

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter id dari fungsi delete*Halaqah*() berisi nilai yang sesuai dengan basis data (Jika terdapat data *halaqah* dalam basis data) | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil dihapus”. Sistem menampilkan halaman *halaqah* admin |

14. **Fungsi *Add* Jadwal**

Fungsi *add* jadwal adalah fungsi yang digunakan dalam sistem untuk menambah data jadwal *halaqah*. Bentuk *pseudocode* dari fungsi *add* jadwal ditunjukkan pada [Tabel 7.31,](#tabel-7.31-pseudocode-dari-fungsi-add-jadwal) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.14.](#gambar-7.14-flowgraph-dari-pseudocode-fungsi-add-jadwal)

**Tabel 7.31 *Pseudocode* dari fungsi *add* jadwal**

| No | *Pseudocode* 1: Function *Add* Jadwal | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | jadwal \= NEW Jadwal | 3 |
| 4 | jadwal.judul \= request.judul | 4 |
| 5 | jadwal. id\_penulis \= request. id\_penulis | 5 |
| 6 | jadwal. tanggal \= request. tanggal | 6 |
| 7 | jadwal. pemateri= request. pemateri | 7 |
| 8 | jadwal.SAVE() | 8 |
| 9 | COMMIT TRANSACTION | 9 |
| 10 | SET session.msg\_success \= 'Jadwal Berhasil Ditambah\!' | 10 |
| 11 | RETURN Redirect to 'admin.jadwal' | 11 |
| 12 13 | CATCH Exception AS e: ROLLBACK TRANSACTION | 12 |
| 14 | SET session.msg\_error \= 'Somethings Wrong\!' | 13 |
| 15 | RETURN Redirect to 'admin.jadwal' | 14 |
| 16 | END | 15 |

![][image82]

**Gambar 7.14 *Flowgraph* dari *pseudocode* fungsi *add* jadwal**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 11 – 11 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-12-13-14-15  
Jalur 2 : 1-2-3-4-5-6-7-8-9-10-11-15

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.32](#tabel-7.32-daftar-kasus-yang-akan-diuji-pada-fungsi-add-jadwal).

###### **Tabel 7.32 Daftar kasus yang akan diuji pada fungsi *add* jadwal** {#tabel-7.32-daftar-kasus-yang-akan-diuji-pada-fungsi-add-jadwal}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Jadwal.judul berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Jadwal berhasil diubah”. Sistem menampilkan halaman jadwal admin |

15. **Fungsi *Update* Jadwal**

Fungsi *Update* jadwal adalah fungsi yang digunakan dalam sistem untuk mengubah data jadwal *halaqah*. Bentuk *pseudocode* dari fungsi *update* jadwal ditunjukkan pada [Tabel 7.33,](#tabel-7.33-pseudocode-dari-fungsi-update-jadwal) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.15.](#gambar-7.15-flowgraph-dari-pseudocode-fungsi-update-jadwal)

**Tabel 7.33 *Pseudocode* dari fungsi *update* jadwal**

| No | *Pseudocode* 1: Function *Update* Jadwal | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | jadwal \= FIND Jadwal BY request.id | 3 |
| 4 | jadwal.judul \= request.judul | 4 |
| 5 | jadwal. id\_penulis \= request. id\_penulis | 5 |
| 6 | jadwal. tanggal \= request. tanggal | 6 |
| 7 | jadwal. pemateri= request. pemateri | 7 |
| 8 | jadwal.SAVE() | 8 |
| 9 | COMMIT TRANSACTION | 9 |
| 10 | SET session.msg\_success \= 'Jadwal Berhasil Diubah\!' | 10 |
| 11 | RETURN Redirect to 'admin.jadwal' | 11 |
| 12 13 | CATCH Exception AS e: ROLLBACK TRANSACTION | 12 |
| 14 | SET session.msg\_error \= 'Somethings Wrong\!' | 13 |
| 15 | RETURN Redirect to 'admin.jadwal' | 14 |
| 16 | END | 15 |

![][image82]

**Gambar 7.15 *Flowgraph* dari *pseudocode* fungsi *update* jadwal**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 11 – 11 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.

Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-12-13-14-15  
Jalur 2 : 1-2-3-4-5-6-7-8-9-10-11-15

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.34.](#tabel-7.34-daftar-kasus-yang-akan-diuji-pada-fungsi-update-jadwal)

###### **Tabel 7.34 Daftar kasus yang akan diuji pada fungsi *update* jadwal** {#tabel-7.34-daftar-kasus-yang-akan-diuji-pada-fungsi-update-jadwal}

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Jadwal.judul berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Kategori berhasil dihapus”. Sistem menampilkan halaman kategori admin |

16. **Fungsi *Delete* Jadwal**

Fungsi *delete* jadwal adalah fungsi yang digunakan dalam sistem untuk menghapus data jadwal *halaqah*. Bentuk *pseudocode* dari fungsi *delete* jadwal ditunjukkan pada [Tabel 7.35,](#tabel-7.35-pseudocode-dari-fungsi-delete-jadwal) sedangkan bentuk *flowgraph* ditunjukkan pada [Gambar 7.16.](#gambar-7.16-flowgraph-dari-pseudocode-fungsi-delete-jadwal)

**Tabel 7.35 *Pseudocode* dari fungsi *delete* jadwal**

| No | *Pseudocode* 1: Function *Delete* Jadwal | *Node* |
| :---- | :---- | :---- |
| 1 | BEGIN TRANSACTION | 1 |
| 2 | TRY: | 2 |
| 3 | Jadwal \= FIND Jadwal WHERE id \= id | 3 |
| 4 | jadwal.DELETE() | 4 |
| 5 | COMMIT TRANSACTION | 5 |
| 6 | SET session.msg\_success \= 'Data Jadwal Berhasil Dihapus\!' | 6 |
| 7 | RETURN Redirect to 'admin.jadwal | 7 |
| 8 9 | CATCH Exception AS e: ROLLBACK TRANSACTION | 8 |
| 10 | SET session.msg\_error \= 'Somethings Wrong\!' | 9 |
| 11 | RETURN Redirect to 'admin.jadwal | 10 |
| 12 | END | 11 |

![][image75]

**Gambar 7.16 *Flowgraph* dari *pseudocode* fungsi *delete* jadwal**

Berdasarkan *flowgraph* pada gambar, *cyclomatic complexity* dapat dihitung dengan cara berikut:

V(G)	\= E − N \+ 2

\= 11 – 11 \+ 2

\= 2

Berdasarkan perhitungan, diperoleh nilai *cyclomatic complexity* sebesar 2\.  
Dengan demikian, dapat diperoleh jalur independen sebanyak 2 jalur yaitu : Jalur 1 : 1-2-8-9-10-11  
Jalur 2 : 1-2-3-4-5-6-7-11

Setiap jalur diidentifikasi dan dibuatkan kasus uji beserta hasil yang diharapkan, yang dapat dilihat pada [Tabel 7.36.](#tabel-7.36-daftar-kasus-yang-akan-diuji-pada-fungsi-delete-jadwal)

**Tabel 7.36 Daftar kasus yang akan diuji pada fungsi *delete* jadwal**

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter id dari fungsi deletePenulis() berisi nilai yang sesuai dengan basis data (Jika terdapat data kategori dalam basis data) | Data dapat disimpan dan muncul pesan “Penulis berhasil dihapus”. Sistem menampilkan halaman penulis admin |

2. ## **Pelaksanaan Pengujian** {#pelaksanaan-pengujian}

   1. **Pengujian *Black Box Testing***

Pada pelaksanaan pengujian *black box testing* sesuai dengan rancangan tabel yang dibuat sebelumnya, uji tersebut dilakukan oleh tim Litbang Pesantren Luhur Malang. Hasil pengujian setiap kasus uji ditampilkan pada [Tabel 7.37](#tabel-7.37-hasil-pengujian-black-box-testing) dan akan dijadikan bahan evaluasi valid tidaknya dari hasil yang didapatkan.

**Tabel 7.37 Hasil pengujian *black box testing***

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | APPA-FR- 01 | 001 | Mengisi kolom *email* yang tidak sesuai dengan format *email* (Contoh format *email* : [anonim@gmail.com)](mailto:anonim@gmail.com) dan menekan tombol masuk | Sistem menolak permintaan login dan menampilkan pesan “The *email* is invalid” | Sistem menolak permintaan login dan menampilkan pesan “The *email* is invalid” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 2 |  | 002 | Mengisi *password* yang berjumlah kurang dari 8 karakter dan menekan tombol masuk | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” |
| 3 |  | 003 | Mengisi *password* melebihi 32 karakter | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” |
| 4 |  | 004 | Melakukan login dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan login dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan login dan menampilkan pesan “Please fill out this field” |
| 5 |  | 005 | Melakukan login dimana *email* tidak sesuai dengan *database* | Sistem menolak permintaan login dan menampilkan pesan “*Email* Atau *Password* Salah\!” | Sistem menolak permintaan login dan menampilkan pesan “*Email* Atau *Password* Salah\!” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 6 |  | 006 | Melakukan login dimana *password* tidak sesuai dengan *database* | Sistem menolak permintaan login dan menampilkan pesan “*Email* Atau *Password* Salah\!” | Sistem menolak permintaan login dan menampilkan pesan “*Email* Atau *Password* Salah\!” |
| 7 |  | 007 | Melakukan login dimana *email* dan *password* sesuai dengan *database* | Sistem menampilkan halaman utama admin | Sistem menampilkan halaman utama admin |
| 8 | APPA-FR- 02 | 001 | Mengunggah data makalah *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 9 |  | 002 | Mengunggah data makalah *halaqah* dimana *file* makalah *halaqah* berjenis selain pdf | Sistem menolak permintaan unggah data dan menampilkan pesan “The *file* type must .pdf” | Sistem memproses dan mengunggah data serta menampilkan pesan “Makalah *halaqah* berhasil ditambah\!” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---: | :---- | :---- | :---- | :---- | :---- |
| 10 |  | 003 | Mengunggah data makalah *halaqah* dimana semua input telah diisi dan *file* makalah *halaqah* berjenis pdf | Sistem memproses dan mengunggah data serta menampilkan pesan “Makalah *halaqah* berhasil ditambah\!” | Sistem memproses dan mengunggah data serta menampilkan pesan “Makalah *halaqah* berhasil ditambah\!” |
| 11 | APPA-FR- 04 | 001 | Mengubah data makalah *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |
| 12 |  | 002 | Mengubah data makalah *halaqah* dimana *file* makalah *halaqah* berjenis selain pdf | Sistem menolak permintaan ubah data dan menampilkan pesan “The *file* type must .pdf” | Sistem memproses dan mengunggah data serta menampilkan pesan “Makalah *halaqah* berhasil ditambah\!” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---: | :---- | :---- | :---- | :---- | :---- |
| 13 |  | 003 | Mengubah data makalah *halaqah* dimana semua input telah diisi dan *file* makalah *halaqah* berjenis pdf | Sistem memproses dan mengubah data serta menampilkan pesan “Makalah *halaqah* berhasil diubah\!” | Sistem memproses dan mengubah data serta menampilkan pesan “Makalah *halaqah* berhasil diubah\!” |
| 14 | APPA-FR- 08 | 001 | Menambah data jadwal *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 15 |  | 002 | Menambah data jadwal *halaqah* dengan mengisi semua inputnya | Sistem memproses dan mengunggah data serta menampilkan pesan “Jadwal *halaqah* berhasil ditambah\!” | Sistem memproses dan mengunggah data serta menampilkan pesan “Jadwal *halaqah* berhasil ditambah\!” |
| 16 | APPA-FR- 10 | 001 | Mengubah data jadwal *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---: | :---- | :---- | :---- | :---- | :---- |
| 17 |  | 002 | Mengubah data jadwal *halaqah* dengan mengisi semua inputnya | Sistem memproses dan mengubah data serta menampilkan pesan “Jadwal *halaqah* berhasil diubah\!” | Sistem memproses dan mengubah data serta menampilkan pesan “Jadwal *halaqah* berhasil diubah\!” |
| 18 | APPA-FR- 12 | 001 | Menambah data penulis *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 19 |  | 002 | Menambah data penulis *halaqah* dengan mengisi semua inputnya | Sistem memproses dan menambah data serta menampilkan pesan “Penulis berhasil ditambah\!” | Sistem memproses dan menambah data serta menampilkan pesan “Penulis berhasil ditambah\!” |
| 20 | APPA-FR- 14 | 001 | Mengubah data penulis *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---: | :---- | :---- | :---- | :---- | :---- |
| 21 |  | 002 | Mengubah data penulis *halaqah* dengan mengisi semua inputnya | Sistem memproses dan mengubah data serta menampilkan pesan “Penulis berhasil diubah\!” | Sistem memproses dan mengubah data serta menampilkan pesan “Penulis berhasil diubah\!” |
| 22 | APPA-FR- 16 | 001 | Menambah data jilid *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 23 |  | 002 | Menambah data jilid *halaqah* dengan mengisi input nama | Sistem memproses dan menambah data serta menampilkan pesan “Data jilid berhasil ditambah\!” | Sistem memproses dan menambah data serta menampilkan pesan “Data jilid berhasil ditambah\!” |
| 24 | APPA-FR- 18 | 001 | Mengubah data jilid *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---: | :---- | :---- | :---- | :---- | :---- |
| 25 |  | 002 | Mengubah data jilid *halaqah* dengan mengisi input nama | Sistem memproses dan mengubah data serta menampilkan pesan “Data jilid berhasil diubah\!” | Sistem memproses dan mengubah data serta menampilkan pesan “Data jilid berhasil diubah\!” |
| 26 | APPA-FR- 20 | 001 | Menambah data kategori *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 27 |  | 002 | Menambah data kategori *halaqah* dengan mengisi input nama | Sistem memproses dan menambah data serta menampilkan pesan “Data kategori berhasil ditambah\!” | Sistem memproses dan menambah data serta menampilkan pesan “Data kategori berhasil ditambah\!” |
| 28 | APPA-FR- 22 | 001 | Mengubah data kategori *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---: | :---- | :---- | :---- | :---- | :---- |
| 29 |  | 002 | Mengubah data kategori *halaqah* dengan mengisi input nama | Sistem memproses dan mengubah data serta menampilkan pesan “Data kategori berhasil diubah\!” | Sistem memproses dan mengubah data serta menampilkan pesan “Data kategori berhasil diubah\!” |
| 30 | APPA-FR- 24 | 001 | Menambah data material *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan unggah data dan menampilkan pesan “Please fill out this field” |
| 31 |  | 002 | Menambah data material *halaqah* dimana *file* thumbnail diisi selain *file* gambar | Sistem menolak permintaan unggah data dan menampilkan pesan “The *file* type must jpg/png” | Sistem memproses dan menambah data serta menampilkan pesan “Data material berhasil ditambah\!” |
| 32 |  | 003 | Menambah data material *halaqah* dimana semua input telah diisi dan *file* thumbnail *halaqah* berjenis *file* gambar | Sistem memproses dan menambah data serta menampilkan pesan “Data material berhasil ditambah\!” | Sistem memproses dan menambah data serta menampilkan pesan “Data material berhasil ditambah\!” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---: | :---- | :---- | :---- | :---- | :---- |
| 33 | APPA-FR- 26 | 001 | Mengubah data material *halaqah* dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |
| 34 |  | 002 | Mengubah data material *halaqah* dimana *file* thumbnail diisi selain *file* gambar | Sistem menolak permintaan ubah data dan menampilkan pesan “The *file* type must jpg/png” | Sistem memproses dan mengubah data serta menampilkan pesan “Data material berhasil diubah\!” |
| 35 |  | 003 | Mengubah data material *halaqah* dimana semua input telah diisi dan *file* thumbnail *halaqah* berjenis *file* gambar | Sistem memproses dan mengubah data serta menampilkan pesan “Data material berhasil diubah\!” | Sistem memproses dan mengubah data serta menampilkan pesan “Data material berhasil diubah\!” |
| 36 | APPA-FR- 28 | 001 | Mengubah data profil dengan kondisi semua atau salah satu kolom masukan kosong | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” | Sistem menolak permintaan ubah data dan menampilkan pesan “Please fill out this field” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---: | :---- | :---- | :---- | :---- | :---- |
| 37 |  | 002 | Mengisi kolom nama hanya dengan angka dan simbol non- alfanumerik | Sistem menolak permintaan ubah data dan menampilkan pesan “The name is invalid” | Sistem menolak permintaan ubah data dan menampilkan pesan “The name is invalid” |
| 38 |  | 003 | Mengisi kolom *email* yang tidak sesuai dengan format *email* (Contoh format *email* : [anonim@gmail.com)](mailto:anonim@gmail.com) | Sistem menolak permintaan ubah dan menampilkan pesan “The *email* is invalid” | Sistem menolak permintaan ubah dan menampilkan pesan “The *email* is invalid” |
| 39 |  | 004 | Mengisi kolom no hp hanya dengan huruf dan simbol non- alfanumerik | Sistem menolak permintaan ubah dan menampilkan pesan “The phone is invalid” | Sistem menolak permintaan ubah dan menampilkan pesan “The phone is invalid” |
| 40 |  | 005 | Mengisi kolom alamat hanya dengan angka dan simbol non- alfanumerik | Sistem menolak permintaan ubah dan menampilkan pesan “The address is invalid” | Sistem menolak permintaan ubah dan menampilkan pesan “The address is invalid” |

| No | Kode Fungsional | Kode Uji | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---: | :---- | :---- | :---- | :---- | :---- |
| 41 |  | 006 | Mengisi *password* yang berjumlah kurang dari 8 karakter | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” |
| 42 |  | 007 | Mengisi *password* melebihi 32 karakter | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” | Sistem menolak permintaan login dan menampilkan pesan “The *password* must be between 8 to 32 characters” |

2. **Pengujian *White Box Testing***

Pada pelaksanaan pengujian *white box testing* sesuai dengan rancangan tabel yang dibuat sebelumnya, uji tersebut dilakukan oleh peneliti sebagai developer sistem informasi pengarsipan *halaqah*. Hasil pengujian setiap kasus uji ditampilkan pada [Tabel 7.38](#no-1) hingga [Tabel 7.53](#tabel-7.53-hasil-uji-pada-fungsi-delete-jadwal) dan akan dijadikan bahan evaluasi valid tidaknya dari hasil yang didapatkan.

1. **Fungsi *Update* Profil**

Kasus uji pada fungsi *update* profil berjumlah tiga kasus uji. Hasil dari masing- masing kasus uji ditampilkan pada [Tabel 7.38.](#no-1)

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | :---- |
| 1 | Jumlah karakter dari user.name melebihi 255 karakter | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul	pesan “Something Wrong\!”			dan menampilkan halaman		profil admin |
| 2 | Ubah profil disertai mengisi	kolom *password* baru | Data dapat disimpan (termasuk *password*) dan muncul pesan “Profil berhasil diubah”. Sistem menampilkan halaman profil admin | Data dapat disimpan (termasuk *password*)		dan muncul	pesan “Profil	berhasil diubah”.	Sistem menampilkan halaman		profil admin |
| 3 | Ubah profil tanpa mengisi	kolom *password* baru | Data dapat disimpan (kecuali *password*) dan muncul pesan “Profil berhasil diubah”. Sistem menampilkan halaman profil admin | Data dapat disimpan (kecuali *password*) dan muncul pesan “Profil	berhasil diubah”.	Sistem menampilkan halaman		profil admin |

2. **Fungsi *Add* Kategori**

Kasus uji pada fungsi *add* kategori berjumlah dua kasus uji. Hasil dari masing- masing kasus uji ditampilkan pada [Tabel 7.39.](#tabel-7.39-hasil-uji-pada-fungsi-add-kategori)

###### **Tabel 7.39 Hasil uji pada fungsi *add* kategori** {#tabel-7.39-hasil-uji-pada-fungsi-add-kategori}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | :---- |
| 1 | Menghapus salah satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | :---- |
| 2 | Kategori.name berisi	nilai	yang valid | Data dapat disimpan dan muncul pesan “Kategori berhasil ditambah”. Sistem menampilkan halaman kategori admin | Data dapat disimpan dan muncul pesan “Kategori berhasil ditambah”. Sistem menampilkan halaman kategori admin |

3. **Fungsi *Update* Kategori**

Kasus uji pada fungsi *update* kategori berjumlah dua kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada [Tabel 7.40.](#tabel-7.40-hasil-uji-pada-fungsi-update-kategori)

###### **Tabel 7.40 Hasil uji pada fungsi *update* kategori** {#tabel-7.40-hasil-uji-pada-fungsi-update-kategori}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Kategori.name berisi	nilai	yang valid | Data dapat disimpan dan muncul pesan “Kategori berhasil diubah”. Sistem menampilkan halaman kategori admin | Data dapat disimpan dan muncul pesan “Kategori berhasil diubah”. Sistem menampilkan halaman kategori admin |

4. **Fungsi *Delete* Kategori**

Kasus uji pada fungsi *delete* kategori berjumlah dua kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada [Tabel 7.41.](#tabel-7.41-hasil-uji-pada-fungsi-delete-kategori)

###### **Tabel 7.41 Hasil uji pada fungsi *delete* kategori** {#tabel-7.41-hasil-uji-pada-fungsi-delete-kategori}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 2 | Parameter id dari fungsi deleteKategori() berisi	 nilai	yang sesuai		dengan basis	data		(Jika terdapat		 data kategori	dalam basis data) | Data dapat disimpan dan muncul pesan “Kategori berhasil dihapus”. Sistem menampilkan halaman kategori admin | Data dapat disimpan dan muncul pesan “Kategori berhasil dihapus”. Sistem menampilkan halaman kategori admin |

5. **Fungsi *Add* Jilid**

Kasus uji pada fungsi *add* jilid berjumlah dua kasus uji. Hasil dari masing- masing kasus uji ditampilkan pada [Tabel 7.42.](#tabel-7.42-hasil-uji-pada-fungsi-add-jilid)

###### **Tabel 7.42 Hasil uji pada fungsi *add* jilid** {#tabel-7.42-hasil-uji-pada-fungsi-add-jilid}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah	satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Jilid.name berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Jilid berhasil ditambah”. Sistem menampilkan halaman jilid admin | Data dapat disimpan dan muncul pesan “Jilid berhasil ditambah”. Sistem menampilkan halaman jilid admin |

6. **Fungsi *Update* Jilid**

Kasus uji pada fungsi *update* jilid berjumlah dua kasus uji. Hasil dari masing- masing kasus uji ditampilkan pada [Tabel 7.43.](#tabel-7.43-hasil-uji-pada-fungsi-update-jilid)

###### **Tabel 7.43 Hasil uji pada fungsi *update* jilid** {#tabel-7.43-hasil-uji-pada-fungsi-update-jilid}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah	satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah	satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Jilid.name berisi	nilai yang valid | Data dapat disimpan dan muncul pesan “Jilid berhasil diubah”. Sistem menampilkan halaman jilid admin | Data dapat disimpan dan muncul pesan “Jilid berhasil diubah”. Sistem menampilkan halaman jilid admin |

7. **Fungsi *Delete* Jilid**

Kasus uji pada fungsi *delete* jilid berjumlah dua kasus uji. Hasil dari masing- masing kasus uji ditampilkan pada [Tabel 7.44.](#tabel-7.44-hasil-uji-pada-fungsi-delete-jilid)

###### **Tabel 7.44 Hasil uji pada fungsi *delete* jilid** {#tabel-7.44-hasil-uji-pada-fungsi-delete-jilid}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah	satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter		id dari	fungsi deleteJilid() berisi		nilai yang	sesuai dengan		 basis data			(Jika terdapat data kategori dalam		basis data) | Data dapat disimpan dan muncul pesan “Jilid berhasil dihapus”. Sistem menampilkan halaman kategori admin | Data dapat disimpan dan muncul pesan “Jilid berhasil dihapus”. Sistem menampilkan halaman kategori admin |

8. **Fungsi *Add* Penulis**

Kasus uji pada fungsi *add* penulis berjumlah dua kasus uji. Hasil dari masing- masing kasus uji ditampilkan pada [Tabel 7.45.](#tabel-7.45-hasil-uji-pada-fungsi-add-penulis)

###### **Tabel 7.45 Hasil uji pada fungsi *add* penulis** {#tabel-7.45-hasil-uji-pada-fungsi-add-penulis}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah	satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Penulis.name berisi	nilai yang valid | Data dapat disimpan dan muncul pesan “Penulis berhasil ditambah”. Sistem menampilkan halaman kategori admin | Data dapat disimpan dan muncul pesan “Penulis berhasil ditambah”. Sistem menampilkan halaman kategori admin |

9. **Fungsi *Update* Penulis**

Kasus uji pada fungsi penulis berjumlah dua kasus uji. Hasil dari masing- masing kasus uji ditampilkan pada [Tabel 7.46.](#tabel-7.46-hasil-uji-pada-fungsi-update-penulis)

###### **Tabel 7.46 Hasil uji pada fungsi *update* penulis** {#tabel-7.46-hasil-uji-pada-fungsi-update-penulis}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah	satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Penulis.name berisi	nilai yang valid | Data dapat disimpan dan muncul pesan “Penulis berhasil diubah”. Sistem menampilkan halaman kategori admin | Data dapat disimpan dan muncul pesan “Penulis berhasil diubah”. Sistem menampilkan halaman kategori admin |

10. **Fungsi *Delete* Penulis**

Kasus uji pada fungsi *delete* penulis berjumlah dua kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada [Tabel 7.47.](#tabel-7.47-hasil-uji-pada-fungsi-delete-penulis)

###### **Tabel 7.47 Hasil uji pada fungsi *delete* penulis** {#tabel-7.47-hasil-uji-pada-fungsi-delete-penulis}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah	satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter id dari fungsi deletePenulis() berisi    nilai yang sesuai dengan basis data	(Jika terdapat data kategori dalam basis data) | Data dapat disimpan dan muncul pesan “Penulis berhasil dihapus”. Sistem menampilkan halaman penulis admin | Data dapat disimpan dan muncul pesan “Penulis berhasil dihapus”. Sistem menampilkan halaman penulis admin |

11. **Fungsi *Add Halaqah***

Kasus uji pada fungsi *add halaqah* berjumlah dua kasus uji. Hasil dari masing- masing kasus uji ditampilkan pada [Tabel 7.48.](#tabel-7.48-hasil-uji-pada-fungsi-add-halaqah)

**Tabel 7.48 Hasil uji pada fungsi *add halaqah***

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah	satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter id dari fungsi add*Halaqah*() berisi   nilai yang	sesuai dengan basis data			(Jika terdapat data *halaqah* dalam		basis data) | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil ditambah”. Sistem menampilkan halaman *halaqah* admin | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil ditambah”. Sistem menampilkan halaman *halaqah* admin |

12. **Fungsi *Update Halaqah***

Kasus uji pada fungsi *update halaqah* berjumlah tiga kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada [Tabel 7.49.](#tabel-7.49-hasil-uji-pada-fungsi-update-halaqah)

**Tabel 7.49 Hasil uji pada fungsi *update halaqah***

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah	satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Request.file memiliki nilai sebelum diubah. | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil diubah”. Sistem menampilkan halaman *halaqah* admin. File tersimpan ke dalam folder public/file. | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil diubah”. Sistem menampilkan halaman *halaqah* admin. File tersimpan ke dalam folder public/file. |
| 3 | Request.file Tidak memiliki nilai apapun (kosong) | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil diubah”. Sistem menampilkan halaman *halaqah* admin. | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil diubah”. Sistem menampilkan halaman *halaqah* admin. |

13. **Fungsi *Delete Halaqah***

Kasus uji pada fungsi *delete halaqah* berjumlah dua kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada [Tabel 7.50.](#tabel-7.50-hasil-uji-pada-fungsi-delete-halaqah)

**Tabel 7.50 Hasil uji pada fungsi *delete halaqah***

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah	satu kolom tabel di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter id dari	fungsi delete*Halaqah*() berisi nilai yang sesuai dengan basis data (Jika terdapat data *halaqah* dalam basis data) | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil dihapus”. Sistem menampilkan halaman *halaqah* admin | Data dapat disimpan dan muncul pesan “*Halaqah* berhasil dihapus”. Sistem menampilkan halaman *halaqah* admin |

14. **Fungsi *Add* Jadwal**

Kasus uji pada fungsi *add* jadwal berjumlah dua kasus uji. Hasil dari masing- masing kasus uji ditampilkan pada [Tabel 7.51.](#tabel-7.51-hasil-uji-pada-fungsi-add-jadwal)

###### **Tabel 7.51 Hasil uji pada fungsi *add* jadwal** {#tabel-7.51-hasil-uji-pada-fungsi-add-jadwal}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah satu kolom tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Jadwal.judul berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Jadwal berhasil ditambah”. Sistem menampilkan halaman jadwal admin | Data dapat disimpan dan muncul pesan “Jadwal berhasil ditambah”. Sistem menampilkan halaman jadwal admin |

15. ***Fungsi Update Jadwal***

Kasus uji pada fungsi *update* jadwal berjumlah dua kasus uji. Hasil dari masing-masing kasus uji ditampilkan pada [Tabel 7.52.](#tabel-7.52-hasil-uji-pada-fungsi-update-jadwal)[Tabel 7.42](#tabel-7.42-hasil-uji-pada-fungsi-add-jilid)

###### **Tabel 7.52 Hasil uji pada fungsi *update* jadwal** {#tabel-7.52-hasil-uji-pada-fungsi-update-jadwal}

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Uji |
| :---- | :---- | :---- | ----- |
| 1 | Menghapus salah satu kolom tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Jadwal.judul berisi nilai yang valid | Data dapat disimpan dan muncul pesan “Jadwal berhasil diubah”. Sistem menampilkan halaman jadwal admin | Data dapat disimpan dan muncul pesan “Jadwal berhasil diubah”. Sistem menampilkan halaman jadwal admin |

16. **Fungsi *Delete* Jadwal**

Kasus uji pada fungsi *delete* jadwal berjumlah dua kasus uji. Hasil dari masing- masing kasus uji ditampilkan pada [Tabel 7.53.](#tabel-7.53-hasil-uji-pada-fungsi-delete-jadwal)

**Tabel 7.53 Hasil uji pada fungsi *delete* jadwal**

| No | Kasus Uji | Hasil yang Diharapkan |
| :---- | ----- | :---- |
| 1 | Menghapus	salah	satu	kolom	tabel	di *database* | Muncul pesan “Something Wrong\!” dan menampilkan halaman profil admin |
| 2 | Parameter id dari fungsi deleteJadwal() berisi nilai yang sesuai dengan basis data (Jika terdapat data jadwal dalam basis data) | Data dapat disimpan dan muncul pesan “Jadwal berhasil dihapus”. Sistem menampilkan halaman jadwal admin |

3. ## **Evaluasi Hasil Pengujian** {#evaluasi-hasil-pengujian}

Pelaksanaan pengujian yang telah dilakukan pada sistem informasi pengarsipan *halaqah* dianalisis dan dibuat kesimpulan terhadap hasil pengujian tersebut.

1. **Pengujian *Black Box Testing***

Hasil pengujian *black box testing* pada sistem informasi pengarsipan *halaqah* dianalisis apakah hasil yang didapat sesuai dengan hasil yang diharapkan. Hasil tersebut dikumpulkan dan diringkas seperti pada [Tabel 7.54](#tabel-7.54-kesimpulan-dari-pengujian-black-box-testing).

**Tabel 7.54 Kesimpulan dari pengujian *black box testing***

| No | Kode Fungsional | Kode Uji | Kesimpulan |
| :---- | :---- | :---- | :---- |
| 1 | APPA-FR-01 | 001 | Valid |
| 2 |  | 002 | Valid |
| 3 |  | 003 | Valid |
| 4 |  | 004 | Valid |
| 5 |  | 005 | Valid |
| 6 |  | 006 | Valid |
| 7 |  | 007 | Valid |
| 8 | APPA-FR-02 | 001 | Valid |
| 9 |  | 002 | Tidak Valid |
| 10 |  | 003 | Valid |
| 11 | APPA-FR-04 | 001 | Valid |

| No | Kode Fungsional | Kode Uji | Kesimpulan |
| :---- | :---- | :---- | :---- |
| 12 | APPA-FR-04 | 002 | Tidak Valid |
| 13 |  | 003 | Valid |
| 14 | APPA-FR-08 | 001 | Valid |
| 15 |  | 002 | Valid |
| 16 | APPA-FR-10 | 001 | Valid |
| 17 |  | 002 | Valid |
| 18 | APPA-FR-12 | 001 | Valid |
| 19 |  | 002 | Valid |
| 20 | APPA-FR-14 | 001 | Valid |
| 21 |  | 002 | Valid |
| 22 | APPA-FR-16 | 001 | Valid |
| 23 |  | 002 | Valid |
| 24 | APPA-FR-18 | 001 | Valid |
| 25 |  | 002 | Valid |
| 26 | APPA-FR-20 | 001 | Valid |
| 27 |  | 002 | Valid |
| 28 | APPA-FR-22 | 001 | Valid |
| 29 |  | 002 | Valid |
| 30 | APPA-FR-24 | 001 | Valid |
| 31 |  | 002 | Tidak Valid |
| 32 |  | 003 | Valid |
| 33 | APPA-FR-26 | 001 | Valid |
| 34 |  | 002 | Tidak Valid |
| 35 |  | 003 | Valid |
| 36 | APPA-FR-28 | 001 | Valid |
| 37 |  | 002 | Valid |
| 38 |  | 003 | Valid |

| No | Kode Fungsional | Kode Uji | Kesimpulan |
| :---- | :---- | :---- | :---- |
| 39 | APPA-FR-28 | 004 | Valid |
| 40 |  | 005 | Valid |
| 41 |  | 006 | Valid |
| 42 |  | 007 | Valid |

Daftar dari kasus uji yang telah diujikan di tulis pada [Tabel 7.54](#tabel-7.54-kesimpulan-dari-pengujian-black-box-testing) secara ringkas, yaitu hanya berupa kode fungsional, kode uji dan kesimpulan dari hasil yang didapat. Dalam proses menyimpulkan hasil pengujian, apabila hasil uji yang didapat sesuai dengan hasil yang diharapkan maka uji tersebut bernilai valid. Sebaliknya, jika hasil yang didapat tidak sesuai dengan yang diharapkan maka uji tersebut bernilai tidak valid. Dari [Tabel 7.54](#tabel-7.54-kesimpulan-dari-pengujian-black-box-testing) didapatkan hasil uji dimana 38 kasus uji bernilai valid dan 4 kasus uji bernilai tidak valid.

2. **Pengujian *White Box Testing***

Hasil pengujian *white box testing* pada sistem informasi pengarsipan *halaqah* dianalisis apakah hasil yang didapat sesuai dengan hasil yang diharapkan. Hasil tersebut dikumpulkan dan diringkas seperti pada [Tabel 7.55](#tabel-7.55-kesimpulan-dari-pengujian-white-box-testing).

**Tabel 7.55 Kesimpulan dari pengujian *white box testing***

| No | Nama Fungsi | Nomor Urut Fungsi | Kesimpulan |
| :---- | :---- | :---- | :---- |
| 1 | *Update* Profil | 1 | Valid |
| 2 |  | 2 | Valid |
| 3 |  | 3 | Valid |
| 4 | *Add* Kategori | 1 | Valid |
| 5 |  | 2 | Valid |
| 6 | *Update* Kategori | 1 | Valid |
| 7 |  | 2 | Valid |
| 8 | *Delete* Kategori | 1 | Valid |
| 9 |  | 2 | Valid |
| 10 | *Add* Jilid | 1 | Valid |
| 11 |  | 2 | Valid |
| 12 | *Update* Jilid | 1 | Valid |

| No | Nama Fungsi | Nomor Urut Fungsi | Kesimpulan |
| :---- | :---- | :---- | :---- |
| 13 | *Update* Jilid | 2 | Valid |
| 14 | *Delete* Jilid | 1 | Valid |
| 15 |  | 2 | Valid |
| 16 | *Add* Penulis | 1 | Valid |
| 17 |  | 2 | Valid |
| 18 | *Update* Penulis | 1 | Valid |
| 19 |  | 2 | Valid |
| 20 | *Delete* Penulis | 1 | Valid |
| 21 |  | 2 | Valid |
| 22 | *Add Halaqah* | 1 | Valid |
| 23 |  | 2 | Valid |
| 24 | *Update Halaqah* | 1 | Valid |
| 25 |  | 2 | Valid |
| 26 |  | 3 | Valid |
| 27 | *Delete Halaqah* | 1 | Valid |
| 28 |  | 2 | Valid |
| 29 | *Add* Jadwal | 1 | Valid |
| 30 |  | 2 | Valid |
| 31 | *Update* Jadwal | 1 | Valid |
| 32 |  | 2 | Valid |
| 33 | *Delete* Jadwal | 1 | Valid |
| 34 |  | 2 | Valid |

Daftar dari kasus uji yang telah diujikan di tulis pada [Tabel 7.55](#tabel-7.55-kesimpulan-dari-pengujian-white-box-testing) secara ringkas, yaitu hanya berupa nama fungsi, nomor urut fungsi dan kesimpulan dari hasil yang didapat. Dalam proses menyimpulkan hasil pengujian, apabila hasil uji yang didapat sesuai dengan hasil yang diharapkan maka uji tersebut bernilai valid. Sebaliknya, jika hasil yang didapat tidak sesuai dengan yang diharapkan maka uji tersebut bernilai tidak valid. Dari [Tabel 7.55](#tabel-7.55-kesimpulan-dari-pengujian-white-box-testing) didapatkan hasil uji dimana keseluruhan dari kasus uji *white box testing* bernilai valid.

# **BAB 8 KESIMPULAN DAN SARAN** {#bab-8-kesimpulan-dan-saran}

1. ## **Kesimpulan** {#kesimpulan}

   1. Proses analisis kebutuhan dengan metode *Prototyping* mendapatkan hasil

   10 Fitur, 29 Kebutuhan Fungsional dan 1 Kebutuhan Non-Fungsional dengan 2 jenis pengguna. Dua pengguna dalam sistem informasi pengarsipan *halaqah* merupakan pengunjung dan admin.

      2. Pengujian unit menggunakan *white box testing* dengan metode C*yclomatic Complexity* menghasilkan nilai 100% valid pada semua fungsional sistem. Pengujian validitas menggunakan *black box testing* dengan metode *Equivalence Partitioning* menghasilkan nilai 90% valid pada kebutuhan fungsional pengguna yang diuji.

   2. ## **Saran** {#saran}

Saran yang dapat diberikan kepada peneliti selanjutnya terhadap pengembangan Sistem Informasi Pengarsipan *Halaqah* adalah sebagai berikut:

1. Pengujian pada sistem informasi perlu menambahkan pengujian User Acceptance Test (UAT) untuk mengetahui penilaian sistem informasi dari sisi pengguna.

   2. Penambahan fitur cek plagiasi antar makalah *halaqah* guna mengurangi resiko plagiasi dari makalah-makalah lama.

      3. Proses login atau pergantian *password* dapat ditambahkan dengan fitur verifikasi melalui *email*.

      4. Halaman login perlu ditambahkan fitur untuk verifikasi melalui *email*

   apabila admin lupa dengan *password*nya.

# **DAFTAR REFERENSI** {#daftar-referensi}

A. S., R. dan Shalahuddin, M., 2018\. *Rekayasa Perangkat Lunak. Terstruktur dan Berorientasi Objek*. Bandung: INFORMATIKA.

Alfath, M.F., Fanani, L. dan Kharisma, A.P., 2023\. PENGEMBANGAN APLIKASI BERLATIH MEMBACA CEPAT BERBAHASA INGGRIS BERBASIS PROGRESSIVE  
APP DENGAN METODE PROTOTYPING. *Jurnal Teknologi Informasi dan Ilmu Komputer*, 10(7), hal.1461–1468. Tersedia melalui: Universitas Brawijaya \< https://jtiik.ub.ac.id/index.php/jtiik\> \[Diakses 13 Oktober 2024\].

Amalia, A., Putri Hamidah, S.W. dan Kristanto, T., 2021\. Pengujian Black Box Menggunakan Teknik Equivalence Partitions Pada Aplikasi E-Learning Berbasis Web. *Building of Informatics, Technology and Science (BITS)*, 3(3), hal.269–274. Tersedia melalui: Forum Kerjasama Pendidikan Tinggi (FKPT) \< https://ejurnal.seminar-id.com/index.php/bits\> \[Diakses 27 Oktober 2024\].

Ariasih, N.K. dan Sri Artha, I.M.G., 2017\. Rancang Bangun STIKI Class Facilities. *Lontar Komputer*, 8(2), hal.101–111. Tersedia melalui: Udayana University \< https://ojs.unud.ac.id/index.php/lontar\> \[Diakses 13 Oktober 2024\].

Bunyamin dan Alparisi, R., 2015\. PENGEMBANGAN SISTEM INFORMASI PENGELOLAAN DATA SANTRI DI PONDOK PESANTREN ASH \- SHOFI BERBASIS  
WEB. *Jurnal Algoritma*, 11, hal.352–357. Tersedia melalui: Institut Teknologi Garut \<https://jurnal.itg.ac.id/index.php/algoritma/index\> \[Diakses 13 Oktober 2024\].

Carera, N.K., 2022\. *Pengembangan Sistem Informasi Alumni Sekolah Berbasis Web Menggunakan Framework Laravel di SMK Negeri 7 Malang*. *Edu Komputika Journal*, https://doi.org/10.15294/edukomputika.v9i1.48923.

Elgamar, 2020\. *Konsep Dasar Pemrograman Website dengan PHP*. Malang: CV. Multimedia Edukasi.

Gie, T.L., 2022\. *Terampil mengarang*. Yogyakarta: Andi.

Mall, R., 2018\. *Fundamentals of Software Engineering*. Fifth Edit ed. \[daring\] *PHI Learning Private Limited*, Delhi: PHI Learning Private Limited. Tersedia pada:  
[\<http://eprints.uanl.mx/5481/1/1020149995.PDF](http://eprints.uanl.mx/5481/1/1020149995.PDF)\>.

Mukayat D. Brotowidjoyo, 2002\. *Penulisan karangan ilmiah*. Jakarta: Akademika Pressindo.

Pressman, R.S. dan Maxim, B.R., 2020\. *Software Engineering: A Practitioner’s*  
*Approach 9th Ed*. 9th ed. New York: McGraw-Hill Education.

Putri Yulianti, A.Y., Brata, A.H. dan Tolle, H., 2019\. Pengembangan Aplikasi Web Tracer Study Fakultas Ilmu Komputer Universitas Brawijaya Menggunakan Metode Prototipe. *Jurnal Pengembangan Teknologi Informasi dan Ilmu Komputer*, 3(7), hal.6982–6988.

Ryan, D., 2020\. *Understanding Digital Marketing: A Complete Guide to Engaging*

*Customers and Implementing Successful Digital Campaigns*. New York: Kogan Page Ltd.

Sommerville, I., 2016\. *Software engineering, Tenth Edition*. 10th ed. United States: Pearson Education.

Yulianti, A.Y.P., 2019\. *Pengembangan Aplikasi Web Tracer Study Fakultas Ilmu Komputer Universitas Brawijaya Menggunakan Prototype*.

# **LAMPIRAN A HASIL WAWANCARA**

Identitas Subjek Wawancara Nama	: Lia  
Jabatan : Ketua Majelis Tim Litbang Pesantren Luhur

Percakapan Wawancara :

| Interaksi | Respon |
| :---- | ----- |
| Peneliti | Sebelumnya perkenalkan nama saya Ghaytsa Zahara Faradisa, biasa dipanggil Disa. Saya dari prodi Pendidikan Teknologi Informasi, Filkom UB. Kebetulan disini saya tertarik dengan kegiatan *halaqah* di pesantren anda untuk dijadikan topik skripsi saya. Jadi saya ingin mewawancarai mbaknya terkait kegiatan *halaqah*, apa boleh mbak? |
| Lia | Oh boleh banget mbak, silahkan. |
| Peneliti | Sebelumnya kalau boleh tahu siapa nama mbaknya? |
| Lia | Nama saya Lia mbak |
| Peneliti | Mbaknya disini masuk ke dalam majelis atau santri saja ya? |
| Lia | Saya masuk ke dalam majelis, bagian Litbang. |
| Peneliti | Terkait kegiatan *halaqah*, kapan pelaksanaan kegiatan *halaqah* selama ini? |
| Lia | *Halaqah* dilaksanakan setiap hari mbak, kecuali hari sabtu dan minggu. Biasanya sehabis sholat subuh trus dzikir kan, nah habis itu *halaqah*. *Halaqah* itu diusahakan harus selesai jam setengah 7, karena sebagian kan ada santri yang masuk jam 7 pagi. Jadi ada waktu buat mereka siap-siap kuliah. |
| Peneliti | Untuk pelaksanaannya sendiri alurnya bagaimana ya? |
| Lia | Untuk alur pelaksanaannya itu nanti santriwan dan santriwati yang mendapat jadwal hari ini (jadwal presentasi makalah *halaqah*), mengumpulkan makalah dan flashdisk ke tim litbang. Lalu dari tim Litbang menyiapkan fasilitas untuk presentasinya seperti laptop, proyektor, mic gitu. Nah masing-masing santriwan dan santriwati ini mempresentasikan judul *halaqah*nya pake powerpoint terus lewat proyektor gitu. Masing-masing dikasih waktu max 15 menit presentasi. Setelah presentasi baru dikasih waktu tanya jawab untuk santri. Itu sesi akhir dari *halaqah*, lalu ditutup. Nah makalah dan file ppt yang dikumpulkan santriwan-santriwati nanti kita tampung, lalu kita seleksi makalah manakah yang akan sesuai kriteria. Yang sesuai kriteria nantinya ditampung lalu dijilid jadi 1 buku besar. Buku besar ini biasanya disebut sebagai percikan. Percikan ini disimpan didalam lemari kantor pesantren. |
| Peneliti | Barusan anda menyebut bahwa santri mempresentasikan judulnya. Bagaimana santri mendapatkan judul *halaqah* itu? Apakah mereka |

|  | membuat judul sendiri atau sudah ditentukan dari tim litbang? |
| :---- | :---- |
| Lia | Judul *halaqah* itu ditentukan dari tim Litbang. Judul yang ditentukan diusahakan di luar dari prodi kuliah santri. Misal ada santri yang kuliah di jurusan sastra inggris, berarti judul yang ditentukan bisa tentang kedokteran. Itu tadi contoh ya. Lalu dari tim litbang bikin jadwal *halaqah* tiap dua minggu. Misal ini hari terakhir dari jadwal 2 minggu ini, berarti kami tim litbang membuat jadwal baru untuk 2 minggu kedepan. Nah tiap santri ini pasti dapat giliran *halaqah*nya. Ketika ada santri yang mendapat judul dan jadwal *halaqah*nya, tim litbang akan menghubungi santri tersebut melalui whatsapp dan memberi waktu pengerjaan makalah plus ppt *halaqah* selama 2 minggu sebelum hari H. |
| Peneliti | Nah untuk percikan itu sendiri, kalau boleh tahu, apa fungsi dari percikan itu sendiri selain menyimpan makalah-makalah *halaqah* yang sudah dipresentasikan? |
| Lia | Fungsinya bisa dijadikan referensi mbak. Kadang santri kalau ingin mencari materi yang selaras dengan judul *halaqah* yang mereka dapatkan, mereka pasti mampir kesini. Tapi, untuk melihat percikan butuh perizinan tim kami (Tim Litbang). Dikhawatirkan ada percikan yang hilang atau ada yang diam-diam meminjam dan membawanya ke kamar mereka. Itulah kenapa santri perlu izin dan perlu pengawasan tim Litbang selama santri melihat-lihat percikan. |
| Peneliti | Apakah ada kendala yang pernah dialami oleh tim Litbang selama ini? |
| Lia | Ada mbak. Terutama selama pembuatan percikan dan penyimpanan percikan. Seperti yang mbak ketahui sekarang di lemari ini (menunjuk ke arah lemari kantor) isinya percikan semua, dan keadaannya sudah penuh sekarang. Kami jadi bingung sekarang mau ditaruh dimana percikan selanjutnya. Percikan ini juga tidak memiliki halaman dan daftar isi. Karena ini kumpulan dari makalah lalu dijilid, maka dari itu orang-orang jadi kesusahan kalo mau cari judul di percikan ini. |
| Peneliti | Bagaimana dengan katalog? Apakah ada katalog untuk percikan- percikan ini? |
| Lia | Tentu ada mbak. Kami membuat katalog dan mengkategorikan judul *halaqah* ke dalam macam-macam kategori ilmu. Seperti budidaya tanaman itu masuk kategori sains, piramida maslow masuk ke dalam psikologi, dll. Tapi ya itu mbak, katalognya tidak ada halaman dan tidak ada informasi di percikan ke berapa judul *halaqah* yang dicari. |
| Peneliti | Boleh tahu seperti apa bentuk katalog saat ini? |
| Lia | Seperti ini mbak (menunjukkan katalog dalam bentuk file gdocs di handphone kantor), katalog kami dibuat dalam bentuk file ini, karena kalau pakai google docs seluruh anggota tim Litbang bisa mengakses file katalog ini tanpa harus pergi ke komputer kantor. Dulu kan katalog cuma disimpan di dalam file word di komputer kantor, sekarang pakai google docs ini. |
| Peneliti | Bagaimana menurut anda jika ada sebuah *website* yang dapat |

|  | menampung file-file *halaqah* untuk penyimpanan filenya? |
| :---- | :---- |
| Lia | Wah bagus itu mbak. Nanti *website*nya bisa diakses semua orang kan ya? |
| Peneliti | Iya mbak. Kira-kira dari mbak Lia sendiri ada pandangan pengen *website* yang seperti apa? Mungkin dari fitur atau fungsi-fungsinya. |
| Lia | Wah saya juga bingung mbak. Saya masih belum kepikiran. Dulu juga pernah ada wacana membuat *website* seperti ini, sampai diberi kerangka-kerangka bentukan webnya. Yang kotak-kotak gitu mbak, ada kotak silangnya juga. Itupun dari kami tim Litbang sendiri juga masih belum paham sama sekali. Kita juga masih gak kebayang bagaimana bentuk web nantinya. Yang penting, bisa buat upload *halaqah* gitu deh mbak. |
| Peneliti | Semisal saya buatkan desain webnya dulu, terus nanti saya tunjukkan ke mbaknya gimana? |
| Lia | Wah bisa banget itu mbak. |
| Peneliti | Baik, mbak. Saya rasa pertanyaan-pertanyaan yang sudah saya saya siapkan sudah terjawab semua oleh mbak. Terima kasih Atas waktunya, ya mbak. |
| Lia | Iya, Mbak. Sama-sama. |

**LAMPIRAN B PENGUJIAN BLACK BOX**

![][image83]  
![][image84]  
![][image85]  
![][image86]  
![][image87]  
![][image88]  
![][image89]  
![][image90]  
![][image91]  
![][image92]  
![][image93]  
![][image94]

**LAMPIRAN C PENGUJIAN WHITE BOX**

![][image95]  
![][image96]  
![][image97]  
![][image98]  
![][image99]  
![][image100]  
![][image101]