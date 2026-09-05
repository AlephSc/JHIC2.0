import type { FastifyInstance } from 'fastify';
import { countFaq } from '../lib/retriever';
import { routerStatus } from '../lib/miniRouter';

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get('/health', async () => ({
    data: {
      status: 'ok',
      time: new Date().toISOString(),
      faq_count: countFaq(),
      router: routerStatus(),
    },
  }));
}
