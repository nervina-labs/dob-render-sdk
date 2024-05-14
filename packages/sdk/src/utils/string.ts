export function parseStringToArray(str: string): string[] {
  const regex = /'([^']*)'/g
  return [...str.matchAll(regex)].map((match) => match[1])
}

export function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);

  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return uint8Array.buffer;
}