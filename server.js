require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./configs/connection');
const { userRoute } = require('./routers/user.route');
const { appointmentRoute } = require('./routers/appointment.route');
const { medicalRoute } = require('./routers/medicalReports.route');


const PORT = process.env.port || 8080;
const app = express();
app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => {
    try {
        res.status(200).send({
            status: true,
            msg: 'Welcome to the Hospital-Management-System.'
        })
    } catch {
        res.status(404).send({
            status: false,
            msg: 'Error in the Hospital-Management-System.'
        })
    }
})

app.use('/users', userRoute);
app.use('/appointments', appointmentRoute);
app.use('/medicines', medicalRoute);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Server is connected to the Database.');
    } catch {
        console.log('Server could not get connected to the Database.');
    }
    console.log(`Server is running at the port ${PORT}.`);
})