const express = require ('express');

const{ Router } = express;

const routerProd = new Router();

const productos = [
    {
        title: "Producto 1",
        price: 300,
        thumbnail: "https://picsum.photos/300/300?random=1"
    },
    {
    
        title: "Producto 2",
        price: 500,
        thumbnail: "https://picsum.photos/300/300?random=1"
    }
];


routerProd.get ('/', (req, res) => {
    res.render(
        'main',
        {
            productos,
            cargar:true
        }
    )
})

routerProd.get ('/productos', (req, res) => {
    res.render(
        'main',
        {
            productos,
            cargar: false
        }
    )
})

routerProd.post ('/productos', (req, res) => {
    console.log(req.body)
    const { body } = req;
    productos.push (body);
    res.render(
        'main',
        {
            productos,
            cargar:false
        }
    )
})

module.exports = routerProd