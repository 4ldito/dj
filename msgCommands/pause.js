const pause = async ({ client, channel, guild }) => {
  try {
    const queue = client.player.nodes.get(guild)

    if (!queue || !queue.isPlaying()) return channel.send('There is nothing playing')
    const songName = queue.node.queue.dispatcher.audioResource.metadata.title
    await queue.node.setPaused(true)
    return channel.send(`**${songName}** se pausó :c Supongo que mi sonido no es tan bueno después de todo :(.`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { pause }
