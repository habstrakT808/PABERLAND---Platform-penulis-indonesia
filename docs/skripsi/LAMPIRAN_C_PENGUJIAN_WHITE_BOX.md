# LAMPIRAN C PENGUJIAN WHITE BOX

## PENGUJIAN UNIT

Dokumen ini berisi tabel pengujian unit untuk pengembangan Platform Komunitas Penulis Literasi Anak PaberLand. Pengujian unit dilakukan dengan metode White Box Testing menggunakan Basis Path Testing dan Cyclomatic Complexity. Pengujian dilakukan oleh peneliti sebagai developer sistem untuk memastikan logika internal kode berfungsi dengan benar dan semua jalur independen telah teruji.

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

### A. Fungsi Login Pengguna

**Tabel C.1 Hasil uji pada fungsi login pengguna**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 1 | Email atau password kosong | Muncul pesan validasi "Email dan password harus diisi!" dan proses login dihentikan | Muncul pesan "Please fill in this field" dari validasi HTML5 dan proses login dihentikan |
| 2 | Terjadi exception saat proses login (koneksi internet terputus) | Muncul pesan error dan proses login dihentikan | Muncul toast "Failed to fetch" dan proses login dihentikan |
| 3 | Email atau password salah | Muncul pesan "Email atau password salah!" dan proses login dihentikan | Muncul toast "Email atau password salah!" dan proses login dihentikan |
| 4 | Email belum terverifikasi | Muncul pesan "Silakan verifikasi email Anda terlebih dahulu!" dan proses login dihentikan | Muncul toast "Silakan verifikasi email Anda terlebih dahulu!" dan proses login dihentikan |
| 5 | Error lainnya dari Supabase (database di-pause) | Muncul pesan error dan proses login dihentikan | Muncul toast "Failed to fetch" dan proses login dihentikan |
| 6 | Email dan password valid | Muncul pesan "Login berhasil!", redirect ke halaman beranda | Muncul toast "Login berhasil! Selamat datang di PaberLand!" dan redirect ke halaman beranda |

### B. Fungsi Tambah Artikel

