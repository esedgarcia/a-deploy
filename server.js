const express = require('express');
const app = express();
const PORT = 1005;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Host running in http://localhost:${PORT}`);
});
