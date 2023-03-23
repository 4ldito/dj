const { EmbedBuilder } = require('discord.js')
const { lyricsExtractor } = require('@discord-player/extractor')
const lyricsSearch = lyricsExtractor()

const lyrics = async ({ client, channel, guild }) => {
  try {
    const queue = client.player.nodes.get(guild)
    if (!queue) return channel.send('Cómo voy a saber la letra de algo que no estoy escuchando.')

    if (queue) {
      const result = await lyricsSearch.search(queue.currentTrack.title)

      if (!result) return channel.send(`No encontré letra para ${queue.currentTrack.title} :c`)

      const trimmedLyrics = result.lyrics.substring(0, 1997)

      const embed = new EmbedBuilder()
        .setTitle(`${result.title}`)
        .setThumbnail(`${result.thumbnail}`)
        .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
      await channel.send({ embeds: [embed] })
    }
  } catch (error) {
    console.log(error)
    if (error.message.includes('Could not parse lyrics')) return channel.send('No pude encontrar la letra.')
  }
}

module.exports = { lyrics }
