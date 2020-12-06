// import Contacts Model
const  contactModel = require("../models/contact-model");

// DEFINE CONTROLLER FUNCTIONS
module.exports={
    contactForm:function(req,res){
        res.render('contact')
    },
    addContact:function(req, res){
        const inputData= req.body;
        contactModel.addContact(inputData, function(){
            res.render('contact')
            console.log("Added contact to the list");
        });
    }
}
// exports.createNewContact = (req, res) => {
//     let  newContact = new Contact (req.body);
//     newContact.save((err, contact) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         res.status(201).json(contact);
//     });
// };
// exports.readContact = (req, res, body) =>{
//     Contact.findById(req.params.id, (err,contact) =>{
//         if(err){
//             res.status(500).send(err);
//         }
//         res.status(200).json(contact)
//     })
// }
// // updateTodo function - To update contact status by id
// exports.updateContact = (req, res) => {
//     Contact.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, contact) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         res.status(200).json(contact);
//     });
// };
// // deleteTodo function - To delete contact by id
// exports.deleteContact = async ( req, res) => {
//     await  Contact.deleteOne({ _id:req.params.id }, (err) => {
//         if (err) {
//             return res.status(404).send(err);
//         }
//         res.status(200).json({ message:"Contact successfully deleted"});
//     });
// };