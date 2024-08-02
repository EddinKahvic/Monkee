import { config } from 'dotenv'

config()

export function getEnv(name: string) {
  return process.env[name]
}
