import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost', // Cambia esto si tu base de datos no está en localhost
    user: 'root', // Cambia esto con tu usuario de base de datos
    password: '', // Cambia esto con tu contraseña
    database: 'myu_basedatos', // Cambia esto con el nombre de tu base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

export default connection;