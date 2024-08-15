import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import CommandBuilder from '~/classes/command.classes'

const data = new SlashCommandBuilder().setName('coinflip').setDescription('Does a coin flip')

async function execute(interaction: ChatInputCommandInteraction) {
  return
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description: 'Does a coinflip with a 50/50 outcome',
  })
