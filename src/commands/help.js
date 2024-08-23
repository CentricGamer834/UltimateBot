const { prefix } = process.env;

module.exports = {
    name: "help",
    description: "Get help for all commands or a specific command",
    async execute(args, message, client) {
        const { commands } = client;
        let Embed = "";

        Embed += "```HELP COMMAND\n";

        if (args.length <= 0 && commands.get(args.shift())) {
            const givenCommand = commands.get(args.shift());
            Embed += `${givenCommand.name} - ${givenCommand.description}`;
        } else {
            commands.forEach((command) => {
                Embed += `${prefix}${command.name} - ${command.description}\n`;
            });
        }

        Embed += "```";

        message.channel.send(Embed);
    },
};
