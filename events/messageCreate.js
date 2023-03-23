const { Events } = require('discord.js')
// const { client } = require('../index.js')

module.exports = {
  name: Events.MessageCreate,
  async execute (message) {
    // console.log(client)
    // console.log(message)
    // if (message.content.startsWith(client.prefix)) {
    //   const [cmd, song] = message.content.slice(3).replace('\n', ' ').split(' ')
    //   if (cmds[cmd]) {
    //     const info = {
    //       song,
    //       channel: message.channel,
    //       voiceChannel: message.member.voice.channel,
    //       client: message.client,
    //       member: message.member,
    //       guild: message.guild
    //     }
    //     cmds[cmd](info)
    //   }
    // }
  }
}
