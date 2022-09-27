const displayArea1 = document.querySelector(".display-area");
const displayArea2 = document.querySelector(".display-area2");
const displayArea3 = document.querySelector(".display-area3");
const inputTexto = document.querySelector(".input-palabra");
const GameOver = document.querySelector(".gameover");
const youWin = document.querySelector(".youWin");

var palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT", "HTML"];
var palabra = "";
var tecla = "";
var acceptedCharacters = /^[A-Z]+$/;
var idNumber = -1; //variable necesaria para el contador del id de las cajas creadas
var idIncorrecto = -1; // contador de cajas incorrectas 
var letrasIncorrectas = []; // array de letras incorrectas escritas por el usuario
let counter = 0;

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext('2d');

const letra1 = document.querySelector(".letra1");
//--------------------------------------------------------------SCRIPT PARA CANVAS---------------------------------------------------

function beginDraw() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;  

    ctx.beginPath();
    ctx.moveTo(100,350);
    ctx.lineTo(500,350);
    ctx.stroke();
}

function draw() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;



    switch(letrasIncorrectas.length) {
        
        case 1:
            ctx.beginPath();
            ctx.moveTo(150,350);
            ctx.lineTo(150,80);
            ctx.stroke();
            break;
        case 2:
                ctx.beginPath();
                ctx.moveTo(150,80);
                ctx.lineTo(350,80);
                ctx.stroke();
                break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(347,80);
            ctx.lineTo(347,120);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.arc(347, 145, 25, 0, 2 * Math.PI);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.moveTo(347,170);
            ctx.lineTo(347,220);
            ctx.stroke();
            break;
        case 6:
            ctx.beginPath();
            ctx.moveTo(347,220);
            ctx.lineTo(327,250);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(347,220);
            ctx.lineTo(367,250);
            ctx.stroke();
            break;
        case 7:
            ctx.beginPath();
            ctx.moveTo(347,190);
            ctx.lineTo(327,220);
            ctx.stroke();
            break;
        case 8:
            ctx.beginPath();
            ctx.moveTo(347,190);
            ctx.lineTo(367,220);
            ctx.stroke();
            break;
                

    }
}






// ---------------------------------------------------------------SCRIPT PARA CAJAS-------------------
function creacionCajasTextoCorrecto() {
    var tag = document.createElement("textarea");
    tag.cols = "2";
    tag.maxLength = "1"
    tag.readOnly = true;
    var text = document.createTextNode("");
    tag.appendChild(text);
    tag.setAttribute("id",(idNumber));
    tag.setAttribute("class","cajasCorrectas");
    var element = document.getElementsByClassName("letras-correctas");
    element[0].appendChild(tag);
}

function creacionCajasTextoIncorrecto() {
    var tag = document.createElement("textarea");
    tag.cols = "2";
    tag.maxLength = "1"
    tag.readOnly = true;
    var text = document.createTextNode("");
    tag.appendChild(text);
    tag.setAttribute("id",("incorrecto" + idIncorrecto));
    tag.setAttribute("class","cajasIncorrectas");
    var element = document.getElementsByClassName("letras-incorrectas");
    element[0].appendChild(tag);
}


function verificarTeclas (event) {
    let keyName = event.key
 
    if (!acceptedCharacters.test(keyName)) {
        console.log("tecla no permitida");
        return;
    }
    if (!palabra.includes(keyName.toUpperCase()) && !letrasIncorrectas.includes(keyName)) {
        letrasIncorrectas.push(keyName);
        for(let i=0; i<8; i++) {
            document.getElementById("incorrecto"+i).value = letrasIncorrectas[i]==undefined?"":letrasIncorrectas[i];
            
        }
        console.log(letrasIncorrectas.length);
        if (letrasIncorrectas.length == 8) {
            window.removeEventListener("keydown", verificarTeclas);
            GameOver.style.display = "flex";
        }
    } else {
    for (var i = 0; i<palabra.length; i++) {
        if (keyName == palabra[i]) {
            if (document.getElementById(i).value == "") {
                document.getElementById(i).value = palabra[i];
                counter++;
            } 
            
            if (counter == palabra.length ) {
                youWin.style.display = "flex";
                window.removeEventListener("keydown", verificarTeclas);

            }
            console.log(counter);
            console.log(palabra.length);
            
        }
    }
    }


    draw();
        //lo mismo pero con letras correctas
    
}

