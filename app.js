// load dependencies
const express = require('express'),
    bodyParser = require('body-parser'),
    nodeMailer = require('node-mailer'),
    dotenv = require('dotenv'),
    compression = require('compression'),
    minify = require('express-minify'),
    hljs = require('highlight.js'),
    moment = require('moment');

// load language json
const projects = require('./public/data/projects.json');
const path = require("ejs");

// Destructure dependencies list from package.json
const {dependencies} = require('./package.json');
const depArray = Object.keys(dependencies);

// set up environment variables
dotenv.config();

// initialize app:
const app = express();

// app config

app.set('view engine', 'ejs');

// app middleware
app.use(compression());
app.use(minify());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));


/*=======================
      GET PAGES
=======================*/

// Index
app.get('/', (req, res) => {
    res.render('index', {
        page:'Portfolio Website', menuId:'home',
    });
});

// About
app.get('/about', (req, res) => {
    res.render('about', {
        page:'About', menuId:'about',
    });
});


// Projects
app.get('/featured', (req, res) => {
    // const projects = {latest:[projects], others:[projects]}
    res.render('featured', {
        page:'Featured', menuId:'featured',
        projects: projects
    });
});

// Contact
app.get('/contact', (req, res) => {
    res.render('contact', {
        page:'Contact', menuId:'contact',
        message: null
    });
});

app.post('/contact', (req, res) => {
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    let mailOptions = {
        from: '"Anh Nguyen" <a.nguyen0208@gmail.com>', // sender address
        to: req.body.message.email, // list of receivers
        subject: 'Your Message', // Subject line
        text: req.body.message.text, // plain text body
        html: `${req.body.message.text}` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('contact', {
            message: req.body.message
        });
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('404', {
        page: '404', menuId: '404',
    });
});
/*=======================
    Start Server
=======================*/
app.listen(8080, () => {
    console.log(`server running on http://localhost:8080`);
    // console.log(`server running on http://ec2-34-199-92-98.compute-1.amazonaws.com:8080/`);
});
