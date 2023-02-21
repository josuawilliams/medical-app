const express = require('express')
const router = express.Router()
const Controller = require("../Controller/controller")

router.post("/register-admin", Controller.registerAdmin)

module.exports = router