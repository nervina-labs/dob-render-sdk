import { useState } from 'react'
import { useMutation } from 'react-query'
import { renderByTokenKey, svgToBase64 } from '@nervina-labs/dob-render'

export const RenderByTokenKey = () => {
  const searchParams = new URLSearchParams(location.search)
  const [tokenKey, setTokenKey] = useState(
    searchParams.get('token') ??
      'dc19e68af1793924845e2a4dbc23598ed919dcfe44d3f9cd90964fe590efb0e4',
  )
  const { mutateAsync, isLoading, data } = useMutation(async () => {
    try {
      const response = await renderByTokenKey(tokenKey)
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
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          value={tokenKey}
          onChange={(e) => setTokenKey(e.target.value)}
          style={{ width: '500px', marginRight: '12px' }}
        />
        <button onClick={() => mutateAsync()}>
          {isLoading ? 'Rendering' : 'Render'}
        </button>
      </div>
      {data ? (
        <img src={data} style={{ width: '500px', height: '500px' }} />
      ) : null}
    </div>
  )
}
