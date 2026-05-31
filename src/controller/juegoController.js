import Juego from '../models/juegos.js';

export const getJuegos = async (req, res) =>{
    try {
        const juegos = await Juego.find();
        res.json(juegos);
    } catch (error) { res.status(500).json({ error: error.message});

  } 
};

export const createJuego = async (req, res) => {
    try {
        const nuevo = await Juego.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) { res.status(400).json({ error: error.message});

   }
};

export const updateJuego = async (req, res) => {
    try {
        const actualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
        } catch (error) { res.status(400).json({ error: error.message});
    }

};

export const deleteJuego = async (req, res) => {
    try {
        await Juego.findByIdAndDelete(req.params.id);
        res.json({ message: 'Juego eliminado' });
    } catch (error) { res.status(500).json({ error: error.message});
  }
};

    