const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    page:'Portfolio Website', menuId:'home',
  });
});
//
// router.get('/featured', function(req, res) {
//   res.render('featured', {
//     title:'Featured',
//     projects: projects
//   });
// });
//
// router.get('/about', function(req, res) {
//   res.render('about', {title:'About'});
// });
//
//
// // CONTACT ROUTES
// router.get('/contact', function(req, res) {
//   res.render('contact', {title:'Contact'});
// });
//
// router.post('/contact', async (req, res) => {
//   let contact = await new Contact({
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       email: req.body.email,
//       message: req.body.message,
//   });
//   try {
//     contact = await contact.save();
//     contacts.push(contact);
//     res.redirect('/thanks');
//   } catch (e) {
//     console.log(e);
//     res.render('/404');
//   }
// });
//
// // THANK YOU ROUTES
// router.get('/thanks', function(req, res) {
//   res.render('thanks', {title:'Thank You'});
// });
//
// // ADMIN
// router.get('/admin', async (req, res) =>{
//   const contacts = await contactModel.find({});
//   try {
//     res.send(contacts);
//   } catch (err) {
//     res.status(500).send(err);
//   }
//   res.render('admin', {
//     title:'Admin',
//     contacts: contacts
//   });
// });

module.exports = router;
