import createLog from '../module/logs/logServices'

function getResData(res: any, code: number, message: string, data: any) {
  const path = `${res.req.protocol}s://${res.req.headers.host}${res.req.originalUrl}`
  const method = res.req.method
  const logData = {
    status: code,
    data,
    message
  }
  return {
    path,
    method,
    logData
  }
}

async function creatingLog(
  path: string,
  method: string,
  logData: any,
  flag: boolean
) {
  try {
    if (flag) {
      await createLog(path, method, logData, true)
    } else {
      await createLog(path, method, logData, false)
    }
  } catch (err: any) {
    console.log('Error Create Log')
  }
}

const error = async (message: string, res: any, code: number) => {
  const { path, method, logData } = getResData(res, code, message, '')
  await creatingLog(path, method, logData, false)

  return res.status(code).json(logData)
}

const successResultService = async (
  data: any,
  message: string | any,
  res: any,
  code: number
) => {
  const { path, method, logData } = getResData(res, code, message, data)
  await creatingLog(path, method, logData, true)

  return res.status(code).json(logData)
}

const errorService = (status: boolean, message: string, statusCode: number) => {
  return {
    status,
    message,
    statusCode
  }
}



const successService = (
  status: boolean,
  message: string | any,
  statusCode: number
) => {
  return {
    status,
    message,
    statusCode
  }
}

export = { errorService, error, successService, successResultService }
