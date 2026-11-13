# My OT Tracker — Mobile PWA

Aplikasi pencatat lembur pribadi, mobile-first dan dapat dipasang di Android. Dibuat tanpa backend: GitHub Pages hanya menyajikan kode, sedangkan data roster, upah, dan lembur disimpan di **IndexedDB pada perangkat**.

## Jalankan dan instal
1. Upload **isi folder** ini (index.html, app.mjs, core.mjs, style.css, sw.js, manifest.webmanifest, icon.svg, contoh-roster.csv) ke repository GitHub.
2. Buka **Settings > Pages > Build and deployment > Deploy from a branch**. Pilih branch main, folder /(root), lalu Save.
3. Buka URL `https://NAMA_AKUN.github.io/NAMA_REPOSITORY/` dari Chrome Android, lalu menu ⋮ > Tambahkan ke layar utama > Install jika ditawarkan.
4. Untuk menguji secara lokal gunakan `python -m http.server 8000` lalu buka http://localhost:8000. Jangan membuka index.html memakai file:// karena module/PWA akan diblokir.

## Setelan awal (dari spesifikasi pengguna)
- Gaji referensi Rp5.730.100; **tarif tetap** Rp33.121/jam, tidak dihitung ulang dari gaji.
- Shift pagi 08:00–16:00; sore 16:00–00:00. Pergantian per pekan dan hari istirahat diatur pada Settings; tanggal awal default contoh 9 November 2026 (ubah sesuai roster nyata).
- Hari kerja: jam pertama ×1,5 lalu jam berikutnya ×2.
- Hari istirahat: jam 1–7 ×2; jam ke-8 ×3; jam ke-9 dst ×4. Pengali dapat diedit dan harus diperiksa dengan kebijakan perusahaan.
- Istirahat lembur pagi: 18:00–19:00; lembur sebelum shift sore: 12:00–13:00; setelah shift sore: 00:00–01:00. Potongan hanya saat interval lembur **benar-benar tumpang tindih** dengan jeda tersebut; tidak ada potongan fiktif untuk jeda di luar interval kerja lembur.

## Format roster
Impor melalui Kalender > Upload roster, format CSV/XLSX dengan header **Tanggal,Shift,Tipe Hari**. Tanggal DD/MM/YYYY atau YYYY-MM-DD. Shift P/S/OFF. Tipe Hari opsional: work, scheduled, rest, holiday. Lihat `contoh-roster.csv`. Tanggal yang sama dalam satu file akan ditolak. Sebelum mengganti tanggal roster lama, aplikasi menampilkan pratinjau dan meminta konfirmasi.

**CSV bekerja offline.** XLSX menggunakan pustaka SheetJS yang diambil online saat pertama kali diperlukan; fitur ini membutuhkan internet dan belum disertakan offline. Roster berupa matriks kalender, PDF, atau foto belum di-parse otomatis: harus ditransformasikan ke format tabel di atas. Jangan unggah roster yang mengandung data pribadi ke repository publik.

## Penting terkait data
- Data tersimpan di IndexedDB perangkat, **tidak sinkron** ke GitHub/cloud. Backup JSON secara rutin melalui Setelan > Unduh backup.
- Pemulihan JSON **mengganti** seluruh data lokal; konfirmasi diminta.
- Form mendukung banyak interval dalam satu tanggal kerja, termasuk tanggal +1 untuk lewat tengah malam. Catatan menyimpan tarif/pengali saat dibuat (snapshot); laporan riwayat tetap stabil setelah tarif berubah.
- PDF melalui menu cetak browser, pilih 'Simpan sebagai PDF'.
- Pengingat hanya dapat berfungsi saat aplikasi dibuka/dikembalikan ke depan; tidak menjamin push terjadwal di background saat aplikasi ditutup.
- Angka adalah **estimasi**; periksa aturan perusahaan, dasar upah, klasifikasi hari libur, dan hasil terhadap slip gaji sebelum menganggapnya resmi. Tidak menandai tidak adanya catatan sebagai bukti lembur terlewat.

## Pengujian
Jalankan `node test.mjs`. Pengujian mencakup 1–3 jam hari kerja, 7–9 jam istirahat, potongan istirahat, lintas tengah malam, interval ganda, penolakan interval tumpang tindih, rotasi shift, dan parsing roster.

**Koreksi aritmetika spesifikasi:** 8 jam istirahat = Rp563.057, dan 9 jam = Rp695.541, bukan Rp562.057 / Rp694.541. Ini berdasarkan tarif Rp33.121 dan pengali 7×2, 1×3, 1×4. Angka sumber tidak diubah secara tersembunyi.


## Aturan khusus: Sabtu pada minggu shift sore
- Anchor 16 November 2026, shift pagi, berganti setiap Senin tanpa reset bulan/tahun.
- Pada minggu shift sore, hari Sabtu otomatis OFF dan diklasifikasikan `rest` (hari istirahat).
- Jika tetap masuk Sabtu, catat lembur seperti biasa, tetapi indeks perhitungannya menggunakan hari istirahat (2× jam 1–7, 3× jam ke-8, 4× sesudahnya berdasarkan konfigurasi pengguna).
- Roster resmi boleh menandai Sabtu itu masuk, tetapi klasifikasi lemburnya tetap hari istirahat; hari libur nasional tetap diklasifikasikan `holiday`.
- Hari Sabtu saat minggu shift pagi tetap mengikuti jadwal/roster, tidak otomatis dihitung hari istirahat.

## Aturan wajib Minggu
- Minggu selalu hari istirahat (`rest`) pada kedua rotasi shift.
- Jika resmi dijadwalkan masuk pada Minggu, jadwal boleh ditampilkan sebagai bekerja tetapi indeks upah lembur tetap weekend (`rest`).
- Hari Minggu tetap wajib libur secara default meskipun pengaturan hari istirahat diubah.
- Bila hari Minggu sekaligus libur nasional, label `holiday` diutamakan; pengali libur mengikuti setelan saat ini.
- Catatan lama yang salah berlabel hari kerja pada Minggu dihitung ulang kategorinya saat ditampilkan, menggunakan snapshot tarif dan pengali historis.
