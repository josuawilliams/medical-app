import mongoose, { Document } from 'mongoose'
import { AuthType } from '../module/auth/authInterface'

export interface AuthTypeModel extends AuthType, Document {}

const AuthSchema = new mongoose.Schema({
  admin_token: { type: String },
  author: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

export const AuthModel = mongoose.model<AuthTypeModel>('auth', AuthSchema)
