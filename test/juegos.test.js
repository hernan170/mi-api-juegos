import 'dotenv/config';
import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js'; // Importamos solo Express, sin server.js

const requester = supertest(app);

describe('Testing de API Videojuegos', () => {
    let idJuegoTesteo = null;

    // Antes de los tests, nos aseguramos de tener conexión a la BD por si el modelo la requiere
    before(async () => {
        // Si tu URI de desarrollo está en el .env, la toma de ahí
        const MONGO_URI = process.env.MONGO_URI || "tu_uri_de_test_aca";
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGO_URI);
        }
    });

    // Al finalizar todas las pruebas, cerramos la conexión a Mongo
    after(async () => {
        await mongoose.connection.close();
    });

    // 🧪 TEST 1: GET /api/juegos
    it('El endpoint GET /api/juegos debe retornar un status 200 y un payload de tipo array', async () => {
        const response = await requester.get('/api/juegos');
        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status', 'success');
        expect(response.body.payload).to.be.an('array');
    });

  // Dentro de test/juegos.test.js modifica los tests de POST y PUT:

    // 🧪 TEST 2: POST
    it('El endpoint POST /api/juegos debe crear un juego correctamente y devolver status 201', async () => {
        const nuevoJuego = {
            titulo: "Doom Eternal",
            anio: 2020, // 👈 Cambiado a anio
            imagen: "https://link-a-imagen.com/doom.jpg"
        };

        const response = await requester.post('/api/juegos').send(nuevoJuego);
        
        if (response.status !== 201) {
            console.log("❌ DETALLE DEL ERROR EN POST:", response.body);
        }
        
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('status', 'success');
        expect(response.body.payload).to.have.property('_id');
        expect(response.body.payload.titulo).to.equal('Doom Eternal');

        idJuegoTesteo = response.body.payload._id;
    });

    // 🧪 TEST 3: PUT
    it('El endpoint PUT /api/juegos/:id debe actualizar el año del juego creado y devolver status 200', async () => {
        const cambioData = { anio: 2021 }; // 👈 Cambiado a anio

        const response = await requester.put(`/api/juegos/${idJuegoTesteo}`).send(cambioData);
        
        expect(response.status).to.equal(200);
        expect(response.body.payload.anio).to.equal(2021); // 👈 Cambiado a anio
    });

    // 🧪 TEST 4: DELETE /api/juegos/:id
    it('El endpoint DELETE /api/juegos/:id debe eliminar el juego de prueba y devolver status 200', async () => {
        const response = await requester.delete(`/api/juegos/${idJuegoTesteo}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'Juego eliminado correctamente');
    });
});