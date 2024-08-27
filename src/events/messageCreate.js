module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        const { commands } = client;
        const { prefix } = process.env;

        if (message.author.bot || !message.content.startsWith(prefix)) return;

        const args = message.content
            .toLocaleLowerCase()
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        const command = args.shift();

        if (commands.has(command)) {
            console.log(
                `Executing command "${command}" requested by ${message.author.tag}`
            );

            try {
                commands.get(command).execute(args, message, client);
            } catch (error) {
                console.error(`Error executing! Reason: ${error}`);
            }
        }
    },
};
