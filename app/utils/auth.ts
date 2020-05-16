import { Request, Response } from 'express'

import { md5 } from './helpers'

export default (): void => { }

export const auth = async (req: Request, res: Response): Promise<any> => {
  try {
    const token: String = md5(JSON.stringify({ headers: req.headers, time: Date.now() }))
    // Implement login methods
    return res.json({ success: true, token })
  } catch (error) {
    return res.json({ success: false })
  }
}
