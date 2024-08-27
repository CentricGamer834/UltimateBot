const { FAIL_EMOJI, SUCCESS_EMOJI } = process.env;
const { Message } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unban user ID from guild",
    /**@param {Message} message*/
    async execute(args, message, client) {
        if (!message.guild)
            return message.reply(
                `${FAIL_EMOJI} This command can only be used in servers!`
            );

        if (!message.member.permissions.has("BanMembers"))
            return message.reply(
                `${FAIL_EMOJI} You don't have \`BAN_MEMBERS\` permissions! I can't let you do that, sir.`
            );

        const mention = args.shift();
        if (!mention)
            return message.reply(
                `${FAIL_EMOJI} No valid user id mentioned to unban!`
            );

        const reason = args.shift();

        message.guild.bans
            .remove(mention, reason)
            .catch((error) => {
                message.reply(
                    `${FAIL_EMOJI} Failed to unban <@${mention}> (${mention})! Reason: \`${error}\``
                );
            })
            .then(() => {
                message.reply(
                    `${SUCCESS_EMOJI} <@${mention}> (${mention}) was unbanned from da server!`
                );
            });
    },
};
