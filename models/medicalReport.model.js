const mongoose = require('mongoose');

module.exports = {
    MedicalReportModel: mongoose.model('reports', mongoose.Schema({
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        date: String,
        diagnosis: String,
        medications: String,
        testResults: String,
        treatment: String
    }, {
        versionKey: false
    }))
}