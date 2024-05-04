/**
 * @type {import("@structures/Command")}
 */
module.exports = {
    name: "devbadge",
    description: "get a devbadge",
    category: "OWNER",
    botPermissions: ["EmbedLinks"],
    slashCommand: {
        enabled: true,
    },
    async interactionRun(interaction) {
        await interaction.followUp("success")
    }
}