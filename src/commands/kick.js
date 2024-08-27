const { FAIL_EMOJI, SUCCESS_EMOJI } = process.env;
const Message = require("discord.js").Message;

module.exports = {
    name: "kick",
    description: "Kick mentioned member from guild",
    /** @param {Message} message */
    async execute(args, message, client) {
        if (!message.guild)
            return message.reply(
                `${FAIL_EMOJI} This command can only be used in servers!`
            );

        if (!message.member.permissions.has("KickMembers"))
            return message.reply(
                `${FAIL_EMOJI} You don't have \`KICK_MEMBERS\` permissions! I can't let you do that, sir.`
            );

        const mention = message.mentions.members.first();
        if (!mention)
            return message.reply(
                `${FAIL_EMOJI} No valid member mentioned to kick!`
            );

        if (!mention.kickable)
            return message.reply(
                `${FAIL_EMOJI} This member could not be kicked! (Possibly the server owner? XD)`
            );

        if (mention.roles.highest.position >= message.member.roles.highest.position)
            return message.reply(
                `${FAIL_EMOJI} I cant kick that member. They are the the same level as you or above`
            );

        const reason = args.shift();
        mention
            .kick(reason)
            .catch((error) => {
                message.reply(
                    `${FAIL_EMOJI} Failed to kick <@${mention.user.id}> (${mention.user.username})! Reason: \`${error}\``
                );
            })
            .then(() => {
                message.reply(
                    `${SUCCESS_EMOJI} <@${mention.user.id}> ${mention.user.username} was kicked from da server!`
                );
            });
    },
};
