// Here we will define the schema for the user model
const {Schema, model} = require('../connection');

const myschema = new Schema({
 username : String,
 email : String,
 password : String,
});

module.exports = model('usercollection', myschema);