// // Export mongoose
const  mongoose = require("mongoose");

// //Assign MongoDB connection string to Uri and declare options settings
const uri = `mongodb+srv://anguyen0208:mongodbNguyen0208@final-project.dnkhb.mongodb.net/SEIS751_Final_Project?retryWrites=true&w=majority`;
// // Declare a variable named option and assign optional settings
const  options = {
    useNewUrlParser:  true,
    useUnifiedTopology:  true
};

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri, options)
    .then(() => {
        console.log("Database connection established!");
    },
    err  =>{
            console.error("Error connecting Database instance due to:", err);
    }
);

// module.exports = connectDB;
//

