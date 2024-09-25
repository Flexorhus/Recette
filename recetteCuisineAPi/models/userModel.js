const mongoose = require('mongoose')

const userSchema = new mongoose.mongoose.Schema({
    username: {
        type: String,
        required: [true, "L'username est requis"]
    },
    email: {
        type: String,
        required: [true, "le email est requis"]
    },
    password: {
        type: String,
        required: [true, "le email est requis"]
    },
    recettes: [
        { type: mongoose.Schema.Types.ObjectId, ref: "recettes" }
    ]
})

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;