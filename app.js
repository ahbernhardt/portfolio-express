const express = require('express'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv').config(),
    mongoose = require('mongoose'),
    path = require('path'),
    compression = require('compression'),
    minify = require('express-minify'),
    moment = require('moment'),
    MongoClient = require('mongodb').MongoClient


//======================================
//          DATABASE
//======================================
// Connect to database
const option={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})

mongoose.connection.on("error", function(error) {
    console.log(error)
})

mongoose.connection.on("open", function() {
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
app.use(bodyParser.urlencoded({extended: true}));
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

app.use('/', indexRouter);
app.use('/featured', featuredRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/thanks', thanksRouter);

//=====================================
//          POST to mongodb atlas
//======================================

app.post('/thanks', function (req, res, next) {
    client.connect(err => {
        const contacts = client.db("contact_list").collection("contact");

        let contact = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            message: req.body.message,
            date: Date.now()
        };
        contacts.insertOne(contact, function(err, res) {
            if (err) throw err;
            console.log("1 contact inserted");
        });
        res.redirect('/thanks')
    });

})

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

module.exports = app;

/*==========================================
        Start Server
=============================================*/
app.listen(8080, () => {
    console.log(`server running on http://localhost:8080`);
});

