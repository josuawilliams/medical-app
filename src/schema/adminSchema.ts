import mongoose, { Document } from 'mongoose'
import { adminType } from '../module/admin/adminIterface'

export interface adminTypeModel extends adminType, Document {}

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  nik: { type: String, required: true },
  nama_admin: { type: String, required: true, trim: true },
  divisi: {
    type: String,
    enum: ['Admin']
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true
  },
  timeOfEntry: {
    type: Date
  },
  login_attempt: {
    type: Number,
    default: 0
  },
  status_admin: {
    type: String,
    enum: ['Tidak Aktif', 'Aktif'],
    default: 'Aktif'
  },
  admin_token: {
    type: String
  },
  jenis_kelamin: {
    type: Number,
    require: true,
    min: 1,
    max: 2 //1 = Laki-laki, 2 = perempuan
  }
})

export const AdminModel = mongoose.model<adminTypeModel>('admins', AdminSchema)
