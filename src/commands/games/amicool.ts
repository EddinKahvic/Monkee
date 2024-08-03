import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import isCool from '~/helpers/isCool'

export const data = new SlashCommandBuilder()
  .setName('amicool')
  .setDescription('Determines if you are cool or not')

export async function execute(interaction: ChatInputCommandInteraction) {
  const isUserCool = isCool(interaction.user)
  const result = isUserCool ? 'cool 🗿' : 'not cool 🤣🫵🏼'

  await interaction.reply(`${interaction.user.username} is ${result}`)
}
