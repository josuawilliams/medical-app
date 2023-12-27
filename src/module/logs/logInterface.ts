export type LogType = {
  author: string
  timestamps: Date
  action: Action
  status: 'Success' | 'Failed'
  message: string
  nama: string
  statusCode: number
}

type Action = {
  path: string
  method: string
}
