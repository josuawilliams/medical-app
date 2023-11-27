import { ModifiedInterface } from '../module/admin/adminIterface'
import response from './response'
import Jwt from 'jsonwebtoken'

const passwordValidation = (password: string) => {
  if (password.length < 8)
    return response.errorService(false, 'Password minimum 8 karakter', 408)

  const lowerCase = new RegExp('^(?=.*[a-z])')
  const upperCase = new RegExp('(?=.*[A-Z])')
  const numeric = new RegExp('(?=.*[0-9])')
  const symbol = new RegExp('(?=.*[!@#$%^&*])')

  if (lowerCase.test(password) === false)
    return response.errorService(
      false,
      'Mohon masukkan kata sandi dengan minimal 1 huruf kecil',
      408
    )
  if (upperCase.test(password) === false)
    return response.errorService(
      false,
      'Mohon masukkan kata sandi dengan minimal 1 huruf besar',
      408
    )
  if (numeric.test(password) === false)
    return response.errorService(
      false,
      'Mohon masukkan kata sandi dengan minimal 1 angka',
      408
    )
  if (symbol.test(password) === false)
    return response.errorService(
      false,
      'Mohon masukkan kata sandi dengan minimal 1 simbol',
      408
    )

  return response.successService(true, 'Validasi password berhasil', 200)
}

const adminToken = (data: ModifiedInterface) => {
  const token = Jwt.sign({ data }, process.env.SECRET_KEY as string, {
    algorithm: 'HS256',
    expiresIn: '10s'
  })
  return token
}

export { passwordValidation, adminToken }
