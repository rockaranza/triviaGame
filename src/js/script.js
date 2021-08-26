window.onload = cargarCategorias;

const temasAPI = `https://opentdb.com/api_category.php`;
let controlVidas = 3;

/*BOTONES*/
const jugar = document.getElementById("btnJugar");
const sumarPuntos = document.getElementById("btnSumar");
const restarVida = document.getElementById("btnPerder");
const progresar = document.getElementById("btnProgreso");

/*Contenido VISUAL JUEGO*/
const corazon1 = document.getElementById("heart1");
const corazon2 = document.getElementById("heart2");
const corazon3 = document.getElementById("heart3");
const barraProgreso = document.getElementById("barraProgreso");
const score = document.getElementById("score");

/* Contenido HTML */
const listadoTemas = document.getElementById("defaultSelect");
const cantidadPreguntas = document.getElementById("cantidadPreguntas");
const tableroJuego = document.getElementById("questionContainer");

/*CARGA INICIAL*/
// Recibir categorias para mostrar y las carga en listado
async function cargarCategorias () {
    const recibirCategorias = await fetch(`https://opentdb.com/api_category.php`);
    const categorias = await recibirCategorias.json();
    categorias.trivia_categories.forEach(categoria => {
        console.log(categoria.name);
        const itemLista = document.createElement("option");
        itemLista.innerHTML=categoria.name;
        itemLista.setAttribute("value", categoria.id);
        listadoTemas.appendChild(itemLista);
    });
}

/*--------- Crear URL para preguntas ----------*/
const crearUrlApi = (e) => {
    e.preventDefault();
    let dificultad = selectorDificultad();
    let tipoPregunta = selectorTipoPregunta();
    //https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
    const API = `https://opentdb.com/api.php?amount=${cantidadPreguntas.value}&category=${listadoTemas.value}&difficulty=${dificultad}&type=${tipoPregunta}`;
    pedirPreguntas(API);
}

/*--------- Pedir preguntas a API ----------*/
const pedirPreguntas = url => {
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => llenarPreguntas(resultado.results))
        .catch(error => console.log(error))
}

/*-------- Mostrar Preguntas ---------- */
const llenarPreguntas = (preguntasRescatas) => {
    preguntas = preguntasRescatas;
    mostrarPregunta();
}
const mostrarPregunta = () => {
    preguntas.forEach(pregunta =>{
        tableroJuego.innerHTML = "";
        tableroJuego.innerHTML =`
        <div class="pregunta">
            <p>${pregunta.question}</p>
            <div class="botonesResuestas">
                <button class="btn">${pregunta.correct_answer}</button><button class="btn">${pregunta.incorrect_answer}</button>
            </div>     
        </div>
        `;
        console.log(`Pregunta: ${pregunta.question}`);
        console.log(`Pregunta correcta: ${pregunta.correct_answer}`);
        console.log(`Pregunta incorrecta: ${pregunta.incorrect_answer}`);
        console.log(`Dificultad: ${pregunta.difficulty}`);
        console.log(`Categoria: ${pregunta.category}`);
    })
}

/* Selector Radio Dificultad */
const selectorDificultad = () => {
    let seleccionDificultad = document.querySelectorAll('input[name="selectorDificultad"]')
    let valorSelector;
    for (const rb of seleccionDificultad) {
        if(rb.checked) {
            valorSelector = rb.value;
            break;
        }
    }
    return valorSelector;
}
/* Selector Radio Tipo de Pregunta */
const selectorTipoPregunta = () => {
    let seleccionTipoPregunta = document.querySelectorAll('input[name="answer"]')
    let valorSelectorPregunta;
    for (const rb of seleccionTipoPregunta) {
        if(rb.checked) {
            valorSelectorPregunta = rb.value;
            break;
        }
    }
    return valorSelectorPregunta;
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
function perderVida(controlVidas) {
    if(!corazon3.classList.contains("is-transparent")){
        corazon3.classList.add("is-transparent");
    }else if(!corazon2.classList.contains("is-transparent")){
        corazon2.classList.add("is-transparent");
    }else if(!corazon1.classList.contains("is-transparent")){
        corazon1.classList.add("is-transparent");
        alert("GAME OVER");
    }
}

/*Invocar Funciones*/
// jugar.addEventListener("click",);
// sumarPuntos.addEventListener("click", contadorPuntaje);
// restarVida.addEventListener("click", perderVida);
// progresar.addEventListener("click", progresarBarra);
jugar.addEventListener("click", crearUrlApi);