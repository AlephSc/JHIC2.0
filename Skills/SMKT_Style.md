# PROMPT DESAIN — "Modern Institutional Navy" Style Guide
### Diambil dari referensi visual: Landing Page, Halaman Jurusan, Produk Unggulan, Halaman Sukses PPDB, Halaman Login/Register (SMK Telekomunikasi Darul Ulum)

Gunakan prompt di bawah ini secara utuh ketika meminta AI/desainer membuat halaman baru, komponen baru, atau memperluas sistem desain ini agar **konsisten** dengan gaya yang sudah ada.

---

## 1. RINGKASAN GAYA (Design Brief)

Buat desain dengan gaya **"Modern Institutional"** — perpaduan antara nuansa korporat/edukasi yang tepercaya (dark navy, tipografi tebal, grid rapi) dengan kehangatan yang approachable (background krem, bentuk organik/blob, foto natural siswa). Kesan yang ingin dibangun: **profesional, modern, terpercaya, technology-forward, namun tetap hangat dan manusiawi** — cocok untuk institusi pendidikan berbasis teknologi.

Prinsip inti:
- Kontras tegas antara section terang (krem/putih) dan section gelap (navy pekat) untuk membangun ritme visual saat scroll.
- Banyak white space, tidak padat, hierarki tipografi yang jelas.
- Bentuk organik (blob) sebagai elemen dekoratif di background, bukan di konten utama.
- Sudut membulat besar (generous border-radius) di hampir semua elemen: gambar, card, tombol, input.
- Semua CTA utama menggunakan warna biru terang agar menonjol dari dominasi navy/krem.

---

## 2. PALET WARNA

```
/* Warna Utama */
--navy-950:      #0A1628   /* Background section gelap (hero navy, CTA banner, footer dark card) */
--navy-900:      #101E33   /* Variasi/hover state navy */
--navy-800:      #1B2C46   /* Card di dalam section navy (misal card kuis) */
--navy-text:     #0F172A   /* Warna teks judul di atas background terang */

--blue-primary:  #2563EB   /* Tombol CTA utama, link aktif, ikon aksen */
--blue-hover:    #1D4ED8   /* Hover state tombol biru */
--blue-soft-bg:  #DCE9FB   /* Background section terang kedua (mis. section "Program Keahlian") */
--blue-badge-bg: #E8F0FE   /* Background badge/pill kecil */

/* Warna Netral & Latar */
--cream-bg:      #FAF6F0   /* Background hero/section terang utama, terasa hangat, bukan putih pucat */
--white:         #FFFFFF   /* Card, form, footer, section putih bersih */
--gray-100:      #F1F5F9   /* Background card ringan di atas putih */
--gray-border:   #E2E8F0   /* Border tipis input, card, divider */
--gray-muted:    #64748B   /* Teks deskripsi/body sekunder */
--gray-500:      #94A3B8   /* Placeholder, label kecil non-aktif */

/* Warna Semantik */
--success-bg:    #D1FAE5   /* Background badge status "DITERIMA" */
--success-text:  #059669   /* Teks/centang status sukses */
```

**Aturan pemakaian warna:**
- Background section bergantian: **krem → navy gelap → putih/krem → biru muda → navy gelap (CTA) → putih (footer)**. Jangan taruh dua section gelap berurutan tanpa diselingi terang, kecuali untuk penekanan dramatis.
- Tombol solid **selalu biru (`--blue-primary`)** di atas background terang, dan **putih/outline** di atas background navy gelap (agar tetap kontras dan tidak tenggelam).
- Judul besar (H1/H2) memakai `--navy-text` di atas background terang, dan putih di atas background navy.
- Ikon kecil dalam kotak/lingkaran memakai `--blue-primary` di atas `--blue-badge-bg` atau `--gray-100`.

---

## 3. TIPOGRAFI

- **Font judul (heading):** Sans-serif geometris, tebal, sedikit rounded pada terminal huruf, tracking rapat. Rekomendasi: **Plus Jakarta Sans (Bold/ExtraBold)**, alternatif: **Sora**, **Lexend**, atau **Poppins SemiBold/Bold**.
- **Font body:** Sans-serif netral yang sangat mudah dibaca pada ukuran kecil. Rekomendasi: **Inter** atau **Plus Jakarta Sans Regular**.
- **Skala tipografi (contoh desktop):**
  - H1 Hero: 48–56px, bold, line-height ketat (~1.1), bisa 3 baris seperti "Temukan Jurusan yang Sesuai dengan Potensimu"
  - H2 Section: 32–40px, bold
  - H3 Card/subsection: 20–24px, semibold
  - Body: 16px, regular, `--gray-muted`, line-height 1.6
  - Label kecil/eyebrow (mis. "BINGUNG PILIH JURUSAN?", "PRODUK UNGGULAN SEKOLAH"): 12–13px, uppercase, letter-spacing lebar, warna biru atau abu terang, sering dengan garis kecil atau badge pill di depannya.
  - Angka statistik besar (mis. "1.200+", "85"): 28–32px bold, dengan label kecil uppercase di bawahnya.
