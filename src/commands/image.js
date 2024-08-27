const { EmbedBuilder } = require("discord.js");
const gimages = require("@killovsky/gimages");

module.exports = {
    name: "image",
    description: "Fetch image from prompt",
    async execute(args, message, client) {
        const prompt = args.join(" ");
        if (!prompt) return await message.reply("No term provided!");

        const ImageEmbed = new EmbedBuilder();
        const results = await gimages.get({ query: prompt, safe: false });

        if (results && results.images && results.images.length >= 1) {
            const imageURL = results.images[0].url;

            ImageEmbed.setDescription(`Result for \`${prompt}\``)
                .setImage(imageURL)
                .setFooter({
                    text: `Showing 1/${results.images.length} results`,
                })
                .setTimestamp(Date.now());
        }
        await message.reply({ embeds: [ImageEmbed] });
    },
};
