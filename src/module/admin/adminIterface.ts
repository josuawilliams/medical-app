export interface adminValidatorType {
  nama_admin: string
  email: string
  divisi: string
  password: string
  nik: string
  jenis_kelamin: string
}

export type adminValidatorLogin = {
  _id: any
  nama_admin: string
  email: string
  divisi: string
  password: string
  nik: string
  jenis_kelamin: number
  login_attempt: number
  status_admin: string
}

export type ModifiedInterface = Omit<
  adminValidatorLogin,
  'password' | 'login_attempt'
>

export type adminType = {
  nama_admin: string
  email: string
  divisi: string
  password: string
  nik: string
  jenis_kelamin: number
  login_attempt: number
  status_admin: 'Tidak Aktif' | 'Aktif'
  timeOfEntry?: Date
  refresh_token?: string
}

export interface adminCreate {
  nama_admin: string
  email: string
  divisi: 'Admin'
  password: string
  nik: string
  jenis_kelamin: number
}
