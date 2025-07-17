import { verifyKey } from 'discord-interactions';
import { FastifyReply, FastifyRequest } from 'fastify';
import ENV from '../env';

const CLIENT_PUBLIC_KEY = String(ENV.DISCORD_APPLICATION_PUBLIC_KEY);

export const verifyDiscordKeyPreHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const headers = request.headers;
  const signature = headers['x-signature-ed25519']
    ? headers['x-signature-ed25519']
    : headers['X-Signature-Ed25519'];
  const timestamp = headers['x-signature-timestamp']
    ? headers['x-signature-timestamp']
    : headers['X-Signature-Timestamp'];

  const isKeyVerified = await verifyKey(
    JSON.stringify(request.body),
    signature as string,
    timestamp as string,
    CLIENT_PUBLIC_KEY,
  );

  if (!isKeyVerified) {
    return reply.status(401).send('Invalid Discord key');
  }
};
