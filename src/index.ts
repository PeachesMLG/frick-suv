import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
  Interaction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

const bannedWords = ["frfr", "fr fr"];

client.once('ready', async () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', async (message) => {
  if(message.author.id === '706821340073689179'){
    for (const bannedWord of bannedWords) {
      if(message.content.toLowerCase().includes(bannedWord.toLowerCase()) || message.content.replace(' ', '').toLowerCase().includes(bannedWord.replace(' ', '').toLowerCase())) {
        await message.delete();
        await message.channel.send("<@706821340073689179> nu uh")
        return;
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.error('Error logging in:', error);
});
