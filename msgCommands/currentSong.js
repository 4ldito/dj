const currentSong = async ({ client, channel, guild }) => {
  try {
    const queue = interaction.client.player.nodes.get(interaction.guild)

    if (!queue || !queue.isPlaying()) {
      return interaction.reply({ content: 'There is not playing anything', ephemeral: true })
    }

    const progress = queue.node.createProgressBar()
    const ts = queue.node.getTimestamp()

    const embed = new EmbedBuilder()
      .setTitle('Now playing')
      .setDescription(`[${queue.currentTrack.title}](${queue.currentTrack.url})`)
      .setThumbnail(`${queue.currentTrack.thumbnail}`)
      .addFields({ name: '200', value: progress.replace(/ 0:00/g, 'LIVE') }
      )

    await interaction.reply({ embeds: [embed] })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { currentSong }
