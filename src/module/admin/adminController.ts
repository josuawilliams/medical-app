'use strict'

import { Request, Response, NextFunction } from 'express'
import adminValidator from './adminValidator'
import response from '../../helper/response'
const {
  checkingAdmin,
  createAdmin,
  checkingNIKAdmin
} = require('./adminServices')

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

    let data = {
      nama_admin: req.body.nama_admin,
      email: req.body.email,
      divisi: req.body.divisi,
      password: req.body.password,
      jenis_kelamin: parseInt(req.body.jenis_kelamin),
      nik: req.body.nik
    }
    const checkAdmin = await checkingAdmin(data.email)
    if (!checkAdmin.status) return response.error(checkAdmin.message, res, 408)

    const checkNIK = await checkingNIKAdmin(data.nik)
    if (!checkNIK.status) return response.error(checkNIK.message, res, 408)

    const newAdmin = await createAdmin(data)
    if (!newAdmin.status) return response.error(newAdmin.message, res, 408)

    return response.successResultService('Berhasil Mendaftar', res, 200)
  } catch (error: any) {
    return response.errorService(false, error.message, 500)
  }
}
