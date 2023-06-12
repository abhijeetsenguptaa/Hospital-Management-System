const express = require('express');
const { bookingAppointment, changingStatus, deletingAppointment } = require('../controllers/appointment.controller');
const { authentication } = require('../middleware/authentication.middleware');



const appointmentRoute = express.Router();


appointmentRoute.post('/:id', authentication, bookingAppointment);

appointmentRoute.patch('/update/:id', authentication, changingStatus);

appointmentRoute.delete('/:id', authentication, deletingAppointment);







module.exports = { appointmentRoute };