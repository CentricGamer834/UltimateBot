module.exports = {
    name: "message",
    async execute(message, client) {
        const { commands } = client;
        const { prefix } = process.env;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
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
