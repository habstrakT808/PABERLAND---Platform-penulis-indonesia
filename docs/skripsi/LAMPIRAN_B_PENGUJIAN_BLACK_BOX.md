# LAMPIRAN B PENGUJIAN BLACK BOX

## PENGUJIAN FUNGSIONAL

Dokumen ini berisi tabel pengujian fungsional untuk pengembangan Platform Komunitas Penulis Literasi Anak PaberLand. Pengujian fungsional dilakukan dengan metode Black Box Testing menggunakan Equivalence Partitioning. Pengujian dilakukan untuk memastikan semua kebutuhan fungsional (F-01 sampai F-10) telah terpenuhi sesuai dengan acceptance criteria yang ditetapkan.

Atas perhatian dan partisipasi Bapak/Ibu dalam pengujian ini, peneliti mengucapkan terima kasih.

## A. IDENTITAS PENGUJI

| Informasi | Keterangan |
| :---- | :---- |
| **Nama Penguji** | Hafiyan Al Muqaffi Umary |
| **Hari dan Tanggal** | [Tanggal Pengujian] |
| **Instansi** | Universitas Brawijaya |
| **Jabatan** | Peneliti/Developer Platform PaberLand |

## B. TABEL PENGUJIAN

Kolom "Hasil Pengujian" diisi berdasarkan output yang dihasilkan sistem. Kesimpulan (valid atau tidak valid) akan dibuat pada tabel kesimpulan selanjutnya.

### A. F-01: Sistem Autentikasi

**Tabel B.1 Hasil uji pada F-01: Sistem Autentikasi**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 1 | Login dengan email tidak sesuai format | Sistem menolak dan menampilkan pesan error | Sistem menolak dan menampilkan pesan error |
| 2 | Login dengan password kurang dari 6 karakter | Sistem menolak dan menampilkan pesan "Email atau password salah!" | Sistem menolak dan menampilkan pesan "Email atau password salah!" |
| 3 | Login dengan email atau password kosong | Sistem menolak dan menampilkan pesan "Please fill this field!" | Sistem menolak dan menampilkan pesan "Please fill this field!" |
| 4 | Login dengan email tidak terdaftar | Sistem menolak dan menampilkan pesan "Email atau password salah!" | Sistem menolak dan menampilkan pesan "Email atau password salah!" |
| 5 | Login dengan password salah | Sistem menolak dan menampilkan pesan "Email atau password salah!" | Sistem menolak dan menampilkan pesan "Email atau password salah!" |
| 6 | Login dengan email dan password valid | Sistem menampilkan halaman beranda dan pesan "Login berhasil!" | Sistem menampilkan halaman beranda dan pesan "Login berhasil!" |
| 7 | Registrasi dengan nama lengkap kosong | Sistem menolak dan menampilkan pesan "Semua field harus diisi!" | Sistem menolak dan menampilkan pesan "Semua field harus diisi!" |
| 8 | Registrasi dengan email tidak sesuai format | Sistem menolak dan menampilkan pesan error | Sistem menolak dan menampilkan pesan error |
| 9 | Registrasi dengan password kurang dari 6 karakter | Sistem menolak dan menampilkan pesan "Password minimal 6 karakter!" | Sistem menolak dan menampilkan pesan "Password minimal 6 karakter!" |
| 10 | Registrasi dengan password dan konfirmasi tidak sama | Sistem menolak dan menampilkan pesan "Password dan konfirmasi password tidak sama!" | Sistem menolak dan menampilkan pesan "Password dan konfirmasi password tidak sama!" |
| 11 | Registrasi dengan semua input valid | Sistem memproses registrasi, mengirim email verifikasi, dan menampilkan pesan sukses | Sistem memproses registrasi, mengirim email verifikasi, dan menampilkan pesan sukses |
| 12 | Reset password dengan email tidak terdaftar | Sistem menolak dan menampilkan pesan error | Sistem menolak dan menampilkan pesan error |
| 13 | Reset password dengan email valid | Sistem mengirim email reset password dan menampilkan pesan sukses | Sistem mengirim email reset password dan menampilkan pesan sukses |

### B. F-02: Editor WYSIWYG

**Tabel B.2 Hasil uji pada F-02: Editor WYSIWYG**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 14 | Membuka editor tanpa login | Sistem menolak dan mengarahkan ke halaman login | Sistem menolak dan mengarahkan ke halaman login |
| 15 | Menulis artikel dan auto-save berjalan | Sistem menyimpan draft secara otomatis setiap 30 detik | Sistem menyimpan draft secara otomatis setiap 30 detik |
| 16 | Memilih template per kategori | Sistem menampilkan template yang sesuai dengan kategori yang dipilih | Sistem menampilkan template yang sesuai dengan kategori yang dipilih |
| 17 | Preview artikel sebelum publikasi | Sistem menampilkan preview artikel dengan format yang benar | Sistem menampilkan preview artikel dengan format yang benar |

