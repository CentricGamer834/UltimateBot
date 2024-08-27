require("dotenv").config();
const { TOKEN } = process.env;

const fs = require("fs");
const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.GuildMessagePolls,
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember,
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

client.login(TOKEN);
