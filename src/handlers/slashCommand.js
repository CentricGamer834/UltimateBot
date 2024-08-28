const { HOME_GUILD_ID } = process.env;
const { REST, Routes} = require("discord.js");

module.exports = (client) => {
    const { commands, token } = client;
    const rest = new REST().setToken(token);

    const sendCommands = async () => {
        try {
            console.log(
                `Started refreshing ${commands.length} application (/) commands.`
            );

            const data = await rest.put(
                Routes.applicationGuildCommands(client.user.id, HOME_GUILD_ID),
                { body: commands }
            );

            console.log(
                `Successfully reloaded ${data.length} application (/) commands.`
            );
        } catch (error) {
            console.error(error);
        }
    };

    ///  cant hurt to wait right
    setTimeout(sendCommands, 5000);
};
