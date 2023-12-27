import mongoose from 'mongoose'
import 'dotenv/config'
import { magenta } from 'colors'

async function startMongoDb(): Promise<void> {
  try {
    const Database: string = process.env.DB_CONFIG ?? ''
    await mongoose.connect(Database)
    console.log(magenta('MongoDB connected successfully'))
  } catch (err) {
    console.log(err)
  }
}

export { startMongoDb }
