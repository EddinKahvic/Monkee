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
  OperatorSides,
} from '~/helpers/rainbow.helpers'

const SIDE_REQUIRED = 'A side is required'
const ERROR_PICKING_OP = 'Something went wrong when picking an operator'
const ICON_BUFFER_INV = 'Failed to get operator icon'

const sides = [
  { name: 'Attacker', value: OperatorSides.ATTACKER },
  { name: 'Defender', value: OperatorSides.DEFENDER },
]

const data = new SlashCommandBuilder()
  .setName('rainbow')
  .setDescription('Picks a random operator for you')
  .addStringOption((option) =>
    option
      .setName('side')
      .setDescription('Pick attacker or defender side')
      .setRequired(true)
      .addChoices(sides)
  )

async function execute(interaction: ChatInputCommandInteraction) {
  const side = interaction.options.getString('side')

  if (!side) return await interaction.reply(SIDE_REQUIRED)

  const operator = getRandomOperator(side)

  if (!operator) return interaction.reply(ERROR_PICKING_OP)

  const iconBuffer = await createOperatorIconBuffer(operator)

  if (!iconBuffer) return await interaction.reply(ICON_BUFFER_INV)

  // Create embed with image and operator to play
  const iconName = `${operator.id}.png`
  const icon = new AttachmentBuilder(iconBuffer, { name: iconName })
  const embed = new EmbedBuilder()
    .setColor(0x729c7c)
    .setTitle(operator.name)
    .setDescription(`${interaction.user} is playing as ${operator.name}!`)
    .setThumbnail(`attachment://${iconName}`)

  await interaction.reply({ embeds: [embed], files: [icon] })
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description:
      'Picks a random Rainbow Six Siege operator from either attacking or defender side',
  })
