import z from 'zod';

import pingRoute from './ping';
import interactionsRoute from './interactions';
import { verifyDiscordKeyPreHandler } from '../middlewares/discord';

import { FastifyTypedInstance } from '../types';

const routes = (server: FastifyTypedInstance) => {
  server.get('/ping', pingRoute);
  server.post('/interactions', {
    preHandler: verifyDiscordKeyPreHandler,
    handler: interactionsRoute,
  });
  server.post(
    '/create',
    {
      schema: {
        tags: ['resource', 'create-resource'],
        description: 'Generic route to create resource',
        body: z.object({
          id: z.string(),
          name: z.string(),
        }),
        response: {
          201: z.null().describe('Resource created'),
        },
      },
    },
    (_request, reply) => {
      reply.status(201);
      return;
    },
  );
};

export default routes;
