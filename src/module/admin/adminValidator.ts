import { adminValidatorType } from './adminIterface'
import response from '../../helper/response'
import passwordValidation from '../../helper/globalHelper'

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
}

export default adminValidator
