import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  nama_admin: { type: String, required: true, trim: true },
  divisi: {
    type: String,
    enum: ['Admin']
  },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false }
  },
  login_attempt: {
    type: Number,
    default: 0
  }
})

export const AdminModel = mongoose.model('Admin', AdminSchema)
