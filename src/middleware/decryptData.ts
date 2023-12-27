import { Request, Response, NextFunction } from 'express'
import encryption from '../helper/encryption'
export const decryptData = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const { body } = req

    const decryptedBody: any = {}
    for (const key in body) {
      const value = body[key]
      const decryptData = encryption.decrypt(value)
      decryptedBody[key] = decryptData
    }

    req.body = decryptedBody
    next()
  } catch (err: any) {
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || 'Internal Server Error' })
  }
}
