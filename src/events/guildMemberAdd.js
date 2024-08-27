const { EmbedBuilder, GuildMember, Colors } = require("discord.js");
const { HOME_GUILD_ID, JOINS_ROLE_ID, JOINS_CHANNEL_ID } = process.env;
const moment = require("moment");

module.exports = {
    name: "guildMemberAdd",
    /** @param {GuildMember} member */
    async execute(member) {
        if (member.guild.id !== HOME_GUILD_ID) return;
        const JoinEmbed = new EmbedBuilder();

        JoinEmbed.setImage(
            `https://dummyimage.com/2000x500/${member.displayHexColor.slice(
                1
            )}/fff.png&text=Welcome%20${member.user.username.trim()})`
        )
            .setDescription(
                `Welcome **<@${member.user.id}>**! We love u pookster!`
            )
            .setAuthor({
                iconURL: member.avatarURL(),
                name: member.user.username + " Joined",
            })
            .setFooter({
                iconURL: member.guild.iconURL(),
                text: `${member.user.username} joined ${member.guild.name}`,
            })
            .setTimestamp(Date.now())
            .setColor("Random");

        if (!member.user.bot)
            await member.roles
                .add(JOINS_ROLE_ID)
                .catch(console.error)
                .then(console.log);

        const joinsChannel = member.guild.channels.cache.get(JOINS_CHANNEL_ID);
        await joinsChannel.send({ embeds: [JoinEmbed] });
    },
};
