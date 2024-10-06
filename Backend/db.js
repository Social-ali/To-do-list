const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect('mongodb://localhost:27017/ibook', { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log('MongoDB connected successfully to ibook'))
    .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = connectToMongo;


