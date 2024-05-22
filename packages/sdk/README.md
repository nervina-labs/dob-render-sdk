# Spore DOB render SDK

## Usage

### Render by token key
[Preview](https://app.joy.id/nft/dc19e68af1793924845e2a4dbc23598ed919dcfe44d3f9cd90964fe590efb0e4)
```ts
import { renderByTokenKey } from 'dob-render-sdk'

const tokenKey = 'dc19e68af1793924845e2a4dbc23598ed919dcfe44d3f9cd90964fe590efb0e4'
await renderByTokenKey(tokenKey) // <svg .../>
```

### Render by dob decode server
```ts
const tokenKey = 'dc19e68af1793924845e2a4dbc23598ed919dcfe44d3f9cd90964fe590efb0e4'
const response = await fetch('https://dob-decoder.rgbpp.io', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: 2,
    jsonrpc: "2.0",
    method: "dob_decode",
    params: [tokenKey],
  }),
});
const dobDecodeResult = response.json();
await renderByDobDecodeResponse(dobDecodeResult.result) // <svg ... />
```

### Custom font
```ts
import { renderByTokenKey } from 'dob-render-sdk'

const fetchFont = async (url: string) => fetch(url).then((res) => res.arrayBuffer())
const [regular, italic, bold, boldItalic] = await Promise.all([
  fetchFont('/fonts/TurretRoad-Medium.ttf'),
  fetchFont('/fonts/TurretRoad-Medium.ttf'),
  fetchFont('/fonts/TurretRoad-Bold.ttf'),
  fetchFont('/fonts/TurretRoad-Bold.ttf'),
])

const tokenKey = 'dc19e68af1793924845e2a4dbc23598ed919dcfe44d3f9cd90964fe590efb0e4'
await renderByTokenKey(tokenKey, {
  font: {
    regular,
    italic,
    bold,
    boldItalic,
  }
}) // <svg .../>
```
