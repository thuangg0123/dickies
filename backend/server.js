const express = require("express")
require('dotenv').config()
var cookieParser = require('cookie-parser')

const dbConnect = require("./config/dbConnect")
const { initRoutes } = require('./routes/index')

const app = express()
app.use(cookieParser())

const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect()
initRoutes(app)

app.listen(port, () => {
    console.log(`Sever is running on the port: ` + port)
})