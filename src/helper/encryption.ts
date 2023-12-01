const bcrypt = require('bcryptjs')
class encryption {
  static hashEncryption(password: string) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    return hash
  }

  static comparePassword(password: string, hash: string) {
    const resultPassword = bcrypt.compareSync(password, hash)
    return resultPassword
  }
}

export default encryption
