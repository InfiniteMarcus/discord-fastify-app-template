import {
  APIApplicationCommand,
  InteractionContextType,
  REST,
  Routes,
  SlashCommandBuilder,
} from 'discord.js';
import Log from '../../../core/log';
import ENV from '../../../env';

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping test command')
    .setContexts(InteractionContextType.Guild),
  new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Say hello to me!')
    .setContexts(InteractionContextType.Guild),
];

const TOKEN = String(ENV.DISCORD_APPLICATION_TOKEN);
const CLIENT_ID = String(ENV.DISCORD_APPLICATION_ID);

const updateGlobalCommands = async () => {
  try {
    const rest = new REST().setToken(TOKEN);
    Log.info(
      `Started refreshing [${commands.length}] application (/) commands.`,
    );

    const data = (await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    })) as APIApplicationCommand[];

    Log.info(
      `Successfully reloaded [${data.length}] application (/) commands.`,
    );
  } catch (error) {
    Log.error(error);
  }
};

export default updateGlobalCommands;
