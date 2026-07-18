import { juegoModel } from '../models/juegos.js';
import { logger } from '../utils/loggers.js';




export const getJuegos = async (req, res) =>{
    try {
        const juegos = await juegoModel.find();
        res.status(200).json({ status: 'success', payload: juegos });
    } catch (error) {
        logger.error(`Error al obtener los juegos: ${error.message}`);
        res.status(500).json({ status: 'error', error: 'error al obtener los juegos' });
    }
};

export const createJuego = async (req, res) => {
    try {
        console.log("➡️ CONTENIDO RECIBIDO EN REQ.BODY:", req.body)
        const { titulo, anio, imagen } = req.body;

        if (!titulo || !anio || !imagen) {
            return res.status(400).json({ status: 'error', error: 'Faltan datos requeridos' });
        }

        const nuevoJuego = await juegoModel.create({ 
            titulo,
            anio: parseInt(anio, 10),
            imagen: imagen || null 
        });

        logger.info(`[Controller] Juego creado: ${titulo}`);
        res.status(201).json({ status: 'success', payload: nuevoJuego });
    } catch (error) {
        logger.error(`Error al crear el juego: ${error.message}`);
        res.status(400).json({ status: 'error', message: error.message });
    }
};

export const updateJuego = async (req, res) => {
    try {
        const { id } = req.params;
        const juegoActualizado = await juegoModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!juegoActualizado) {
            logger.warn(`Intento de edición fallido: ID ${id} no existe`);
            return res.status(404).json({ status: "error", error: "El juego no existe" });
        }

        logger.info(`[Controller] Juego ID ${id} actualizado`);
        res.status(200).json({ status: "success", payload: juegoActualizado });
    } catch (error) {
        logger.error(`Error en updateJuego para ID ${req.params.id}: ${error.message}`);
        res.status(400).json({ status: "error", error: "ID inválido o error en los datos" });
    }
};


export const deleteJuego = async (req, res) => {
    try {
        const { id } = req.params;
        const juegoEliminado = await juegoModel.findByIdAndDelete(id);

        if (!juegoEliminado) {
            logger.warn(`Intento de eliminación fallido: ID ${id} no existe`);
            return res.status(404).json({ status: "error", error: "El juego no existe" });
        }

        logger.info(`[Controller] Juego ID ${id} eliminado`);
        res.status(200).json({ status: "success", message: "Juego eliminado correctamente" });
    } catch (error) {
        logger.error(`Error en deleteJuego para ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ status: "error", error: "ID inválido o error de servidor" });
    }
};