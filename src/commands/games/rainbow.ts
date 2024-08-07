import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'
import CommandBuilder from '~/classes/command.classes'
import {
  createOperatorIconBuffer,
  getRandomOperator,
} from '~/helpers/rainbow.helpers'

const SIDE_REQUIRED = 'A side is required'
const ERROR_PICKING_OP = 'Something went wrong when picking an operator'

const sides = [
  { name: 'Attacking', value: 'attacking' },
  { name: 'Defense', value: 'defence' },
]

const data = new SlashCommandBuilder()
  .setName('rainbow')
  .setDescription('Picks a random operator for you')
  .addStringOption((option) =>
    option
      .setName('side')
      .setDescription('Attacker or defender side')
      .setRequired(true)
      .addChoices(sides)
  )

async function execute(interaction: ChatInputCommandInteraction) {
  const side = interaction.options.getString('side')

  if (!side) return await interaction.reply(SIDE_REQUIRED)

  const operator = getRandomOperator(side)

  const iconBuffer = await createOperatorIconBuffer(operator)

  if (!iconBuffer) return await interaction.reply(ERROR_PICKING_OP)

  const iconName = `${operator.id}.png`
  const icon = new AttachmentBuilder(iconBuffer, { name: iconName })
  const embed = new EmbedBuilder()
    .setColor(0x729c7c)
    .setTitle(operator.name)
    .setDescription(`${interaction.user} is playing as ${operator.name}!`)
    .setImage(`attachment://${iconName}`)

  await interaction.reply({ embeds: [embed], files: [icon] })
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description:
      'Picks a random operator from either attacking or defender side',
  })
