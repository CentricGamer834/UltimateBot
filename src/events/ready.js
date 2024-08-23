module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} just logged in. (${Date.now()})`);
    },
};
