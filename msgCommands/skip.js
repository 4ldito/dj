const skip = async ({ client, guild, channel }) => {
  try {
    const queue = client.player.nodes.get(guild)

    if (!queue || !queue.isPlaying()) return

    await queue.node.skip()
    return channel.send(`Skipeando **${queue.currentTrack}** prometo la próxima vez elegir mejor :(`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { skip }
