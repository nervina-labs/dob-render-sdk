export function parseStringToArray(str: string): string[] {
  const regex = /'([^']*)'/g
  return [...str.matchAll(regex)].map((match) => match[1])
}
