import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import CommandBuilder from '~/classes/command.classes'

const data = new SlashCommandBuilder().setName('hi').setDescription('Says hi')

async function execute(interaction: ChatInputCommandInteraction) {
  interaction.reply(`Hi, ${interaction.user.username}`)
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description: 'Replies with a greeting',
  })
