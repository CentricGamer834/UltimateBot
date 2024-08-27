module.exports = {
    name: "about",
    description: "About the bot and it's host",
    async execute(args, message, client) {
        const { commands, guilds, users } = client;

        let Embed = "```ABOUT THE BOT AND IT'S HOST\n";
        Embed += `____BOT____\n`;
        Embed += `Running for ${client.uptime}ms\n`;
        Embed += `Commands: ${commands.size}\n`;
        Embed += `Servers: ${guilds.size}\n`;
        Embed += `Users (Inaccurate): ${users.size}\n`;
        Embed += `____HOST____\n`;
        Embed += `Yur mother\n`;

        Embed += `\n\`\`\``;

        message.reply(Embed);
    },
};
