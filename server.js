const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const Recipe = require('./models/Recipe')
const User = require('./models/User')
require('dotenv').config({path:'variable.env'})
const {typeDefs} = require('./schema')
const {resolvers} = require('./resolvers')

const {graphiqlExpress, graphqlExpress} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
.then(()=> console.log('db connected'))
.catch(err=>console.error(err))

const app = express()

const corsOptions = {
    origin:'http://localhost:3000',
    credentials:true

}
app.use(cors(corsOptions))


app.use(async (req,res,next) =>{
    const token = req.headers['authorization']
    console.log('toekn',token)
    if(token!=="null"){
        try{
            const currentUser = await jwt.verify(token, process.env.SECRET)
            console.log('currentUser', currentUser)
            req.currentUser = currentUser
        }catch(err){
            console.error(err)
        }
    }
    next()
})

// Create Craphiql application
app.use('/graphiql', graphiqlExpress({endpointURL:'/graphql'}

))



// Connect Schemas to Graphql
app.use('/graphql', 
    bodyParser.json(),
    graphqlExpress(({currentUser})=>({
    schema,
    context:{
        Recipe,
        User,
        currentUser
    }
})))

const PORT = process.env.PORT || 4444

app.listen(PORT, ()=>{
    console.log(`server listening on PORT ${PORT}`)
})