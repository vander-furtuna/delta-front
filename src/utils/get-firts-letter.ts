export function getFirstLetter(name: string): string {
  if (!name) return ''

  const firstLetter = name.charAt(0).toUpperCase()

  return firstLetter
}
