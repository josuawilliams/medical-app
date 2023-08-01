import mongoose from 'mongoose'
import 'dotenv/config'

async function startMongoDb(): Promise<void> {
  try {
    const Database:string = process.env.DB_CONFIG ?? ""
    await mongoose.connect(Database)
  } catch (err) {
    console.log(err)
  }
}

export {startMongoDb}