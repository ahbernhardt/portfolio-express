// Import mongoose
const mongoose = require("mongoose");

// Create Schema Instance
const ContactSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now,
    }
});

// create and export model
Contact = mongoose.model("contacts", ContactSchema);

module.exports = Contact;

