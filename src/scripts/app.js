// src/scripts/app.js
import express from 'express';
import cors from 'cors';
import db from './db.js'; // Importamos la conexión a la base de datos

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta para obtener los productos
app.get('/api/productos', async (req, res) => {
    try {
        const productos = await db.query('SELECT * FROM productos');
        res.json(productos.rows);
    } catch (err) {
        console.error('Error al obtener los productos:', err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

export default app; // Exportamos app para que pueda ser usado en server.js
