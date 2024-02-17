const router = require('express').Router()
const userControllner = require('../controllers/userController')

router.post("/register", userControllner.register)
router.post("/login", userControllner.login)

module.exports = router