window.onload = cargarCategorias;

const temasAPI = `https://opentdb.com/api_category.php`;
/* VARIABLES GLOBALES PARA CONTROLAR JUEGO*/
let controlVidas = 3;
let controlPreguntas = 0;
let puntaje = 0;
let q = 0;

/*BOTONES*/
const jugar = document.getElementById("btnJugar");
const playAgain = document.getElementById("playAgain");

/*Contenido VISUAL JUEGO*/
const corazon1 = document.getElementById("heart1");
const corazon2 = document.getElementById("heart2");
const corazon3 = document.getElementById("heart3");
const barraProgreso = document.getElementById("barraProgreso");
const score = document.getElementById("score");
const gameOver = document.getElementById("gameOverContainer");

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
    console.log(cantidadPreguntas.value);
    barraProgreso.setAttribute("max", cantidadPreguntas.value);
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
    jugar.setAttribute("disabled", true);
    jugar.classList.remove("is-success");
    jugar.classList.add("is-disabled")
    preguntas = preguntasRescatas;
    console.log(preguntas);
    mostrarPregunta();
}
const mostrarPregunta = () => {
    preguntaCorrecta = preguntas[q].correct_answer;
    if(preguntas[q].incorrect_answers.length-1){
        tableroJuego.innerHTML = `
        <div class="centrarPreguntas">
            <p>${preguntas[q].question}</p>
            <div class="contenedorOpciones">
                <button onClick="handleCheckAnswer(this)" class="nes-btn botonRespuesta">${preguntas[q].correct_answer}</button>
                <button onClick="handleCheckAnswer(this)" class="nes-btn botonRespuesta">${preguntas[q].incorrect_answers[0]}</button>
                <button onClick="handleCheckAnswer(this)" class="nes-btn botonRespuesta">${preguntas[q].incorrect_answers[1]}</button>
                <button onClick="handleCheckAnswer(this)" class="nes-btn botonRespuesta">${preguntas[q].incorrect_answers[2]}</button>
            </div>
        </div>
        `;
    } else {
        tableroJuego.innerHTML = `
        <div class="centrarPreguntas">
            <p>${preguntas[q].question}</p>
            <div class="contenedorOpciones">
                <button onClick="handleCheckAnswer(this)" class="nes-btn botonRespuesta">${preguntas[q].correct_answer}</button>
                <button onClick="handleCheckAnswer(this)" class="nes-btn botonRespuesta">${preguntas[q].incorrect_answers[0]}</button>
            </div>
        </div>
        `;
    }     
};

const handleCheckAnswer = button => {
    if(button.innerText === preguntaCorrecta) {
        contadorPuntaje();
        console.log("Correcto");
    }else{
        perderVida(controlVidas);
        console.log("Incorrecto");
    }
    if(preguntas.length -1 !== q){
        q++;
        
        mostrarPregunta();
    }else{
        console.log(`Juego Terminado. Puntaje: ${contadorPuntaje()}`);
    }
    progresarBarra();
};
/*PUNTAJE*/
function contadorPuntaje (){
    let calculoPuntaje = parseInt(score.innerHTML);
    calculoPuntaje = parseInt(calculoPuntaje) + 100;
    console.log(calculoPuntaje);
    score.innerText = "";
    score.innerText = `${calculoPuntaje}`;
    console.log("funcions");
    return calculoPuntaje;
}

/*PERDER VIDA*/
function perderVida() {
    if(!corazon3.classList.contains("is-transparent")){
        corazon3.classList.add("is-transparent");
    }else if(!corazon2.classList.contains("is-transparent")){
        corazon2.classList.add("is-transparent");
    }else if(!corazon1.classList.contains("is-transparent")){
        corazon1.classList.add("is-transparent");
        gameOver.classList.toggle("hidden");
        //location.reload();
    }
}
 /*BARRA PROGRESO*/
function progresarBarra(){
    let progresoActual = parseInt(barraProgreso.getAttribute("value"));
    progresoActual = progresoActual + 1;
    barraProgreso.setAttribute("value", progresoActual);
    console.log(progresoActual);
}

/*REINICIAR*/
const reiniciar = () => {location.reload()}



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


/*Invocar Funciones*/
// jugar.addEventListener("click",);
// sumarPuntos.addEventListener("click", contadorPuntaje);
// restarVida.addEventListener("click", perderVida);
// progresar.addEventListener("click", progresarBarra);
jugar.addEventListener("click", crearUrlApi);
playAgain.addEventListener("click", reiniciar);