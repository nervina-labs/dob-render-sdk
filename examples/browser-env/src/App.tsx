import './App.css'
import { TraitsParser } from './components/TraitsParser'
import { RenderByTokenKey } from './components/RenderByTokenKey'
import { config } from '@nervina-labs/dob-render'
import { RenderByDecodeResp } from './components/RenderByDecodeResp'
import { useState, useEffect } from 'react'

const searchParams = new URLSearchParams(location.search)
//const decoderServer = searchParams.get('decode-server')

const initialIsMainnet = searchParams.get('is_mainnet')?.toLowerCase() === 'true';

const updateConfig = (isMainnet: boolean) => {
  config.setDobDecodeServerURL(isMainnet ? 'https://dob-decoder.rgbpp.io' : 'https://dob0-decoder-dev.omiga.io');

  config.setQueryBtcFsFn(async (uri) => {
    let url = isMainnet 
      ? `https://api.omiga.io/api/v1/nfts/dob_imgs?uri=${uri}` 
      : `https://test-api.omiga.io/api/v1/nfts/dob_imgs?uri=${uri}`
    
    const response = await fetch(url)
    return response.json()
  })
}

function App() {
  const [isMainnet, setIsMainnet] = useState(initialIsMainnet);

  useEffect(() => {
    updateConfig(isMainnet);
  }, [isMainnet]);

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newIsMainnet = event.target.value === 'mainnet';
    setIsMainnet(newIsMainnet);
    
    // Update URL without refreshing the page
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('is_mainnet', newIsMainnet.toString());
    window.history.pushState({}, '', newUrl.toString());
  };

  return (
    <>
      <h1>Spore DOB Render Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Network: </label>
        <select 
          value={isMainnet ? 'mainnet' : 'testnet'} 
          onChange={handleNetworkChange}
          style={{ padding: '5px' }}
        >
          <option value="mainnet">Mainnet</option>
          <option value="testnet">Testnet</option>
        </select>
      </div>

      <h2>Render By Token Key</h2>
      <RenderByTokenKey isMainnet={isMainnet} />

      <h2>Render By Decode Response</h2>
      <RenderByDecodeResp />

      <h2>
        Text Render <code>prev.type = "text"</code>
      </h2>
      <TraitsParser />
    </>
  )
}

export default App
