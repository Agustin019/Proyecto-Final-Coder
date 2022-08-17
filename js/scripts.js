class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

//clase constructora de nuevo objetos
class mate {
    constructor(nombre, precio, foto, id) {
        this.nombre = nombre
        this.precio = precio
        this.id = id
        this.foto = foto
    }
}


//productos ya declarados
const producto = [];

function cargarProductos() {
    producto.push(new mate("Mate calabaza forrado estilo imperial", 1300, "./img/mate_calabaza.jpg", 001));
    producto.push(new mate("Mate forrado sintetico tipo Pampa xl negro", 1400, "./img/mate_forrado_tipo_pampa.jpg", 002));
    producto.push(new mate("Mate Lalo termico de PVC engomado", 1030, "./img/mate_lalo.jpg", 003));
    producto.push(new mate("Mate olivia cero termico", 950, "./img/mate_olivia.jpg", 004));
    producto.push(new mate("Mate tipo Stanley con bombilla y caja de regalo", 2200, "./img/mate_pampa.jpg", 005));
    producto.push(new mate("Mate Pampa varios colores con bombilla y estuche", 1470, "./img/mate_tipo_stanley.jpg", 006));
}
cargarProductos();



//funcion de dibujo de carrito
function dibujarCarrito() {
    let renglonesCarrito = '';

    carrito.forEach(
        (elemento) => {
            renglonesCarrito += `
                <tr>
                    <td>${elemento.producto.id}</td>
                    <td>${elemento.producto.nombre}</td>
                    <td>${elemento.cantidad}</td>
                    <td>$ ${elemento.producto.precio}</td>
                </tr>
            `;
        }
    );

    contenedorCarritoCompras.innerHTML = renglonesCarrito;
}

//Carrito
let carrito = [];

const contenedorCarritoCompras = document.querySelector('#items');
const contenedorDeProductos = document.getElementsByClassName("row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center");

const addProductos = contenedorDeProductos[0];

function crearCard(producto) {
    //footer card
    let footerCard = document.createElement("div");
    footerCard.className = "card-footer p-4 pt-0 border-top-0 bg-transparent"
    //boton
    let botonAgregar = document.createElement("div");
    botonAgregar.className = "text-center"
    botonAgregar.className = "btn btn-outline-dark mt-auto";
    botonAgregar.innerText = "Agregar";

    //card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body p-4";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio}</p>
    `;
    cuerpoCarta.append(footerCard);
    cuerpoCarta.append(botonAgregar);

    //imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //CARD
    let carta = document.createElement("div");
    carta.className = "card h-100 m-4";
    carta.append(imagen);
    carta.append(cuerpoCarta);

    let colum = document.createElement('div');
    colum.className = "col mb-5";
    colum.append(carta);

    //agregar algunos eventos
    botonAgregar.onclick = () => {
        //alert("Hiciste click en el producto" + producto.nombre);

        let elementoCarrito = new ElementoCarrito(producto, 1);
        console.log(elementoCarrito);
        carrito.push(elementoCarrito);
        let total = precioFinal();
        let precioTotal = document.getElementById("precioTotal");
        precioTotal.innerHTML = "$" + total;
        console.log(carrito);
        dibujarCarrito();
    }

    return carta;

}

function dibujarCatalogoProductos() {
    addProductos.innerHTML = "";
    producto.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto)
                ;
            addProductos.append(contenedorCarta);
        }
    );

};

dibujarCatalogoProductos();

//funcion preciofinal
function precioFinal() {
    let totalPrecios = carrito.reduce(((acumulador, carrito) => acumulador + carrito.producto.precio), 0);
    console.log(totalPrecios);
    return totalPrecios;


}



