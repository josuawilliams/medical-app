import { Request, Response, NextFunction } from 'express'
import Jwt from 'jsonwebtoken'
import { AuthModel } from '../schema/authSchema'
declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

function responseAccessDenied(res: Response, message: string) {
  return res
    .status(401)
    .json({ status: 401, Message: message || 'Access Denied' })
}

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authentication-token')
    if (!token) throw Error('Access Denied - Token Missing')

    const accessToken: any = Jwt.verify(token, process.env.SECRET_KEY as string)

    const checkAuth = await AuthModel.findOne({ admin_token: token })
    if (!checkAuth) throw Error('Access Denied - Auth Missing')
    req.user = accessToken.data

    next()
  } catch (error: any) {
    if (error.message) return responseAccessDenied(res, error.message)
  }
}

export const auth = () => [checkToken]
