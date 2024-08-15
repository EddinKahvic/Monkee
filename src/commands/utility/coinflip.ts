import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js'
import CommandBuilder from '~/classes/command.classes'
import { Nullable } from '~/types'

const data = new SlashCommandBuilder()
  .setName('coinflip')
  .setDescription('Does a coin flip')
  .addStringOption(option =>
    option.setName('heads').setDescription("Customize 'heads' outcome")
  )
  .addStringOption(option =>
    option.setName('tails').setDescription("Customize 'tails' outcome")
  )

const DEFAULT_OUTCOMES = {
  tails: 'Tails',
  heads: 'Heads',
}

function doCoinFlip() {
  return Math.random() > 0.5
}

// Exported for testing
// Takes the outcome as a boolean and returns
// the corresponding string outcome.
// If custom outcome is provided, use that.
export function getOutcomeAsString(
  outcome: boolean,
  heads: Nullable<string>,
  tails: Nullable<string>
) {
  const actual = outcome ? 'tails' : 'heads'

  if (actual === 'heads' && heads) return heads
  if (actual === 'tails' && tails) return tails

  return DEFAULT_OUTCOMES[actual]
}

async function execute(interaction: ChatInputCommandInteraction) {
  // Extract custom outcomes
  const heads = interaction.options.getString('heads')
  const tails = interaction.options.getString('tails')

  // Do coin flip
  const outcome = doCoinFlip()

  // Get the actual outcome
  const actual = getOutcomeAsString(outcome, heads, tails)

  // TODO: Make the embed prettier
  // Create embed with presentation of outcome
  const embed = new EmbedBuilder().setColor(0x729c7c).setTitle(actual)

  return await interaction.reply({ embeds: [embed] })
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description: 'Does a coinflip with a 50/50 outcome',
  })
