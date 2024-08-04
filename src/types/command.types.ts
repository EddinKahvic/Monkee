import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'

export type SlashCommandBuilderLike =
  | SlashCommandBuilder
  | SlashCommandOptionsOnlyBuilder

export interface CommandInformation {
  description?: string
}

export type CommandExecutable = (
  interaction: ChatInputCommandInteraction
) => Promise<void>

export interface Command {
  data: SlashCommandBuilderLike
  information?: CommandInformation
  execute: CommandExecutable
}
