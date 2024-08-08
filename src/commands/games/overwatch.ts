import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from 'discord.js'
import CommandBuilder from '~/classes/command.classes'
import { getHeroes } from '~/helpers/overwatch.helper'

const data = new SlashCommandBuilder()
  .setName('overwatch')
  .setDescription('Picks a random hero for you')
  .addStringOption((option) =>
    option
      .setName('role')
      .setDescription('Pick a role')
      .setRequired(true)
      .addChoices(
        { name: 'damage', value: 'damage' },
        { name: 'support', value: 'support' },
        { name: 'tank', value: 'tank' }
      )
  )

async function execute(interaction: ChatInputCommandInteraction) {
  const heroes = await getHeroes(interaction.options.getString('role')!)

  if (typeof heroes === 'string') {
    interaction.reply(heroes)
    return
  }

  const index = Math.floor(Math.random() * heroes.length)
  const result = heroes[index]

  const embed = new EmbedBuilder()
    .setColor(0x729c7c)
    .setTitle(`${result.name}`)
    .setThumbnail(result.portrait)
    .setDescription(`${interaction.user} is playing as ${result.name}!`)
  await interaction.reply({ embeds: [embed] })
}

export default new CommandBuilder().setData(data).setExecutable(execute)
