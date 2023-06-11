const mongoose = require('mongoose');

module.exports = {
    AppointmentModel: mongoose.model('appointments', mongoose.Schema({
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        date: Date,
        time: {
            type: String,
            enum: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',]
        },
        purpose: String,
        status: {
            type: String,
            enum: ['Confirmed', 'Canceled']
        },
    }, {
        versionKey: false
    }))
}