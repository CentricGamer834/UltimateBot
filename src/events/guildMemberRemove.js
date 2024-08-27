const { EmbedBuilder } = require("discord.js");

const { HOME_GUILD_ID, JOINS_CHANNEL_ID, FAIL_EMOJI } = process.env;

module.exports = {
    name: "guildMemberRemove",
    async execute(member, client) {
        if (member.guild.id !== HOME_GUILD_ID) return;

        const LeaveEmbed = new EmbedBuilder();

        LeaveEmbed.setDescription(
            `Fuck you **<@${member.user.id}>**! We hate u bitch!`
        )
            .setAuthor({
                iconURL: member.avatarURL(),
                name: member.user.username + " Left",
            })
            .setFooter({
                iconURL: member.guild.iconURL(),
                text: `${member.user.username} left ${member.guild.name}`,
            })
            .setTimestamp(Date.now())
            .setColor("Red");

        const homeGuild = client.guilds.cache.get(HOME_GUILD_ID);
        const joinsChannel = homeGuild.channels.cache.get(JOINS_CHANNEL_ID);

        joinsChannel.send({
            embeds: [LeaveEmbed],
        });
    },
};
