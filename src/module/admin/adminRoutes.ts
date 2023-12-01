'use strict'

import express from 'express'
const admin = require('./adminController')
const Router = express.Router()

Router.post('/login', admin.adminLogin)
Router.post('/register', admin.adminRegister)

module.exports = Router
