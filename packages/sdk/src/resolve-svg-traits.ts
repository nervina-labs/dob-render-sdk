import type { INode } from 'svgson'
import { parse } from 'svgson'
import type { BtcFsURI, IpfsURI } from './config'
import { config } from './config'
import { hexToBase64 } from './utils/string'

async function handleNodeHref(node: INode) {
  if (node.name !== 'image') {
    if (node.children.length) {
      node.children = await Promise.all(
        node.children.map((n) => handleNodeHref(n)),
      )
    }
    return node
  }
  if ('href' in node.attributes) {
    const href = node.attributes.href
    if (href.startsWith('btcfs://')) {
      const result = await config.queryBtcFsFn(node.attributes.href as BtcFsURI)
      node.attributes.href =
        typeof result === 'string'
          ? result
          : `data:${result.content_type};base64,${hexToBase64(result.content)}`
    } else if (href.startsWith('ipfs://')) {
      const result = await config.queryIpfsFn(node.attributes.href as IpfsURI)
      node.attributes.href =
        typeof result === 'string'
          ? result
          : `data:${result.content_type};base64,${hexToBase64(result.content)}`
    } else {
      const result = await config.queryUrlFn(node.attributes.href as string)
      node.attributes.href =
        typeof result === 'string'
          ? result
          : `data:${result.content_type};base64,${hexToBase64(result.content)}`
    }
  }

  return node
}

export async function resolveSvgTraits(svgStr: string): Promise<INode> {
  try {
    const svgAST = await parse(svgStr)
    await handleNodeHref(svgAST)
    return svgAST
  } catch (error) {
    return {
      value: '',
      type: 'element',
      name: 'svg',
      children: [],
      attributes: {},
    }
  }
}
