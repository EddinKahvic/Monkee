import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from 'discord.js'
import CommandBuilder from '~/classes/command.classes'
import { getHeroes } from '~/helpers/overwatch.helper'
import { getRandomItem } from '~/helpers/random.helper'

const roles = [
  { name: 'damage', value: 'damage' },
  { name: 'support', value: 'support' },
  { name: 'tank', value: 'tank' },
]

const data = new SlashCommandBuilder()
  .setName('overwatch')
  .setDescription('Picks a random hero for you')
  .addStringOption(option =>
    option
      .setName('role')
      .setDescription('Pick a role')
      .setRequired(true)
      .addChoices(roles)
  )

async function execute(interaction: ChatInputCommandInteraction) {
  const heroes = await getHeroes(interaction.options.getString('role')!)

  if (heroes instanceof Error) {
    interaction.reply(heroes.message)
    return
  }

  const hero = getRandomItem(heroes)

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
