export interface adminValidatorType {
  nama_admin: string
  email: string
  divisi: string
  password: string
  nik: string
  jenis_kelamin: string
}

export interface adminCreate {
  nama_admin: string
  email: string
  divisi: 'Admin'
  password: string
  nik: string
  jenis_kelamin: number
}
