const bcrypt = require('bcryptjs')
const crypto = require('crypto')

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

  static decrypt(text: string) {
    let textParts = text.split(':')
    let iv = Buffer.from(textParts.shift() as any, 'hex')

    let encryptedText = Buffer.from(textParts.join(':'), 'hex')
    let decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(process.env.ENCRYPTION_KEY as string),
      iv
    )

    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
  }
}

export default encryption
