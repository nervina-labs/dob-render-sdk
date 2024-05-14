export interface DobDecodeResponse {
  jsonrpc: string
  result: string
  id: number
}

export interface DobDecodeResult {
  dobContent: { dna: string; block_number: number; cell_id: number; id: string }
  renderOutput: RenderOutput[] | string
}

export interface RenderOutput {
  name: string
  traits: { String?: string; Number?: number }[]
}
