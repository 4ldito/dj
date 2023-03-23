const { QueryType } = require('discord-player')
const { EmbedBuilder } = require('discord.js')

const search = async ({ client, guild, channel, voiceChannel, song, member }) => {
  try {
    if (!voiceChannel) return channel.send("You aren't connected to a voice channel!")

    const results = await client.player.search(song, {
      requestedBy: member.user,
      searchEngine: QueryType.AUTO
    })

    if (!results.hasTracks()) return channel.send('No se encontró canción :c')
    let text = ''

    results.tracks.forEach((t, i) => {
      const index = i + 1
      text += `${index.toString().padStart(2, 0)} - ${t.title} - ${t.duration} \n`
    })

    text = text.substring(0, 1997)

    const embed = new EmbedBuilder()
      .setTitle(`Resultados para: **${song}**`)
      .setDescription(text.length === 1997 ? `${text}...` : text)
    channel.send({ embeds: [embed] })

    const userID = member.user.id
    const filter = m => userID === m.author.id

    const collected = await channel.awaitMessages({ filter, max: 1, time: 15000 })
    const track = Number(collected.first().content)
    if (Number.isNaN(track) || (results.tracks.length < track)) return channel.send('Opción invalida. Busca de nuevo..')

    await client.player.play(voiceChannel.id, results.tracks[track - 1], {
      nodeOptions: {
        metadata: {
          channel,
          client: guild.members.me,
          requestedBy: member.user.username
        },
        volume: 100,
        bufferingTimeout: 5000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000
      }
    })
  } catch (error) {
    console.log(error)
    if (error.message.includes('Could not extract stream for this track')) return channel.send('No puedo reproducir esa canción o me pegan.')
  }
}

module.exports = { search }
