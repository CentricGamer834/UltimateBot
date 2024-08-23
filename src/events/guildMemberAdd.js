const { HomeGuild, JoinsRole } = process.env;

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        if (member.guild.id !== HomeGuild) return;

        member.addRole(JoinsRole).catch(console.error).then(console.log);
    },
};
