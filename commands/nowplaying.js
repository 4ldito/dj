const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('np')
    .setDescription('see what is playing right now'),
  async execute (interaction) {
    try {
      const queue = interaction.client.player.nodes.get(interaction.guild)

      if (!queue || !queue.isPlaying()) return interaction.reply({ content: 'Yo no estoy escuchando nada, esquizofrenico', ephemeral: true })

      const progress = queue.node.createProgressBar()

      const embed = new EmbedBuilder()
        .setTitle('Estás escuchando:')
        .setDescription(`[${queue.currentTrack.title}](${queue.currentTrack.url})`)
        .setThumbnail(`${queue.currentTrack.thumbnail}`)
        .addFields({ name: 'Requested by', value: `${queue.currentTrack.requestedBy.username}` })
        .addFields({ name: 'Visitas o.o', value: `${queue.currentTrack.views}` })
        .addFields({ name: 'Duración', value: progress })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.log(error)
    }
  }
}
