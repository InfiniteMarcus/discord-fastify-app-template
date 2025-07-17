import {
  APIInteraction,
  InteractionResponseType,
  InteractionType,
} from 'discord.js';
import { FastifyReply, FastifyRequest } from 'fastify';

import Log from '../../core/log';
import pingCommand from '../../domain/commands/ping';
import helloCommand from '../../domain/commands/hello';

const interactionsRoute = async (
  request: FastifyRequest,
  _reply: FastifyReply,
) => {
  Log.info(`Request received [${new Date().toISOString()}]`);

  try {
    const interaction = request.body as APIInteraction;

    if (interaction.type === InteractionType.Ping) {
      return { type: InteractionResponseType.Pong };
    }

    Log.info(`Interaction type received: [${interaction.type}]`);

    if (interaction.type === InteractionType.ApplicationCommand) {
      switch (interaction.data.name) {
        case 'ping':
          return pingCommand();
        case 'hello':
          return helloCommand(String(interaction.member?.user.id));
      }
    }

    return {
      type: InteractionResponseType.DeferredMessageUpdate,
    };
  } catch (error) {
    Log.error(error);
  }
};

export default interactionsRoute;
