import path from 'node:path'
import fs from 'node:fs'
import { Command } from '~/types'
import { Collection } from 'discord.js'
import CommandBuilder from '~/classes/command.classes'
import { isDirectory } from './files.helpers'

export function getCommands(ignoreWarnings = true) {
  const commands: Command[] = []

  // Get path to root of current project
  const rootDir = process.cwd()

  // Grab all the command folders from the commands directory you created earlier
  // Filter out any non-directories
  const foldersPath = path.join(rootDir, 'src', 'commands')
  const commandFolders = fs
    .readdirSync(foldersPath)
    .filter((folder) => isDirectory(folder))

  for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder)
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith('.ts'))

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file)
      const builder = require(filePath).default as CommandBuilder | undefined

      if (builder && builder.isValidCommand()) {
        const command = builder.toCommand()

        commands.push(command)
      } else {
        if (ignoreWarnings) continue
        console.log(
          `[WARNING] The command at ${filePath} has no default export or failed to validate.`,
          `(${__filename})`
        )
      }
    }
  }

  return commands
}

export function getCommandsAsCollection(ignoreWarnings = true) {
  const commands = getCommands(ignoreWarnings)

  const collection = new Collection<string, any>()

  for (const command of commands) {
    collection.set(command.data.name, command)
  }

  return collection
}
