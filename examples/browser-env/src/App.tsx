import { useState } from 'react'
import './App.css'
import { traitsParser, renderParamsParser, renderSVG, svgToBase64 } from "dob-render-sdk";
import type { RenderOutput } from "dob-render-sdk";

const fontCache: Record<string, ArrayBuffer> = {}

const fetchFont = async (url: string) => {
  const cache = fontCache[url]
  if (cache) return cache
  // eslint-disable-next-line compat/compat
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => {
      fontCache[url] = arrayBuffer
      return arrayBuffer
    })
}

function App() {
  const [traitsText, setTraitsText] = useState<string>(JSON.stringify(JSON.parse('[{"name":"wuxing_yinyang","traits":[{"String":"3<_>"}]},{"name":"prev.bgcolor","traits":[{"String":"#(70deg, blue, pink, #f00)"}]},{"name":"prev<%v>","traits":[{"String":"(%wuxing_yinyang):[\'#FFFFFF\', \'#FFFFFF\', \'#FFFFFF\', \'#FFFFFF\', \'#FFFFFF\', \'#000000\', \'#000000\', \'#000000\', \'#000000\', \'#000000\'])"}]},{"name":"Spirits","traits":[{"String":"(%wuxing_yinyang):[\'Metal, Golden Body\', \'Wood, Blue Body\', \'Water, White Body\' \'Fire, Red Body\', \'Earth, Colorful Body\']"}]},{"name":"Yin Yang","traits":[{"String":"(%wuxing_yinyang):[\'Yin, Long hair\', \'Yin, Long hair\', \'Yin, Long hair\', \'Yin, Long hair\', \'Yin, Long hair\', \'Yang, Short Hair\', \'Yang, Short Hair\', \'Yang, Short Hair\', \'Yang, Short Hair\', \'Yang, Short Hair\']"}]},{"name":"Talents","traits":[{"String":"(%wuxing_yinyang):[\'Guard\', \'Attack\', \'Death\', \'Revival\', \'Forget\', \'Summon\', \'Prophet\', \'Curse\', \'Hermit\', \'Crown\']"}]},{"name":"Horn","traits":[{"String":"(%wuxing_yinyang):[\'Praetorian Horn\', \'Warrior Horn\', \'Hel Horn\', \'Shaman Horn\', \'Lethe Horn\', \'Bard Horn\', \'Sibyl Horn \', \'Necromancer Horn\', \'Lao Tsu Horn\', \'Caesar Horn\']"}]},{"name":"Wings","traits":[{"String":"Golden Wings"}]},{"name":"Tails<%k: %v>","traits":[{"String":"Meteor Tails<#000*bi>"}]},{"name":"Horseshoes","traits":[{"String":"Dimond Horseshoes"}]},{"name":"Destiny Number","traits":[{"Number":59616}]},{"name":"Lucky Number","traits":[{"Number":35}]}]'), null, '  '))
  const [imgSrc, setImgSrc] = useState('')
  const onRender = async () => {
    try {
      const items = JSON.parse(traitsText) as RenderOutput[]
      const { traits, indexVarRegister } = traitsParser(items)
      const renderOptions = renderParamsParser(traits, indexVarRegister)

      const svgCode = await renderSVG(renderOptions)
      setImgSrc(await svgToBase64(svgCode))
    } catch (error) {
      alert(error instanceof Error ? error.message : error)
      console.error(error)
    }
  }

  return (
    <>
      <textarea
        style={{width: '100%', height: '300px'}}
        value={traitsText}
        onChange={e => setTraitsText(e.target.value)}
      />
      <button onClick={onRender}>Render</button>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt="output"
            style={{
              width: '500px',
              height: 'auto',
              fontSize: '20px',
              marginTop: '20px',
            }}
          />
        ) : null}
      </div>
    </>
  )
}

export default App
