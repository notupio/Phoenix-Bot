const { commandHandler, automodHandler, statsHandler } = require("@src/handlers");
const { PREFIX_COMMANDS } = require("@root/config");
const { getSettings } = require("@schemas/Guild");
<<<<<<< HEAD
const { EmbedBuilder } = require('discord.js')
=======
// const { EmbedBuilder } = require('discord.js')
>>>>>>> 87b1c1157ca70fdba4a468f78eade498cb155da1

/**
 * @param {import('@src/structures').BotClient} client
 * @param {import('discord.js').Message} message
 */
module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  const settings = await getSettings(message.guild);

  // command handler
  let isCommand = false;
  if (PREFIX_COMMANDS.ENABLED) {
    // check for bot mentions
    if (message.content.includes(`${client.user.id}`)) {
      const embed = {
<<<<<<< HEAD
          "title": "Did someone mention me? <:shadow_what:1236958475200757831>",
          "description": "<:shadow_happy:1236957987780956211> Hello there! My prefix is `s$`",
          "color": 0x068add, 
          "timestamp": new Date(),
          "thumbnail": {
            "url": message.client.user.avatarURL({ format: "png" })
        },
          "fields": [
            {
               "name": "Feel lost?",
               "value": "To view my commands list, you can do `s$help` or `/help` <:shadow_working:1236958444754440314>",
               "inline": false
           },
           {
               "name": "",
               "value": "",
               "inline": false
           },
          ],
      };
  
      message.channel.safeSend({embeds: [embed]})
  }
=======
        "title": "Did someone mention me? <:shadow_what:1236958475200757831>",
        "description": "<:shadow_happy:1236957987780956211> Hello there! My prefix is `s$`",
        "color": 0x068add,
        "timestamp": new Date(),
        "thumbnail": {
          "url": message.client.user.avatarURL({ format: "png" })
        },
        "fields": [
          {
            "name": "Feel lost?",
            "value": "To view my commands list, you can do `s$help` or `/help` <:shadow_working:1236958444754440314>",
            "inline": false
          },
          {
            "name": "",
            "value": "",
            "inline": false
          },
        ],
      };

      message.channel.safeSend({ embeds: [embed] })
    }
>>>>>>> 87b1c1157ca70fdba4a468f78eade498cb155da1

    if (message.content && message.content.startsWith(settings.prefix)) {
      const invoke = message.content.replace(`${settings.prefix}`, "").split(/\s+/)[0];
      const cmd = client.getCommand(invoke);
      if (cmd) {
        isCommand = true;
        commandHandler.handlePrefixCommand(message, cmd, settings);
      }
    }
  }

  // stats handler
  if (settings.stats.enabled) await statsHandler.trackMessageStats(message, isCommand, settings);

  // if not a command
  if (!isCommand) await automodHandler.performAutomod(message, settings);
};