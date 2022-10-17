'use strict'


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


// Definicion de constantes

const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

//Arrays donde guardaremos catálogo de productos y elementos en carrito
const productos = [];
let elementosCarrito = [];

// Consumo de API dolar
let valorDolarBlue = 0

await obtenerValorDolarBlue().then(a => {
    valorDolarBlue = a
})
async function obtenerValorDolarBlue() {
    const url = 'https://api.bluelytics.com.ar/v2/latest';
    const resp = await fetch(url)
    const datos = await resp.json()
    return datos.blue.value_buy
}



const contenedorProductos = document.querySelector('#contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");


// Ejecución de funciones

cargarProductos();
dibujarCarrito();
dibujarCatalogoProductos();

/*document.addEventListener('DOMContentLoaded', function(){
    cargarProductos();
    dibujarCarrito();
    dibujarCatalogoProductos();
})*/
/* window.onload = function(){
    cargarProductos();
    dibujarCarrito();
    dibujarCatalogoProductos();
 }*/


/**
 * Definiciones de funciones
 */

function cargarProductos() {
    productos.push(new Producto(1, "Mate calabaza forrado estilo imperial", 1300, "../build/img/mate_calabaza.webp"));
    productos.push(new Producto(2, "Mate forrado sintetico tipo Pampa xl negro", 1400, "../build/img/mate_forrado_tipo_pampa.webp"));
    productos.push(new Producto(3, "Mate Lalo termico de PVC engomado", 1030, "../build/img/mate_lalo.webp", ));
    productos.push(new Producto(4, "Mate olivia cero termico", 950, "../build/img/mate_olivia.webp", ));
    productos.push(new Producto(5, "Mate tipo Stanley con bombilla y caja de regalo", 2200, "../build/img/mate_tipo_stanley.webp", ));
    productos.push(new Producto(6, "Mate Pampa varios colores con bombilla y estuche", 1470, "../build/img/mate_pampa.webp"));
    productos.push(new Producto(7, "Termo tipo Stanley KALPANA", 5399, "../build/img/Termo tipo Stanley KALPANA.webp"));
    productos.push(new Producto(8, "Termo Stanley Charly 1200cc", 5199, "../build/img/Termo Stanley Charly 1200cc.webp"));
    productos.push(new Producto(9, "Termo engomado de 620cc", 2299, "../build/img/termo engomado de 620cc.webp"));
    productos.push(new Producto(10, "Termo de acero de 500cc", 2899, "../build/img/Termo de acero de 500cc.webp"));
    productos.push(new Producto(11, "Termo de acero de 1 lt", 3699, "../build/img/Termo de acero de 1 lt.webp"));
    productos.push(new Producto(12, "Termo de acero color media manija de 1 litro", 2999, "../build/img/Termo de acero color media manija de 1 litro.webp"));
    productos.push(new Producto(13, "Termo brikenia engomado de 1200cc", 2949, "../build/img/termo brikenia engomado de 1200cc.webp"));
    productos.push(new Producto(14, "Termo acero media manija de 1 litro", 3999, "../build/img/Termo acero media manija de 1 litro.webp"));
    productos.push(new Producto(15, "Botella termica de 600cc con filtro", 2899, "../build/img/Botella termica de 600cc con filtro.webp"));
    productos.push(new Producto(16, "Botella térmica con pico color pastel de 600cc", 3200, "../build/img/Botella térmica con pico color pastel de 600cc.webp"));
    productos.push(new Producto(17, "Botella de acero sport brikenia de 350cc", 2499, "../build/img/Botella de acero sport brikenia de 350cc.webp"));
    productos.push(new Producto(18, "Botella de acero de 500cc color pastel degrade", 3299, "../build/img/Botella de acero de 500cc color pastel degrade.webp"));
    productos.push(new Producto(19, "Botella de acero color pastel de 500cc", 2799, "../build/img/Botella de acero color pastel de 500cc.webp"));
    productos.push(new Producto(20, "Botella acero de 750cc termica", 3499, "../build/img/Botella acero de 750cc termica.webp"));
}



function dibujarCarrito() {

    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";



    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito = document.createElement("tr");

            renglonesCarrito.innerHTML = `
                <td> <img src="${elemento.producto.foto}" width="50px" heigth="60px" d-block></td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="5"  step="1" width: 50px/></td>
                <td>$${elemento.producto.precio}</td>
                <td>$${estandarDolaresAmericanos.format(elemento.producto.precio*elemento.cantidad)}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger trash-btn"><i id="trash" class="bi bi-trash-fill"></i></button></td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito += elemento.cantidad * elemento.producto.precio;


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
     
       `:
        contenedorFooterCarrito.innerHTML = `
     <th scope="row" colspan="2">Total: $${estandarDolaresAmericanos.format(sumaCarrito)}</th>
     <th scope="row" colspan="5" style="color:gray;font-weight:400; ">Total en dolares: $${Math.round(sumaCarrito / valorDolarBlue) }usd</th>    
       `;





    //Precio del carrito al lado del icono
    const priceCart = document.querySelector('#price-cart');
    priceCart.textContent = `$${sumaCarrito} `;


   
    // let botonTerminarCompra = document.querySelector('#botonTerminarCompra');
    // botonTerminarCompra.addEventListener('click' , () =>{

    //     elementosCarrito.length = 0;
    //     dibujarCarrito();

    // })

    /*Titulo modal*/
    const tituloModalConfirmarPedido = document.querySelector('#tituloModalConfirmarPedido');
    tituloModalConfirmarPedido.textContent = `Monto Final: $${sumaCarrito}`
}


// funcion para eliminar elementos del carrito
function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}


