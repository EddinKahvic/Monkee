import {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
} from '@discordjs/voice'
import {
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from 'discord.js'
import CommandBuilder from '~/classes/command.classes'
import path from 'node:path'
import { createReadStream } from 'node:fs'

const NO_USER_CONNECTION =
  "I couldn't find the voice channel you are connected to"
const DUPLICATE_CONNECTION = "I'm already connected to your voice channel!"

const data = new SlashCommandBuilder()
  .setName('sound')
  .setDescription('Plays a select sound')

function tryJoinVoiceChannel(member: GuildMember, guildId: string) {
  const voiceChannel = member.voice.channel

  const currentConnection = getVoiceConnection(guildId)
  const currentChannelId = currentConnection?.joinConfig.channelId
  const isConnectedToSameChannel = currentChannelId == voiceChannel?.id

  if (currentConnection && isConnectedToSameChannel) return currentConnection

  return joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: interaction.guildId!,
    adapterCreator: interaction.guild?.voiceAdapterCreator!,
  })
}

async function execute(interaction: ChatInputCommandInteraction) {
  // Get voice channel the user is connected to
  const member = interaction.member as GuildMember
  const voiceChannel = member.voice.channel

  // Check that the user is has a connection to a voice channel
  if (!voiceChannel) return await interaction.reply(NO_USER_CONNECTION)

  // Get the current voice connection in a server, if any, and
  // check that the bot is not already connected to the same channel
  const currentConnection = getVoiceConnection(interaction.guildId!)

  // Create new connection to a voice channel
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: interaction.guildId!,
    adapterCreator: interaction.guild?.voiceAdapterCreator!,
  })

  // Create audio stream from mp3 file
  const audioPath = path.join(process.cwd(), 'assets/audio/master.mp3')
  const stream = createReadStream(audioPath)

  // Create audio player and new audio resource
  const audioPlayer = createAudioPlayer()
  const audioResource = createAudioResource(stream)

  // Have the channel subscribe to the audio player
  connection.subscribe(audioPlayer)

  // Play sound
  audioPlayer.play(audioResource)

  stream.on('end', async () => {
    if (!interaction.replied)
      return await interaction.reply('Finished playing sound `monkey`')

    return interaction.followUp('Finished playing sound `monkey`')
  })

  await interaction.reply('Playing sound `monkey`')
}

export default new CommandBuilder()
  .setData(data)
  .setExecutable(execute)
  .setInformation({
    description: 'Plays a select sound"',
  })
