import { LogType } from '../module/logs/logInterface'
import mongoose, { Document } from 'mongoose'

export interface LogTypeModel extends LogType, Document {}

const LogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId
    },
    nama: String,
    action: {
      path: String,
      method: String
    },
    status: {
      type: String,
      enum: ['Success', 'Failed']
    },
    message: String,
    statusCode: Number
  },
  {
    timestamps: true
  }
)

export const LogModel = mongoose.model<LogTypeModel>('log', LogSchema)
