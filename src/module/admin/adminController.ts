'use strict'

import { Request, Response, NextFunction } from 'express'
import adminValidator from './adminValidator'
import response from '../../helper/response'

exports.adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
}

exports.adminRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataValidation = adminValidator.newAdminValidator(req.body)
    if (!dataValidation?.status)
      return response.error(
        dataValidation?.message ?? '',
        res,
        dataValidation?.statusCode ?? 500
      )
    // const dataValidation
  } catch (error) {}
}
