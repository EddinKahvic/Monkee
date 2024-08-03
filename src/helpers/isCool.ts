import { User } from 'discord.js'

export default function isCool(user: User) {
  return user.username === 'olivergg' || Math.random() > 0.5
}
