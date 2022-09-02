class Producto {
    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

/**
 * Definiciones de constantes
 */
const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

//Arrays donde guardaremos catálogo de productos y elementos en carrito
const productos = [];
let elementosCarrito = [];



const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

/**
 * Ejecución de funciones
 */

cargarProductos();
dibujarCarrito();
dibujarCatalogoProductos();

/**
 * Definiciones de funciones
 */

function cargarProductos() {
    productos.push(new Producto(001, "Mate calabaza forrado estilo imperial", 1300, "./img/mate_calabaza.jpg"));
    productos.push(new Producto(002,"Mate forrado sintetico tipo Pampa xl negro", 1400, "./img/mate_forrado_tipo_pampa.jpg"));
    productos.push(new Producto(003,"Mate Lalo termico de PVC engomado", 1030, "./img/mate_lalo.jpg",));
    productos.push(new Producto(004,"Mate olivia cero termico", 950, "./img/mate_olivia.jpg", ));
    productos.push(new Producto(005,"Mate tipo Stanley con bombilla y caja de regalo", 2200, "./img/mate_tipo_stanley.jpg",));
    productos.push(new Producto(006,"Mate Pampa varios colores con bombilla y estuche", 1470, "./img/mate_pampa.jpg" ));
    productos.push(new Producto(007,"Termo tipo Stanley KALPANA", 5399, "./img/Termo tipo Stanley KALPANA.jpg" ));
    productos.push(new Producto(08,"Termo Stanley Charly 1200cc", 5199, "./img/Termo Stanley Charly 1200cc.jpg" ));
    productos.push(new Producto(09,"Termo engomado de 620cc", 2299, "./img/termo engomado de 620cc.jpg" ));
    productos.push(new Producto(010,"Termo de acero de 500cc", 2899, "./img/Termo de acero de 500cc.jpg" ));
    productos.push(new Producto(011,"Termo de acero de 1 lt", 3699, "./img/Termo de acero de 1 lt.jpg" ));
    productos.push(new Producto(012,"Termo de acero color media manija de 1 litro", 2999, "./img/Termo de acero color media manija de 1 litro.jpg" ));
    productos.push(new Producto(013,"Termo brikenia engomado de 1200cc", 2949, "./img/termo brikenia engomado de 1200cc.jpg" ));
    productos.push(new Producto(014,"Termo acero media manija de 1 litro", 3999, "./img/Termo acero media manija de 1 litro.jpg" ));
    productos.push(new Producto(014,"Botella termica de 600cc con filtro", 2899, "./img/Botella termica de 600cc con filtro.jpg" ));
    productos.push(new Producto(014,"Botella térmica con pico color pastel de 600cc", 3200, "./img/Botella térmica con pico color pastel de 600cc.jpg" ));
    productos.push(new Producto(014,"Botella de acero sport brikenia de 350cc", 2499, "./img/Botella de acero sport brikenia de 350cc.jpg" ));
    productos.push(new Producto(014,"Botella de acero de 500cc color pastel degrade", 3299, "./img/Botella de acero de 500cc color pastel degrade.jpg" ));
    productos.push(new Producto(014,"Botella de acero color pastel de 500cc", 2799, "./img/Botella de acero color pastel de 500cc.jpg" ));
    productos.push(new Producto(014,"Botella acero de 750cc termica", 3499, "./img/Botella acero de 750cc termica.jpg" ));
}



function dibujarCarrito() {

    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";

        

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.id}</td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                <td>$ ${elemento.producto.precio}</td>
                <td>$ ${estandarDolaresAmericanos.format(elemento.producto.precio*elemento.cantidad)}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito+=elemento.cantidad*elemento.producto.precio;
           

            //agregamos evento a carrito
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            
            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });

            let borrarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);

            borrarProducto.addEventListener("click", () => {
                removerProductoCarrito(elemento);
                dibujarCarrito();
            });

        }
    ); 


    (elementosCarrito.length == 0) ? contenedorFooterCarrito.innerHTML = `
     <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
     
       ` : 
       contenedorFooterCarrito.innerHTML = `
     <th scope="row" colspan="5">Total de la compra: $${estandarDolaresAmericanos.format(sumaCarrito)}</th>

       `;
    
    

}

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}

function crearCard(producto) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";

    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>$ ${producto.precio} ARS</p>
    `;
    cuerpoCarta.append(botonAgregar);


    //Imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);


    //Agregar algunos eventos
    botonAgregar.onclick = () => {

        
        let elementoExistente = elementosCarrito.find((elemento) => elemento.producto.id == producto.id);
        
        if(elementoExistente) {
            elementoExistente.cantidad+=1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }
        /* metodo para almacenar en el storage los elementos del carrito */
        localStorage.setItem("elementosCarrito" , JSON.stringify(elementosCarrito));
        dibujarCarrito();

        swal({
            title: "¡Producto agregado!",
            text: `${producto.nombre} agregado al carrito de compra.`,
            icon: "success",
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Ir a carrito",
                    value: true
                }
            }
        }).then((irACarrito) => {

            if(irACarrito) {
                //swal("Vamos al carrito!");
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);

            }
        });

    } 
    
    return carta;

}

function dibujarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            contenedorProductos.append(contenedorCarta);
        }
    );

}   


/* Prueba de local storage */

   
    
     if(localStorage.getItem('elementosCarrito')===null){
         elementosCarrito = []
     }else{
     elementosCarrito = JSON.parse(localStorage.getItem('elementosCarrito'));
     dibujarCarrito()
     } 

