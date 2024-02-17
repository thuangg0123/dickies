const router = require('express').Router()
const userControllner = require('../controllers/userController')

router.post("/register", userControllner.register)

module.exports = router