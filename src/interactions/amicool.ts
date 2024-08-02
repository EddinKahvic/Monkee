import { Client } from 'discord.js'

export default function AmICool(client: Client) {
  client.on('messageCreate', (message) => {
    if (message.author.bot) return

    if (message.content !== '/amicool') return

    const iscool = message.author.username === 'olivergg' || Math.random() > 0.5
    const result = iscool ? 'cool🗿' : 'not cool'

    message.reply(`${message.author.username} is ${result}`)
  })
}
