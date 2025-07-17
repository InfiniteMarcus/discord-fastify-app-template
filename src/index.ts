import Fastify from 'fastify';
import { fastifyCors } from '@fastify/cors';
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import ENV from './env';
import Log from './core/log';
import routes from './routes';
import updateGlobalCommands from './domain/registration/updateGlobalCommands';

const server = Fastify({}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, { origin: '*' });

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Typed API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

server.register(routes);

server
  .listen({ port: parseInt(ENV.PORT) })
  .then(async () => {
    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;

    Log.info(`Online on port [${port}]`);

    await updateGlobalCommands();
  })
  .catch((error) => {
    server.log.error(error);
    process.exit(1);
  });

process
  .on('warning', (e) => Log.error(e))
  .on('unhandledRejection', (e) => Log.error(e))
  .on('uncaughtException', (e) => Log.error(e));
