const { EmbedBuilder } = require('discord.js')

const currentSong = async ({ client, channel, guild }) => {
  try {
    const queue = client.player.nodes.get(guild)

    if (!queue || !queue.isPlaying()) return channel.send('Yo no estoy escuchando nada, esquizofrenico')

    const progress = queue.node.createProgressBar()

    const embed = new EmbedBuilder()
      .setTitle('Estás escuchando:')
      .setDescription(`[${queue.currentTrack.title}](${queue.currentTrack.url})`)
      .setThumbnail(`${queue.currentTrack.thumbnail}`)
      .addFields({ name: 'Requested by', value: `${queue.currentTrack.requestedBy.username}` })
      .addFields({ name: 'Visitas o.o', value: `${queue.currentTrack.views}` })
      .addFields({ name: 'Duración', value: progress })

    await channel.send({ embeds: [embed] })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { currentSong }
