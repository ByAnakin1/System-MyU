const express = require('express');
const cors = require('cors');
const connection = require('./db');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Función para obtener el nombre de la tabla basado en la categoría
function getTableName(categoria) {
    switch (categoria.toLowerCase()) {
        case 'vestidos': return 'productos_vestidos';
        case 'faldas': return 'productos_faldas';
        case 'pantalones': return 'productos_pantalones';
        case 'polos': return 'productos_polos';
        case 'poleras': return 'productos_poleras';
        case 'zapatos': return 'productos_zapatos';
        case 'accesorios': return 'productos_accesorios';
        default: throw new Error('Categoría no válida');
    }
}

// Obtener todos los productos desde todas las tablas
app.get('/productos', (req, res) => {
    const queries = [
        'SELECT *, "Vestidos" as categoria FROM productos_vestidos',
        'SELECT *, "Faldas" as categoria FROM productos_faldas',
        'SELECT *, "Pantalones" as categoria FROM productos_pantalones',
        'SELECT *, "Polos" as categoria FROM productos_polos',
        'SELECT *, "Poleras" as categoria FROM productos_poleras',
        'SELECT *, "Zapatos" as categoria FROM productos_zapatos',
        'SELECT *, "Accesorios" as categoria FROM productos_accesorios'
    ];

    Promise.all(queries.map(query => 
        new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        })
    )).then(results => {
        const allProducts = results.flat();
        res.json(allProducts);
    }).catch(err => {
        console.error('Error al obtener productos:', err);
        res.status(500).json({ error: 'Error al obtener productos' });
    });
});

// Obtener un producto por su ID y categoría
app.get('/productos/:categoria/:id', (req, res) => {
    const { id, categoria } = req.params;
    const tableName = getTableName(categoria);
    const query = `SELECT * FROM ${tableName} WHERE id = ?`;
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener producto:', err);
            res.status(500).json({ error: 'Error al obtener producto' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.json({...results[0], categoria});
        }
    });
});

// Agregar un nuevo producto a la base de datos
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio, stock, categoria, imagen1, imagen2, imagen3, imagen4 } = req.body;
    const tableName = getTableName(categoria);
    const query = `INSERT INTO ${tableName} (id_cat_${categoria.toLowerCase()}, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const categoriaId = getCategoriaId(categoria);
    connection.query(query, [categoriaId, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4], (err, result) => {
        if (err) {
            console.error('Error al agregar producto:', err);
            res.status(500).json({ error: 'Error al agregar producto' });
        } else {
            res.json({ id: result.insertId, nombre, descripcion, precio, stock, categoria, imagen1, imagen2, imagen3, imagen4 });
        }
    });
});

// Eliminar un producto por su ID y categoría
app.delete('/productos/:categoria/:id', (req, res) => {
    const { id, categoria } = req.params;
    const tableName = getTableName(categoria);
    const query = `DELETE FROM ${tableName} WHERE id = ?`;
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            res.status(500).json({ error: 'Error al eliminar producto' });
        } else {
            res.json({ message: 'Producto eliminado' });
        }
    });
});

// Actualizar un producto por su ID y categoría
app.put('/productos/:categoria/:id', (req, res) => {
    const { id, categoria } = req.params;
    const { nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4 } = req.body;
    const tableName = getTableName(categoria);
    const query = `UPDATE ${tableName} SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen1 = ?, imagen2 = ?, imagen3 = ?, imagen4 = ? WHERE id = ?`;
    connection.query(query, [nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            res.status(500).json({ error: 'Error al actualizar producto' });
        } else {
            res.json({ message: 'Producto actualizado' });
        }
    });
});

function getCategoriaId(categoria) {
    switch (categoria.toLowerCase()) {
        case 'vestidos': return 1;
        case 'faldas': return 2;
        case 'pantalones': return 3;
        case 'polos': return 4;
        case 'poleras': return 5;
        case 'zapatos': return 6;
        case 'accesorios': return 7;
        default: throw new Error('Categoría no válida');
    }
}

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});