import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { renderByTokenKey, svgToBase64 } from '@nervina-labs/dob-render'

export const RenderByTokenKey = ({isMainnet}: {isMainnet: boolean}) => {
  const searchParams = new URLSearchParams(location.search)
  const [tokenKey, setTokenKey] = useState(
    searchParams.get('token_key') ?? (isMainnet ?
      'dc19e68af1793924845e2a4dbc23598ed919dcfe44d3f9cd90964fe590efb0e4' :
      'c92900fabd80adbbfd8e8e36bbd8eb5fc3b6e40110f315e03f52e95b833b56c0'),
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

  useEffect(() => {
    if (tokenKey) {
      mutateAsync()
    }
  }, [])

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
      ) : (
        isLoading ? (
          <img src={'/loading.svg'} style={{ width: '200px', height: '200px' }} />
        ) : (
          null
        )
      )}
    </div>
  )
}