### C. F-03: Manajemen Artikel

**Tabel B.3 Hasil uji pada F-03: Manajemen Artikel**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 18 | Menambah artikel dengan judul, konten, atau kategori kosong | Sistem menolak dan menampilkan pesan "Judul, konten, dan kategori harus diisi!" | Sistem menolak dan menampilkan pesan "Judul, konten, dan kategori harus diisi!" |
| 19 | Menambah artikel dengan konten kurang dari 100 kata | Sistem menolak publikasi dan menampilkan pesan error validasi | Sistem menolak publikasi dan menampilkan pesan error validasi |
| 20 | Menambah artikel dengan semua input valid | Sistem memproses dan mempublikasikan artikel, menampilkan pesan sukses | Sistem memproses dan mempublikasikan artikel, menampilkan pesan sukses |
| 21 | Menyimpan artikel sebagai draft | Sistem menyimpan artikel sebagai draft dan menampilkan pesan sukses | Sistem menyimpan artikel sebagai draft dan menampilkan pesan sukses |
| 22 | Mengubah artikel dengan semua input valid | Sistem memproses dan memperbarui artikel, menampilkan pesan sukses | Sistem memproses dan memperbarui artikel, menampilkan pesan sukses |
| 23 | Menghapus artikel yang valid | Sistem memproses dan menghapus artikel, menampilkan pesan sukses | Sistem memproses dan menghapus artikel, menampilkan pesan sukses |
| 24 | Menjadwalkan publikasi artikel | Sistem menyimpan artikel dengan scheduled_at dan status scheduled | Sistem menyimpan artikel dengan scheduled_at dan status scheduled |

### D. F-04: Sistem Komentar

**Tabel B.4 Hasil uji pada F-04: Sistem Komentar**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 25 | Menambahkan komentar dengan konten kosong | Sistem menolak dan menonaktifkan tombol komentar. | Sistem menolak dan menonaktifkan tombol komentar. |
| 26 | Menambahkan komentar dengan konten valid | Sistem memproses dan menambahkan komentar, memperbarui jumlah komentar | Sistem memproses dan menambahkan komentar, memperbarui jumlah komentar |
| 27 | Membalas komentar (reply) | Sistem memproses dan menambahkan reply sebagai nested comment | Sistem memproses dan menambahkan reply sebagai nested comment |
| 28 | Mengubah komentar yang valid | Sistem memproses dan memperbarui komentar, menampilkan indikator "diedit" | Sistem memproses dan memperbarui komentar, menampilkan indikator "diedit" |
| 29 | Menghapus komentar yang valid | Sistem memproses dan menghapus komentar, memperbarui jumlah komentar | Sistem memproses dan menghapus komentar, memperbarui jumlah komentar |

### E. F-05: Sistem Like

**Tabel B.5 Hasil uji pada F-05: Sistem Like**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 30 | Memberikan like pada artikel yang sudah di-like | Sistem melakukan unlike dan mengurangi jumlah like | Sistem melakukan unlike dan mengurangi jumlah like |
| 31 | Memberikan like pada artikel yang belum di-like | Sistem menambahkan like, memperbarui jumlah like dengan optimistik update | Sistem menambahkan like, memperbarui jumlah like dengan optimistik update |

### F. F-06: Discovery Konten

**Tabel B.6 Hasil uji pada F-06: Discovery Konten**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 32 | Pencarian dengan kata kunci | Sistem menampilkan hasil pencarian yang relevan | Sistem menampilkan hasil pencarian yang relevan |
| 33 | Pencarian dengan filter kategori | Sistem menampilkan hasil pencarian yang difilter berdasarkan kategori | Sistem menampilkan hasil pencarian yang difilter berdasarkan kategori |
| 34 | Membuka halaman kategori | Sistem menampilkan artikel dalam kategori dan statistik kategori | Sistem menampilkan artikel dalam kategori dan statistik kategori |

### G. F-07: Manajemen Profil dan Portofolio

**Tabel B.7 Hasil uji pada F-07: Manajemen Profil dan Portofolio**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 35 | Menambahkan portofolio dengan semua field | Sistem memproses dan menyimpan portofolio, menampilkan pesan sukses | Sistem memproses dan menyimpan portofolio, menampilkan pesan sukses |
| 36 | Menambahkan portofolio tanpa cover image | Sistem menyimpan portofolio dengan placeholder image | Sistem menyimpan portofolio dengan placeholder image |
| 37 | Menampilkan portofolio dalam grid view | Sistem menampilkan portofolio dalam format grid yang menarik | Sistem menampilkan portofolio dalam format grid yang menarik |

