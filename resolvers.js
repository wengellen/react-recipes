const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (user, secret, expiresIn)=>{
    const {username, email} = user
    return jwt.sign({username,email}, secret, {expiresIn})
}

exports.resolvers = {
    Query:{
        getAllRecipes: async(root,args,{Recipe})=>{
            const allRecipes = await Recipe.find()
            return allRecipes
        },

        getCurrentUser: async(root, args, {currentUser, User})=>{
            console.log('currentUsre',currentUser)
            if(!currentUser){
                return null
            }
            const user = await User.findOne({username:currentUser.username})
            .populate({
                path:'favorites',
                model:'Recipe'
            })

            return user
        }
    },

    Mutation:{
        addRecipe:async(root, {name, description, category, instructions, useranme}, {Recipe}, info )=>{
            const newRecipe = await new Recipe({
                name, description, category, instructions, useranme
            }).save()

            return newRecipe
        },

        signinUser:async(root, {username, password}, {User})=>{
            const user = await User.findOne({username})
            if(!user){
                throw new Error('No User Found')
            }
            console.log("user.password",user.password)
            console.log("password.password",password)
            const isValidPassword = await bcrypt.compare(password, user.password)
            if(!isValidPassword){
                throw new Error('Password not valid')
            }
            return {token: createToken(user, process.env.SECRET, "1hr")}
        },

    signupUser:async(root, {username, email, password}, {User})=>{
        const user = await User.findOne({username})

        if(user){
            throw new Error('User already exist')
        }

        const newUser = await new User({
            username,
            email,
            password
        }).save()

        return {token: createToken(newUser, process.env.SECRET,'1hr')}
        }
    },

}