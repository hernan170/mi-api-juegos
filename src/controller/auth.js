import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createHash } from '../utils/bcrypt.js';



export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) { 
            return res.status(400).json({ status: 'error', message: 'El email ya existe'});
        }

        const hashedPassword = await createHash(password);
        const newUser = new User({
            first_name, 
            last_name,
            email, 
            password: hashedPassword,
            role: role || 'user'
        });

        await newUser.save();

        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado exitosamente',
            payload: { id: newUser._id, email: newUser.email, role: newUser.role}
        })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const login = async (req, res) => {
    const user = req.user;

    const tokenPayload = { userId: user._id, rol: user.role};
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });

    res.cookie('authToken', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000
    });

    res.json({
        status: 'success',
        message: 'login exitoso',
        token,
        user: { id: user._id, email: user.email, role: user.role }
    });
};

export const getSession = (req, res) => {
    if (!req.session || !req.session.passport) {
        return res.status(401).json({ status: 'error', message: 'No hay sesión activa' });
    }
    res.json({ status: 'success', payload: req.session });
};

export const logout = (req, res) => {
    if (req.session) {
        req.session.destroy();
    }

    res.clearCookie('authToken');
    res.clearCookie('connect.sid');

    res.json({
        status: 'success',
        message: 'Sesión cerrada exitosamente'
    });
};
        

    
    
