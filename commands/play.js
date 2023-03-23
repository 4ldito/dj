const { SlashCommandBuilder } = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const { QueryType } = require('discord-player')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play new song')
    .addStringOption(option => option
      .setName('song')
      .setDescription('song name')
      .setRequired(true)),
  async execute (interaction) {
    try {
      const channel = interaction.member.voice.channel
      if (!channel) return interaction.reply('No estás en ningún canal')

      const songName = interaction.options.getString('song')

      console.log(interaction.user)
      const result = await interaction.client.player.search(songName, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO
      })

      const results = new EmbedBuilder()
        .setTitle('No results')
        .setColor('#ff0000')
        .setTimestamp()

      if (!result.hasTracks()) {
        return interaction.reply({ embeds: [results] })
      }

      await interaction.deferReply()

      const { track } = await interaction.client.player.play(interaction.member.voice.channel.id, result, {
        nodeOptions: {
          metadata: {
            channel: interaction.channel,
            client: interaction.guild.members.me,
            requestedBy: interaction.user.username
          },
          volume: 100,
          bufferingTimeout: 5000,
          leaveOnEnd: true
        }
      })

      const embed = new EmbedBuilder()
      embed
        .setDescription(`${track.playlist ? `**${track.playlist.title}**` : `**${track.title}**`}`)
        .setThumbnail(`${track.playlist ? `${track.playlist.thumbnail.url}` : `${track.thumbnail}`}`)
        .setColor('#00ff08')
        .setTimestamp()
        .setFooter({ text: `Duración: ${track.playlist ? `${getDuration(track)}` : `${track.duration}`}` })
      return interaction.editReply({ embeds: [embed] })
    } catch (error) {
      console.log(error)
    }
  }
}

function getDuration (track) {
  const totalDurationMs = track.playlist.tracks.reduce((a, c) => c.durationMS + a, 0)
  const totalDurationSec = Math.floor(totalDurationMs / 1000)
  const hours = Math.floor(totalDurationSec / 3600)
  const minutes = Math.floor((totalDurationSec % 3600) / 60)
  const seconds = totalDurationSec % 60
  const durationStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  return durationStr
}
