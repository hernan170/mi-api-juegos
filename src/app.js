import express from 'express';
import cors from 'cors';
import compression from 'express-compression';
import juegoRoutes from './routes/juegoRoutes.js';



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression({
    brotli: { enabled: true },
    threshold: 1024
}));


app.use('/api/juegos', juegoRoutes);

export default app;