import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import CommandBuilder from '~/classes/command.classes'

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Responds with "pong"')

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply('Pong!')
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description: 'Replies with a "Pong!"',
  })
