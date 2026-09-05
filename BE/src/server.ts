import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import { config } from './config';
import { healthRoutes } from './routes/health';
import { knowledgeRoutes } from './routes/knowledge';
import { chatRoutes } from './routes/chat';
import { modelsRoutes } from './routes/models';
import { startModelsAutoRefresh } from './lib/openrouterModels';

export async function buildApp() {
  const app = Fastify({ logger: true, trustProxy: true });

  await app.register(cors, { origin: config.corsOrigin.includes('*') ? true : config.corsOrigin });

  // Web tester internal: GET /test (bukan frontend asli)
  await app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/test/',
    redirect: true,
  });
  app.get('/test', async (_req, reply) => reply.redirect('/test/'));

  // Satu envelope error untuk semua route (kontrak stabil untuk FE)
  app.setErrorHandler((err, _req, reply) => {
    const status = (err as { statusCode?: number }).statusCode ?? 500;
    reply.code(status).send({ error: { code: 'INTERNAL', message: 'Terjadi kesalahan server.' } });
  });
  app.setNotFoundHandler((_req, reply) => {
    reply.code(404).send({ error: { code: 'NOT_FOUND', message: 'Endpoint tidak ditemukan.' } });
  });

  await app.register(
    async (v1) => {
      await v1.register(healthRoutes);
      await v1.register(knowledgeRoutes);
      await v1.register(chatRoutes);
      await v1.register(modelsRoutes);
    },
    { prefix: '/api/v1' },
  );

  // Alias tanpa versi untuk kompatibilitas cepat FE: /api/chat -> /api/v1/chat
  await app.register(async (api) => {
    await api.register(chatRoutes);
  }, { prefix: '/api' });

  return app;
}

if (require.main === module) {
  buildApp()
    .then((app) => {
      startModelsAutoRefresh();
      app.log.info('openrouter free-models auto-fetch aktif (TTL 12 jam, free-only)');
      return app.listen({ port: config.port, host: config.host });
    })
    .then((addr) => console.log(`BE chatbot listening on ${addr} | tester: /test/`))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
