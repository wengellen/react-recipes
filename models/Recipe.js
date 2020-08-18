const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    name:{ type:String, required:true},
    category:{ type:String, required:true},
    description:{ type:String, required:true},
    instructions:{ type:String, required:true},
    createdDate:{ type:Date,deafult:Date.now},
    likes:{ type:Number,deafult:0},
    username:{ type:String}
})

module.exports = mongoose.model("Recipe", RecipeSchema)