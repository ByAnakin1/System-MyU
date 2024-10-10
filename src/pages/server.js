import express from 'express';
import db from './db.js';

const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola desde el servidor!');
});

// Ruta para obtener todas las categorías
app.get('/categorias', (req, res) => {
    db.query('SELECT * FROM categorias', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});