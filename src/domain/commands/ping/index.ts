import { InteractionResponseType } from 'discord.js';

const pingCommand = () => {
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: 'Pong!',
    },
  };
};

export default pingCommand;
