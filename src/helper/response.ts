function getResData(res: any, code: number, message: string) {
  const path = `${res.req.protocol}s://${res.req.headers.host}${res.req.originalUrl}`
  const method = res.req.method
  const logData = {
    status: code,
    message
  }
  return {
    path,
    method,
    logData
  }
}

const error = async (message: string, res: any, code: number) => {
  const { path, method, logData } = getResData(res, code, message)

  return res.status(code).json(logData)
}
const successResultService = async (
  message: string,
  res: any,
  code: number
) => {
  const { path, method, logData } = getResData(res, code, message)

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
