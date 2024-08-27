module.exports = {
    name: "ping",
    description: "Return client's API latency in milliseconds",
    async execute(args, message, client) {
        message.reply(`***Pong*** \`${client.ping}ms\` ***Pong***`);
    },
};
