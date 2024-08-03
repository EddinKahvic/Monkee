import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} from 'discord.js'

const image = new AttachmentBuilder('assets/monkee.png')

const embed = new EmbedBuilder()
  .setColor('Random')
  .setAuthor({ name: 'Monkee', iconURL: 'attachment://monkee.png' })
  .setTitle('List of commands')
  .addFields({ name: 'Command', value: 'Description' })
  .setTimestamp()

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a descriptive list of all commands'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({ embeds: [embed], files: [image] })
  },
}
