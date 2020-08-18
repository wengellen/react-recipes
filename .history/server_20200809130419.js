const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('db connected'))
.catch(err=>console.error(err))

const app = express()

const PORT = process.env.PORT || 4444

app.listen(PORT, ()=>{
    console.log(`server listening on PORT ${PORT}`)
})