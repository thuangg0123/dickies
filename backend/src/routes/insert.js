const router = require('express').Router()
const insertData = require('../controllers/insertData')

router.post('/', insertData.insertProduct)
router.post('/cate', insertData.insertCategory)

module.exports = router