### H. F-08: Admin Panel

**Tabel B.8 Hasil uji pada F-08: Admin Panel**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 38 | Mengakses menu admin tanpa akses admin | Sistem menolak dan mengembalikan ke halaman beranda. | Sistem menolak dan mengembalikan ke halaman beranda. |
| 39 | Mengubah role pengguna dengan akses admin | Sistem memproses perubahan role, mencatat ke activity logs | Sistem memproses perubahan role, mencatat ke activity logs |
| 40 | Menghapus pengguna dengan akses admin | Sistem memproses penghapusan, mencatat ke activity logs | Sistem memproses penghapusan, mencatat ke activity logs |
| 41 | Mengakses dashboard analytics | Sistem menampilkan dashboard dengan metrik platform | Sistem menampilkan dashboard dengan metrik platform |

### I. F-09: Sistem Notifikasi

**Tabel B.9 Hasil uji pada F-09: Sistem Notifikasi**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 42 | Menerima notifikasi komentar baru | Sistem menampilkan notifikasi real-time dan badge notifikasi | Sistem menampilkan notifikasi real-time dan badge notifikasi |
| 43 | Menerima notifikasi balasan komentar | Sistem menampilkan notifikasi real-time untuk balasan | Sistem menampilkan notifikasi real-time untuk balasan |
| 44 | Menandai notifikasi sebagai sudah dibaca | Sistem memperbarui status notifikasi menjadi read | Sistem memperbarui status notifikasi menjadi read |

### J. F-10: Sistem Laporan Konten

**Tabel B.10 Hasil uji pada F-10: Sistem Laporan Konten**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 45 | Melaporkan konten dengan alasan | Sistem menyimpan laporan dengan status pending | Sistem menyimpan laporan dengan status pending |
| 46 | Meninjau laporan dengan akses moderator atau admin | Sistem memproses laporan, memberikan keputusan, dan mencatat ke activity logs | Sistem memproses laporan, memberikan keputusan, dan mencatat ke activity logs |

## C. TABEL KESIMPULAN

Beri tanda centang (✔) pada kolom Valid apabila Hasil Pengujian sesuai dengan Hasil yang Diharapkan pada tabel sebelumnya. Jika tidak sesuai, beri tanda centang (✔) pada kolom Tidak Valid.

**Tabel B.11 Kesimpulan pengujian black box testing**

| No | Kode Fungsional | Kode Uji | Kesimpulan |
| :---- | :---- | :---- | :---- |
| | | | Valid | Tidak Valid |
| 1 | F-01 | 001 | ✔ | |
| 2 | | 002 | ✔ | |
| 3 | | 003 | ✔ | |
| 4 | | 004 | ✔ | |
| 5 | | 005 | ✔ | |
| 6 | | 006 | ✔ | |
| 7 | | 007 | ✔ | |
| 8 | | 008 | ✔ | |
| 9 | | 009 | ✔ | |
| 10 | | 010 | ✔ | |
| 11 | | 011 | ✔ | |
| 12 | | 012 | ✔ | |
| 13 | | 013 | ✔ | |
| 14 | F-02 | 001 | ✔ | |
| 15 | | 002 | ✔ | |
| 16 | | 003 | ✔ | |
| 17 | | 004 | ✔ | |
| 18 | F-03 | 001 | ✔ | |
| 19 | | 002 | ✔ | |
| 20 | | 003 | ✔ | |
| 21 | | 004 | ✔ | |
| 22 | | 005 | ✔ | |
| 23 | | 006 | ✔ | |
| 24 | | 007 | ✔ | |
| 25 | F-04 | 001 | ✔ | |
| 26 | | 002 | ✔ | |
| 27 | | 003 | ✔ | |
| 28 | | 004 | ✔ | |
| 29 | | 005 | ✔ | |
| 30 | F-05 | 001 | ✔ | |
| 31 | | 002 | ✔ | |
| 32 | F-06 | 001 | ✔ | |
| 33 | | 002 | ✔ | |
| 34 | | 003 | ✔ | |
| 35 | F-07 | 001 | ✔ | |
| 36 | | 002 | ✔ | |
| 37 | | 003 | ✔ | |
| 38 | F-08 | 001 | ✔ | |
| 39 | | 002 | ✔ | |
| 40 | | 003 | ✔ | |
| 41 | | 004 | ✔ | |
| 42 | F-09 | 001 | ✔ | |
| 43 | | 002 | ✔ | |
| 44 | | 003 | ✔ | |
| 45 | F-10 | 001 | ✔ | |
| 46 | | 002 | ✔ | |

---

**Malang, [Tanggal Pengujian]**

**Penguji,**


**Hafiyan Al Muqaffi Umary**

