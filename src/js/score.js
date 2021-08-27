

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