import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  nama_admin: { type: String, required: true, trim: true },
  divisi: {
    type: String,
    enum: ['Admin']
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 8,
    trim: true
  },
  timeOfEntry: {
    type: Date
  },
  salt: { type: String, select: false },
  login_attempt: {
    type: Number,
    default: 0
  },
  status_admin: {
    type: String,
    enum: ['Tidak Aktif', 'Aktif'],
    default: 'Aktif'
  },
  refresh_token: {
    type: String
  },
  jenis_kelamin: {
    type: Number,
    min: 1,
    max: 2 //1 = Laki-laki, 2 = perempuan
  }
})

export const AdminModel = mongoose.model('Admin', AdminSchema)
