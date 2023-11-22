import { adminValidatorType } from './adminIterface'
import response from '../../helper/response'

class adminValidator {
  static newAdminValidator(data: adminValidatorType) {
    try {
      if (!data.nama_admin)
        return response.errorService(false, 'Silakan Masukkan Nama Anda', 408)
      if (!data.email)
        return response.errorService(false, 'Silakan Isi Email Anda', 408)
    } catch (error: any) {
      return response.errorService(false, error.message, 500)
    }
  }
}

export default adminValidator
