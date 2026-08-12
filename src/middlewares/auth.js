import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res ,next) => {

    const token = req.cookies?.authToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: '401 Unauthorized: Token de auntenticacion no proporcionado'
        });
    }

    try {
        const decoded =jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: '401 Unauthorized: Token de autenticacion invalido'
        });
    }
};

export const requireRole = (role) => {
    return ( req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                status: 'error',
                message: '401 Unauthorized: Usuario no autenticado'
            });
        
        }
        next();
    };
};