// funcio para crear las cards

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

        if (elementoExistente) {
            elementoExistente.cantidad += 1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }
        /* metodo para almacenar en el storage los elementos del carrito */
        localStorage.setItem("elementosCarrito", JSON.stringify(elementosCarrito));
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
                    confirmButtonColor: '#ff97d9',
                    value: true
                }
            }
        }).then((irACarrito) => {

            if (irACarrito) {
                //swal("Vamos al carrito!");
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                    keyboard: true
                });
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
        });

}


/* local storage */


if (localStorage.getItem('elementosCarrito') === null) {
    elementosCarrito = []
} else {
    elementosCarrito = JSON.parse(localStorage.getItem('elementosCarrito'));
    dibujarCarrito()
}



// -- FORMULARIO PVALIDACION - FINALIZAR COMPRA.



const formulario = document.querySelector('#formulario')
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;

        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;

        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2()
            break;

        case "password2":
            validarPassword2()
            break;

        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;

        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;

    }
}


const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.querySelector(`#grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.querySelector(`#grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

// Creando la comparacion de contraseñas
const validarPassword2 = () => {
    const inputPassword1 = document.querySelector('#password')
    const inputPassword2 = document.querySelector('#password2')

    // Condicional para preguntar si el valor de las contraseñas son distintos
    if (inputPassword1.value !== inputPassword2.value) {
        document.querySelector(`#grupo__password2`).classList.add('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__password2`).classList.remove('formulario__grupo-correcto')
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle')
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle')
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos['password'] = false;
    } else {
        document.querySelector(`#grupo__password2`).classList.remove('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__password2`).classList.add('formulario__grupo-correcto')
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle')
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle')
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.querySelector('#terminos');

    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset();

        document.querySelector('.formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')
        setTimeout(() => {
            document.querySelector('.formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
        }, 5000)

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto')
        })

        // Limpiar carrito despues de finalizar compra

        elementosCarrito.length = 0;
        dibujarCarrito();
  
    } else {
        document.querySelector('#formulario__mensaje').classList.add('formulario__mensaje-activo')
        setTimeout(() => {
            document.querySelector('#formulario__mensaje').classList.remove('formulario__mensaje-activo')
        }, 4000)
        
    }

})