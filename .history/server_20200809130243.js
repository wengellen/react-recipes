const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 4444

app.listen(PORT, ()=>{
    console.log(`server listening on PORT ${PORT}`)
})