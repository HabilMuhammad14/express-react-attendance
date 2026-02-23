import express from 'express';
import attendanceController from '../controllers/attendanceController.js';
const router = express.Router()

router.put('/open/:id', attendanceController.openAbsent);
router.put('/close/:id', attendanceController.closeAbsent);

export default router