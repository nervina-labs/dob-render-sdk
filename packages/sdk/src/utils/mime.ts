import type { FileServerResult } from '../config'
import { hexToBase64 } from './string'

/**
 * Detects the MIME type of an image from its hex-encoded content by examining file signatures
 * @param hexstring Hex-encoded image content
 * @returns The detected MIME type or null if not recognized
 */
export function detectImageMimeType(hexstring: string): string | null {
  // Skip if string is too short to contain a signature
  if (!hexstring || hexstring.length < 8) {
    return null
  }

  // Convert to lowercase for consistent comparison
  const hex = hexstring.toLowerCase()
  
  // JPEG: starts with ffd8ff
  if (hex.startsWith('ffd8ff')) {
    return 'image/jpeg'
  }
  
  // PNG: starts with 89504e47 (‰PNG)
  if (hex.startsWith('89504e47')) {
    return 'image/png'
  }
  
  // GIF: starts with 474946 (GIF)
  if (hex.startsWith('474946')) {
    return 'image/gif'
  }
  
  // WebP: RIFF....WEBP
  if (hex.startsWith('52494646') && hex.substring(16, 24) === '57454250') {
    return 'image/webp'
  }
  
  // BMP: starts with 424d (BM)
  if (hex.startsWith('424d')) {
    return 'image/bmp'
  }
  
  // SVG: might start with XML declaration or svg tag
  // This is a rough check since SVG is text-based
  if (hex.includes('3c737667') || hex.includes('3c3f786d6c')) { // <svg or <?xml
    return 'image/svg+xml'
  }
  
  // TIFF: starts with 49492a00 (Intel) or 4d4d002a (Motorola)
  if (hex.startsWith('49492a00') || hex.startsWith('4d4d002a')) {
    return 'image/tiff'
  }
  
  // AVIF: ftyp....avif
  if (hex.includes('66747970') && hex.includes('61766966')) {
    return 'image/avif'
  }
  
  // ICO: starts with 00000100
  if (hex.startsWith('00000100')) {
    return 'image/x-icon'
  }
  
  return null
}

/**
 * Process file server result and convert to data URL with correct MIME type
 * @param result Result from file server
 * @returns Data URL or original string
 */
export function processFileServerResult(result: FileServerResult): string {
  if (typeof result === 'string') {
    return result
  }
  
  // Check if content_type is not an image type and try to detect the actual image type
  let contentType = result.content_type
  if (!contentType.startsWith('image/') && result.content) {
    const mimeType = detectImageMimeType(result.content)
    if (mimeType) {
      contentType = mimeType
    }
  }
  
  return `data:${contentType};base64,${hexToBase64(result.content)}`
}