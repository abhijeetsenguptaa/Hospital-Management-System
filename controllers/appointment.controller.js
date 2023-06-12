const { AppointmentModel } = require("../models/appointment.model");
const { UserModel } = require("../models/user.model");

module.exports = {
    // Appointment booking with the Doctor
    bookingAppointment: async (req, res) => {
        try {
            const id = req.params.id;
            const { patient, doctor, date, time, purpose, status } = req.body;
            const whoSDoctor = await UserModel.find({ _id: id });
            const checkAppointment = await AppointmentModel.find({ doctor: id });
            console.log(checkAppointment);
            if (checkAppointment.length == 0) {
                const bookAppointment = new AppointmentModel({ patient: user, doctor: id, date, time, purpose, status });
                await bookAppointment.save();
                res.status(200).send({
                    status: true,
                    msg: `Successfully Booked your Appointment with Dr.${whoSDoctor[0].name}.`
                })
            } else {
                let flag = true;
                for (let i = 0; i < checkAppointment.length; i++) {
                    if (checkAppointment[i].date == date && checkAppointment[i].time == time) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    const bookAppointment = new AppointmentModel({ patient: user, doctor: id, date, time, purpose, status });
                    await bookAppointment.save();
                    res.status(200).send({
                        status: true,
                        msg: `Successfully Booked your Appointment with Dr.${whoSDoctor[0].name}.`
                    })
                } else {
                    res.status(409).send({
                        status: false,
                        msg: "Slot is already Booked!"
                    })
                }
            }
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error occurred during booking an Appointment."
            })
        }
    },


    // Updating the Appointment with the Doctor
    changingStatus: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const checkingAppointment = await AppointmentModel.find({ _id: id });
            const busyDoctor = await AppointmentModel.find({ doctor: checkingAppointment[0].doctor });
            if (busyDoctor.length == 0) {
                await AppointmentModel.findByIdAndUpdate({ _id: id }, data);
                res.status(200).send({
                    status: true,
                    msg: "Successfully Updated!"
                })
            } else {
                let flag = true;
                for (let i = 0; i < busyDoctor.length; i++) {
                    if (busyDoctor[i].date == data.date && busyDoctor[i].time == data.time) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    await AppointmentModel.findByIdAndUpdate({ _id: id }, data);
                    res.status(200).send({
                        status: true,
                        msg: "Successfully Updated!"
                    })
                } else {
                    res.status(403).send({
                        status: false,
                        msg: "Doctor is Busy..Choose a different Slot."
                    })
                }
            }
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error occurred during upgrading the Appointment."
            })
        }
    },


    // Deleting the Appointment with the Doctor
    deletingAppointment: async (req, res) => {
        try {
            const id = req.params.id;
            await AppointmentModel.findByIdAndDelete({ _id: id });
            res.status(200).send({
                status: true,
                msg: "Successfully deleted the Appointment."
            })
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error in deleting the Appointments."
            })
        }
    },


    // Checking the Appointments 
    fetchingAppointment: async (req, res) => {
        try {
            const date = req.query.date;
            const purpose = req.query.purpose;
            const status = req.query.status;
            if (date && purpose && status) {
                const appointmentData = await AppointmentModel.find({ date, purpose, status, doctor: user });
                res.status(200).send({
                    status: true,
                    msg: `Appointment List as on ${date}.`,
                    data: appointmentData
                })
            } else if (!date && !purpose && !status) {
                const appointmentData = await AppointmentModel.find({ $or: [{ doctor: user }, { patient: user }] });
                res.status(200).send({
                    status: true,
                    msg: `Appointment List`,
                    data: appointmentData
                })
            } else {
                let query = {};
                query.$and = [{ doctor: user }];

                if (date) {
                    query.$and.push({ date });
                }

                if (purpose) {
                    query.$and.push({ purpose });
                }

                if (status) {
                    query.$and.push({ status });
                }

                const appointmentData = await AppointmentModel.find(query);
                res.status(200).send({
                    status: true,
                    msg: 'All the appointments as per records.',
                    data: appointmentData
                })

            }
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error in fetching the details of the Appointment"
            })
        }
    }
}