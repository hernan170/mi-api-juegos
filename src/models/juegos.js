import mongoose from 'mongoose';

const juegoCollection = 'juegos';

const juegosSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    anio: { type: Number, required: true },
    imagen: { type: String, default: null }
});

export const juegoModel = mongoose.model(juegoCollection, juegosSchema);