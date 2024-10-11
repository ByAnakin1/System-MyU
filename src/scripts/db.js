// src/scripts/db.js
import { Pool } from 'pg'; // Importamos Pool desde pg

const pool = new Pool({
    user: 'localhost',         // Cambia esto con tus credenciales
    host: 'root',
    database: 'myu_basedatos',
    password: '',                 // El puerto que usas para PostgreSQL
});

// Exportamos el pool para usar en otras partes del proyecto
export default {
    query: (text, params) => pool.query(text, params),
};
