import {Client, GatewayIntentBits, TextInputStyle,} from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ],
});

const bannedWords = ["frfr"];
const bannedUsers = ['706821340073689179'];

client.once('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', async (message) => {
    for (const user of bannedUsers) {
        if (message.author.id === user) {
            for (const bannedWord of bannedWords) {
                if (
                    message.content
                        .toLowerCase()
                        .replace(/[\s.,\-;]+/g, "")
                        .replace(/[^\x00-\x7F]/g, "")
                        .includes(bannedWord.toLowerCase())
                ) {
                    await message.delete();
                    await message.channel.send(`<@${user}> nu uh`)
                    return;
                }
            }
        }
    }
});

client.login(process.env.DISCORD_TOKEN).catch((error) => {
    console.error('Error logging in:', error);
});
