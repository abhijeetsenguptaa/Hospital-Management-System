const mongoose = require('mongoose');

module.exports = {
    UserModel: mongoose.model('users', mongoose.Schema({
        name: String,
        email: String,
        password: String,
        role: {
            type: String,
            enum: ['Patient', 'Doctor', 'Staff', 'Admin'],
        },
        gender: String,
        dateOfBirth: Date,
        contactInformation: String,
        address: String,
        medicalHistory: String,
        insuranceInformation: String,
        specialization: {
            type: String,
            enum: ['Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Oncology', 'Pediatrics', 'Psychiatry', 'Surgery', 'Urology']
        },
        position: {
            type: String,
            enum: ['Nurse', 'Receptionist', 'Janitor', 'Pharmacist', 'Lab Technician', 'Administrative Staff', 'IT Support', 'Security Guard']
        },
        workingHours: String,
        salary: Number,
        department: String,
    }, {
        versionKey: false
    }))
}