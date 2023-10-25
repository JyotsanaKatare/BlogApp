
require('./models/config')
const dotenv = require('dotenv')
const express = require('express')
const bodyparser = require('body-parser')
const router = require('./routes/mainRoutes')
dotenv.config()
const app = express()
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.urlencoded({ extended: false }))

app.use("/", router)
const server = app.listen(process.env.port, function (req, res) {
    console.log(`App is runnning on port no : ${process.env.port}`)
})

module.exports = server
