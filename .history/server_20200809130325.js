const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.conntect(process.env.MONGO_URI)
.then(()=> console.log('db connected'))

const app = express()

const PORT = process.env.PORT || 4444

app.listen(PORT, ()=>{
    console.log(`server listening on PORT ${PORT}`)
})