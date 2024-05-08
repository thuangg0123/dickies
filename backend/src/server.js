const express = require("express")
require('dotenv').config()
var cookieParser = require('cookie-parser')
var cors = require('cors')

const dbConnect = require("../build/config/dbConnect")
const { initRoutes } = require('../build/routes/index')

const app = express()
app.use(cors({
    origin: process.env.URL_CLIENT,
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
    credentials: true
}))
app.use(cookieParser())

const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect()
initRoutes(app)

app.listen(port, () => {
    console.log(`Sever is running on the port: ` + port)
})