import { Client, IntentsBitField } from 'discord.js'
import { config } from 'dotenv'
config()

const TOKEN = process.env.TOKEN

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
})

client.on('messageCreate', (message) => {
  if (message.author.username === client.user?.username) return

  message.reply(message.author.username)
})

client.login(TOKEN)
