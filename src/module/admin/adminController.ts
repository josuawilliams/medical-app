'use strict'

import { Request, Response, NextFunction } from 'express'
import adminValidator from './adminValidator'
import { adminToken } from '../../helper/globalHelper'
import response from '../../helper/response'
const { saveAuthAndResetLoginAttempt } = require('./adminServices')

const {
  checkingAdmin,
  createAdmin,
  checkingNIKAdmin,
  checkingAdminEmail
} = require('./adminServices')

exports.adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      throw { message: 'Mohon masukkan email dan password', statusCode: 408 }

    const emailAdmin = await checkingAdminEmail(email)
    if (!emailAdmin.status)
      throw { message: emailAdmin.message, statusCode: 408 }
    const isLoginValid = await adminValidator.adminLoginValidator(
      { email, password },
      emailAdmin.message
    )
    if (!isLoginValid?.status)
      throw { message: isLoginValid?.message, statusCode: 408 }

    delete emailAdmin.message.password
    delete emailAdmin.message.login_attempt
    const token = adminToken(emailAdmin.message)

    const saveAuth = await saveAuthAndResetLoginAttempt(
      emailAdmin.message,
      token
    )
    if (!saveAuth.status) throw { message: saveAuth.message, statusCode: 408 }

    const dataDetail = {
      id: emailAdmin.message._id,
      nama_admin: emailAdmin.message.nama_admin,
      email: emailAdmin.message.email,
      divisi: emailAdmin.message.divisi,
      admin_token: token
    }
    return response.successResultService(dataDetail as any, res, 200)
  } catch (error: any) {
    return response.error(error.message, res, error.statusCode || 500)
  }
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
