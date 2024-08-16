export function getRandomNumber(min: number, max: number) {
  return (Math.random() * (max - min + 1)) << 0
}

export function getRandomItem<T>(array: T[]) {
  const index = getRandomNumber(0, array.length)

  return array[index]
}