- Judul selalu rata kiri (tidak center) di section hero/konten, tapi **center** di section CTA penutup dan section dengan judul singkat (mis. "Fasilitas Standar Industri", "Produk & Layanan Unggulan").

---

## 4. LAYOUT & GRID

- Lebar konten maksimum (container): **~1200–1280px**, dengan padding horizontal aman di mobile (~24px).
- Hero selalu **2 kolom**: teks/CTA di satu sisi, foto atau ilustrasi/blob organik di sisi lain (rasio kira-kira 45/55 atau 50/50).
- Section fitur/kompetensi memakai **grid 2–3 kolom** dengan card berukuran sama, gap konsisten (~24px).
- Section galeri/fasilitas memakai **grid 3 kolom** foto dengan caption di bawah tiap foto.
- Spacing antar-section besar dan lega: padding vertikal section ~80–120px.
- Elemen dekoratif (blob biru transparan, gelombang) diletakkan **di belakang konten**, sering terpotong di tepi layar (bleed), tidak pernah menutupi teks penting.

---

## 5. KOMPONEN UI

### Navbar
- Bentuk pil (fully rounded, rounded-full) mengambang dengan sedikit shadow, di atas background section pertama.
- Logo kiri, menu tengah/kanan (font medium, uppercase kecil, letter-spacing), tombol CTA pill solid biru/navy paling kanan (mis. "PPDB 2026").
- Dropdown menu ditandai chevron kecil.

### Tombol (Buttons)
- **Primary:** solid `--blue-primary`, teks putih bold, radius sedang (8–12px) untuk tombol persegi panjang biasa, atau **fully rounded** untuk tombol pill kecil di navbar.
- **Secondary/Outline:** transparan dengan border 1–1.5px, teks mengikuti warna background sekitarnya (putih di atas navy, navy di atas terang).
- **Dark solid** (di atas background terang, untuk aksi sekunder yang tetap penting, mis. "Register", "Hubungi Kami"): fill navy penuh, teks putih.
- Semua tombol punya ikon panah kecil (→) opsional di akhir label untuk tombol yang mengarah ke halaman lain ("Jelajahi Program Keahlian →").
- Ukuran padding tombol: nyaman, ~14px vertikal, ~28px horizontal.

### Card
- Radius besar: **16–24px**.
- Dua gaya utama:
  1. **Card konten** (putih/gray-100) dengan ikon di kotak kecil rounded (blue-badge-bg) + judul bold + deskripsi abu-abu 2 baris.
  2. **Card gelap** (navy-800) di atas background navy — dipakai untuk elemen interaktif seperti pilihan kuis/kategori (mis. card "PF", "TKJ", "RPL", "DKV").
- Shadow sangat halus/soft, atau tanpa shadow — mengandalkan perbedaan warna background sebagai pemisah, bukan shadow tebal.

### Pill / Tab Filter
- Fully rounded (rounded-full), dipakai untuk filter kategori (mis. "Rekayasa Perangkat Lunak", "Semua", "Teknologi", "Kreatif").
- State aktif: fill navy solid + teks putih.
- State non-aktif: outline tipis abu-abu/putih + teks navy/abu.

### Badge / Eyebrow Label
- Pill kecil, background `--blue-badge-bg` atau navy tipis transparan, teks uppercase kecil warna biru/navy, dipakai di atas judul section atau hero (mis. "PRODUK UNGGULAN SEKOLAH").

### Statistik / Angka Highlight
- Card putih kecil rounded, ikon kecil di atas, angka besar bold, label kecil uppercase abu di bawahnya. Disusun grid 2x2 atau 4 kolom sejajar.

### Foto & Gambar
- Selalu rounded corner besar (~20–24px), kadang dengan bentuk blob biru transparan sebagai backdrop dekoratif di belakang foto (memberi kedalaman tanpa shadow keras).
- Foto natural, pencahayaan hangat, menampilkan siswa dalam aktivitas nyata (bukan stok foto generik yang terlalu polos).

### Section CTA Penutup (Dark Banner)
- Full-width background navy pekat.
- Judul besar putih, center-aligned, subteks abu terang di bawahnya.
- Dua tombol berdampingan: **solid biru** (aksi utama) + **outline putih** (aksi sekunder).

