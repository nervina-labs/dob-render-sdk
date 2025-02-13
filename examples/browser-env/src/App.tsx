import './App.css'
import { TraitsParser } from './components/TraitsParser'
import { RenderByTokenKey } from './components/RenderByTokenKey'
import { config } from '@nervina-labs/dob-render'
import { RenderByDecodeResp } from './components/RenderByDecodeResp'

const searchParams = new URLSearchParams(location.search)
//const decoderServer = searchParams.get('decode-server')

const IS_MAINNET = false;

/*
if (decoderServer) {
  config.setDobDecodeServerURL(decoderServer)
}
*/

config.setDobDecodeServerURL(IS_MAINNET ? 'https://dob0-decoder.omiga.io' : 'https://dob0-decoder-dev.omiga.io');

// step2: set
config.setQueryBtcFsFn(async (uri) => {
  let url = IS_MAINNET ? `https://api.omiga.io/api/v1/nfts/dob_imgs?uri=${uri}` : `https://test-api.omiga.io/api/v1/nfts/dob_imgs?uri=${uri}`
  
  const response = await fetch(url)
  return response.json()
})

function App() {
  return (
    <>
      <h1>Spore DOB/0 Render Demo</h1>
      <h2>
        Text Render <code>prev.type = "text"</code>
      </h2>
      <TraitsParser />

      <h2>Render By Token Key</h2>
      <RenderByTokenKey />

      <h2>Render By Decode Response</h2>
      <RenderByDecodeResp />
    </>
  )
}

export default App
