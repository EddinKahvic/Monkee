import 'module-alias/register'
import { REST, Routes } from 'discord.js'
import { getEnv } from '~/helpers/environment.helper'
import { getCommands } from '~/helpers/commands.helper'

// Get and validate token from .env
const token = getEnv('TOKEN')
const clientId = getEnv('CLIENTID')

if (!token) throw 'No token found'
if (!clientId) throw 'No clientId'

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token)

// Get commands and convert it to array of data objects in JSON format
const commands = getCommands(false).map(c => c.data.toJSON())

// and deploy your commands!
async function deploy() {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(Routes.applicationCommands(clientId!), {
      body: commands,
    })) as unknown[] | undefined

    if (!data) throw "REST put failed: Couldn't PUT commands"

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
}

deploy()
