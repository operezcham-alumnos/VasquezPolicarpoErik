//modulos necesarios
const http = require('html')
const fs = require('fs')

//Constante del puerto
const PORT = 3000

//Creacion del servidor 
const servidor = http.createServer(responder)
servidor.listen(PORT)

function responder(solicitud, respuesta) {
    //Codigo 200: todo bien 
    //tipo de contenido html
    respuesta.writeHead(200, {'Content-Type': 'text/html'})
    //leer el texto del archivo index.html
    //asumir que esta escrito con utf8
    const texto = fs.readFileSync('index.html', 'utf8')
    //mandar el resultado
    respuesta.write(texto)
    respuesta.end()
}