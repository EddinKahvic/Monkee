import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import CommandBuilder from '~/classes/command.classes'
import isCool from '~/helpers/amicool.helper'

const data = new SlashCommandBuilder()
  .setName('amicool')
  .setDescription('Determines if you are cool or not')

async function execute(interaction: ChatInputCommandInteraction) {
  const isUserCool = isCool(interaction.user)
  const result = isUserCool ? 'cool 🗿' : 'not cool 🤣🫵🏼'

  await interaction.reply(`${interaction.user.username} is ${result}`)
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description: 'Small game where the bot determines if you are cool or not.',
  })
