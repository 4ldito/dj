const { QueryType } = require('discord-player')

const play = async ({ song, channel, voiceChannel, client, member, guild }) => {
  try {
    if (!voiceChannel) return channel.send("You aren't connected to a voice channel!")

    const result = await client.player.search(song, {
      requestedBy: member.user,
      searchEngine: QueryType.AUTO
    })

    if (!result.hasTracks()) return channel.send('No se encontró canción :c')

    await client.player.play(voiceChannel.id, result, {
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

module.exports = { play }
