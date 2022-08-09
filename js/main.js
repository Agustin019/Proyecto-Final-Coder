'use stict';

//productos

const productos = [
    { nombre: "Mate Asa", precio: 630 },
    { nombre: "Mate Pampa", precio: 1470 },
    { nombre: "Mate Barril", precio: 160 },
    // { nombre: "Mate Lalo Termico", precio: 1030 },
    // { nombre: "Mate Acero Termico", precio: 1100 },
    // { nombre: "Mate Calabaza Estilo Pampa", precio: 1230 },
    { nombre: "Termo tipo Stanley", precio: 5200 },
    { nombre: "Termo Engomado 620cc", precio: 1700 },
    //{ nombre: "Termo de Acero color Pastel de 500cc", precio: 2200 },
    { nombre: "Termo de Acero de 500cc", precio: 1030 },
    // { nombre: "Termo Acero Media Manija de 1 litro", precio: 3200 },
    // { nombre: "Termo Brikenia Engomado de 1200cc", precio: 1230 },
];

let carrito = []



// Bienvenida al cliente
let seleccion = prompt("Hola! ¿Desea comprar algún producto? (Si o No)").toLowerCase()


while(seleccion != "si" && seleccion != "no"){   // ciclo while para que el cliente si o si responda "si" o "no" por si quiere comprar
    alert("por favor ingresa SI o NO") 

    seleccion = prompt("Hola! ¿desea comprar algo?  ¿Si o NO ?")
}

if(seleccion =="si"){  //en caso de responder "si" se le mostrara al cliente los productos disponibles
    alert("A continuacion le mostraremos nuestros productos")

    let todosLosProductos = productos.map((productos) => productos.nombre + " " + "$" + productos.precio ) // asignamos la variable todosLosProductos usando el metodo map para meternos en el array de productos , usamos la funcion flecha y concatenamos el nombre , el precio y los simbolos
    
    alert(todosLosProductos.join(" - ")) //metodo join y " - " , para organizar los productos en la salida del alert
} else if(seleccion =="no"){
    alert("¡Hasta pronto!") //en caso de que no quiera comprar , nos despedimos amablemente del cliente
}


while(seleccion != "no"){  //si la respuesta de que si quiere comprar fue distinta a "no" , el cliente procedera a alegir el producto que desea llevar
    let producto =prompt("Agrega un producto a tu carrito")
    let precio = 0

    if( producto == "mate asa" || producto == "mate pampa" ||                            //condicional de los productos en stock
        producto == "mate barril" || producto == "termo tipo stanley" ||
        producto == "termo engomado 620cc"|| producto == "termo de acero de 500cc" ) {
            switch(producto) {
                case "mate asa":
                    precio = 630;
                    break;

                case "mate pampa":
                    precio = 1470;
                    break;

                case "mate barril":
                    precio = 160;
                    break;

                case "termo tipo stanley":
                    precio = 5700;
                    break;

                case "termo engomado de 620cc":
                    precio = 1700;
                    break;

                case "termo de acero de 500cc":
                    precio = 1030;
                    break;
                

                default:
                    break;    

            }

            let unidades =parseInt(prompt("¿Cuantas unidades quiere llevar?")) // preguntamos cuantas unidades desea llevar del producto o de los productos seleccionados

            carrito.push({producto , unidades , precio}) // a el array carrito declarado anteriormente , con push le metemos las variables modificadas(producto,unidades,precio)
            console.log(carrito)

    }else{
        alert("S/ Stock") //en caso de que el cliente escriba otra cosa que no sea un producto disponible , le saldra ese mensaje mediante un alert
    }

    seleccion = prompt("¿desea llevar algo mas?") // preguntamos al cliente si desea llevar algo mas para que no sea un carrito infinito

    while(seleccion == "no"){
        alert("¡Muchas gracias por su compra! A continuacion podra ver el importe total")  // en caso de responder por "no" se le mostrara ese mensaje mediante un alert
        carrito.forEach((carritoFinal)=> {  // con el metodo forEach recorremos el array carrito y concatenamos "producto" y "unidades", y multiplicamos  "unidades" con  "precio". Mostrando por consola que productos selecciono el cliente , cuantas unidades y precio total de cada producto 
            console.log(`producto:${carritoFinal.producto}, unidades:${carritoFinal.unidades}  
            total a pagar por producto $${carritoFinal.unidades * carritoFinal.precio}`)
        } )

        break;
    }

}

const total = carrito.reduce((acc, el)=> acc + el.precio * el.unidades, 0); // usamos el metodo reduce con 2 parametros : acumulador(acc) y elemento(el) . con una funcion flecha ponemos el acumulador y despues lo que va contener. sumamos el acumulador con el resultado del elemento precio * elemento unidades. y por ultimo el valor inicial de acc que es 0
console.log(`El total a pagar por su compra es $${total}`) ;


let cuotas = parseInt(prompt("¿En cuantas cuotas desea realizar el pago? (Por el momento puede elegir entre 3 , 6 y 12)")) //preguntamos el cliente en cuantas cuotas quiere hacer el pago
function enCuotas(){
    if(cuotas == 3 ){
        console.log(`Son 3 cuotas de $${total / 3} sin interes`)
    }else if (cuotas == 6){
        console.log(`Son 6 cuotas de $${total / 6} sin interes`)
    }else if(cuotas == 12){
        console.log(`Son 12 cuotas de $${total / 12} sin interes`)
    }else{
        alert("Unicamente en 3 , 6 o 12 cuotas")
    }
}

enCuotas();

alert("¡Hasta Pronto!")