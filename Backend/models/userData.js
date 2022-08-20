// Here we will define the schema for the user model
const {Schema, model} = require('../connection');

const myschema = new Schema({
    title : String,
    description : String,
    stock : Number,
    price : Number,
    review : Number,
    ratings : Number,
});

module.exports = model('userDataColletion', myschema);