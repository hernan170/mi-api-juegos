import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import juegoRoutes from './src/routes/juegoRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/juegos', juegoRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI?.trim();

if (!MONGO_URI) {
    console.error('Error BD: la variable MONGO_URI no está definida');
    process.exit(1);
}

// Conexión
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Tractorcito corriendo en puerto ${PORT}`);
            console.log(`Modo: ${process.env.NODE_ENV || 'production'}`);
        });
    })
    .catch(err => console.error('Error BD:', err.message || err));