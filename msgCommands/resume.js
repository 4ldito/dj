const resume = async ({ client, guild, channel }) => {
  try {
    const queue = client.player.nodes.get(guild)

    if (!queue || !queue.isPlaying()) channel.send('Nada se está reproduciendo.')

    await queue.node.setPaused(false)
    return channel.send('Volviendo a lo mio 😎️🥵️🥵️')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { resume }
