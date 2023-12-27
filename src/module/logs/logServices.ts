import { LogModel } from '../../schema/logSchema'

const createLog = async (
  path: string,
  method: string,
  logData: any,
  flag: boolean
) => {
  try {
    const newLog = new LogModel()
    if (flag) {
      newLog.author = logData.data.id
      newLog.nama = logData.data.nama_admin
      newLog.action = {
        path,
        method
      }
      newLog.status = 'Success'
      newLog.message = logData.message
      newLog.statusCode = logData.status
    } else {
      newLog.author = logData.data.id
      newLog.nama = logData.data.nama_admin
      newLog.action = {
        path,
        method
      }
      newLog.status = 'Failed'
      newLog.message = logData.message
      newLog.statusCode = logData.status
    }
    await newLog.save()
  } catch (error: any) {
    return error
  }
}

export default createLog
