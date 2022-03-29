const express = require ('express');
const { engine } = require ('express-handlebars');
const { Server } = require ('socket.io')
const http = require('http')
const routerProd = require ('./routes/productos')

const app = express ();
const server = http.createServer (app)
const io = new Server (server)

app.use (express.json())
app.use (express.static(__dirname + "/public"))
app.use (express.urlencoded ({extended: true}))
app.use ('/', routerProd)

app.set("views", "./public");
app.set("view engine", "hbs");

app.engine (
    'hbs',
    engine ({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/public/layouts',
        partialsDir: __dirname + '/public/partials'
    })
)

let mensajes = [];

io.on ('connection', (socket) =>{
    console.log ('Cliente conectado');

    socket.emit ( 'online', {
        msg: "Online 👍",
        mensajes
    });

    socket.on (
        "msgchat",
        (data) => {
            console.log (data)
            mensajes.push({
                nombre: data.nombre,
                email: data.email,
                mensaje: data.mensaje
            })
        io.sockets.emit ('historial', mensajes)
        }
    )
})


const PORT = 8080

server.listen (PORT, () =>{
    console.log(`Server run on http://localhost:${PORT}/`)
})
 