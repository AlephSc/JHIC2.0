import 'dotenv/config';

function num(name: string, fallback: number): number {
  const v = Number(process.env[name]);
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

export const config = {
  port: num('PORT', 3000),
  host: process.env.HOST ?? '0.0.0.0',
  corsOrigin: (process.env.CORS_ORIGIN ?? '*').split(',').map((s) => s.trim()),
  offlineFallback: (process.env.OFFLINE_FALLBACK ?? 'true') === 'true',
  retrieval: {
    topK: num('RETRIEVAL_TOP_K', 3),
    threshold: Number(process.env.RETRIEVAL_THRESHOLD ?? 0.35),
  },
  rate: {
    userPerMin: num('RATE_USER_PER_MIN', 15),
    globalPerMin: num('RATE_GLOBAL_PER_MIN', 300),
    userPerHour: num('RATE_USER_PER_HOUR', 100),
  },
  app: {
    url: process.env.APP_URL ?? 'http://localhost:3000',
    title: process.env.APP_TITLE ?? 'JHIC2.0 CS Chatbot Prototype',
  },
  openrouter: {
    baseUrl: process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1',
    model: process.env.OPENROUTER_MODEL ?? 'meta-llama/llama-3.1-8b-instruct:free',
    modelsTtlH: num('OPENROUTER_MODELS_TTL_H', 12),
    prefer: (process.env.OPENROUTER_MODEL_PREFER ?? 'auto,nemotron,nvidia,qwen,llama,glm')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  },
  adminToken: process.env.ADMIN_TOKEN ?? '',
};

export type ProviderDef = {
  id: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  rpm: number;
  priority: number;
};

/** Rantai default. Urutan = prioritas. Key kosong = provider dinonaktifkan otomatis. */
export function defaultProviders(): ProviderDef[] {
  const list: ProviderDef[] = [
    {
      id: 'openrouter',
      baseUrl: process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY ?? '',
      model: process.env.OPENROUTER_MODEL ?? 'meta-llama/llama-3.1-8b-instruct:free',
      rpm: num('OPENROUTER_RPM', 15),
      priority: 1,
    },
    {
      id: 'groq',
      baseUrl: process.env.GROQ_BASE_URL ?? 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY ?? '',
      model: process.env.GROQ_MODEL ?? 'llama-3.1-8b-instant',
      rpm: num('GROQ_RPM', 25),
      priority: 2,
    },
    {
      id: 'gemini',
      baseUrl: process.env.GEMINI_BASE_URL ?? 'https://generativelanguage.googleapis.com/v1beta/openai',
      apiKey: process.env.GEMINI_API_KEY ?? '',
      model: process.env.GEMINI_MODEL ?? 'gemini-1.5-flash',
      rpm: num('GEMINI_RPM', 50),
      priority: 3,
    },
  ];
  // Custom chain via JSON (Custom Provider tanpa coding)
  const raw = process.env.ROUTER_CONFIG_JSON;
  if (raw) {
    try {
      const arr = JSON.parse(raw) as ProviderDef[];
      if (Array.isArray(arr) && arr.length > 0) return arr.sort((a, b) => a.priority - b.priority);
    } catch {
      // abaikan, pakai default
    }
  }
  return list.sort((a, b) => a.priority - b.priority);
}