**Tabel C.2 Hasil uji pada fungsi tambah artikel**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 7 | Judul, konten, atau kategori kosong | Muncul pesan "Judul, konten, dan kategori harus diisi!" dan proses dihentikan | Muncul toast "Judul, konten, dan kategori harus diisi!" dan proses dihentikan |
| 8 | User tidak login dan mengakses halaman write | Sistem menolak akses dan mengarahkan ke halaman login | Sistem mengarahkan ke halaman login (https://paberland.com/auth/login) |
| 9 | Terjadi exception saat proses insert (koneksi internet terputus) | Muncul pesan error dan proses dihentikan | Muncul toast "Gagal menyimpan konten: TypeError: Failed to fetch" dan proses dihentikan |
| 10 | Slug sudah ada di database | Sistem menghasilkan slug unik dengan menambahkan "-1" di akhir, artikel disimpan | Sistem menghasilkan slug unik dengan menambahkan "-1" di akhir, artikel berhasil disimpan |
| 11 | Artikel dipublikasikan | Muncul pesan sukses dan redirect ke halaman detail artikel | Muncul toast "🎉 Konten berhasil dipublikasikan!" dan redirect ke halaman detail artikel |
| 12 | Artikel disimpan sebagai draft | Muncul pesan sukses dan redirect ke halaman beranda | Muncul toast "📝 Konten berhasil disimpan sebagai draft!" dan redirect ke halaman beranda |

### C. Fungsi Update Artikel

**Tabel C.3 Hasil uji pada fungsi update artikel**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 13 | Terjadi error saat update | Sistem mengembalikan { success: false, error: error.message } | Sistem mengembalikan { success: false, error: error.message } |
| 14 | Update berhasil tanpa error | Sistem mengembalikan { success: true, data: result.data, error: undefined } | Muncul toast "🎉 Konten berhasil diperbarui dan dipublikasikan!" |

### D. Fungsi Hapus Artikel

**Tabel C.4 Hasil uji pada fungsi hapus artikel**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 15 | Terjadi error saat delete | Sistem melempar error (throw error) | Sistem melempar error (throw error) |
| 16 | Delete berhasil tanpa error | Sistem mengembalikan { success: true } | Muncul toast "🗑️ Konten berhasil dihapus" |

### E. Fungsi Komentar Artikel

**Tabel C.5 Hasil uji pada fungsi komentar artikel**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 17 | Terjadi error saat insert komentar | Sistem mengembalikan { success: false, error: result.error.message } | Sistem mengembalikan { success: false, error: result.error.message } |
| 18 | Insert komentar berhasil | Sistem memanggil updateArticleCommentCount, dan mengembalikan { success: true, data: result.data } | Muncul toast "💬 Komentar berhasil ditambahkan!" |
| 19 | Terjadi exception saat proses | Sistem menangkap exception, dan mengembalikan { success: false, error: "Terjadi kesalahan saat menambahkan komentar" } | Sistem menangkap exception, dan mengembalikan { success: false, error: "Terjadi kesalahan saat menambahkan komentar" } |

### F. Fungsi Like Artikel

**Tabel C.6 Hasil uji pada fungsi like artikel**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 20 | Error saat check existing like | Sistem mengembalikan { success: false, isLiked: false, error: result.error.message } | Sistem mengembalikan { success: false, isLiked: false, error: result.error.message } |
| 21 | User sudah like sebelumnya (unlike) dengan error | Sistem mengembalikan { success: false, isLiked: true, error: deleteError.message } | Sistem mengembalikan { success: false, isLiked: true, error: deleteError.message } |
| 22 | User sudah like sebelumnya (unlike) berhasil | Sistem memanggil syncLikesCount, dan mengembalikan { success: true, isLiked: false } | Sistem memanggil syncLikesCount, dan mengembalikan { success: true, isLiked: false } |
| 23 | User belum like (like) dengan error | Sistem mengembalikan { success: false, isLiked: false, error: insertError.message } | Sistem mengembalikan { success: false, isLiked: false, error: insertError.message } |
| 24 | User belum like (like) berhasil | Sistem memanggil syncLikesCount, dan mengembalikan { success: true, isLiked: true } | Sistem memanggil syncLikesCount, dan mengembalikan { success: true, isLiked: true } |
| 25 | Terjadi exception saat proses | Sistem menangkap exception, dan mengembalikan { success: false, isLiked: false, error: "Terjadi kesalahan sistem" } | Sistem menangkap exception, dan mengembalikan { success: false, isLiked: false, error: "Terjadi kesalahan sistem" } |

### G. Fungsi Cari Konten

**Tabel C.7 Hasil uji pada fungsi cari konten**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 26 | Query kosong atau kurang dari 2 karakter | Sistem mengembalikan { success: false, message: "Query minimal 2 karakter" } | Sistem mengembalikan { success: false, message: "Query minimal 2 karakter" } |
| 27 | Pencarian artikel dengan error | Sistem mencatat error dan melanjutkan pencarian penulis | Sistem mencatat error dan melanjutkan pencarian penulis |
| 28 | Pencarian artikel berhasil dengan filter kategori | Sistem mengembalikan hasil artikel yang difilter berdasarkan kategori | Sistem mengembalikan hasil artikel yang difilter berdasarkan kategori |
| 29 | Pencarian penulis dengan error | Sistem mencatat error dan melanjutkan proses | Sistem mencatat error dan melanjutkan proses |
| 30 | Pencarian penulis berhasil | Sistem mengembalikan hasil penulis yang sesuai | Sistem mengembalikan hasil penulis yang sesuai |
| 31 | Terjadi exception saat proses | Sistem menangkap exception, dan mengembalikan { success: false, message: "Terjadi kesalahan saat mencari" } | Sistem menangkap exception, dan mengembalikan { success: false, message: "Terjadi kesalahan saat mencari" } |

### H. Fungsi Laporkan Konten

**Tabel C.8 Hasil uji pada fungsi laporkan konten**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 32 | User atau reason kosong | Sistem menampilkan error "Silakan pilih alasan laporan" dan proses dihentikan | Sistem menampilkan error "Silakan pilih alasan laporan" dan proses dihentikan |
| 33 | Profile error saat check | Sistem menampilkan error "Error: User profile not found" dan proses dihentikan | Sistem menampilkan error "Error: User profile not found" dan proses dihentikan |
| 34 | Profile data tidak ditemukan | Sistem menampilkan error "Error: User profile not found in database" dan proses dihentikan | Sistem menampilkan error "Error: User profile not found in database" dan proses dihentikan |
| 35 | Error foreign key constraint | Sistem menampilkan error "Error: User profile not found. Silakan logout dan login kembali." | Sistem menampilkan error "Error: User profile not found. Silakan logout dan login kembali." |
| 36 | Error duplicate laporan | Sistem menampilkan error "Anda sudah melaporkan konten ini sebelumnya" | Sistem menampilkan error "Anda sudah melaporkan konten ini sebelumnya" |
| 37 | Error permission | Sistem menampilkan error "Anda tidak memiliki izin untuk melaporkan konten ini" | Sistem menampilkan error "Anda tidak memiliki izin untuk melaporkan konten ini" |
| 38 | Error lainnya | Sistem menampilkan error "Gagal mengirim laporan. Silakan coba lagi." | Sistem menampilkan error "Gagal mengirim laporan. Silakan coba lagi." |
| 39 | Laporan berhasil dikirim | Sistem menampilkan sukses, menutup modal, dan mereset form | Sistem menampilkan sukses, menutup modal, dan mereset form |

### I. Fungsi Tinjau Laporan

**Tabel C.9 Hasil uji pada fungsi tinjau laporan**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 40 | Terjadi error saat update | Sistem melempar error, menangkap exception, dan mengembalikan { success: false, error: 'Failed to resolve report' } | Sistem melempar error, menangkap exception, dan mengembalikan { success: false, error: 'Failed to resolve report' } |
| 41 | Update berhasil tanpa error | Sistem memanggil logAdminActivity, dan mengembalikan { success: true } | Sistem memanggil logAdminActivity, dan mengembalikan { success: true } |

### J. Fungsi Kelola Pengguna (Admin)

**Tabel C.10 Hasil uji pada fungsi kelola pengguna (admin)**

| No | Kasus Uji | Hasil yang Diharapkan | Hasil Pengujian |
| :---- | :---- | :---- | :---- |
| 42 | Terjadi error saat promote | Sistem melempar error, menangkap exception, dan mengembalikan { success: false, error: 'Failed to promote user' } | Sistem melempar error, menangkap exception, dan mengembalikan { success: false, error: 'Failed to promote user' } |
| 43 | Promote berhasil tanpa error | Sistem memanggil logAdminActivity, dan mengembalikan { success: true } | Sistem memanggil logAdminActivity, dan mengembalikan { success: true } |

## C. TABEL KESIMPULAN

Beri tanda centang (✔) pada kolom Valid apabila Hasil Pengujian sesuai dengan Hasil yang Diharapkan pada tabel sebelumnya. Jika tidak sesuai, beri tanda centang (✔) pada kolom Tidak Valid.

**Tabel C.11 Kesimpulan pengujian white box testing**

| No | Nama Fungsi | Nomor Urut Fungsi | Kesimpulan |
| :---- | :---- | :---- | :---- |
| | | | Valid | Tidak Valid |
| 1 | Login Pengguna | 1 | ✔ | |
| 2 | | 2 | ✔ | |
| 3 | | 3 | ✔ | |
| 4 | | 4 | ✔ | |
| 5 | | 5 | ✔ | |
| 6 | | 6 | ✔ | |
| 7 | Tambah Artikel | 1 | ✔ | |
| 8 | | 2 | ✔ | |
| 9 | | 3 | ✔ | |
| 10 | | 4 | ✔ | |
| 11 | | 5 | ✔ | |
| 12 | | 6 | ✔ | |
| 13 | Update Artikel | 1 | ✔ | |
| 14 | | 2 | ✔ | |
| 15 | Hapus Artikel | 1 | ✔ | |
| 16 | | 2 | ✔ | |
| 17 | Komentar Artikel | 1 | ✔ | |
| 18 | | 2 | ✔ | |
| 19 | | 3 | ✔ | |
| 20 | Like Artikel | 1 | ✔ | |
| 21 | | 2 | ✔ | |
| 22 | | 3 | ✔ | |
| 23 | | 4 | ✔ | |
| 24 | | 5 | ✔ | |
| 25 | | 6 | ✔ | |
| 26 | Cari Konten | 1 | ✔ | |
| 27 | | 2 | ✔ | |
| 28 | | 3 | ✔ | |
| 29 | | 4 | ✔ | |
| 30 | | 5 | ✔ | |
| 31 | | 6 | ✔ | |
| 32 | Laporkan Konten | 1 | ✔ | |
| 33 | | 2 | ✔ | |
| 34 | | 3 | ✔ | |
| 35 | | 4 | ✔ | |
| 36 | | 5 | ✔ | |
| 37 | | 6 | ✔ | |
| 38 | | 7 | ✔ | |
| 39 | | 8 | ✔ | |
| 40 | Tinjau Laporan | 1 | ✔ | |
| 41 | | 2 | ✔ | |
| 42 | Kelola Pengguna (Admin) | 1 | ✔ | |
| 43 | | 2 | ✔ | |

---

**Malang, [Tanggal Pengujian]**

**Penguji,**


**Hafiyan Al Muqaffi Umary**

