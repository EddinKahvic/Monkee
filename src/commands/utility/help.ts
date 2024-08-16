import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from 'discord.js'
import CommandBuilder from '~/classes/command.classes'
import { getCommands } from '~/helpers/commands.helper'

const noDescription = 'This command has no description'

const commands = getCommands().map(command => ({
  name: `/${command.data.name}`,
  value: `\`${command.information?.description ?? noDescription}\``,
}))

const embed = new EmbedBuilder()
  .setColor(0x729c7c)
  .setTitle('List of commands')
  .addFields(commands)

const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays a descriptive list of all commands')

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({ embeds: [embed] })
}

export default new CommandBuilder().setData(data).setExecutable(execute)
