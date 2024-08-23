require("dotenv").config();
const { TOKEN } = process.env;

const { Client, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client();
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
