import { Router } from 'express';
import { verifyJWT, requireRole } from '../middlewares/auth.js';


const router = Router();

router.get('/profile', verifyJWT, (req, res) => {
    res.json({
        status: 'success',
        message: 'Acceso autorizado a la ruta protegida',
        user: req.user
    });
});

router.get('/admin', verifyJWT, requireRole('admin'), (req, res) => {
    res.json({
        status: 'success',
        message: 'Bienvenido al panel administrador'
    });
});

export default router;