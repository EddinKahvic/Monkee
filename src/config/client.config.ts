import { Client, Events, GatewayIntentBits, IntentsBitField } from 'discord.js'
import { getEnv } from '~/helpers/environment.helper'
import { ClientWithCommands } from '~/types'
import { getCommandsAsCollection } from '~/helpers/commands.helper'

type Interaction = (client: Client) => void

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    GatewayIntentBits.Guilds,
  ],
}) as ClientWithCommands

client.commands = getCommandsAsCollection()

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return

  const c = interaction.client as ClientWithCommands

  const command = c.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    }
  }
})

export function addInteractions(interactions: Interaction[]) {
  for (const interaction of interactions) {
    interaction(client)
  }
}

export function startClient() {
  const token = getEnv('TOKEN')
  client.login(token)
}

export default client
