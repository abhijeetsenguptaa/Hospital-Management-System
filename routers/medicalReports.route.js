const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { prescribingMedication, updatingMedication, deletingMedication, fetchingMedication } = require('../controllers/medicalReports.controller');



const medicalRoute = express.Router();

medicalRoute.post('/:id', authentication, prescribingMedication);

medicalRoute.patch('/:id', authentication, updatingMedication);

medicalRoute.delete('/:id', authentication, deletingMedication);

medicalRoute.get('/', authentication, fetchingMedication);

module.exports = { medicalRoute };