import 'dotenv/config';
import mongoose from 'mongoose';
import app from './src/app.js';
import { logger } from './src/utils/loggers.js';




const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI?.trim();

if (!MONGO_URI) {
    logger.fatal('Error BD: la variable MONGO_URI no está definida');
    process.exit(1);
}


mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Tractorcito corriendo en puerto ${PORT}`);
            logger.info(`Modo: ${process.env.NODE_ENV || 'production'}`);
        });
    })
    .catch(err => { 
        logger.error(`Error BD: ${err.message}`);
    });