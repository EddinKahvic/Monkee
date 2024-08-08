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
  const hero = heroes[index]

  const embed = new EmbedBuilder()
    .setColor(0x729c7c)
    .setTitle(`${hero.name}`)
    .setThumbnail(hero.portrait)
    .setDescription(`${interaction.user} is playing as ${hero.name}!`)
  await interaction.reply({ embeds: [embed] })
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description:
      'Picks a random hero based on the role provided from Overwatch 2',
  })
