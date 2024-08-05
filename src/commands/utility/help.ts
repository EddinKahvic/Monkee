import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} from 'discord.js'
import CommandBuilder from '~/classes/command.classes'
import { getCommands } from '~/helpers/commands.helper'

const image = new AttachmentBuilder('assets/monkee.png')

const noDescription = 'This command has no description'

const commands = getCommands().map((command) => ({
  name: `/${command.data.name}`,
  value: `\`${command.information?.description ?? noDescription}\``,
}))

const embed = new EmbedBuilder()
  .setColor(0x729c7c)
  .setAuthor({ name: 'Monkee', iconURL: 'attachment://monkee.png' })
  .setTitle('List of commands')
  .addFields(commands)
  .setTimestamp()

const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays a descriptive list of all commands')

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({ embeds: [embed], files: [image] })
}

export default new CommandBuilder().setData(data).setExecutable(execute)
