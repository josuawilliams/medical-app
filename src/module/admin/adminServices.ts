import { AdminModel } from '../../admin/adminSchema'
import encryption from '../../helper/encryption'
import response from '../../helper/response'
import { adminCreate } from './adminIterface'

const checkingAdmin = async (email: string) => {
  try {
    const check = await AdminModel.findOne({ email: email }).lean()
    if (check) return response.errorService(false, 'Email Sudah Terdaftar', 408)

    return response.successService(true, 'Email Tidak Terdaftar', 200)
  } catch (err) {}
}

const checkingNIKAdmin = async (nik: string) => {
  try {
    const check = await AdminModel.findOne({ nik: nik }).lean()
    if (check) return response.errorService(false, 'NIK Sudah Terdaftar', 408)

    return response.successService(true, 'NIK Tidak Terdaftar', 200)
  } catch (err) {}
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

module.exports = { checkingAdmin, createAdmin, checkingNIKAdmin }
