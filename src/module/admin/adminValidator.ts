import { adminValidatorLogin, adminValidatorType } from './adminIterface'
import response from '../../helper/response'
import { passwordValidation } from '../../helper/globalHelper'
import encryption from '../../helper/encryption'
const { loginAttempt } = require('./adminServices')
class adminValidator {
  static newAdminValidator(data: adminValidatorType) {
    try {
      if (!data.nama_admin)
        return response.errorService(false, 'Silakan Masukkan Nama Anda', 408)
      if (!data.email)
        return response.errorService(false, 'Silakan Isi Email Anda', 408)
      if (!data.divisi)
        return response.errorService(false, 'Silakan Pilih Divisi', 408)
      if (!data.password)
        return response.errorService(false, 'Silakan Masukkan Password', 408)
      if (!data.jenis_kelamin)
        return response.errorService(
          false,
          'Silakan Masukkan Jenis Kelamin',
          408
        )
      if (!data.nik)
        return response.errorService(false, 'Silakan Masukkan Password', 408)
      if (data.nik.length < 16)
        return response.errorService(false, 'NIK minimum 16 karakter', 408)

      const passwordValidator = passwordValidation(data.password)
      if (!passwordValidator.status)
        return response.errorService(false, passwordValidator.message, 408)

      return response.successService(true, 'Validasi berhasil', 200)
    } catch (error: any) {
      return response.errorService(false, error.message, 500)
    }
  }

  static async adminLoginValidator(
    data: { email: string; password: string },
    admin: adminValidatorLogin
  ) {
    try {
      if (!data.email)
        return response.errorService(false, 'Mohon masukkan email', 408)
      if (!data.password)
        return response.errorService(false, 'Mohon masukkan password', 408)

      if (admin.login_attempt > 4) {
        return response.errorService(
          false,
          'Akun Anda Terblokir, Mohon Hubungi Pihak Terkait',
          401
        )
      }
      if (admin.status_admin === 'Tidak Aktif')
        return response.errorService(
          false,
          'Akun dinonaktifkan, mohon hubungi tim terkait',
          401
        )

      if (!admin) {
        const isLoginAttempt = await loginAttempt(admin)
        return response.errorService(
          isLoginAttempt.status,
          isLoginAttempt.message,
          408
        )
      }

      const passwordValidation = encryption.comparePassword(
        data.password,
        admin.password
      )

      if (!passwordValidation) {
        const isLoginAttempt = await loginAttempt(admin)
        return response.errorService(
          isLoginAttempt.status,
          isLoginAttempt.message,
          408
        )
      }

      return response.successService(true, 'Validasi Berhasil', 200)
    } catch (error: any) {
      return response.errorService(false, error.message, 500)
    }
  }
}

export default adminValidator
