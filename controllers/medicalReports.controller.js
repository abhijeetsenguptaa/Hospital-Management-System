const { AppointmentModel } = require("../models/appointment.model");
const { MedicalReportModel } = require("../models/medicalReport.model");

module.exports = {
    prescribingMedication: async (req, res) => {
        try {
            const id = req.params.id;
            const { patient, doctor, appointment, date, diagnosis, medications, testResults, treatment } = req.body;
            const searchMedicalReports = await MedicalReportModel.find({ appointment: id });
            const searchPatient = await AppointmentModel.find({ _id: id });
            if (searchMedicalReports.length == 0) {
                const newMedicine = new MedicalReportModel({ patient: searchPatient[0].patient, doctor: user, appointment: id, date: searchPatient[0].date, diagnosis, medications, testResults, treatment });
                await newMedicine.save();
                res.status(201).send({
                    status: true,
                    msg: "Medicines prescribed successfully."
                })
            } else {
                console.log(searchMedicalReports);
                res.status(409).send({
                    status: false,
                    msg: 'Medicines are already prescribed!'
                })
            }
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error in prescribing medicines"
            })
        }
    },

    updatingMedication: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            await MedicalReportModel.findByIdAndUpdate({ _id: id }, data);
            res.status(200).send({
                status: true,
                msg: "Medicine updated successfully.",
                data: await MedicalReportModel.find()
            })
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error in updating the medicine."
            })
        }
    },

    deletingMedication: async (req, res) => {
        try {
            const id = req.params.id;
            await MedicalReportModel.findByIdAndDelete({ _id: id });
            res.status(200).send({
                status: true,
                msg: "Medicine deleted successfully.",
                data: await MedicalReportModel.find()
            })
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error in deleting the medicine."
            })
        }
    },

    fetchingMedication: async (req, res) => {
        try {
            const id = req.query.id;
            const date = req.query.date;

            if (id) {
                res.status(200).send({
                    status: true,
                    data: await MedicalReportModel.find({ _id: id })
                })
            }
            else if (date) {
                res.status.send({
                    status: true,
                    data: await MedicalReportModel.find({ date })
                })
            } else {
                res.status.send({
                    status: true,
                    data: await MedicalReportModel.find()
                })
            }
        } catch {
            res.status.send({
                status: false,
                msg : "Error in fetching the Medication Reports."
            })
        }
    }
}