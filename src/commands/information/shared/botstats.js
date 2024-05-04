const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { EMBED_COLORS, SUPPORT_SERVER, DASHBOARD } = require("@root/config");
const { timeformat } = require("@helpers/Utils");
const os = require("os");
const { stripIndent } = require("common-tags");

/**
 * @param {import('@structures/BotClient')} client
 */
module.exports = (client) => {
  // STATS
  const guilds = client.guilds.cache.size;
  const channels = client.channels.cache.size;
  const users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);

  // CPU
  const platform = process.platform.replace(/win32/g, "Windows");
  const architecture = os.arch();
  const cores = os.cpus().length;
  const cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB`;

  // RAM
  const botUsed = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
  const botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const botUsage = `${((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(1)}%`;

  const overallUsed = `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const overallAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
  const overallUsage = `${Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%`;

  let desc = "";
  desc += `<a:dev:1235934353754685491> **Developed by:** <@1085081038952337508>`;
  desc += ``;
  desc += ``;
  desc += ``;
  desc += "\n";

  const embed = new EmbedBuilder()
    .setTitle("<a:shadow_on_top:1235849461771538513> | Shadow™")
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(desc)
    .addFields(
      {
        name: "<a:info:1235933806255411320> **Environment Info**",
        value: stripIndent`
        <:operating_system:1235849745189310576> **OS:** Arch Linux [x64]
        <:cpu:1235849122683031594> **CPU:** Intel® Core™ i9-13900KS CPU@ 5.80GHz 24 vCores
        <:ram:1235849171274039336> **RAMs:** 62.46 GB  
        `,
        inline: false,
      },
      {
        name: "<a:info:1235933806255411320> **Database Info**",
        value: "<:database:1235849608010137660> **Total Database(s):** 1",
        inline: false,
      },
      {
        name: "Node Js version",
        value: process.versions.node,
        inline: false,
      },
      {
        name: "<a:info:1235933806255411320> **Runtime Info**",
        value: "<:C_JavaScript:1235938453275938876> Node.js: v18.20.12",
        inline: false,
      },
      {
        name: "<a:uptime:1235939488702791752> Uptime",
        value: "`" + timeformat(process.uptime()) + "`",
        inline: false,
      }
    );

  // Buttons
  let components = [];
  components.push(new ButtonBuilder().setLabel("Invite Link").setURL(client.getInvite()).setStyle(ButtonStyle.Link));

  if (SUPPORT_SERVER) {
    components.push(new ButtonBuilder().setLabel("Support Server").setURL(SUPPORT_SERVER).setStyle(ButtonStyle.Link));
  }

  if (DASHBOARD.enabled) {
    components.push(
      new ButtonBuilder().setLabel("Dashboard Link").setURL(DASHBOARD.baseURL).setStyle(ButtonStyle.Link)
    );
  }

  let buttonsRow = new ActionRowBuilder().addComponents(components);

  return { embeds: [embed], components: [buttonsRow] };
};
