const mongoose = require('mongoose');

const url = "mongodb+srv://mmm:mmm@cluster0.gvyon.mongodb.net/mymongodb?retryWrites=true&w=majority"

// Promise

mongoose.connect(url)
.then(() => {
    console.log('Connected to database');
})
.catch((err) => {
    console.error(err);
});

module.exports = mongoose;