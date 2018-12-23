const mongoose = require('mongoose');

var Assignment = mongoose.model('Assignment',{
    name: {type: String},
    code: {type: String},
    appointmentTime: {type:Date},
    scheduledTime: {type: Date},
    actualArrival: {type: Date},
    status: {type: String},
    departTime: {type: Date},
    hosCount: {type: Date},
    countEndTime: {type: Date},
    dropOffTime: {type: Date},
    duration: {type: Number},
    waitingTime: {type: String},
    nextReset: {type: Date}
});

module.exports = {Assignment};