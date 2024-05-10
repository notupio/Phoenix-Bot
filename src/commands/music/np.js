const { EMBED_COLORS } = require("@root/config");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const prettyMs = require("pretty-ms");
const { Classic } = require("musicard");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "np",
  description: "show's what track is currently being played",
  category: "MUSIC",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    aliases: ["nowplaying"],
  },
  slashCommand: {
    enabled: true,
  },

  async messageRun(message, args) {
    const response = await nowPlaying(message);
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const response = await nowPlaying(interaction);
    await interaction.followUp(response);
  },
};

async function nowPlaying({ client, guildId, author }) {
  const player = client.musicManager.getPlayer(guildId);
  if (!player || !player.queue.current) return "No music is being played!";

  const track = player.queue.current;
  const end = track.length > 6.048e8 ? "🔴 LIVE" : prettyMs(track.length, { colonNotation: true });

  const musicCardBuffer = await generateMusicCard(track, player.position, track.length, client);

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.TRANSPARENT)
    .setAuthor({ name: "Now playing" })

  return { embeds: [embed], files: [musicCardBuffer] };
}

async function generateMusicCard(track, position, duration, client) {
  const identifier = track.identifier;

  const thumbnail = track.sourceName === "youtube"
    ? `https://img.youtube.com/vi/${identifier}/hqdefault.jpg`
    : client.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 });

  const musicard = await Classic({
    thumbnailImage: thumbnail,
    backgroundColor: "#070707",
    progress: (position / duration) * 100,
    progressColor: "#79F0FF",
    progressBarColor: "#696969",
    name: track.title,
    nameColor: "#79F0FF",
    author: `By ${track.author}`,
    authorColor: "#696969",
    startTime: new Date(position).toISOString().slice(11, 19),
    endTime: duration > 6.048e8 ? "🔴 LIVE" : prettyMs(duration, { colonNotation: true }),
    timeColor: "#696969",
  });

  const attachment = new AttachmentBuilder(musicard);

  return attachment;
}
