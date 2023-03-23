const { SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('resume'),
  async execute (interaction) {
    try {
      const queue = interaction.client.player.nodes.get(interaction.guild)

      if (!queue || !queue.isPlaying()) {
        return interaction.reply('Nada se está reproduciendo.')
      }

      await queue.node.setPaused(false)
      return interaction.reply('Volviendo a lo mio 😎️🥵️🥵️')
    } catch (error) {
      console.log(error)
    }
  }
}
