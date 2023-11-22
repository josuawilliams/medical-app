// exports.passwordValidation = (password) => {
//   if (password.length < 8)
//     return response.errorService(false, 'Password minimum 8 karakter')

//   const lowerCase = new RegExp('^(?=.*[a-z])')
//   const upperCase = new RegExp('(?=.*[A-Z])')
//   const numeric = new RegExp('(?=.*[0-9])')
//   const symbol = new RegExp('(?=.*[!@#$%^&*])')

// if (lowerCase.test(password) === false) return response.errorService(false, 'Mohon masukkan kata sandi dengan minimal 1 huruf kecil')
// if (upperCase.test(password) === false) return response.errorService(false, 'Mohon masukkan kata sandi dengan minimal 1 huruf besar')
// if (numeric.test(password) === false) return response.errorService(false, 'Mohon masukkan kata sandi dengan minimal 1 angka')
// if (symbol.test(password) === false) return response.errorService(false, 'Mohon masukkan kata sandi dengan minimal 1 simbol')

// return response.successService(true, 'Validasi password berhasil')
// }
