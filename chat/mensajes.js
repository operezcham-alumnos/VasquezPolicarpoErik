const mensajeContainer = document.getElementById('mensaje-container');

function cargarMensajes() {
    fetch('mensajes.json')
        .then(response => response.json())
        .then(data => {
            mensajeContainer.innerHTML = '';
            data.forEach(mensaje => agregarMensaje(mensaje));
        });
}

function agregarMensaje(mensaje) {
    const div = document.createElement('div');
    const usuario = document.createElement('h4');
    usuario.textContent = mensaje.usuario;
    const texto = document.createElement('p');
    texto.textContent = mensaje.texto;
    const fecha = document.createElement('span');
    fecha.textContent = new Date(mensaje.fecha).toLocaleString();
    //const botonEliminar = document.createElement('button');
    //botonEliminar.textContent = 'Eliminar';
    //botonEliminar.addEventListener('click', () => eliminarMensaje(mensaje));
    div.appendChild(usuario);
    div.appendChild(texto);
    div.appendChild(fecha);
    //div.appendChild(botonEliminar);
    mensajeContainer.appendChild(div);
}

function crearMensaje() {
    const usuario = document.getElementById('usuario').value;
    const texto = document.getElementById('texto').value;
    const fecha = new Date().toISOString();
    const nuevoMensaje = {
        usuario: usuario,
        texto: texto,
        fecha: fecha
    };
    fetch('mensajes.json')
        .then(response => response.json())
        .then(data => {
            data.push(nuevoMensaje);
            fetch('mensajes.json', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    agregarMensaje(nuevoMensaje);
                    document.getElementById('usuario').value = '';
                    document.getElementById('texto').value = '';
                });
        });
}
/*
function eliminarMensaje(mensaje) {
    fetch('mensajes.json')
        .then(response => response.json())
        .then(data => {
            const indice = data.findIndex(m => m.fecha === mensaje.fecha);
            if (indice !== -1) {
                data.splice(indice, 1);
                fetch('mensajes.json', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(() => {
                        const divAEliminar = mensajeContainer.querySelector(`div:contains("${mensaje.texto}")`);
                        divAEliminar.remove();
                    });
            }
        });
}
*/
cargarMensajes();
crearMensaje();
