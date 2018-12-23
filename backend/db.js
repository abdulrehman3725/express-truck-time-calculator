const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express',{useNewUrlParser:true},(err) =>
{
    if(!err)
        console.log('MongoDB Connection Successful..');
    else
        console.log('Error in DB Connection: '+JSON.stringify(err,undefined,2));
});


module.exports = mongoose;