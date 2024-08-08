import axios from 'axios'

interface Hero {
  key: string
  name: string
  portrait: string
  role: string
}

export async function getHeroes(role: string) {
  try {
    const response = await axios.get(
      `https://overfast-api.tekrop.fr/heroes?role=${role}`
    )
    return response.data as Hero[]
  } catch (error) {
    return error as string
  }
}
