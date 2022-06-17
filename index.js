//const express =  require('express');

import express from 'express'; //AGREGAR!!!******* "type":"module", en el packege.json --- arriba de "name":"..."

const app = express();

const routerProductos = express.Router();


app.use ('/api/productos', routerProductos);
routerProductos.use (express.json());
routerProductos.use (express.urlencoded({extended : true}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')) // con http://localhost:8080/



const PORT  = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', error => console.log(`Error en el servidor ${error}`))


let listaProductos=[{
    "title": "Botas",
    "price": 1500,
    "thumbnail": "https://aca/se/ven/las/botas.png",
    "id": 1
  },
  {
    "title": "Ojotas",
    "price": 500,
    "thumbnail": "https://aca/se/ven/las/ojotas.png",
    "id": 2
  },
  {
    "title": "alpargatas",
    "price": 900,
    "thumbnail": "https://aca/se/ven/las/alpargatas.png",
    "id": 3
  }]; //sería el array donde guardo los productos



//----------RUTAS----------------

// ----incorporar el ROUTER de EXPRESS en la base '/api/productos'
//-----crear un espacio publico que contenga un documento index.html con un formulario de ingreso de productos

//--------------------------------------------------------------------------------------


//1)----------------------------------------

//GET '/api/productos' -> devuelve todos los productos.

routerProductos.get('/listar', (req, res)=> {
    if (listaProductos !== []) {
        res.json({productos : listaProductos});//- manejar el error (si no hay array) ************************
    }else {
        res.json({error:"No hay elementos para mostrar"})
    }


}
)

//2)----------------------------------------

//GET '/api/productos/:id' -> devuelve un producto según su id.

routerProductos.put('/productoSegunId/:id', (req, res) =>{
    let productoId = parseInt(req.params.id)
    if (!isNaN(productoId)) {
        if(productoId >=1 && productoId <= listaProductos.length){
            //let productoId = parseInt(req.params.id)
                let producto = listaProductos[productoId];
                res.json({producto : producto});

        }else{
            res.json({error:"producto no encontrado"})
        }
    }else{
        res.json({error:"producto no encontrado"})
    }
});


//3)----------------------------------------

//POST 'api/productos' -> recibe (por HTML) y agrega un producto, y lo devuelve con su id asignado.

routerProductos.post ('/cargarProducto', (req, res) =>{         //******la direccion sería '/guardar' o '/api/productos/guardar' */
    let producto = req.body
    listaProductos.push(producto);
    res.json({producto: producto});
    console.log(listaProductos);
})// ver como manejar los datos de ingreso en HTML y los errores



//4)----------------------------------------

//PUT '/api/productos/:id'-> recibe y actualiza un producto según su id.

routerProductos.put('/actualizar/:id', (req, res) =>{
    let productoId = parseInt(req.params.id);
    if (!isNaN(productoId)) {
        if(productoId >=1 && productoId <= listaProductos.length){
            let producto = req.body;
            let productoEncontrado = listaProductos.find(producto => producto.id === productoId);
            // actualizo
            productoEncontrado.title = producto.title;
            productoEncontrado.price = producto.price;
            productoEncontrado.thumbnail = producto.thumbnail;
        
            res.json({result: 'producto modificado con éxito'})
        }else{
            res.json({error:"producto no encontrado"})
        }
    }else {
        res.json({error:"producto no encontrado"})
    }

});


//5)----------------------------------------

// DELETE '/api/productos/:id' -> elimina un producto según su id.

routerProductos.delete('/eliminarSegunId/:id', (req, res) =>{
    let productoId = parseInt(req.params.id);
    if (!isNaN(productoId)) {
        if(productoId >=1 && productoId <= listaProductos.length){
            const nuevoArray = listaProductos.filter((elemento) => elemento.productoId != productoId) 
            //listaProductos = nuevoArray;//??
            console.log(nuevoArray)
            res.json({result: `el producto con id = ${productoId} ha sido eliminado`, }) 
            console.log(listaProductos)
        }else {
            res.json({error:"producto no encontrado"})
        }
    }else
    res.json({error:"producto no encontrado"})
});



//pendientes:

//modificar las rutas de los metodos (por la incorporación del router). le invento yo el nombre?
//implementar la API en una clase separada
// generar el id



//video de la clase detenido en 3:12:00