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

app.get('/api/polos', async (req, res) => {
    try {
        const db = await mysql.createConnection(dbConfig);
        const [polos] = await db.query('SELECT * FROM productos_polos');
        res.json(polos);
    } catch (error) {
        console.error('Error al obtener polos:', error);
        res.status(500).json({ error: 'Error al obtener polos' });
    }
});

app.post('/api/polos', async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4 } = req.body;

    if (!nombre || !descripcion || !precio || !stock) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const db = await mysql.createConnection(dbConfig);
        const [result] = await db.query(
            'INSERT INTO productos_polos (id_cat_polos, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [4, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4] // id_cat_polos = 4
        );
        res.status(201).json({ message: 'Producto de polos agregado', productId: result.insertId });
    } catch (error) {
        console.error('Error al agregar producto de polos:', error);
        res.status(500).json({ error: 'Error al agregar producto de polos. Asegúrate de que la base de datos esté configurada correctamente.' });
    }
});

app.delete('/api/polos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await mysql.createConnection(dbConfig);
        await db.query('DELETE FROM productos_polos WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto de polos:', error);
        res.status(500).json({ error: 'Error al eliminar producto de polos' });
    }
});

// Rutas para productos de poleras
app.get('/api/poleras', async (req, res) => {
    try {
        const db = await mysql.createConnection(dbConfig);
        const [poleras] = await db.query('SELECT * FROM productos_poleras');
        res.json(poleras);
    } catch (error) {
        console.error('Error al obtener poleras:', error);
        res.status(500).json({ error: 'Error al obtener poleras' });
    }
});

app.post('/api/poleras', async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4 } = req.body;

    if (!nombre || !descripcion || !precio || !stock) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const db = await mysql.createConnection(dbConfig);
        const [result] = await db.query(
            'INSERT INTO productos_poleras (id_cat_poleras, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [5, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4] // id_cat_poleras = 5
        );
        res.status(201).json({ message: 'Producto de poleras agregado', productId: result.insertId });
    } catch (error) {
        console.error('Error al agregar producto de poleras:', error);
        res.status(500).json({ error: 'Error al agregar producto de poleras. Asegúrate de que la base de datos esté configurada correctamente.' });
    }
});

app.delete('/api/poleras/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await mysql.createConnection(dbConfig);
        await db.query('DELETE FROM productos_poleras WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto de poleras:', error);
        res.status(500).json({ error: 'Error al eliminar producto de poleras' });
    }
});

// Rutas para productos de zapatos
app.get('/api/zapatos', async (req, res) => {
    try {
        const db = await mysql.createConnection(dbConfig);
        const [zapatos] = await db.query('SELECT * FROM productos_zapatos');
        res.json(zapatos);
    } catch (error) {
        console.error('Error al obtener zapatos:', error);
        res.status(500).json({ error: 'Error al obtener zapatos' });
    }
});

app.post('/api/zapatos', async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4 } = req.body;

    if (!nombre || !descripcion || !precio || !stock) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const db = await mysql.createConnection(dbConfig);
        const [result] = await db.query(
            'INSERT INTO productos_zapatos (id_cat_zapatos, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [6, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4] // id_cat_zapatos = 6
        );
        res.status(201).json({ message: 'Producto de zapatos agregado', productId: result.insertId });
    } catch (error) {
        console.error('Error al agregar producto de zapatos:', error);
        res.status(500).json({ error: 'Error al agregar producto de zapatos. Asegúrate de que la base de datos esté configurada correctamente.' });
    }
});

app.delete('/api/zapatos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const db = await mysql.createConnection(dbConfig);
        await db.query('DELETE FROM productos_zapatos WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar producto de zapatos:', error);
        res.status(500).json({ error: 'Error al eliminar producto de zapatos' });
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});