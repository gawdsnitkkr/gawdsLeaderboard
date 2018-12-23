const mongoose = require('mongoose');
const Scheman = mongoose.Schema;

const UserSchema = Scheman({
"login":String,
"avatar_url":String,
"html_url":String,
"name":String,
"bio":String,
"public_repos":Number,
"public_gists":Number,
"followers":Number,
"following":Number,
"year" : String,
"weekly_arr": Array,
"contributions":String,
"graph":String
});


module.exports = mongoose.model('users',UserSchema)