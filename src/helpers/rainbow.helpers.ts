import r6operators, { Operator } from 'r6operators'
import sharp from 'sharp'
import { getRandomItem } from './random.helpers'

export function getOperators() {
  return Object.values(r6operators)
}

export function getAttackerOperators() {
  return getOperators().filter((operator) => operator.role === 'Attacker')
}

export function getDefenderOperators() {
  return getOperators().filter((operator) => operator.role === 'Defender')
}

// Get operator by operator id (lowercased operator name)
export function getOperator(name: string) {
  const operators = getOperators()

  return operators.find((operator) => operator.id === name)
}

// Picks a random operator from all available operators
// If side is provided, only pick operator from that side
export function getRandomOperator(side?: string) {
  let operators: Operator[]

  if (side === 'attacking') operators = getAttackerOperators()
  else if (side === 'defense') operators = getDefenderOperators()
  else operators = getOperators()

  return getRandomItem(operators)
}

export async function createOperatorIconBuffer(operator: Operator) {
  const operatorSVGIcon = operator.toSVG({ width: 100, height: 100 })

  if (typeof operatorSVGIcon !== 'string') return

  const iconSVGBuffer = Buffer.from(operatorSVGIcon)

  return await sharp(iconSVGBuffer).png().toBuffer()
}
