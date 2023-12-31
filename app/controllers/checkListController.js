import { validateDate } from '../../validations.js'
import { checkHC , checkEA } from '../models/checkListSchema.js';


const createCheckListHigiene = async (req, res) => {
    let success = 300; 
    try {
        const { date, ...HCquestions } = req.body;

        if (date) {
            const dateValidation = validateDate(date);
            const HCquestionsWithStrings = {};
                for (const key in HCquestions) {
                    const value = HCquestions[key];
                    if (Array.isArray(value)) {
                        HCquestionsWithStrings[key] = value[1] || '';
                    } else {
                        HCquestionsWithStrings[key] = value || '';
                    }
                }

            if (dateValidation.isValid ) {
                const user = req.session.username;
                const questions = HCquestionsWithStrings;
                const newChecklistHC = new checkHC({
                    user,
                    date,
                    ...questions
                });
                console.log("checkListController.js:36", newChecklistHC);
                console.log("checkListController.js:37 - Antes de await newChecklistEA.save()");
                await newChecklistHC.save();
                //res.json({ message: "Checklist guardado exitosamente", date, ...HCquestions });
                console.log("checkListController.js:40 - Se guardó el registro");
                success = 200;
            } else { 
                //return res.status(400).json({ error: "Faltan campos obligatorios del checkList de Higiene y Confort." });
                success = 400;
            }
        }   
    } catch (error) {
        //res.status(500).json({ error: 'Error al guardar el checklist' });
        success = 500;
    }
    return success;
};

const getCheckListHigiene = async (req, res) => {
    let success = 300;
    try {
        const check = await checkHC.find(); // Usa el modelo de usuario para buscar blood Pressure
        res.status(200).json(check);
        success = 200;
    } catch (error) {
        res.status(500).json({ message: error.message });
        success = 500;
    }
    return success;
};

const getCheckListHigieneByUsername = async (req, res) => {   
    let success = 300;
    const user = req.session.username;
    console.log("bloodPressureController.js:65", user);
    try {      
        const check = await checkHC.find({ user });
        if (check.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado." });
            success = 400;
        } else{
            res.json(check);
            success = 200;
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
        success = 500;
    }
    return success;
};

const updateCheckListHigiene = async (req, res) => {
    let success = 300;
    const user = req.session.username;
    console.log("bloodPressureController.js:65", user);
    const { date, ...HCquestions } = req.body;

    try {
        const check = await checkHC.findOneAndUpdate({ user }, {
            user,
            date,
            ...HCquestions
        });
        if (!check) {
            return res.status(404).json({ error: "Usuario no encontrado." });
            success = 400;
        }
        await check.save();
        res.json({ message: "Datos del check list actualizados con éxito", check });
        success = 200;
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
        success = 500;
    }
    return success;
};

const deleteCheckListHigiene = async (req, res) => {
    const user = req.session.username;
    let success = 300;
    try {
        const check = await checkHC.findOneAndDelete({ user });
        if (!check) {
            //return res.status(404).json({ error: "Usuario no encontrado." });
            success = 400;
        }
        //res.json({ message: "CheckList eliminado con éxito", blood });
        success = 200;
    } catch (error) {
        //res.status(500).json({ error: 'Error en el servidor' });
        success = 500;
    }
    return success;
};

const createCheckListEAnimo = async (req, res) => {
    let success = 300;
    try {
        const { date, ...EAquestions } = req.body;
        
        if (date) {
            const dateValidation = validateDate(date);
            const EAquestionsWithStrings = {};
                for (const key in EAquestions) {
                    const value = EAquestions[key];
                    if (Array.isArray(value)) {
                        EAquestionsWithStrings[key] = value[1] || '';
                    } else {
                        EAquestionsWithStrings[key] = value || '';
                    }
                }

            if (dateValidation.isValid) {
                const user = req.session.username;
                const questions = EAquestionsWithStrings;
                const newChecklistEA = new checkEA({
                    user,
                    date,
                    ...questions
                });

                await newChecklistEA.save();
                success = 200;
            }
        } else {
            success = 400;
        }
    } catch (error) {
        console.log(error);
        success = 500;
    }
    return success;
};

const getCheckListEAnimo = async (req, res) => {
    let success = 300;
    try {
        const check = await checkEA.find(); // Usa el modelo de usuario para buscar blood Pressure
        res.status(200).json(check);
        success = 200;
    } catch (error) {
        res.status(500).json({ message: error.message });
        success = 500;
    }
    return success;
};

const getCheckListEAnimoByUsername = async (req, res) => {   
    let success = 300;
    const user = req.session.username;
    console.log("bloodPressureController.js:65", user);
    try {      
        const check = await checkEA.find({ user });
        if (check.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado." });
            success = 400;
        } else{
            res.json(check);
            success = 200;
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
        success = 500;
    }
    return success;
};

const updateCheckListEAnimo = async (req, res) => {
    const user = req.session.username;
    const { date, ...EAquestions } = req.body;
    let success = 300;
    try {
        const check = await checkEA.findOneAndUpdate({ user }, {
            user,
            date,
            ...EAquestions
        });
        if (!check) {
            //return res.status(404).json({ error: "Usuario no encontrado." });
            success = 400;
        }
        await check.save();
        //res.json({ message: "Datos del check list actualizados con éxito", check });
        success = 200;
    } catch (error) {
        //res.status(500).json({ error: 'Error en el servidor' });
        success = 500;
    }
    return success;
};

const deleteCheckListEAnimo = async (req, res) => {
    const user = req.session.username;
    let success = 300;
    try {
        const check = await checkHC.findOneAndDelete({ user });
        if (!check) {
            //return res.status(404).json({ error: "Usuario no encontrado." });
            success = 400;
        }
        //res.json({ message: "CheckList eliminado con éxito", blood });
        success = 200;
    } catch (error) {
        //res.status(500).json({ error: 'Error en el servidor' });
        success = 500;
    }
    return success;
};

export { 
    createCheckListHigiene,
    getCheckListHigiene,
    getCheckListHigieneByUsername,
    updateCheckListHigiene,
    deleteCheckListHigiene,
    createCheckListEAnimo,
    getCheckListEAnimo,
    getCheckListEAnimoByUsername,
    updateCheckListEAnimo,
    deleteCheckListEAnimo
};
