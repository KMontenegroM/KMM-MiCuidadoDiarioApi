import express from 'express';
import { createReport, getReport, sendUserReport } from '../controllers/reportController.js';

const router = express.Router();

router.post('/', createReport);
router.get('/:userId', getReport);
router.post('/send/:userId', sendUserReport);

export default router;