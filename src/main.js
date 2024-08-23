require("dotenv").config();
const { TOKEN } = process.env;

const { Client, Collection, /*GatewayIntentBits*/ } = require("discord.js");
const fs = require("fs");

const client = new Client({
    intents: [
        // GatewayIntentBits.Guilds,
        // GatewayIntentBits.GuildMembers,
        // GatewayIntentBits.GuildModeration,
        // GatewayIntentBits.GuildBans,
        // GatewayIntentBits.GuildEmojisAndStickers,
        // GatewayIntentBits.GuildIntegrations,
        // GatewayIntentBits.GuildWebhooks,
        // GatewayIntentBits.GuildInvites,
        // GatewayIntentBits.GuildVoiceStates,
        // GatewayIntentBits.GuildPresences,
        // GatewayIntentBits.GuildMessages,
        // GatewayIntentBits.GuildMessageReactions,
        // GatewayIntentBits.GuildMessageTyping,
        // GatewayIntentBits.DirectMessages,
        // GatewayIntentBits.DirectMessageReactions,
        // GatewayIntentBits.DirectMessageTyping,
        // GatewayIntentBits.MessageContent,
        // GatewayIntentBits.GuildScheduledEvents,
        // GatewayIntentBits.AutoModerationConfiguration,
        // GatewayIntentBits.AutoModerationExecution,
        // GatewayIntentBits.GuildMessagePolls,
        // GatewayIntentBits.DirectMessagePolls,
    ],
});

client.commands = new Collection();

const handlerFiles = fs
    .readdirSync(`./src/handlers`)
    .filter((file) => file.endsWith(".js"));

for (const file of handlerFiles) {
    const handler = require(`./handlers/${file}`);
    handler(client);
}

client.eventHandle();
client.commandHandle();

client.login(TOKEN);
