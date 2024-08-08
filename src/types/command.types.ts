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
) => Promise<any>

export interface Command {
  data: SlashCommandBuilderLike
  information?: CommandInformation
  execute: CommandExecutable
}
