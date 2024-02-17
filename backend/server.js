const express = require("express")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`Sever is running on the port: ` + port)
})