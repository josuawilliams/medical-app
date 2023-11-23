const bcrypt = require('bcryptjs')
class encryption {
  static hashEncryption(password: string) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    return hash
  }
}

export default encryption
