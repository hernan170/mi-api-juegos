import mongoose from 'mongoose';

const juegosSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    año: { type: Number, required: true },
    imagen: { type: String }
});

export default mongoose.model('Juego', juegosSchema);