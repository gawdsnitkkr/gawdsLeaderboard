const mongoose = require('mongoose');
const Scheman = mongoose.Schema;

const UserSchema = Scheman({
"login":String,
"avatar_url":String,
"html_url":String,
"gists_url":String,
"organizations_url":String,
"repos_url":String,
"name":String,
"bio":String,
"public_repos":Number,
"public_gists":Number,
"followers":Number,
"following":Number,
"year" : String,
"contributions":Number,
"graph":String
});


module.exports = mongoose.model('posts',UserSchema)