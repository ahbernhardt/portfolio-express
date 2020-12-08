require('dotenv').config()
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    compression = require('compression'),
    minify = require('express-minify'),
    MongoClient = require('mongodb').MongoClient,
    session = require('express-session');


//======================================
//          DATABASE
//======================================
// Connect to database
const option={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}

const client = new MongoClient(process.env.MONGODB_URI, option)
mongoose.connect(process.env.MONGODB_URI, option)

mongoose.connection.on("error", function(error) {
    console.log(error)
})

mongoose.connection.once("open", function() {
    console.log("Connected to MongoDB Atlas database.")
})

//======================================
//          APP CONFIG
//======================================
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//======================================
//          MIDDLEWARE
//======================================
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(compression());
app.use(minify());
app.use(express.static('public'));

//=====================================
//          ROUTES
//======================================
const indexRouter = require('./routes/index');
const featuredRouter = require('./routes/featured');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const thanksRouter = require('./routes/thanks');
const loginRouter = require('./routes/login');

app.use('/', indexRouter);
app.use('/featured', featuredRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/thanks', thanksRouter);
app.use('/login', loginRouter);

//=====================================
//          POST to mongodb atlas
//======================================
const Contact = require('./models/contact-model')
app.post('/thanks', function (req, res, next) {
    client.connect(err => {
        const contacts = client.db("SEIS751_Final_Project").collection("contacts");

        const {firstname, lastname, email, message} = req.body; //getting insert form contact form
        const newContact = new Contact({firstname, lastname, email, message}) // create new contact object
        contacts.insertOne(newContact ,function(err, res) {
            if (err) throw err;
            console.log("1 contact inserted");
            return client.close();
        });
        res.redirect('/thanks')
    })
});

app.get("/admin", (req, res) => {
    client.connect( err =>{
            let contactCol = client.db("SEIS751_Final_Project").collection("contacts");
            Contact.find({}, function(err, allContact){
                if(err){
                    res.render('/404')
                } else {
                    contactCol = allContact;
                    res.render('admin',{
                        page:'Admin Page',
                        menuId:'admin',
                        contacts: allContact
                    })
                }
                console.log(allContact);
            });
        })

});


//============================================================
//         ADMIN Login (authentication and authorization)
//         to to see admin page
//============================================================
app.post('/login', function (req, res) {
    const {username, password} = req.body; //getting insert form contact form
        if(username === process.env.USERNAME && password !== process.env.PASSWORD){
            res.redirect('/404')
            console.log('Invalid Inputs')
        }
        if(username !== process.env.USERNAME && password !== process.env.PASSWORD){
            res.redirect('/404')
            console.log('Invalid Inputs')
        }
        if(username === process.env.USERNAME && password === process.env.PASSWORD){
            res.redirect('/admin')
            console.log("Success login to Admin");
        }
})

//======================================================
//          ERROR HANDLER
//======================================================

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('404', {
        page: '404', menuId: '404',
    });
});

module.exports = app;

/*==========================================
        Start Server
=============================================*/
app.listen(8080, () => {
    console.log(`server running on http://localhost:8080`);
});

