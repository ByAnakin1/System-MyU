import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto a tu usuario de MySQL
    password: '', // Cambia esto a tu contraseña de MySQL
    database: 'myu_basedatos' // Cambia esto al nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

// Agregar un nuevo producto de accesorios
app.post('/productos_accesorios', (req, res) => {
    const { id_cat_accesorios, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4, estado } = req.body;

    db.query('INSERT INTO productos_accesorios (id_cat_accesorios, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [id_cat_accesorios, nombre, descripcion, precio, stock, imagen1, imagen2, imagen3, imagen4, estado], 
        (err, results) => {
            if (err) {
                console.error('Error al insertar el producto: ', err);
                return res.status(500).json({ error: 'Error al insertar el producto' });
            }
            res.status(201).json({ id: results.insertId });
        }
    );
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
