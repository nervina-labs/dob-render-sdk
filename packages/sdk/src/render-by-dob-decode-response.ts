import {DobDecodeResult, RenderOutput} from './types'
import { traitsParser } from './traits-parser'
import { renderParamsParser } from './render-params-parser'
import { RenderProps, renderSVG } from './render-svg'

export function renderByDobDecodeResponse(
  dob0Data: DobDecodeResult,
  props: RenderProps & {
    outputType?: 'svg'
  }
) {
  if (typeof dob0Data.renderOutput === 'string') {
    dob0Data.renderOutput = JSON.parse(dob0Data.renderOutput) as RenderOutput[]
  }
  const { traits, indexVarRegister } = traitsParser(dob0Data.renderOutput)
  const renderOptions = renderParamsParser(traits, indexVarRegister)
  return renderSVG({ ...renderOptions, font: props.font })
}
