import { Client, IntentsBitField } from 'discord.js'
import { getEnv } from '../helpers/environment.helper'

type Interaction = (client: Client) => void

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
})

export function addInteractions(interactions: Interaction[]) {
  for (let interaction of interactions) {
    interaction(client)
  }
}

export function startClient() {
  const token = getEnv('TOKEN')
  client.login(token)
}

export default client
