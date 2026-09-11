// Outbox PPDB: antrean lokal saat BE down.
// Nomor sementara format ANTRE- (bukan PPDB- resmi) agar tidak dikira sah.
// Auto-sync FIFO dengan Idempotency-Key yang sama saat koneksi pulih.

export interface PpdbQueueItem {
  antreId: string; // ANTRE-2026-XXXX
  idempotencyKey: string;
  createdAt: string;
  attempts: number;
  payload: Record<string, unknown>;
  fileNames: string[]; // metadata saja; file biner di IndexedDB (di luar prototype ini)
  status: 'pending' | 'sending' | 'sent' | 'failed';
  ticketId?: string; // PPDB-... resmi setelah BE 200
}

const KEY = 'jhic2.ppdb.outbox.v1';

function uid(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export function antreIdBaru(): string {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ANTRE-2026-${rand}`;
}

export function loadOutbox(): PpdbQueueItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? (JSON.parse(raw) as PpdbQueueItem[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveOutbox(items: PpdbQueueItem[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch { /* kuota penuh → abaikan, dorong jalur WA */ }
}

export function enqueuePpdb(payload: Record<string, unknown>, fileNames: string[] = []): PpdbQueueItem {
  const item: PpdbQueueItem = {
    antreId: antreIdBaru(),
    idempotencyKey: uid(),
    createdAt: new Date().toISOString(),
    attempts: 0,
    payload,
    fileNames,
    status: 'pending',
  };
  saveOutbox([item, ...loadOutbox()].slice(0, 50));
  return item;
}

export function markOutbox(antreId: string, patch: Partial<PpdbQueueItem>): void {
  saveOutbox(loadOutbox().map((it) => (it.antreId === antreId ? { ...it, ...patch } : it)));
}

export function waDaftarLink(waNumber: string, item: PpdbQueueItem, nama = ''): string {
  const digit = waNumber.replace(/\D/g, '').replace(/^0/, '62');
  const text = `Assalamualaikum Panitia PPDB SMK Telekomunikasi Darul Ulum.%0A` +
    `Saya daftar via antrean karena koneksi lambat.%0A` +
    `Nomor antrean: ${item.antreId}%0A` +
    (nama ? `Nama: ${encodeURIComponent(String(nama))}%0A` : '') +
    `Waktu: ${item.createdAt}%0A` +
    `Mohon arahan manual. Terima kasih.`;
  return `https://wa.me/${digit}?text=${text}`;
}
