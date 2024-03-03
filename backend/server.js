const express = require("express")
require('dotenv').config()
var cookieParser = require('cookie-parser')
var cors = require('cors')

const dbConnect = require("./config/dbConnect")
const { initRoutes } = require('./routes/index')

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS']
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