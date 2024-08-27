const fs = require("fs");

module.exports = (client) => {
    const commandFiles = fs
        .readdirSync("./src/commands")
        .filter((file) => file.endsWith(".js"));

    const { commands } = client;

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.set(command.name, command);

        console.log(`[COMMANDS] ${file} has been registered`);
    }

    //
    //
    //
};
