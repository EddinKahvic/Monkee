import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import CommandBuilder from '~/classes/command.classes'

const data = new SlashCommandBuilder()
  .setName('rainbow')
  .setDescription('Picks a random operator for you')

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply(`Rainbow Six Siege Operator`)
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description:
      'Picks a random operator from either attacking or defender roaster',
  })
