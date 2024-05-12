import { DobDecodeResult } from './types'
import { traitsParser } from './traits-parser'
import { renderParamsParser } from './render-params-parser'
import { renderSVG } from './render-svg'

export function renderByDobDecodeResponse(
  dob0Data: DobDecodeResult,
  props: {
    font: {
      regular: ArrayBuffer
      italic: ArrayBuffer
      bold: ArrayBuffer
      boldItalic: ArrayBuffer
    }
  }
) {
  const { traits, indexVarRegister } = traitsParser(dob0Data.renderOutput)
  const renderOptions = renderParamsParser(traits, indexVarRegister)
  return renderSVG({ ...renderOptions, font: props.font })
}
