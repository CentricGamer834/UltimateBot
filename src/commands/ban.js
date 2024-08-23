const { Message } = require("discord.js");
const { FAIL_EMOJI } = process.env;

module.exports = {
    name: "ban",
    description: "Ban specified users from guild",
    /**
     * @param {Message} message
     */
    async execute(args, message, client) {
        if (!message.guild) {
            message.reply(
                `${FAIL_EMOJI} You gotta run this command in a server!`
            );
            return;
        }

        const mentions = message.mentions.members;
        if (mentions.length <= 0) {
            message.reply("No members mentioned!");
            return;
        }

        mentions.forEach((mention) => {
            mention
                .ban()
                .catch((error) => {
                    message.reply(
                        `${FAIL_EMOJI} Failed to ban <@${mention.user.id}> (${mention.user.username})! Reason: \`${error}\``
                    );
                })
                .then((member) => {
                    message.reply(`CHECK ${member.username} was banned from da server!`);
                });
        });
    },
};
