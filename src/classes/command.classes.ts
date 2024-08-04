import { SlashCommandBuilder } from 'discord.js'
import {
  Command,
  CommandExecutable,
  CommandInformation,
  SlashCommandBuilderLike,
} from '~/types'

export default class CommandBuilder {
  private _data: SlashCommandBuilderLike
  private _execute!: CommandExecutable
  private _information?: CommandInformation

  constructor() {
    this._data = new SlashCommandBuilder()
  }

  public isValidCommand() {
    if (typeof this._data === undefined) return false
    if (typeof this._execute === undefined) return false

    return true
  }

  public setData(data: SlashCommandBuilderLike) {
    this._data = data

    return this
  }

  public setInformation(information: CommandInformation) {
    this._information = information

    return this
  }

  public setExecutable(method: CommandExecutable) {
    this._execute = method

    return this
  }

  public toCommand() {
    if (!this.isValidCommand()) {
      throw 'CommandBuilder failed to convert to Command'
    }

    return {
      data: this._data,
      information: this._information,
      execute: this._execute,
    } satisfies Command
  }
}
