export type Msg = { role: 'user' | 'assistant'; content: string; at: string };

const store = new Map<string, Msg[]>();
const MAX = 12; // 6 pasang terakhir, hemat token

export function pushMsg(sessionId: string, msg: Msg): void {
  const arr = store.get(sessionId) ?? [];
  arr.push(msg);
  while (arr.length > MAX) arr.shift();
  store.set(sessionId, arr);
}

export function history(sessionId: string): Msg[] {
  return store.get(sessionId) ?? [];
}

export function resetSession(sessionId: string): void {
  store.delete(sessionId);
}
