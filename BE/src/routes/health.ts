import type { FastifyInstance } from 'fastify';
import { countFaq } from '../lib/retriever';
import { routerStatus } from '../lib/miniRouter';
import { getModelsSnapshot } from '../lib/openrouterModels';

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get('/health', async () => {
    const snap = getModelsSnapshot(1);
    return {
      data: {
        status: 'ok',
        time: new Date().toISOString(),
        faq_count: countFaq(),
        router: routerStatus(),
        openrouter_models: {
          active: snap.active,
          free_count: snap.free_count,
          fetched_at: snap.fetched_at,
          expires_in_sec: snap.expires_in_sec,
          stale: snap.stale,
          model_status: snap.model_status,
          cooldowns: snap.cooldowns.length,
        },
      },
    };
  });
}
