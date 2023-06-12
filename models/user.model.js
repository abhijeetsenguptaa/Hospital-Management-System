const mongoose = require('mongoose');

module.exports = {
    UserModel: mongoose.model('users', mongoose.Schema({
        name: String,
        email: String,
        password: String,
        role: {
            type: String,
            enum: ['Patient', 'Staff', 'Admin'],
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Transgender']
        },
        dateOfBirth: String,
        contactInformation: String,
        address: String,
        medicalHistory: [String],
        insuranceInformation: {
            type: String,
            enum: ["Yes", "No"],
            default: "No"
        },
        specialization: {
            type: String,
            enum: ['Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Oncology', 'Pediatrics', 'Psychiatry', 'Surgery', 'Urology']
        },
        position: {
            type: String,
            enum: ['Doctor', 'Nurse', 'Receptionist', 'Janitor', 'Pharmacist', 'Lab Technician', 'Administrative Staff', 'IT Support', 'Security Guard']
        },
        workingHours: String,
        salary: Number,
        department: {
            type: String,
            enum: ['Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Oncology', 'Pediatrics', 'Psychiatry', 'Surgery', 'Urology']
        },
    }, {
        versionKey: false
    }))
}