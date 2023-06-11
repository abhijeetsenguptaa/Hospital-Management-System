const mongoose = require('mongoose');


module.exports = {
    DepartmentModel: mongoose.model('departments', mongoose.Schema({
        name: {
            type: String,
            enum: ['Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Oncology', 'Pediatrics', 'Psychiatry', 'Surgery', 'Urology']
        },
        description: String,
        headOfDepartment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        contactInformation: String
    }, {
        versionKey: false
    }))
}