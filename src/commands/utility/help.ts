import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} from 'discord.js'
import CommandBuilder from '~/classes/command.classes'

const image = new AttachmentBuilder('assets/monkee.png')

const embed = new EmbedBuilder()
  .setColor('Random')
  .setAuthor({ name: 'Monkee', iconURL: 'attachment://monkee.png' })
  .setTitle('List of commands')
  .addFields({ name: 'Command', value: 'Description' })
  .setTimestamp()

const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Displays a descriptive list of all commands')

async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({ embeds: [embed], files: [image] })
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description: 'bla bla bla bla helps you',
  })
