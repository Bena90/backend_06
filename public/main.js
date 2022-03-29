const socket = io ();

socket.on ( 'online', (data) =>{
    document.querySelector('#online').innerHTML = data.msg;
    const msgs = document.querySelector ('#msgs')

    if(data.mensajes.length != 0) {
        let historial = data.mensajes
        let html = ''
        historial.map ( (m) => {
            html += `
                <div class="shadow p-3 mb-5 rounded bg-warning">
                    <p> Nombre: ${m.nombre} - Email: ${m.email}: </p>
                    <p> Mensaje: ${m.mensaje}</p>
                </div>
            `
        })
        msgs.innerHTML = html
    }
})

const send = () => {
    const nombre = document.querySelector('#nombre')
    const email = document.querySelector('#email')
    const mensaje = document.querySelector('#mensaje')
    socket.emit (
        'msgchat',
        {
            nombre: nombre.value,
            email: email.value,
            mensaje: mensaje.value
        }
    )
    mensaje.value = ''
}

socket.on ('historial', (data)=> {
    console.log(data)
    const msgs = document.querySelector ('#msgs')
    let html = ''
    data.map ( (m) => {
        html += `
            <div class="shadow p-3 mb-5 rounded bg-warning">
                <p> Nombre: ${m.nombre} - Email: ${m.email}: </p>
                <p> Mensaje: ${m.mensaje}</p>
            </div>
        `
    })
    msgs.innerHTML = html
})


