import { validateBloodPressure, validateDate, validateTime } from '../../validations.js';
import Blood from '../models/bloodPressureSchema.js';

const getBloodPressure = async (req, res) => {
    let success = 300;
    try {
        const blood = await Blood.find(); // Usa el modelo de usuario para buscar blood Pressure
        res.status(200).json(blood);
        success = 200;
    } catch (error) {
        res.status(500).json({ message: error.message });
        success = 500;
    }
    return success;
};

const getBloodPressureByUsername = async (req, res) => {
    let success = 300;
    const user = req.session.username;
    console.log("bloodPressureController.js:21", user);
    try {   
        const blood = await Blood.find({ user });
        console.log("bloodPressureController.js:24", blood);
        if (blood.length === 0) {
            //return res.status(404).json({ error: "Usuario no encontrado." });
            //return res.redirect('/archivoError.html'); // Redirigir a un archivo de error si no se encuentran registros
            success = 400;
        } else{
            //res.json(blood);
            console.log("bloodPressureController.js:30", blood);
            //return res.redirect('/recordConFiltro.html'); // Redirigir al nuevo archivo HTML si se encuentran registros
            success = 200;
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
        console.log("bloodPressureController.js:35",error);
        success = 500;
    }
    return success;
};

const createBloodPressure = async (req, res) => {
    let success = 300;
    try {
        const { systolic, diastolic, date, time } = req.body;
        console.log("bloodPressureController:41", { systolic, diastolic, date, time} );

        if (systolic || diastolic || date || time) {
            const dateValidation = validateDate(date);
            console.log("bloodPressureController:49", dateValidation);
            const timeValidation = validateTime(time);
            console.log("bloodPressureController:51", timeValidation);
            const diastolicSystolicValidation = validateBloodPressure(systolic, diastolic);
            console.log("bloodPressureController:58", diastolicSystolicValidation);
            
            
            if (diastolicSystolicValidation & dateValidation.isValid & timeValidation.isValid) {
                const user = req.session.username; 
                const newBlood = new Blood({
                    user: user,
                    systolic: systolic,
                    diastolic: diastolic,
                    date: date,
                    time: time
                }); // Crea nuevo registro de Presión Arterial

                await newBlood.save(); // Guarda el registro en la base de datos
                //res.json({ message: "Registro cargado con éxito", blood: newBlood });
                success = 200;
            } else {
                //return res.status(400).json({ error: "Faltan campos obligatorios del registro de presion arterial." });
                success = 410;
            }
        }
    } catch (error) {

        //res.status(500).json({ error: 'Error en el servidor' });
        success = 500;
        console.log(error);
    }
    return success;
};

const updateBloodPressure = async (req, res) => {
    const user = req.session.username;
    const { systolic, diastolic, date, time } = req.body;
    let success = 300;

    try {
        let blood = await Blood.findOne({ username });
        if (!blood) {
            return res.status(404).json({ error: "Usuario no encontrado." });
            success = 400;
        }
        if (!systolic && !diastolic && !date && !time) {
            return res.status(400).json({ error: "Se debe proporcionar al menos un campo para actualizar." });
        }
        // if (systolic) {
        //     const systolicValidation = validateBloodPressure(systolic);
        //     console.log("bloodPressureController:106 - Pasó validación de Sistólica");
        //     if (!systolicValidation.isValid) {
        //         console.log("bloodPressureController:107 - No pasó validación de Sistólica");
        //         return res.status(400).json({ error: systolicValidation.error });
        //     }
        //     Blood.systolic = systolic;
        // }
        // if (diastolic) {
        //     const dyastolicValidation = validateBloodPressure(diastolic);
        //     console.log("bloodPressureController:115 - Pasó validación de Diastólica");
        //     if (!dyastolicValidation.isValid) {
        //         console.log("bloodPressureController:117 - No pasó validación de Diastólica");
        //         return res.status(400).json({ error: dyastolicValidation.error });
        //         success = 410;
        //     }
        //     Blood.diastolic = diastolic;
        // }
        if (systolic & diastolic) {
            const systolicDyastolicValidation = validateBloodPressure(systolic, diastolic);
            console.log("bloodPressureController:125 - Pasó validación de Sistólica-Diastólica");
            if (!systolicDyastolicValidation.isValid) {
                console.log("bloodPressureController:127 - No pasó validación de Sistólica-Diastólica");
                return res.status(400).json({ error: systolicDyastolicValidation.error });
                success = 410;
            }
            Blood.systolic = systolic;
            Blood.diastolic = diastolic;
        }
        if (date) {
            const dateValidation = validateDate(date);
            if (!dateValidation.isValid) {
                return res.status(400).json({ error: dateValidation.error });
                success = 400;
            }
            blood.date = date;
        }
        if (time) {
            const timeValidation = validateTime(time);
            if (!timeValidation.isValid) {
                return res.status(400).json({ error: timeValidation.error });
                success = 400;
            }
            blood.time = time;
        }
        await blood.save();
        res.json({ message: "Datos de presión arterial actualizados con éxito", blood });
        success = 200;
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
        success = 500;
    }
    return success;
};

const deleteBlood = async (req, res) => {
    const user = req.session.username;
    let success = 300;
    try {
        const blood = await Blood.findOneAndDelete({ username });
        if (!blood) {
            return res.status(404).json({ error: "Usuario no encontrado." });
            success = 400;
        }
        //res.json({ message: "Registro eliminado con éxito", blood });
        success = 200;
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
        success = 500;
    }
};

export {
    getBloodPressure,
    getBloodPressureByUsername,
    createBloodPressure,
    updateBloodPressure,
    deleteBlood
};
