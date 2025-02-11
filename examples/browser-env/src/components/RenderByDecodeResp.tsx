import { useState } from 'react'
import { useMutation } from 'react-query'
import { renderByDobDecodeResponse, svgToBase64 } from '@nervina-labs/dob-render'

export const RenderByDecodeResp = () => {
  const [decodeResp, setDecodeResp] = useState('')
  const { mutateAsync, isLoading, data } = useMutation(async () => {
    try {
      const response = await renderByDobDecodeResponse(JSON.parse(decodeResp).result)
      return svgToBase64(response)
    } catch (error) {
      alert(error instanceof Error ? error.message : error)
      throw error
    }
  })
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <textarea
        style={{ width: '100%', height: '300px', marginBottom: '10px' }}
        value={decodeResp}
        onChange={(e) => setDecodeResp(e.target.value)}
        placeholder="Decode Response"
      />
      <button onClick={() => mutateAsync()}>
        {isLoading ? 'Rendering' : 'Render'}
      </button>
      {data ? (
        <img src={data} style={{ width: '500px', height: '500px' }} />
      ) : null}
    </div>
  )
}
