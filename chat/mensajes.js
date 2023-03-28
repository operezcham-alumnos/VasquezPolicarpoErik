const http = require('http');
const PORT = 80;
const fs = require('fs');

const mensajes = [
    {
        "usuario": "Erik",
        "texto": "Hola, ¿cómo estás?",
        "fecha": "2022-03-15T12:30:00Z"
    },
    {
        "usuario": "Andy",
        "texto": "¡Hola Erik! Estoy bien, ¿y tú?",
        "fecha": "2022-03-15T12:31:00Z"
    },
    {
        "usuario": "Erik",
        "texto": "Qué bueno, ¿qué planes tienen para hoy?",
        "fecha": "2022-03-15T12:33:00Z"
    },
    {
        "usuario": "Andy",
        "texto": "Pensábamos ir al cine, ¿te animas?",
        "fecha": "2022-03-15T12:34:00Z"
    }
]

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        const paginaHtmlPath = './index.html';
        const paginaHtml = fs.readFileSync(paginaHtmlPath, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(paginaHtml);
    } else if (req.method === 'POST' && req.url === '/mensajes') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const nuevoMensaje = JSON.parse(body);
            //nuevoMensaje.id = usuarios[usuarios.length-1].id + 1;
            mensajes.push(nuevoMensaje);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(mensajes));
        });
    } else if (req.method === 'GET' && req.url === '/mensajes') {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(mensajes));
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});