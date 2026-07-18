import { Router } from 'express';
import { getJuegos, createJuego, updateJuego, deleteJuego } from '../controller/juegoController.js';

const router = Router();

router.get('/', getJuegos);
router.post('/', createJuego);
router.put('/:id', updateJuego);
router.delete('/:id', deleteJuego);

export default router;
