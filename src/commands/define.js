module.exports = {
    name: "define",
    description: "Define text with Urban Dictionary",
    async execute(args, message, client) {
        const query = args.shift();
        if (!query) return await message.reply("No term provided!");

        const request = await fetch(
            "http://api.urbandictionary.com/v0/define?term=" + query
        )
            .then((response) => response.json())
            .catch(console.error);

        const definitions = request.list;
        if (!definitions || definitions.length <= 0)
            return await message.reply(
                "No results found. Broaden your search?"
            );

        const definition = definitions.shift().definition;
        if (!definition)
            return await message.reply("Hmmm something went wrong. Try again?");

        await message.reply(definition);
    },
};
