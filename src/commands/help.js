const { prefix } = process.env;
const { EmbedBuilder, Message } = require("discord.js");

module.exports = {
    name: "help",
    description: "Get help for all commands or a specific command",
    /** @param {Message} message */
    async execute(args, message, client) {
        const { commands } = client;
        const HelpEmbed = new EmbedBuilder()
            .setTitle("Help Command")
            .setDescription(`Displaying help page (${commands.size} commands)`)
            .setColor("DarkAqua")
            .setFooter({
                iconURL: message.author.avatarURL(),
                text: `${message.author.username} requested help`,
            })
            .setTimestamp(Date.now());

        commands.forEach((command) => {
            HelpEmbed.addFields({
                inline: true,
                name: command.name,
                value: command.description,
            });
        });

        message.reply({ embeds: [HelpEmbed] });
    },
};
