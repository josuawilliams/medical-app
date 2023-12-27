'use strict'

import express from 'express'
import { authentication } from '../../helper/auth'
import { decryptData } from '../../middleware/decryptData'
const admin = require('./adminController')
const Router = express.Router()

Router.post('/login', decryptData, admin.adminLogin)
Router.post('/register', admin.adminRegister)
Router.get('/adminId', authentication, admin.adminFindOne)

module.exports = Router
