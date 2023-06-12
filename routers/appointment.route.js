const express = require('express');
const { bookingAppointment, changingStatus, deletingAppointment, fetchingAppointment } = require('../controllers/appointment.controller');
const { authentication } = require('../middleware/authentication.middleware');



const appointmentRoute = express.Router();


appointmentRoute.post('/:id', authentication, bookingAppointment);

appointmentRoute.patch('/update/:id', authentication, changingStatus);

appointmentRoute.delete('/:id', authentication, deletingAppointment);

appointmentRoute.get('/', authentication, fetchingAppointment);





module.exports = { appointmentRoute };