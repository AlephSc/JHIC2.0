import { useState } from 'react';
import { BtnOutline, BtnPrimer, Card, IconBox, Photo, PhotoBlob, Tag } from '../components/ui';
import { JURUSAN, RPL_KOMPETENSI } from '../data';

// SMKT_Style Jurusan: hero 2 kolom + panel navy CTA + tab pill + grid kompetensi + CTA navy penutup.
const TABS = ['RPL', 'DKV', 'TKJ', 'PF'];
const KOMPETENSI: Record<string, Array<{ t: string; d: string }>> = {
  RPL: RPL_KOMPETENSI,
  DKV: [
    { t: 'Desain Grafis Dasar', d: 'Komposisi, tipografi, dan teori warna untuk kebutuhan media cetak maupun digital.' },
    { t: 'Ilustrasi Digital', d: 'Menggambar digital dan pengolahan vektor untuk media kampanye dan konten kreatif.' },
    { t: 'UI/UX Design', d: 'Merancang antarmuka produk digital yang intuitif dan estetis.' },
    { t: 'Photography & Editing', d: 'Teknis foto produk dan editing untuk kebutuhan branding.' },
    { t: 'Motion & Video Grafis', d: 'Animasi 2D dan motion grafis untuk media promosi.' },
    { t: 'Branding Project', d: 'Membangun identitas visual brand dari riset hingga guideline.' },
  ],
  TKJ: [
    { t: 'Jaringan Dasar', d: 'Instalasi dan konfigurasi jaringan LAN/WLAN standar industri.' },
    { t: 'Administrasi Server', d: 'Manajemen server Linux/Windows untuk layanan jaringan.' },
    { t: 'Mikrotik & Router', d: 'Konfigurasi routing, firewall, dan bandwidth management.' },
    { t: 'Keamanan Jaringan', d: 'Praktik hardening dan monitoring keamanan infrastruktur.' },
    { t: 'Cloud & Virtualisasi', d: 'Dasar cloud computing dan virtualisasi layanan.' },
    { t: 'Proyek Infrastruktur', d: 'Implementasi jaringan nyata skala institusi.' },
  ],
  PF: [
    { t: 'Sinematografi', d: 'Teknis kamera, pencahayaan, dan komposisi bidikan film.' },
    { t: 'Penulisan Skenario', d: 'Struktur cerita dan naskah produksi film pendek.' },
    { t: 'Produksi Film', d: 'Alur produksi lengkap dari pre sampai post-production.' },
    { t: 'Editing & Color', d: 'Editing non-linear dan color grading profesional.' },
    { t: 'Audio Production', d: 'Rekaman, sound design, dan mixing audio.' },
    { t: 'Proyek Film Pendek', d: 'Produksi film pendek festival dari tim siswa.' },
  ],
};

export default function Jurusan() {
  const [tab, setTab] = useState('RPL');
  const aktif = JURUSAN.find((j) => j.kode === tab)!;
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <Tag>PROGRAM KEAHLIAN</Tag>
          <h1 className="text-4xl font-extrabold mt-3 leading-[1.1]">Temukan Jurusan yang Sesuai dengan Potensimu</h1>
          <p className="text-sm text-muted mt-4 leading-relaxed">Kurikulum berbasis industri, fasilitas modern, dan pendampingan karakter. Siap mencetak lulusan yang kreatif, inovatif, dan siap kerja.</p>
          <div className="mt-5"><BtnPrimer to="/cek-potensi">Jelajahi Program Keahlian →</BtnPrimer></div>
        </div>
        <PhotoBlob label="Foto siswa praktik" ratio="h-64" tone={1} />
      </section>

      {/* PANEL NAVY CEK POTENSI */}
      <section className="bg-navy-950 text-white rounded-[2.5rem] p-8 grid gap-6 md:grid-cols-[2fr_1fr] items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-300">Bingung Pilih Jurusan?</p>
          <h2 className="text-2xl font-extrabold mt-2">Cek Potensi Kamu →</h2>
          <p className="text-sm text-white/60 mt-2">Jawab 8 pertanyaan singkat, dapatkan rekomendasi jurusan yang paling cocok. Hanya membutuhkan sekitar 2-3 menit.</p>
        </div>
        <div className="flex gap-3 text-[11px]">
          {['01 Jawab Pertanyaan', '02 Analisis Potensi', '03 Dapatkan Rekomendasi'].map((s) => (
            <span key={s} className="bg-navy-800 rounded-xl px-3 py-2.5 font-bold">{s}</span>
          ))}
        </div>
      </section>

      {/* TAB + KOMPETENSI */}
      <section>
        <div className="flex flex-wrap justify-center gap-2">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-full text-xs font-bold transition-colors ${tab === t ? 'bg-navy-950 text-white' : 'border border-line bg-white text-navy-text hover:border-brand'}`}>
              {JURUSAN.find((j) => j.kode === t)?.nama ?? t}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] items-start mt-8">
          <div>
            <h3 className="text-xl font-extrabold">{aktif.nama}</h3>
            <p className="text-xs text-muted mt-2 leading-relaxed">{aktif.desc}</p>
            <div className="mt-4 bg-blue-soft/60 border-l-4 border-brand rounded-r-xl p-4 text-xs text-navy-text"><b>Fokus:</b> {aktif.desc.split(':')[1] ?? aktif.desc}</div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {KOMPETENSI[tab].map((k) => (
              <Card key={k.t} className="p-5">
                <IconBox>◆</IconBox>
                <p className="font-head font-bold text-sm mt-3">{k.t}</p>
                <p className="text-xs text-muted mt-1.5 leading-relaxed">{k.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FASILITAS STANDAR INDUSTRI */}
      <section>
        <h2 className="text-center text-2xl font-extrabold">Fasilitas Standar Industri</h2>
        <div className="grid gap-5 md:grid-cols-3 mt-8">
          {[['💻', 'Laboratorium Komputer', 'Dilengkapi PC spek tinggi untuk praktik programming dan desain.'], ['🎬', 'Studio Kreatif', 'Area khusus diskusi dan produksi konten kreatif siswa.'], ['🖥️', 'Lab Jaringan & Server', 'Infrastruktur server real untuk praktik administrasi jaringan.']].map(([ic, t, d]) => (
            <Card key={t} className="p-6">
              <IconBox>{ic}</IconBox>
              <p className="font-head font-bold mt-3">{t}</p>
              <p className="text-xs text-muted mt-1.5">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA NAVY */}
      <section className="bg-navy-950 text-white rounded-[2.5rem] px-8 py-14 text-center">
        <h2 className="text-2xl font-extrabold">Sudah Menemukan Jurusan yang Cocok?</h2>
        <p className="text-sm text-white/60 mt-2">Waktunya ambil langkah pertama menuju masa depanmu.</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <BtnPrimer to="/ppdb">Daftar PPDB Sekarang →</BtnPrimer>
          <BtnOutline light to="/cek-potensi">Konsultasi Jurusan</BtnOutline>
        </div>
      </section>
    </div>
  );
}
