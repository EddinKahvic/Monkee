import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import CommandBuilder from '~/classes/command.classes'

const data = new SlashCommandBuilder().setName('coinflip').setDescription('Does a coin flip')

const OUTCOMES = {
  "tails": "Tails",
  "heads": "Heads"
}

function doCoinFlip()  {
  return Math.random() > 0.5
}

function getOutcomeAsString(outcome: boolean) {
  const actual = outcome ? "tails" : "heads"

  return OUTCOMES[actual]
}

async function execute(interaction: ChatInputCommandInteraction) {
  const outcome = doCoinFlip()
  const actual = getOutcomeAsString(outcome)

  const embed = new EmbedBuilder()
  .setColor(0x729c7c)
  .setTitle(actual)
  
  return await interaction.reply({ embeds: [embed] })
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description: 'Does a coinflip with a 50/50 outcome',
  })
