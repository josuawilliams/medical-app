import { AdminModel } from '../../schema/adminSchema'
import { AuthModel } from '../../schema/authSchema'
import encryption from '../../helper/encryption'
import response from '../../helper/response'
import { adminCreate, adminType, adminValidatorLogin } from './adminIterface'

const checkingAdmin = async (email: string) => {
  try {
    const check = await AdminModel.findOne({ email: email }).lean()
    if (check) return response.errorService(false, 'Email Sudah Terdaftar', 408)

    return response.successService(true, 'Email Tidak Terdaftar', 200)
  } catch (err: any) {
    return response.errorService(false, err.message, 408)
  }
}

const checkingAdminEmail = async (email: string) => {
  try {
    const check = await AdminModel.findOne({ email: email }).lean()
    if (check) return response.successService(true, check, 200)

    return response.errorService(false, 'Pengguna Tidak Terdaftar', 408)
  } catch (err: any) {
    return response.errorService(false, err.message, 408)
  }
}

const checkingNIKAdmin = async (nik: string) => {
  try {
    const check = await AdminModel.findOne({ nik: nik }).lean()
    if (check) return response.errorService(false, 'NIK Sudah Terdaftar', 408)

    return response.successService(true, 'NIK Tidak Terdaftar', 200)
  } catch (err: any) {
    return response.errorService(false, err.message, 408)
  }
}

const loginAttempt = async (admin: adminValidatorLogin) => {
  try {
    let checkId = await AdminModel.findById(admin._id)
    if (checkId) {
      checkId.login_attempt += 1
      checkId.save()
      return response.errorService(
        false,
        `Email/password salah, anda memiliki kesempatan ${
          5 - checkId.login_attempt
        } lagi untuk mencoba kembali`,
        408
      )
    }
  } catch (err: any) {
    return response.errorService(false, err.message, 408)
  }
}

const createAdmin = async (data: adminCreate) => {
  try {
    const hash = encryption.hashEncryption(data.password)
    let newAdmin = new AdminModel()
    newAdmin.nama_admin = data.nama_admin
    newAdmin.email = data.email
    newAdmin.nik = data.nik
    newAdmin.divisi = data.divisi
    newAdmin.password = hash
    newAdmin.jenis_kelamin = data.jenis_kelamin

    await newAdmin.save()
    return response.successService(true, newAdmin, 200)
  } catch (error: any) {
    return response.errorService(false, error.message, 408)
  }
}

const saveAuthAndResetLoginAttempt = async (
  admin: adminValidatorLogin,
  token: string
) => {
  try {
    let checkId = await AdminModel.findById(admin._id)
    if (checkId) {
      checkId.login_attempt = 0
      checkId.timeOfEntry = new Date()
      await checkId.save()
    } else {
      return response.errorService(false, 'Id Pengguna Tidak Ditemukan', 408)
    }

    const auth = new AuthModel({
      admin_token: token,
      author: admin._id
    })
    await auth.save()

    return response.successService(true, "Berhasil Login", 200)
  } catch (err: any) {
    return response.errorService(false, err.message, 408)
  }
}

module.exports = {
  checkingAdmin,
  createAdmin,
  checkingNIKAdmin,
  checkingAdminEmail,
  loginAttempt,
  saveAuthAndResetLoginAttempt
}
