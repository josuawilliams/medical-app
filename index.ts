import { startExpress } from './src/loaders/express'

async function start(): Promise<void> {
  try {
    await startExpress()
  } catch (err) {
    console.log(err)
  }
}

start()
