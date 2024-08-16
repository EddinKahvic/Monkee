import r6operators, { Operator } from 'r6operators'
import sharp from 'sharp'
import { getRandomItem } from './random.helper'

export const OperatorSides = {
  ATTACKER: 'Attacker',
  DEFENDER: 'Defender',
}

export function getOperators() {
  return Object.values(r6operators)
}

export function getAttackerOperators() {
  const operators = getOperators()

  return operators.filter(op => op.role === OperatorSides.ATTACKER)
}

export function getDefenderOperators() {
  const operators = getOperators()

  return operators.filter(op => op.role === OperatorSides.DEFENDER)
}

// Get operator by operator id (lowercased operator name)
export function getOperator(name: string) {
  const operators = getOperators()

  return operators.find(operator => operator.id === name)
}

// Picks a random operator from all available operators
// If side is provided, only pick operator from that side
export function getRandomOperator(side?: string) {
  let operators: Operator[] = []

  if (side === OperatorSides.ATTACKER) operators = getAttackerOperators()
  if (side === OperatorSides.DEFENDER) operators = getDefenderOperators()

  if (operators.length === 0) return

  return getRandomItem(operators)
}

export async function createOperatorIconBuffer(operator: Operator) {
  const operatorSVGIcon = operator.toSVG()

  if (typeof operatorSVGIcon !== 'string') return

  const iconSVGBuffer = Buffer.from(operatorSVGIcon)

  return await sharp(iconSVGBuffer).png().toBuffer()
}
