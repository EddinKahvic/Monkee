import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Responds with "pong"')

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply('Pong!')
}
