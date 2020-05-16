import { createHash } from 'crypto'

export default (): void => {}

export const md5 = (content: String): String => {
  return createHash('md5').update(content as any).digest('hex')
}
