var mongoose = require("mongoose");

var userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    phone: {
        unique: true,
        required: true,
        type: Number
    }
})

module.exports = mongoose.model("Employe", userschema);