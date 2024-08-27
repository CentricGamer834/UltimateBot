const { Message } = require("discord.js");
const { FAIL_EMOJI, SUCCESS_EMOJI } = process.env;

module.exports = {
    name: "clear",
    description: "Clear messages in channel (Up to 100)",
    /** @param {Message} message */
    async execute(args, message, client) {
        if (!message.member.permissions.has("ManageMessages"))
            return await message.reply(
                `${FAIL_EMOJI} You don't have \`MANAGE_MESSAGES\` permissions! I can't let you do that, sir.`
            );

        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount < 1 || deleteCount > 100)
            return await message.reply(
                "Please provide a number between 1 and 100 for the number of messages to delete"
            );

        await message.channel
            .bulkDelete(deleteCount)
            .catch((error) =>
                message.reply(
                    `${FAIL_EMOJI} Couldn't delete messages! Reason: \`${error}\``
                )
            )
            .then(() => {
                message.channel.send(
                    `${SUCCESS_EMOJI} Deleted ${deleteCount} messages!`
                );
            });
    },
};
