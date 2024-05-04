const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    execute: async (message) => {
        if (message.content === "hi") {
            console.log('Hi');
            const button = new ButtonBuilder()
                .setLabel('Support Server')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/a63jNQ4yp3');
            const button2 = new ButtonBuilder()
                .setLabel('Bot Invite')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.com/oauth2/authorize?client_id=1235858340282634281&permissions=8&scope=bot');
            const row = new ActionRowBuilder().addComponents(button).addComponents(button2);
            const embed = new EmbedBuilder()
                .setColor('White')
                .setTitle(`Did someone mention me?`)
                .setDescription(`**Hello! You appear to have mentioned me.`)
                .addFields(
                    {
                        name: `<a:info:1235933806255411320> Feel lost?`,
                        value: `You can do `/help` to get a list of my commands.`
                    }
                )
            message.channel.send({ embeds: [embed], components: [row] });
        }
    }
};