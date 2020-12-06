// Import mongoose
const mongoose = require("mongoose");
// require('config/db');
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
        default:Date.now
    }
});

// create and export model
ContactTable = mongoose.model("Contacts", ContactSchema);

module.exports = {
    addContact: function (inputData, callback){
        let contactData = new ContactTable(inputData);
        contactData.save(function (err, data){
            if(err) throw err;
            return callback(data);
        })
    }
}
