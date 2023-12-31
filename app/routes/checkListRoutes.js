import express from 'express';
import { 
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
} from '../controllers/checkListController.js';
import { 
    getBloodPressure,
    getBloodPressureByUsername,
    createBloodPressure,
    updateBloodPressure,
    deleteBlood 
} from '../controllers/bloodPressureController.js';

const checkRouter = express.Router();

//Rutas para el checkList Presión Arterial
checkRouter.get('/presion', getBloodPressure);
checkRouter.get('/presion/seleccion', getBloodPressureByUsername);
checkRouter.post('/presion', createBloodPressure);
checkRouter.put("/presion/seleccion", updateBloodPressure);
checkRouter.delete("/presion/seleccion", deleteBlood);

//Rutas para el checkList Higiene y Confort
checkRouter.get('/higiene', getCheckListHigiene);
checkRouter.get('/higiene/seleccion', getCheckListHigieneByUsername);
checkRouter.post('/higiene', createCheckListHigiene);
checkRouter.put("/higiene/seleccion", updateCheckListHigiene);
checkRouter.delete("/higiene/seleccion", deleteCheckListHigiene);

//Rutas para el checkList Estados de Ánimo
checkRouter.get('/EAnimo', getCheckListEAnimo);
checkRouter.get('/EAnimo/seleccion', getCheckListEAnimoByUsername);
checkRouter.post('/EAnimo', createCheckListEAnimo);
checkRouter.put("/EAnimo/seleccion", updateCheckListEAnimo);
checkRouter.delete("/EAnimo/seleccion", deleteCheckListEAnimo);

export default checkRouter;




