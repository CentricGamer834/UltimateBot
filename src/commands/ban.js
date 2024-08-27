const { FAIL_EMOJI, SUCCESS_EMOJI } = process.env;

module.exports = {
    name: "ban",
    description: "Ban mentioned member from guild",
    async execute(args, message, client) {
        if (!message.guild)
            return message.reply(
                `${FAIL_EMOJI} This command can only be used in servers!`
            );

        if (!message.member.permissions.has("BanMembers"))
            return message.reply(
                `${FAIL_EMOJI} You don't have \`BAN_MEMBERS\` permissions! I can't let you do that, sir.`
            );

        const mention = message.mentions.members.first();
        if (!mention)
            return message.reply(
                `${FAIL_EMOJI} No valid member mentioned to ban!`
            );

        if (!mention.bannable)
            return message.reply(
                `${FAIL_EMOJI} This member could not be banned! (Possibly the server owner? XD)`
            );

        if (
            mention.roles.highest.position >=
            message.member.roles.highest.position
        )
            return message.reply(
                `${FAIL_EMOJI} I cant ban that member. They are the the same level as you or above`
            );

        const reason = args.shift();
        await mention
            .ban({ reason })
            .catch((error) => {
                message.reply(
                    `${FAIL_EMOJI} Failed to ban <@${mention.user.id}> (${mention.user.username})! Reason: \`${error}\``
                );
            })
            .then(() => {
                message.reply(
                    `${SUCCESS_EMOJI} <@${mention.user.id}> ${mention.user.username} was banned from da server!`
                );
            });
    },
};
