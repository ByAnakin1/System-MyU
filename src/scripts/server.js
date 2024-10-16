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

// Rutas para productos de faldas
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

app.post('/api/productos', async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4 } = req.body;

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

// Rutas para productos de accesorios
app.get('/api/accesorios', async (req, res) => {
    try {
        const db = await mysql.createConnection(dbConfig);
        const [accesorios] = await db.query('SELECT * FROM productos_accesorios');
        res.json(accesorios);
    } catch (error) {
        console.error('Error al obtener accesorios:', error);
        res.status(500).json({ error: 'Error al obtener accesorios' });
    }
});

app.post('/api/accesorios', async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4 } = req.body;

    if (!nombre || !descripcion || !precio || !stock) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const db = await mysql.createConnection(dbConfig);
        const [result] = await db.query(
            'INSERT INTO productos_accesorios (id_cat_accesorios, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [7, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4, 'activo']
        );
        res.status(201).json({ message: 'Producto de accesorios agregado', productId: result.insertId });
    } catch (error) {
        console.error('Error al agregar producto de accesorios:', error);
        res.status(500).json({ error: 'Error al agregar producto de accesorios. Asegúrate de que la base de datos esté configurada correctamente.' });
    }
});

app.delete('/api/accesorios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await mysql.createConnection(dbConfig);
        await db.query('DELETE FROM productos_accesorios WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto de accesorios:', error);
        res.status(500).json({ error: 'Error al eliminar producto de accesorios' });
    }
});

// Rutas para productos de vestidos
app.get('/api/vestidos', async (req, res) => {
    try {
        const db = await mysql.createConnection(dbConfig);
        const [vestidos] = await db.query('SELECT * FROM productos_vestidos');
        res.json(vestidos);
    } catch (error) {
        console.error('Error al obtener vestidos:', error);
        res.status(500).json({ error: 'Error al obtener vestidos' });
    }
});

app.post('/api/vestidos', async (req, res) => {
    const { id_cat_vestidos, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4 } = req.body;

    if (!nombre || !descripcion || !precio || !stock) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const db = await mysql.createConnection(dbConfig);
        const [result] = await db.query(
            'INSERT INTO productos_vestidos (id_cat_vestidos, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id_cat_vestidos, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4]
        );
        res.status(201).json({ message: 'Producto de vestidos agregado', productId: result.insertId });
    } catch (error) {
        console.error('Error al agregar producto de vestidos:', error);
        res.status(500).json({ error: 'Error al agregar producto de vestidos. Asegúrate de que la base de datos esté configurada correctamente.' });
    }
});

app.delete('/api/vestidos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await mysql.createConnection(dbConfig);
        await db.query('DELETE FROM productos_vestidos WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto de vestidos:', error);
        res.status(500).json({ error: 'Error al eliminar producto de vestidos' });
    }
});

// Rutas para productos de pantalones
app.get('/api/pantalones', async (req, res) => {
    try {
        const db = await mysql.createConnection(dbConfig);
        const [pantalones] = await db.query('SELECT * FROM productos_pantalones');
        res.json(pantalones);
    } catch (error) {
        console.error('Error al obtener pantalones:', error);
        res.status(500).json({ error: 'Error al obtener pantalones' });
    }
});

app.post('/api/pantalones', async (req, res) => {
    const { id_cat_pantalones, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4 } = req.body;

    if (!nombre || !descripcion || !precio || !stock) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const db = await mysql.createConnection(dbConfig);
        const [result] = await db.query(
            'INSERT INTO productos_pantalones (id_cat_pantalones, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id_cat_pantalones, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4]
        );
        res.status(201).json({ message: 'Producto de pantalones agregado', productId: result.insertId });
    } catch (error) {
        console.error('Error al agregar producto de pantalones:', error);
        res.status(500).json({ error: 'Error al agregar producto de pantalones. Asegúrate de que la base de datos esté configurada correctamente.' });
    }
});

app.delete('/api/pantalones/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await mysql.createConnection(dbConfig);
        await db.query('DELETE FROM productos_pantalones WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto de pantalones:', error);
        res.status(500).json({ error: 'Error al eliminar producto de pantalones' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
