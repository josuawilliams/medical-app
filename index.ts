import { startExpress } from './src/loaders/express'
import { startMongoDb } from './src/loaders/mongoDB'
async function start(): Promise<void> {
  try {
    await startExpress()
    await startMongoDb()
  } catch (err) {
    console.log(err)
  }
}

start()
