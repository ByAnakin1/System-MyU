import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 3000;

// Configuración de la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root', // Cambia si tienes otro usuario
    password: '', // Cambia si tienes contraseña
    database: 'myu_basedatos' // Asegúrate de que este nombre es correcto
};

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para obtener todos los productos
app.get('/api/productos', async (req, res) => {
    try {
        const db = await mysql.createConnection(dbConfig);
        const [productos] = await db.query('SELECT * FROM productos_faldas');
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Ruta para agregar un nuevo producto
app.post('/api/productos', async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4 } = req.body;

    // Validar que todos los campos requeridos están presentes
    if (!nombre || !descripcion || !precio || !stock) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const db = await mysql.createConnection(dbConfig);
        const [result] = await db.query(
            'INSERT INTO productos_faldas (id_cat_faldas, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [2, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4]
        );
        res.status(201).json({ message: 'Producto agregado', productId: result.insertId });
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ error: 'Error al agregar producto. Asegúrate de que la base de datos esté configurada correctamente.' });
    }
});

// Ruta para eliminar un producto
app.delete('/api/productos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await mysql.createConnection(dbConfig);
        await db.query('DELETE FROM productos_faldas WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
