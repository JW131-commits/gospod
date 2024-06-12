const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RateSchema = new mongoose.Schema({
    rate : Number,
    text : String,
    filmId : {type : Schema.Types.ObjectId, ref : 'film'},
    authorId : {type : Schema.Types.ObjectId , ref : 'user'},
    date: {
        type: Date,
        default: () => new Date().setHours(0, 0, 0, 0) 
    }
    
 })

 module.exports = mongoose.model('rate' , RateSchema)

