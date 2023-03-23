require('dotenv').config()
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const fs = require('node:fs')
const path = require('node:path')

const { Player } = require('discord-player')
const { Client, GatewayIntentBits, ActivityType, Collection, Partials } = require('discord.js')
const cmds = require('./msgCommands')
const { isValidUrl } = require('./utils')

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.User],
  presence: {
    status: 'online',
    activities: [{
      name: 'La Tortuga Taruga',
      type: ActivityType.Listening
    }]
  }
})

client.prefix = 'dj!'

client.commands = new Collection()
client.command = new Collection()
const commands = []

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
    commands.push(command.data.toJSON())
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
  }
}

client.on('ready', () => {
  const guildIds = client.guilds.cache.map(guild => guild.id)
  const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN)

  for (const guildId of guildIds) {
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
      { body: commands })
      .then(() => console.log('Successfully updated commands for guild ' + guildId))
      .catch(console.error)
  }
})

// Add the player on the client
client.player = new Player(client, {
  deafenOnJoin: true,
  lagMonitor: 1000,
  ytdlOptions: {
    filter: 'audioonly',
    quality: 'highestaudio',
    highWaterMark: 1 << 25
  }
})

client.player.events.on('playerStart', (queue, track) => queue.metadata.channel.send(`🎶 | Está sonando **${track.title}**`))
client.player.events.on('error', (queue, error) => console.log(`[${queue.guild.name}] Error: ${error.message}`))

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

client.on('messageCreate', (message) => {
  if (message.content.startsWith(client.prefix)) {
    let [cmd, song, ...rest] = message.content.slice(3).replace('\n', ' ').split(' ')
    if (!isValidUrl(song)) {
      song = `${song} ${rest.join(' ')}`
    }

    if (cmds[cmd]) {
      const info = {
        song,
        channel: message.channel,
        voiceChannel: message.member.voice.channel,
        client: message.client,
        member: message.member,
        guild: message.guild
      }
      cmds[cmd](info)
    }
  }
})

client.login(process.env.BOT_TOKEN)