//------------------------------------------**************--------------BOTONES----------------******************------------------

function validar () {
    if (document.getElementsByClassName("input-palabra")[0].value == "") {
        alert("Ingrese una palabra");
        document.getElementsByClassName("input-palabra")[0].focus();
        return false;
    }
        if (!/^[A-Z]*$/g.test(document.getElementsByClassName("input-palabra")[0].value)) {
        alert("Invalid characters");
        document.getElementsByClassName("input-palabra")[0].focus();
        return false;
    }
    return true;

    // if (!/^[A-Z]*$/g.test(document.getElementsByClassName("input-palabra").value)) {
    //     alert("Invalid characters");
    //     document.getElementsByClassName("input-palabra")[0].focus();
    //     return false;
    // }
}

function iniciarjuego() {
    displayArea1.style.display="none";
    displayArea3.style.display="flex";
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabra = palabra.split("")
    console.log(palabra);
    beginDraw();
    window.addEventListener("keydown", verificarTeclas);
    
    for (var i = 0; i< palabra.length; i++) {
        idNumber++;
        creacionCajasTextoCorrecto();
    }

    for (var i=0; i<8; i++) {
        idIncorrecto++;
        creacionCajasTextoIncorrecto();
    }
    // var counter = 0;
    // var listener = document.addEventListener('keydown', (event) => {
    //     const keyName = event.key;
        
    //     for (var i = 0; i<palabra.length; i++) {
    //         if (keyName == palabra[i]) {
    //             if (document.getElementById(i).value == "") {
    //                 document.getElementById(i).value = palabra[i];
    //                 counter++;
    //             } 
                
    //             if (counter == palabra.length ) {
    //                 youWin.style.display = "flex";
    //                 document.removeEventListener('keydown', listener);
    //                 window.removeEventListener("keydown", verificarTeclas);

    //             }
    //             console.log(counter);
    //             console.log(palabra.length);
                
    //         }
    //     }
    //   })

}


function agregarPalabra() {
    displayArea1.style.display="none";
    displayArea2.style.display="inline-grid";
}

function guardarEmpezar() {
    if (!validar()) {
        return;
    }
    displayArea2.style.display="none";
    displayArea3.style.display="flex";
   

    var palabraGuardada = inputTexto.value;
    palabras.push(palabraGuardada);

    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabra = palabra.split("")
    console.log(palabra);
    console.log(palabras);
    beginDraw();
    window.addEventListener("keydown", verificarTeclas);

    for (var i = 0; i< palabra.length; i++) {
        idNumber++;
        creacionCajasTextoCorrecto();
    }

    for (var i=0; i<8; i++) {
        idIncorrecto++;
        creacionCajasTextoIncorrecto();
    }

    // var counter = 0;
    // var listener = document.addEventListener('keydown', (event) => {
    //     const keyName = event.key;
        
    //     for (var i = 0; i<palabra.length; i++) {
    //         if (keyName == palabra[i]) {
    //             if (document.getElementById(i).value == "") {
    //                 document.getElementById(i).value = palabra[i];
    //                 counter++;
    //             } 
                
    //             if (counter == palabra.length ) {
    //                 youWin.style.display = "flex";
    //                 document.removeEventListener('keydown', listener);
    //                 window.removeEventListener("keydown", verificarTeclas);
    //             }
    //             console.log(counter);
    //             console.log(palabra.length);
                
    //         }
    //     }
    //   })

}

function cancelar() {
    displayArea1.style.display="flex";
    displayArea2.style.display="none";
    displayArea3.style.display="none";
    location.reload()
}
