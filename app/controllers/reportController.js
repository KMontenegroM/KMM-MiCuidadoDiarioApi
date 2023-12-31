import Check from '../models/reportSchema.js';

//import { sendReport } from './config/emailService.js'; // Asume que tienes una función para enviar el informe


const otherController = (req, res) => {
    const username = req.session.username; // Accede al username almacenado en la sesión    
    console.log(username);
    res.json({ message: "Conectó el username del inicio de sesión con reportController!!!", username: username }); 
};

const createReport = async (req, res) => {
    const { userId } = req.body;
    const report = new Report({ userId });
    const savedReport = await report.save();
    res.json(savedReport);
}

const getReport = async (req, res) => {
    const userId = req.params.userId;
    const report = await Report.findOne({ userId });
    if (!report) {
        return res.status(404).json({ error: "Informe no encontrado." });
    }
    res.json(report);
}

const sendUserReport = async (req, res) => {
    const userId = req.params.userId;
    const report = await Report.findOne({ userId });
    if (!report) {
        return res.status(404).json({ error: "Informe no encontrado." });
    }
    await sendReport(report);
    res.json({ message: 'Informe enviado.' });
}

export { otherController, createReport, getReport, sendUserReport };