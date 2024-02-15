require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')
// express Server
const pfServer = express()

// available file/folder from one server to another
pfServer.use('/uploads',express.static('./uploads'))

// use cors in server
pfServer.use(cors())

// use json-parser (middleware : to convert json to js format)
pfServer.use(express.json())

// router should be use after cors
pfServer.use(router)

const PORT = 3000

// to host pfServer : localhost:3000
pfServer.listen(PORT,()=>{
    console.log(`Project Server Started at port: ${PORT}`);
})

// to resolve get http request  to http://location:3000
pfServer.get('/',(req,res)=>{
    res.send("<h1>Project Server Started... and waiting for client request</h1>")
})



