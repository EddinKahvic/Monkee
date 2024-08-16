export function isFile(name: string) {
  return /\.\w+$/.test(name)
}

export function isDirectory(name: string) {
  return !isFile(name)
}
