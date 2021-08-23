window.onload = cargarCategorias();

/*BOTONES*/
const jugar = document.getElementById("btnJugar");
const sumarPuntos = document.getElementById("btnSumar");
const restarVida = document.getElementById("btnPerder");
const progresar = document.getElementById("btnProgreso");

/*Contenido HTML*/
const corazon1 = document.getElementById("heart1");
const corazon2 = document.getElementById("heart2");
const corazon3 = document.getElementById("heart3");
const barraProgreso = document.getElementById("barraProgreso");
const score = document.getElementById("score");
const listadoTemas = document.getElementById("default_select");

/*CARGA INICIAL*/
//Recibir categorias para mostrar y las carga en listado
async function cargarCategorias () {
    const recibirCategorias = await fetch(`https://opentdb.com/api_category.php`);
    const categorias = await recibirCategorias.json();
    categorias.trivia_categories.forEach(categoria => {
        console.log(categoria.name);
        const itemLista = document.createElement("option");
        itemLista.innerHTML=categoria.name;
        listadoTemas.appendChild(itemLista);
    });
}


/*Calcular puntaje*/
function contadorPuntaje (){
    let calculoPuntaje = parseInt(score.innerHTML);
    calculoPuntaje = parseInt(calculoPuntaje) + 100;
    console.log(calculoPuntaje);
    score.innerText = "";
    score.innerText = `${calculoPuntaje}`;
    console.log("funcions");
}

/*Aumentar linea de progreso*/
function progresarBarra(){
    let progresoActual = parseInt(barraProgreso.getAttribute("value"));
    progresoActual = progresoActual + 10;
    barraProgreso.setAttribute("value", progresoActual);
    console.log(progresoActual);
}

/*Perder Vida*/
function perderVida() {
    if(!corazon3.classList.contains("is-transparent")){
        corazon3.classList.add("is-transparent");
    }else if(!corazon2.classList.contains("is-transparent")){
        corazon2.classList.add("is-transparent");
    }else if(!corazon1.classList.contains("is-transparent")){
        corazon1.classList.add("is-transparent");
    }
}

/*Invocar Funciones*/
jugar.addEventListener("click",);
sumarPuntos.addEventListener("click", contadorPuntaje);
restarVida.addEventListener("click", perderVida);
progresar.addEventListener("click", progresarBarra);