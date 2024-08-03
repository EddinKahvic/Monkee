import path from 'node:path'
import fs from 'node:fs'
import { Command } from '~/types'
import { Collection } from 'discord.js'

export function getCommands() {
  const commands: Command[] = []

  // Get path to root of current project
  const rootDir = process.cwd()

  // Grab all the command folders from the commands directory you created earlier
  const foldersPath = path.join(rootDir, 'src', 'commands')
  const commandFolders = fs.readdirSync(foldersPath)

  for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder)
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith('.ts'))
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file)
      const command = require(filePath)

      if ('data' in command && 'execute' in command) {
        commands.push(command)
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        )
      }
    }
  }

  return commands
}

export function getCommandsAsCollection() {
  const commands = getCommands()

  const collection = new Collection<string, any>()

  for (const command of commands) {
    collection.set(command.data.name, command)
  }

  return collection
}
