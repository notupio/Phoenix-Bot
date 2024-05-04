const { EmbedBuilder } = require('discord.js')

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
    const embed = await getEmbed(Math.floor(message.client.ws.ping), message.author);
    await message.safeReply({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const embed = await getEmbed(Math.floor(interaction.client.ws.ping), interaction.author);
    await interaction.followUp({ embeds: [embed] });
  },
};

const getEmbed = async (ping, user) => {
  return new EmbedBuilder()
    .setTitle(":ping_pong: Pong :ping_pong:")
    .setDescription(`**Bot's Latency:** ${ping}ms \n **Database Latency:** 1ms`)
    .setColor("Random")
    .setFooter({ text: `Requested By ${user.tag}` });
};
