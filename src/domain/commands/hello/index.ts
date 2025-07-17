import { InteractionResponseType, userMention } from 'discord.js';

const helloCommand = (userId: string) => {
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Hello ${userMention(userId)}!`,
    },
  };
};

export default helloCommand;