### Footer
- Background putih bersih, border-top tipis abu.
- Grid 4 kolom: (1) logo + deskripsi singkat + ikon sosial media, (2) menu utama, (3) info khusus (PPDB/produk), (4) kontak/lokasi + mini map + link "Buka di Maps →".
- Bottom bar tipis berisi copyright + link legal (Privacy Policy · Terms & Conditions), rata kiri-kanan.

### Form (Login/Register)
- Layout **split-screen**: panel kiri navy gelap dekoratif dengan judul besar putih + deskripsi singkat (branding/pesan sambutan), panel kanan putih berisi form.
- Input field: background abu muda (`--gray-100`), radius sedang (8–10px), ikon prefix kecil di kiri (email/lock), tanpa border tebal.
- Checkbox kecil + label ("Ingat saya").
- Tombol submit full-width, solid navy gelap, teks putih bold.
- Catatan bantuan kecil di bawah tombol dengan ikon info, warna abu.

### Halaman Status/Sukses
- Layout center, sangat minim elemen: ikon status besar dalam lingkaran solid biru di tengah atas, judul sangat besar & bold, subteks abu di bawahnya.
- Dua panel info berdampingan: **panel kiri terang** (detail data, radius besar, border tipis) dan **panel kanan gelap navy** (instruksi/next steps dengan ikon checklist, kalender, dsb).
- Dua tombol aksi di bawah: satu solid navy, satu outline.

---

## 6. ELEMEN DEKORATIF

- **Blob organik** (bentuk lengkung asimetris, mirip lava lamp) berwarna biru muda transparan (`--blue-soft-bg` dengan opacity), digunakan di background hero dan di belakang foto sebagai aksen — tidak pernah solid penuh, selalu lembut dan blur-friendly.
- **Garis wave/gelombang** tipis kadang memisahkan hero dari konten berikutnya di section navy.
- Gunakan elemen ini secukupnya — maksimal 1–2 blob per section, jangan sampai mengganggu keterbacaan teks.

---

## 7. IKONOGRAFI

- Line icon minimalis, stroke tipis-medium, gaya seperti Lucide/Feather Icons.
- Selalu ditempatkan dalam wadah kecil rounded (kotak radius ~8px atau lingkaran) berwarna biru muda/navy muda sebagai background kontras.
- Konsisten ukuran ~20–24px di dalam wadah ~40–48px.

---

## 8. NADA & GAYA KONTEN (Microcopy)

- Judul besar bersifat aspiratif dan langsung ("Temukan Jurusan yang Sesuai dengan Potensimu", "Karya Siswa, Solusi Nyata").
- Label eyebrow selalu uppercase, singkat, dan kontekstual.
- CTA button memakai kata kerja aktif + panah ("Jelajahi Program Keahlian →", "Cek Potensi Kamu →").
- Bahasa Indonesia formal-ringan, tidak kaku, cocok untuk audiens siswa SMP/SMA dan orang tua.

---

## 9. INSTRUKSI SINGKAT UNTUK AI/DESAINER (Copy-paste ready)

> Desain halaman ini dengan gaya "Modern Institutional Navy": kombinasi background krem hangat (#FAF6F0) dan navy gelap pekat (#0A1628) yang berselang-seling per section, dengan aksen biru terang (#2563EB) untuk semua CTA utama. Gunakan tipografi sans-serif bold geometris untuk judul (gaya Plus Jakarta Sans/Sora) dan sans-serif reguler untuk body (gaya Inter). Semua elemen — gambar, card, tombol besar, input — memakai border-radius besar (16–24px), sedangkan navbar dan filter/tab memakai bentuk pill (fully rounded). Tambahkan elemen dekoratif blob organik biru transparan di background hero dan di belakang foto untuk kesan lembut dan modern. Card konten memakai ikon kecil dalam kotak rounded berwarna biru muda, judul bold, dan deskripsi singkat abu-abu. Section CTA penutup selalu berupa banner navy penuh dengan judul putih center dan dua tombol (solid biru + outline putih). Footer bersih 4 kolom di atas putih dengan info kontak dan mini map. Jaga white space lega di semua section, hierarki tipografi jelas, dan hindari shadow tebal — andalkan kontras warna background sebagai pemisah antar elemen.

---

*Dokumen ini dapat digunakan berulang sebagai acuan setiap kali membuat halaman/komponen baru agar tetap satu identitas visual dengan halaman-halaman yang sudah ada (Landing Page, Jurusan, Produk Unggulan, Login/Register, Halaman Status PPDB).*
