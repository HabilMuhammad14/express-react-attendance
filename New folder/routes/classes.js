import express from 'express';
import classesController from '../controllers/classesController.js'
const router = express.Router()

router.get('/:id', classesController.getAllClassesByID);
router.get('/', classesController.getAllClassesForMhs)

export default router;