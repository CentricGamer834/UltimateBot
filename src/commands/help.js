const { prefix } = process.env;
const { EmbedBuilder, Message, SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "help",
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    description: "Get help for all commands or a specific command",
    /** @param {Message} message */
    async execute(args, message, client) {
        const { commands } = client;
        const HelpEmbed = new EmbedBuilder()
            .setTitle("Help Page")
            .setDescription(`Displaying help page (${commands.size} commands)`)
            .setColor("DarkAqua")
            // .setFooter({
            //     iconURL: message.author.avatarURL(),
            //     text: `${message.author.username} requested help`,
            // })
            .setThumbnail(client.user.avatarURL())
            .setTimestamp(Date.now());

        commands.forEach((command) => {
            HelpEmbed.addFields({
                inline: true,
                name: prefix + command.name,
                value: command.description,
            });
        });

        message.reply({ embeds: [HelpEmbed] });
    },
};
