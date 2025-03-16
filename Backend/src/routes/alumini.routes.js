import express from 'express';
import { 
    createAlumni, 
    getAllAlumni, 
    getAlumniById, 
    updateAlumni, 
    deleteAlumni 
} from '../controllers/alumini.controller.js';

const router = express.Router();

router.post('/', createAlumni);
router.get('/', getAllAlumni);
router.get('/:id', getAlumniById);
router.put('/:id', updateAlumni);
router.delete('/:id', deleteAlumni);

export default router;
