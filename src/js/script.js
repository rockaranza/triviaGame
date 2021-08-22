const sumarPuntos = document.getElementById("btnSumar");
const restarVida = document.getElementById("btnPerder");
const corazon1 = document.getElementById("heart1");
const corazon2 = document.getElementById("heart2");
const corazon3 = document.getElementById("heart3");

const score = document.getElementById("score");

let corazones = 0;

/*Calcular puntaje*/
function contadorPuntaje (){
    let calculoPuntaje = score.innerText;
    console.log(score.innerText);
    calculoPuntaje = parseInt(calculoPuntaje) + 100;
    console.log(calculoPuntaje);
    score.innerText = "";
    score.innerText = `${calculoPuntaje}`;
    console.log("funcions");
}

/*Perder Vida*/
function perderVida(corazones) {
    corazon3.classList.toggle("is-transparent");
}

sumarPuntos.addEventListener("click", contadorPuntaje);
restarVida.addEventListener("click", perderVida);