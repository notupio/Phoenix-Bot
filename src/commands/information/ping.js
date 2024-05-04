const { EmbedBuilder } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 **/
module.exports = {
  name: "ping",
  description: "shows the current ping from the bot to the discord servers",
  category: "INFORMATION",
  command: {
    enabled: true,
  },
  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [],
  },

  async messageRun(message, args) {
    const embed = await getEmbed(Math.floor(message.client.ws.ping), message.author.username);
    await message.safeReply({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const embed = await getEmbed(Math.floor(interaction.client.ws.ping), interaction.user.username);
    // await interaction.deferReply()
    await interaction.followUp({ embeds: [embed] });
  },
};

const getEmbed = async (ping, user) => {
  return new EmbedBuilder()
    .setTitle("<a:ping:1235849822796251149> Ping")
    .setDescription(`**API Latency:**   16ms  \n **Bot's Latency:**   ${ping}ms \n **Database Latency:**   1ms \n **Shard Latency:**   17ms`)
    .setColor("Random")
    .setFooter({ text: `Requested By ${user}` });
};
