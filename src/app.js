import express from 'express';

const app = express();
app.use(express.json());
const PORT = 3000;

let misJuegos = [
    { id: 1, titulo: "Pac-Man", año: 1980 },
    { id: 2, titulo: "Super Mario Bros", año: 1985 },
    { id: 3, titulo: "The Legend of Zelda", año: 1986 },
    { id: 4, titulo: "Metroid", año: 1986 }
];



app.get('/api/juegos', (req, res) => res.json(misJuegos));


app.post('/api/juegos', (req, res) => {
    
    const { titulo, año, imagen } = req.body;

    
    const nuevoJuego = { 
        id: misJuegos.length + 1, 
        titulo: titulo,
        año: año,
        imagen: imagen || null
    };
    
    misJuegos.push(nuevoJuego);
    res.status(201).json(nuevoJuego);
    console.log("Juego agregado:", nuevoJuego);
});

app.put('/api/juegos/:id', (req, res) => {
   
    const id = req.params.id;
    const idNumerico = parseInt(id);
   
    const index = misJuegos.findIndex(j => j.id === idNumerico);

    if (index === -1) {
        console.log("Error: Juego no encontrado con ID", id);
        return res.status(404).json({
            error: `Juego con ID ${idNumerico} no existe`,
            idsDisponibles: misJuegos.map(j => j.id)
        });
    }

    misJuegos[index] = { ...misJuegos[index], ...req.body };
    console.log("Juego actualizado:", misJuegos[index]);
    res.json(misJuegos[index]);
});

app.delete('/api/juegos/:id', (req, res) => {
    const { id } = req.params;
    misJuegos = misJuegos.filter(j => j.id !== parseInt(id));
    res.json({ message: "Juego eliminado correctamente"});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo on http://localhost:${PORT}`);
});